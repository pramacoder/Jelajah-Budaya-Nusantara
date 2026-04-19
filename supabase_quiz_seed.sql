-- =================================================================================
-- SEED DATA - JELAJAH BUDAYA NUSANTARA QUIZ
-- Gunakan SQL ini di Supabase SQL Editor untuk mengisi tabel `questions`.
-- =================================================================================

INSERT INTO questions (category, difficulty, question, options, correct, explanation, points, time_limit)
VALUES
-- Budaya (Easy)
('budaya', 'easy', 'Tari kecak berasal dari provinsi mana?', '["Jawa Tengah", "Kalimantan Timur", "Bali", "Papua"]'::jsonb, 2, 'Tari Kecak adalah tarian khas Bali yang tidak menggunakan alat musik, melainkan paduan suara "cak" dari puluhan penari pria.', 10, 30),
('budaya', 'easy', 'Alat musik Angklung yang terbuat dari bambu berasal dari provinsi...', '["Jawa Barat", "Jawa Timur", "Sumatera Utara", "Nusa Tenggara Timur"]'::jsonb, 0, 'Angklung adalah alat musik tradisional dari Jawa Barat yang dimainkan dengan cara digoyangkan.', 10, 30),
-- Budaya (Medium)
('budaya', 'medium', 'Senjata tradisional khas suku Bugis-Makassar di Sulawesi Selatan adalah...', '["Mandau", "Badik", "Keris", "Rencong"]'::jsonb, 1, 'Badik adalah senjata tradisional khas masyarakat Sulawesi Selatan (Bugis-Makassar) yang sering diselipkan di pinggang.', 20, 30),
('budaya', 'medium', 'Apa nama rumah adat dari provinsi Sumatera Barat yang memiliki atap melengkung menyerupai tanduk kerbau?', '["Rumah Gadang", "Rumah Limas", "Rumah Joglo", "Honai"]'::jsonb, 0, 'Rumah Gadang adalah rumah adat Minangkabau (Sumatera Barat) dengan atap berbentuk tanduk kerbau (gonjong).', 20, 30),

-- Kuliner (Easy)
('kuliner', 'easy', 'Makanan khas Palembang yang terbuat dari olahan ikan dan tepung sagu, serta disajikan dengan kuah cuka disebut...', '["Otak-otak", "Pempek", "Batagor", "Siomay"]'::jsonb, 1, 'Pempek adalah kuliner khas Sumatera Selatan (Palembang) yang terbuat dari campuran daging ikan (biasanya tenggiri) dan tapioka.', 10, 30),
('kuliner', 'easy', 'Rendang adalah salah satu hidangan terenak di dunia versi CNN. Dari daerah manakah rendang berasal?', '["Aceh", "Riau", "Sumatera Barat", "Bengkulu"]'::jsonb, 2, 'Rendang berasal dari Minangkabau, Sumatera Barat. Hidangan daging sapi bersantan pekat ini sangat tahan lama.', 10, 30),
-- Kuliner (Medium)
('kuliner', 'medium', 'Papeda merupakan makanan pokok khas Papua dan Maluku. Papeda terbuat dari olahan apa?', '["Tepung Beras", "Tepung Kedelai", "Tepung Terigu", "Sari Sagu"]'::jsonb, 3, 'Papeda terbuat dari sari pati pohon sagu yang diolah menjadi bubur lengket transparan.', 20, 30),
('kuliner', 'medium', 'Sup daging khas Makassar berkuah jeroan yang direbus dari cucian beras dinamakan...', '["Coto", "Kaledo", "Pallubasa", "Konro"]'::jsonb, 0, 'Coto Makassar terbuat dari jeroan sapi yang direbus dalam waktu lama, bumbunya diracik khusus menggunakan air tajin (cucian beras).', 20, 30),

-- Geografi (Easy)
('geografi', 'easy', 'Tugu Monas terletak di kota...', '["Bandung", "Jakarta", "Surabaya", "Semarang"]'::jsonb, 1, 'Monumen Nasional atau Monas terletak di jantung ibu kota Jakarta dan menjadi simbol perjuangan rakyat.', 10, 30),
('geografi', 'easy', 'Pulau manakah di Indonesia yang merupakan pulau terbesar?', '["Jawa", "Sumatera", "Kalimantan", "Sulawesi"]'::jsonb, 2, 'Kalimantan (Borneo) adalah pulau terbesar di Indonesia dan terbesar ke-3 di dunia.', 10, 30),
-- Geografi (Medium)
('geografi', 'medium', 'Gunung Rinjani merupakan gunung berapi tertinggi kedua di Indonesia. Gunung ini terletak di provinsi...', '["Bali", "Nusa Tenggara Barat", "Jawa Timur", "Nusa Tenggara Timur"]'::jsonb, 1, 'Gunung Rinjani memiliki danau Segara Anak di kawah puncaknya dan terletak di Pulau Lombok, NTB.', 20, 30),
('geografi', 'medium', 'Raja Ampat adalah surga terumbu karang yang sangat terkenal di dunia. Di manakah letak kepulauan Raja Ampat?', '["Papua Pegunungan", "Papua Tengah", "Papua Barat Daya", "Maluku Utara"]'::jsonb, 2, 'Raja Ampat terletak di sebelah barat bagian Kepala Burung pulau Papua, masuk dalam wilayah administrasi Provinsi Papua Barat Daya.', 20, 30),

-- Sejarah (Hard)
('sejarah', 'hard', 'Prasasti Yupa dari Kerajaan Kutai yang menjadi bukti awal zaman sejarah nusantara ditemukan di provinsi...', '["Kalimantan Timur", "Kalimantan Barat", "Jawa Barat", "Sumatera Selatan"]'::jsonb, 0, 'Prasasti bertuliskan huruf Pallawa peninggalan Kerajaan Kutai Martadipura (Abad ke-5 M) ini ditemukan di Muara Kaman, Kalimantan Timur.', 30, 45),
('sejarah', 'hard', 'Siapakah Pahlawan Nasional wanita dari Maluku yang gigih melawan penjajah Belanda dengan memimpin pasukan ke Hatawano?', '["Cut Nyak Dien", "Martha Christina Tiahahu", "Cut Meutia", "Nyi Ageng Serang"]'::jsonb, 1, 'Martha Christina Tiahahu adalah pahlawan kemerdekaan pejuang tanah Maluku (Pulau Nusalaut) yang wafat pada kapal perang Belanda di usia 18 tahun.', 30, 45),

-- Ekonomi (Hard)
('ekonomi', 'hard', 'Berdasarkan UU Cuka dan Garam kolonial Belanda tempo dulu, Madura dikenal sebagai penghasil komoditas utama berupa?', '["Beras", "Garam", "Kakao", "Teh"]'::jsonb, 1, 'Madura dijuluki Pulau Garam karena posisi geografis pantainya, dan cuacanya yang ideal untuk pembuatan ladang garam terbesar di Indonesia.', 30, 45);

-- Menambahkan data dummy untuk Leaderboard Profile
-- (Opsional: Jika profil pengguna belum ada, lewati blok ini)
