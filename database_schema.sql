-- Profiles
CREATE TABLE profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id),
  name         TEXT,
  avatar_url   TEXT,
  provider     TEXT CHECK (provider IN ('google', 'email')),
  level        INT DEFAULT 1,
  total_score  INT DEFAULT 0,
  streak       INT DEFAULT 0,
  last_quiz_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Questions
CREATE TABLE questions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category     TEXT CHECK (category IN ('budaya','geografi','ekonomi','sejarah','kuliner')),
  difficulty   TEXT CHECK (difficulty IN ('easy','medium','hard')),
  province_id  TEXT,
  question     TEXT NOT NULL,
  image_url    TEXT,
  options      JSONB NOT NULL,
  correct      INT NOT NULL,
  explanation  TEXT,
  points       INT DEFAULT 10,
  time_limit   INT DEFAULT 30,
  is_active    BOOLEAN DEFAULT TRUE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz Rooms
CREATE TABLE quiz_rooms (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code    VARCHAR(6) UNIQUE NOT NULL,
  host_id      UUID REFERENCES profiles(id),
  is_active    BOOLEAN DEFAULT TRUE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  expires_at   TIMESTAMPTZ DEFAULT (CURRENT_DATE + INTERVAL '1 day')
);

-- Room Participants
CREATE TABLE room_participants (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id      UUID REFERENCES quiz_rooms(id) ON DELETE CASCADE,
  user_id      UUID REFERENCES profiles(id),
  total_score  INT DEFAULT 0,
  joined_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz Sessions
CREATE TABLE quiz_sessions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES profiles(id),
  room_id      UUID REFERENCES quiz_rooms(id),
  mode         TEXT,
  category     TEXT,
  score        INT DEFAULT 0,
  total_questions INT,
  correct_count   INT DEFAULT 0,
  time_taken   INT,
  completed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz Answers
CREATE TABLE quiz_answers (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id   UUID REFERENCES quiz_sessions(id),
  question_id  UUID REFERENCES questions(id),
  user_answer  INT,
  is_correct   BOOLEAN,
  time_spent   INT,
  answered_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Badges
CREATE TABLE badges (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES profiles(id),
  badge_slug   TEXT,
  earned_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Leaderboard
CREATE VIEW leaderboard AS
SELECT
  p.id, p.name, p.avatar_url, p.level, p.total_score,
  COUNT(qs.id) AS quizzes_taken,
  RANK() OVER (ORDER BY p.total_score DESC) AS rank
FROM profiles p
LEFT JOIN quiz_sessions qs ON qs.user_id = p.id
GROUP BY p.id
ORDER BY p.total_score DESC
LIMIT 100;

-- Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_own_profile" ON profiles USING (auth.uid() = id);

ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_own_sessions" ON quiz_sessions USING (auth.uid() = user_id);

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "authenticated_read_questions" ON questions FOR SELECT USING (auth.role() = 'authenticated');
