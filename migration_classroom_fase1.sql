-- =============================================================================
-- MIGRATION: Fase 1 - Classroom Multiplayer Quiz
-- Jalankan script ini di Supabase SQL Editor:
-- https://supabase.com/dashboard/project/ndntvvvkutybhkgcypvx/sql/new
-- =============================================================================

-- 1. Tambah kolom yang hilang di quiz_rooms
--    (status dan current_question_index diperlukan untuk sinkronisasi real-time)
ALTER TABLE quiz_rooms
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'waiting'
    CHECK (status IN ('waiting', 'playing', 'intermission', 'finished')),
  ADD COLUMN IF NOT EXISTS current_question_index INT DEFAULT -1;

-- 2. Tambah kolom guest_name di room_participants
--    (untuk peserta yang tidak login / bermain sebagai tamu)
ALTER TABLE room_participants
  ADD COLUMN IF NOT EXISTS guest_name TEXT;

-- 3. Pastikan RLS mengizinkan operasi yang dibutuhkan
--    (read quiz_rooms tanpa autentikasi untuk join via kode)
ALTER TABLE quiz_rooms ENABLE ROW LEVEL SECURITY;

-- Policy: Siapa saja bisa membaca room yang aktif (untuk join)
DROP POLICY IF EXISTS "public_read_active_rooms" ON quiz_rooms;
CREATE POLICY "public_read_active_rooms" ON quiz_rooms
  FOR SELECT USING (is_active = true);

-- Policy: User yang login bisa membuat room (host)
DROP POLICY IF EXISTS "auth_insert_rooms" ON quiz_rooms;
CREATE POLICY "auth_insert_rooms" ON quiz_rooms
  FOR INSERT WITH CHECK (auth.uid() = host_id);

-- Policy: Host bisa update room miliknya
DROP POLICY IF EXISTS "host_update_room" ON quiz_rooms;
CREATE POLICY "host_update_room" ON quiz_rooms
  FOR UPDATE USING (auth.uid() = host_id);

-- 4. RLS untuk room_participants
ALTER TABLE room_participants ENABLE ROW LEVEL SECURITY;

-- Policy: Siapa saja bisa membaca participants dalam room aktif
DROP POLICY IF EXISTS "public_read_participants" ON room_participants;
CREATE POLICY "public_read_participants" ON room_participants
  FOR SELECT USING (true);

-- Policy: Siapa saja bisa join (insert) sebagai participant
DROP POLICY IF EXISTS "anyone_can_join" ON room_participants;
CREATE POLICY "anyone_can_join" ON room_participants
  FOR INSERT WITH CHECK (true);

-- Policy: Participant bisa update skornya sendiri (atau via service role)
DROP POLICY IF EXISTS "participant_update_score" ON room_participants;
CREATE POLICY "participant_update_score" ON room_participants
  FOR UPDATE USING (true);

-- 5. Enable Realtime untuk kedua tabel
--    (diperlukan oleh subscribeToRoom dan subscribeToParticipants)
ALTER PUBLICATION supabase_realtime ADD TABLE quiz_rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE room_participants;

-- 6. Pastikan profiles bisa di-upsert oleh user yang baru daftar
DROP POLICY IF EXISTS "users_own_profile" ON profiles;
CREATE POLICY "users_own_profile" ON profiles
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
