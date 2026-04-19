# 📋 Issue Planning — Jelajah Budaya Nusantara
**Branch:** `react-version`  
**Stack:** React + Vite + TypeScript + Tailwind CSS  
**Date:** 2026-04-19

---

## Issue #1 — Perbaikan Sistem Transisi Halaman
**Priority:** High  
**Label:** `enhancement`, `ui/ux`

### Masalah Saat Ini
Transisi antar halaman menggunakan `CloudTransition.tsx` dengan animasi awan kiri-kanan (`motion/react`). Transisi terasa berat (22 elemen cloud) dan tidak smooth di perangkat mid-range.

### Referensi
Repositori [mohitvirli/mohitvirli.github.io](https://github.com/mohitvirli/mohitvirli.github.io) menggunakan stack:
- **GSAP** untuk orchestrasi timeline animasi
- **React-three-fiber + DREI** untuk efek 3D
- **Zustand** untuk state management transisi global

### Solusi yang Direkomendasikan
Mengganti sistem transisi dengan pendekatan **GSAP-based timeline transition** yang lebih smooth:

#### Teknik Transisi Baru (GSAP + Framer Motion Hybrid)
```
Halaman A → [Screen wipe / morphing panel] → Halaman B
```

**Opsi A — Vertical Wipe dengan GSAP (Rekomendasi)**
- Saat navigasi: panel gelap/gradient slide dari bawah ke atas (masuk)
- Setelah route berubah: panel slide keluar dari atas ke bawah
- Durasi: 600-800ms total, easing: `power2.inOut`
- Library: `gsap` + `@gsap/react`

**Opsi B — Morphing Shape Transition**
- SVG/div yang berubah bentuk (clip-path morphing) saat berpindah halaman
- Inspired by: efek portal/reveal pada mohitvirli.github.io

#### File yang Perlu Diubah
| File | Aksi |
|------|------|
| `src/app/components/CloudTransition.tsx` | Refactor / Ganti total |
| `src/app/components/Layout.tsx` | Update hook transisi |
| `src/app/routes.ts` | Tambah transition context |
| `package.json` | Tambah dependency `gsap`, `@gsap/react` |

#### Dependencies Baru
```bash
npm install gsap @gsap/react
```

---

## Issue #2 — Ekspansi Data: 5 Pulau → 38 Provinsi
**Priority:** High  
**Label:** `data`, `feature`, `content`

### Masalah Saat Ini
Data hanya mencakup 6 pulau besar (`island-data.ts`, 264 baris):
- Sumatra, Jawa, Kalimantan, Sulawesi, Bali, Papua

### Target
Ekspansi ke **38 Provinsi Indonesia** dengan data per provinsi:

#### Struktur Data Baru (`ProvinceData`)
```typescript
export interface ProvinceData {
  id: string;               // "aceh", "sumatera_utara", dst
  name: string;             // "Aceh"
  island: string;           // "sumatra" — untuk grouping
  capital: string;          // "Banda Aceh"
  region: string;           // "Sumatera"
  description: string;
  heroImage: string;
  mapPosition: {            // posisi pada peta SVG Indonesia
    top: string;
    left: string;
    width: string;
    height: string;
  };
  culture: CultureInfo[];   // tarian, kuliner, pakaian, musik
  facts: {                  // fakta unik
    population: string;
    area: string;
    uniqueFact: string;
    established: string;
  };
  geography: {
    type: "coastal" | "inland" | "island";
    landmarks: string[];
  };
}
```

#### Daftar 38 Provinsi yang Perlu Ditambahkan
**Sumatera (10 provinsi):**
Aceh, Sumatera Utara, Sumatera Barat, Riau, Kepulauan Riau,
Jambi, Bengkulu, Sumatera Selatan, Kepulauan Bangka Belitung, Lampung

**Jawa (6 provinsi):**
Banten, DKI Jakarta, Jawa Barat, Jawa Tengah, DI Yogyakarta, Jawa Timur

**Kalimantan (5 provinsi):**
Kalimantan Barat, Kalimantan Tengah, Kalimantan Selatan,
Kalimantan Timur, Kalimantan Utara

**Sulawesi (6 provinsi):**
Sulawesi Utara, Gorontalo, Sulawesi Tengah,
Sulawesi Barat, Sulawesi Selatan, Sulawesi Tenggara

**Kepulauan Nusa Tenggara (3 provinsi):**
Bali, Nusa Tenggara Barat, Nusa Tenggara Timur

**Maluku (2 provinsi):**
Maluku, Maluku Utara

**Papua (4 provinsi):**
Papua Barat Daya, Papua Barat, Papua Tengah,
Papua Pegunungan, Papua Selatan, Papua

> **Catatan:** 4 provinsi Papua baru hasil pemekaran 2022 perlu dimasukkan.

#### Pendekatan Data
- File `island-data.ts` → split menjadi `province-data/[region].ts` per wilayah
- Buat `index.ts` sebagai aggregator:
  ```
  src/app/data/
  ├── sumatera.ts
  ├── jawa.ts
  ├── kalimantan.ts
  ├── sulawesi.ts
  ├── nusa-tenggara.ts
  ├── maluku.ts
  ├── papua.ts
  └── index.ts
  ```
- Peta Indonesia diupgrade dari 6 clickable zone → 38 clickable zone (SVG path per provinsi)

#### Sumber Data Referensi
- BPS (Badan Pusat Statistik): `bps.go.id`
- Kemendikbud API: data budaya
- Gambar: Unsplash dengan query per provinsi

---

## Issue #3 — Fitur Quiz Budaya Indonesia (Quizizz-style)
**Priority:** Medium  
**Label:** `feature`, `gamification`

### Deskripsi
Menambahkan fitur kuis interaktif dalam website seperti Quizizz, mencakup topik:
- Budaya & Tradisi
- Geografi Indonesia
- Ekonomi & Sumber Daya
- Sejarah Nusantara
- Kuliner Daerah

### Desain Sistem Quiz

#### Mode Quiz
| Mode | Deskripsi |
|------|-----------|
| **Quick Quiz** | 10 soal acak, timer 30 detik/soal |
| **Province Quiz** | Soal khusus per provinsi/pulau |
| **Challenge Mode** | Soal bertingkat kesulitan (Easy/Medium/Hard) |
| **Daily Quiz** | 5 soal baru setiap hari |
| **Classroom Mode** | Bersaing dengan teman satu kelas via Kode Server/Room. Papan skor akan di-reset (clear) setiap tengah malam. |

#### Struktur Data Soal
```typescript
export interface QuizQuestion {
  id: string;
  category: "budaya" | "geografi" | "ekonomi" | "sejarah" | "kuliner";
  difficulty: "easy" | "medium" | "hard";
  province?: string;           // opsional, soal terkait provinsi tertentu
  question: string;
  image?: string;              // gambar pendukung soal
  options: string[];           // 4 pilihan jawaban
  correctAnswer: number;       // index 0-3
  explanation: string;         // penjelasan setelah menjawab
  points: number;              // 10 (easy) / 20 (medium) / 30 (hard)
  timeLimit: number;           // dalam detik
}
```

#### UI/UX Quiz Flow
```
[Halaman Quiz Lobby]
  ↓ pilih kategori/mode
[Countdown 3-2-1]
  ↓
[Soal + Timer bar]
  → A / B / C / D
  ↓ jawab
[Hasil + Poin + Penjelasan]
  ↓ next soal
[Layar Hasil Akhir]
  → Skor, Badge, Leaderboard, Share
```

#### Komponen yang Dibuat
```
src/app/components/quiz/
├── QuizLobby.tsx          — halaman pilih mode quiz
├── QuizQuestion.tsx       — tampilan soal + timer
├── QuizResult.tsx         — hasil akhir + badge
├── QuizProgress.tsx       — progress bar soal
├── QuizLeaderboard.tsx    — papan peringkat
└── QuizBadge.tsx          — sistem badge pencapaian
```

#### Gamifikasi
- **Poin & Level:** XP per soal benar → level up
- **Badge/Achievement:** Contoh: "Ahli Budaya Jawa", "Master Papua"
- **Streak:** Bonus poin quiz berturut-turut
- **Leaderboard Global:** Top 10 user dengan poin terbanyak
- **Daily Challenge:** Reset tiap tengah malam WIB
- **Classroom Competition:** Fitur *Private Room* menggunakan kode server 6 digit agar teman sekelas bisa bergabung. Memiliki Leaderboard *real-time* tersendiri untuk ruang kelas tersebut yang otomatis kedaluwarsa/reset di tengah malam WIB.

---

## Issue #4 — Autentikasi User (Google OAuth + Email)
**Priority:** High  
**Label:** `auth`, `security`, `feature`

### Deskripsi
Fitur Quiz hanya dapat diakses oleh user yang sudah login. Mendukung dua metode:
1. **Google Sign-In** (OAuth 2.0) — one-click login
2. **Email + Password** — register & login manual

### Arsitektur Autentikasi

#### Flow Autentikasi
```
[Klik "Mulai Quiz"]
  ↓ cek auth state
[User sudah login?]
  ├── Ya → langsung ke Quiz Lobby
  └── Tidak → Modal Auth muncul
              ├── [Sign in with Google] → OAuth flow
              └── [Login/Register Email]
```

#### Protected Route Pattern
```typescript
// src/app/components/ProtectedRoute.tsx
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <AuthModal redirectTo="/quiz" />;
  }
  return children;
};
```

#### Service yang Digunakan
**Rekomendasi: Supabase Auth**
- Built-in Google OAuth
- Built-in Email/Password
- JWT tokens otomatis
- Row Level Security (RLS) untuk proteksi data quiz user

#### User Profile Data
```typescript
interface UserProfile {
  id: string;              // UUID dari Supabase Auth
  email: string;
  name: string;
  avatar_url: string;
  provider: "google" | "email";
  created_at: string;
  quiz_stats: {
    total_score: number;
    quizzes_taken: number;
    correct_answers: number;
    current_streak: number;
    badges: string[];
    level: number;
  };
}
```

#### Komponen Auth
```
src/app/components/auth/
├── AuthModal.tsx          — modal login/register
├── GoogleSignIn.tsx       — tombol Google OAuth
├── EmailAuthForm.tsx      — form email & password
├── UserAvatar.tsx         — avatar di navbar
└── useAuth.ts             — custom hook auth state
```

---

## Issue #5 — Rancangan Arsitektur Sistem & Database
**Priority:** Medium  
**Label:** `architecture`, `database`, `backend`

### Arsitektur Sistem Keseluruhan

```
┌─────────────────────────────────────────────────────┐
│                  FRONTEND (React + Vite)             │
│  HomePage → ProvinceMap → ProvinceDetail → Quiz      │
│  Auth: Supabase JS Client (OAuth + JWT)              │
└────────────────────────┬────────────────────────────┘
                         │ HTTPS / REST / Realtime
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
   ┌─────────────┐ ┌──────────┐ ┌────────────────┐
   │  Supabase   │ │  Static  │ │  External APIs  │
   │ (Database + │ │  Assets  │ │  (Maps, Images) │
   │    Auth)    │ │  (CDN)   │ │                 │
   └─────────────┘ └──────────┘ └────────────────┘
```

### Database: Supabase (PostgreSQL)

**Kenapa Supabase?**
| Kriteria | Supabase | Firebase | PlanetScale |
|----------|----------|----------|-------------|
| SQL / NoSQL | SQL ✅ | NoSQL | SQL |
| Auth built-in | ✅ | ✅ | ❌ |
| Google OAuth | ✅ | ✅ | ❌ |
| Realtime | ✅ | ✅ | ❌ |
| Free tier | 500MB DB | 1GB | 5GB |
| Open Source | ✅ | ❌ | ❌ |
| Row Level Security | ✅ | Rules | ❌ |

**Kesimpulan:** Supabase paling cocok karena SQL (structured data quiz), built-in Auth dengan Google OAuth, dan RLS untuk keamanan per-user.

### Schema Database

#### Tabel `profiles`
```sql
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
```

#### Tabel `questions`
```sql
CREATE TABLE questions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category     TEXT CHECK (category IN ('budaya','geografi','ekonomi','sejarah','kuliner')),
  difficulty   TEXT CHECK (difficulty IN ('easy','medium','hard')),
  province_id  TEXT,          -- FK ke data provinsi
  question     TEXT NOT NULL,
  image_url    TEXT,
  options      JSONB NOT NULL, -- ["A","B","C","D"]
  correct      INT NOT NULL,   -- index 0-3
  explanation  TEXT,
  points       INT DEFAULT 10,
  time_limit   INT DEFAULT 30, -- detik
  is_active    BOOLEAN DEFAULT TRUE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);
```

#### Tabel `quiz_rooms` (Sistem Kelas / Multiplayer)
```sql
CREATE TABLE quiz_rooms (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_code    VARCHAR(6) UNIQUE NOT NULL,    -- Kode server/room (contoh: "X7B9TQ")
  host_id      UUID REFERENCES profiles(id),  -- User yang membuat/host kelas
  is_active    BOOLEAN DEFAULT TRUE,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  expires_at   TIMESTAMPTZ DEFAULT (CURRENT_DATE + INTERVAL '1 day') -- Expire/reset tengah malam
);
```

#### Tabel `room_participants`
```sql
CREATE TABLE room_participants (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id      UUID REFERENCES quiz_rooms(id) ON DELETE CASCADE,
  user_id      UUID REFERENCES profiles(id),
  total_score  INT DEFAULT 0,
  joined_at    TIMESTAMPTZ DEFAULT NOW()
);
```

#### Tabel `quiz_sessions`
```sql
CREATE TABLE quiz_sessions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES profiles(id),
  room_id      UUID REFERENCES quiz_rooms(id), -- Jika main di Classroom mode
  mode         TEXT,           -- 'quick','province','challenge','daily','classroom'
  category     TEXT,
  score        INT DEFAULT 0,
  total_questions INT,
  correct_count   INT DEFAULT 0,
  time_taken   INT,            -- detik total
  completed_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);
```

#### Tabel `quiz_answers`
```sql
CREATE TABLE quiz_answers (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id   UUID REFERENCES quiz_sessions(id),
  question_id  UUID REFERENCES questions(id),
  user_answer  INT,            -- index pilihan user
  is_correct   BOOLEAN,
  time_spent   INT,            -- detik untuk jawab soal ini
  answered_at  TIMESTAMPTZ DEFAULT NOW()
);
```

#### Tabel `badges`
```sql
CREATE TABLE badges (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES profiles(id),
  badge_slug   TEXT,          -- "ahli_jawa", "master_papua"
  earned_at    TIMESTAMPTZ DEFAULT NOW()
);
```

#### Tabel `leaderboard` (View)
```sql
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
```

### Row Level Security (RLS)
```sql
-- User hanya bisa baca/tulis data miliknya
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_own_profile" ON profiles
  USING (auth.uid() = id);

ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_own_sessions" ON quiz_sessions
  USING (auth.uid() = user_id);

-- Questions bisa dibaca semua (auth required)
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "authenticated_read_questions" ON questions
  FOR SELECT USING (auth.role() = 'authenticated');
```

---

## Issue #6 — Daftar API yang Diperlukan
**Priority:** Medium  
**Label:** `api`, `integration`

### A. Supabase API (Internal Backend)

| Endpoint | Method | Auth | Deskripsi |
|----------|--------|------|-----------|
| `/auth/v1/token` | POST | - | Login email/password |
| `/auth/v1/authorize?provider=google` | GET | - | Google OAuth redirect |
| `/auth/v1/user` | GET | JWT | Get current user |
| `/auth/v1/logout` | POST | JWT | Logout user |
| `/rest/v1/profiles?id=eq.{uid}` | GET/PATCH | JWT | Read/update user profile |
| `/rest/v1/questions?category=eq.{cat}` | GET | JWT | Ambil soal per kategori |
| `/rest/v1/questions?difficulty=eq.{d}` | GET | JWT | Ambil soal per difficulty |
| `/rest/v1/quiz_sessions` | POST | JWT | Simpan sesi quiz baru |
| `/rest/v1/quiz_answers` | POST | JWT | Simpan jawaban per soal |
| `/rest/v1/leaderboard` | GET | JWT | Ambil top 100 leaderboard |
| `/rest/v1/badges?user_id=eq.{uid}` | GET | JWT | Ambil badge user |
| `/realtime/v1/...` | WS | JWT | Realtime leaderboard update |

### B. External API — Peta & Geografi

| API | Kegunaan | Free Tier | Endpoint |
|-----|----------|-----------|----------|
| **OpenStreetMap** (Nominatim) | Geocoding provinsi | Unlimited | `nominatim.openstreetmap.org/search` |
| **GeoJSON Indonesia** | SVG map data provinsi | Free | `github.com/superpikar/indonesia-geojson` |
| **Wikipedia REST API** | Deskripsi auto provinsi | Free | `id.wikipedia.org/api/rest_v1/page/summary/{provinsi}` |

### C. External API — Konten & Media

| API | Kegunaan | Free Tier |
|-----|----------|-----------|
| **Unsplash API** | Gambar hero per provinsi | 50 req/jam |
| **Pixabay API** | Fallback gambar | 500 req/jam |
| **YouTube Data API v3** | Video budaya per daerah | 10.000 unit/hari |

### D. Autentikasi

| API | Deskripsi | Konfigurasi |
|-----|-----------|-------------|
| **Google OAuth 2.0** | Sign in with Google | Google Cloud Console → OAuth Client ID |
| **Supabase Auth** | JWT management | Supabase Dashboard → Auth Settings |

### E. Analytics (Opsional)

| API | Kegunaan |
|-----|----------|
| **Vercel Analytics** | Page views, user journey |
| **Sentry** | Error tracking frontend |

---

## Urutan Implementasi yang Direkomendasikan

```
Phase 1 (Foundation)
├── [#4] Setup Supabase + Google Auth
└── [#5] Buat schema database & RLS

Phase 2 (Content)
├── [#2] Ekspansi data 38 provinsi
└── [#2] Update peta SVG per provinsi

Phase 3 (Feature)
├── [#3] Sistem Quiz (soal + UI)
└── [#3] Gamifikasi (badge, leaderboard)

Phase 4 (Polish)
├── [#1] Upgrade sistem transisi (GSAP)
└── Performance optimization + SEO
```

---

## Environment Variables yang Dibutuhkan

```env
# Supabase
VITE_SUPABASE_URL=https://ndntvvvkutybhkgcypvx.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_ZORPcCFtTisjgzLJLx5OfQ_HEQHAmRT

# Google OAuth (via Supabase)
# Dikonfigurasi di Supabase Dashboard, tidak perlu di .env frontend

# Optional
VITE_UNSPLASH_ACCESS_KEY=xxxx
VITE_YOUTUBE_API_KEY=xxxx
```

---

*Dokumen ini dibuat pada 2026-04-19. Update seiring perkembangan implementasi.*
