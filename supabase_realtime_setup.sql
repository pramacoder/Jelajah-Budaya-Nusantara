-- ====================================================================
-- SCRIPT SETUP: SUPABASE REALTIME UNTUK CLASSROOM MODE
-- ====================================================================

-- Penting: Secara default di Supabase, mendengarkan perubahan (Realtime)
-- dari database tabel tidak aktif. Skrip ini akan mengaktifkannya
-- pada tabel 'quiz_rooms' dan 'room_participants' agar sinkronisasi
-- mode kelas berjalan sempurna (Host / Murid bisa bertukar sinyal).

BEGIN;

-- Aktifkan Realtime untuk kedua tabel kuis tersebut
ALTER PUBLICATION supabase_realtime ADD TABLE quiz_rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE room_participants;

COMMIT;

-- CATATAN TAMBAHAN UNTUK KEAMANAN (Row Level Security - RLS):
-- Pastikan peserta dan host bisa melihat isi tabel ini
-- Hal ini sebenarnya sudah ada di database_schema.sql, namun demi ketegasan:

CREATE POLICY "public_read_quiz_rooms" 
  ON quiz_rooms FOR SELECT USING (true);

CREATE POLICY "public_read_room_participants" 
  ON room_participants FOR SELECT USING (true);

-- Memperbolehkan update status is_active ke false (jika host menyudahi permainan)
CREATE POLICY "host_update_rooms" 
  ON quiz_rooms FOR UPDATE USING (auth.uid() = host_id);
