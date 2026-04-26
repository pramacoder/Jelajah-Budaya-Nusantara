# 📖 Manual Book — Jelajah Budaya Nusantara

> Panduan lengkap penggunaan website **Jelajah Budaya Nusantara** — platform edukasi interaktif untuk menjelajahi keanekaragaman budaya Indonesia.

---

## Daftar Isi

1. [Gambaran Umum](#1-gambaran-umum)
2. [Akses & Persyaratan](#2-akses--persyaratan)
3. [Registrasi & Login](#3-registrasi--login)
4. [Halaman Utama (Beranda)](#4-halaman-utama-beranda)
5. [Peta Interaktif Indonesia](#5-peta-interaktif-indonesia)
6. [Halaman Detail Pulau/Provinsi](#6-halaman-detail-pulaupropinsi)
7. [Fitur Kuis](#7-fitur-kuis)
   - 7.1 [Quick Quiz](#71-quick-quiz)
   - 7.2 [Tantangan Harian](#72-tantangan-harian)
   - 7.3 [Kuis Provinsi](#73-kuis-provinsi)
   - 7.4 [Classroom Mode (Multiplayer)](#74-classroom-mode-multiplayer)
8. [Sistem Penilaian & Skor](#8-sistem-penilaian--skor)
9. [Papan Peringkat & Badge](#9-papan-peringkat--badge)
10. [Efek Suara & Pengalaman Audio](#10-efek-suara--pengalaman-audio)
11. [Panduan untuk Guru/Host](#11-panduan-untuk-guruhost)
12. [Panduan untuk Siswa/Guest](#12-panduan-untuk-siswaGuest)
13. [Troubleshooting](#13-troubleshooting)

---

## 1. Gambaran Umum

**Jelajah Budaya Nusantara** adalah platform edukasi berbasis web yang memadukan eksplorasi budaya Indonesia dengan kuis interaktif bergaya Kahoot. Pengguna dapat:

- Menjelajahi **6 pulau utama** dan **24+ budaya** Nusantara secara visual
- Mempelajari tarian, kuliner, pakaian adat, dan musik tradisional
- Mengikuti kuis solo maupun **multiplayer real-time** bersama teman/kelas
- Bersaing di papan peringkat dan mengumpulkan badge prestasi

---

## 2. Akses & Persyaratan

| Item        | Keterangan                                                   |
| ----------- | ------------------------------------------------------------ |
| **URL**     | `http://localhost:5173` (dev)                                |
| **Browser** | Chrome, Firefox, Edge versi terbaru                          |
| **Koneksi** | Internet stabil (diperlukan untuk fitur kuis & realtime)     |
| **Akun**    | Opsional untuk eksplorasi; **wajib** untuk membuat Classroom |

---

## 3. Registrasi & Login

### 3.1 Mendaftar dengan Email

1. Klik ikon avatar **"TE"** di pojok kanan atas navbar
2. Pilih tab **"Daftar"** pada modal yang muncul
3. Isi **Email** dan **Password** (minimal 6 karakter)
4. Klik **"Buat Akun"**
5. Akun langsung aktif dan Anda otomatis masuk

### 3.2 Masuk dengan Google

1. Klik ikon avatar di navbar → modal login muncul
2. Klik tombol **"Lanjutkan dengan Google"**
3. Pilih akun Google Anda
4. Anda akan diarahkan kembali ke website secara otomatis

### 3.3 Keluar (Logout)

1. Klik avatar profil di pojok kanan atas
2. Klik **"Keluar"**

> **Catatan:** Pengguna yang belum login tetap bisa mengeksplorasi peta dan mengikuti kuis sebagai tamu, namun skor tidak tersimpan.

---

## 4. Halaman Utama (Beranda)

Setelah membuka website, Anda akan disambut dengan **Beranda** yang menampilkan:

| Elemen                          | Fungsi                                                       |
| ------------------------------- | ------------------------------------------------------------ |
| Animasi globe bumi              | Visualisasi interaktif kepulauan Indonesia                   |
| Tombol **"Mulai Perjalanan ✦"** | Menuju Peta Interaktif Indonesia                             |
| Tombol **"Mainkan Kuis 🎮"**    | Langsung ke halaman Kuis                                     |
| Kartu statistik                 | Menampilkan 6 Pulau Utama, 24+ Budaya, Pengalaman Interaktif |

**Cara navigasi:**

- Klik **"Mulai Perjalanan"** → halaman Peta Indonesia
- Klik **"Mainkan Kuis"** → halaman Kuis & Classroom

---

## 5. Peta Interaktif Indonesia

Halaman `/indonesia` menampilkan **peta SVG interaktif** seluruh Indonesia.

### Cara Menggunakan Peta

1. **Arahkan kursor** ke salah satu pulau/wilayah
2. Pulau akan **bersinar dan sedikit membesar** (efek hover)
3. Audio intro singkat wilayah akan diputar otomatis
4. **Klik pulau** untuk masuk ke halaman detail

### Wilayah yang Tersedia

| Wilayah                 | Keterangan                        |
| ----------------------- | --------------------------------- |
| 🏝️ Sumatera             | Budaya Melayu, Batak, Minangkabau |
| 🏛️ Jawa                 | Batik, Wayang, Keraton            |
| 🌺 Bali & Nusa Tenggara | Tarian Kecak, Tenun               |
| 🌳 Kalimantan           | Dayak, Mandau                     |
| 🐚 Sulawesi             | Toraja, Bugis                     |
| 🦜 Papua                | Koteka, Tifa                      |

---

## 6. Halaman Detail Pulau/Provinsi

Setiap pulau memiliki halaman detail di `/island/:id` yang berisi:

### 6.1 Informasi Utama

- **Nama & Region** wilayah
- **Populasi** dan **Luas Wilayah**
- **Ibu Kota** dan **Tahun Berdiri**
- Deskripsi singkat wilayah
- **Cuplikan Wikipedia** (diambil otomatis dari Wikipedia Indonesia)

### 6.2 Peta Lokasi Wilayah

- Peta mini interaktif yang **menyorot wilayah tersebut** (warna emas)
- Wilayah lain ditampilkan transparan sebagai konteks

### 6.3 Kartu Kekayaan Budaya

Setiap wilayah menampilkan 4 kartu budaya berdasarkan kategori:

| Ikon | Kategori               |
| ---- | ---------------------- |
| 🎵   | Musik Tradisional      |
| 🍽️   | Kuliner Khas           |
| 👘   | Pakaian Adat           |
| 🎧   | Kesenian / Pertunjukan |

**Cara membuka kartu budaya:**

1. Klik salah satu kartu budaya
2. Pop-up modal akan muncul dengan deskripsi lengkap
3. Klik tombol **✕** atau area di luar modal untuk menutup

**Tombol "Peta Indonesia"** di pojok kiri atas untuk kembali ke peta.

---

## 7. Fitur Kuis

Halaman kuis dapat diakses via tombol **"Mainkan Kuis"** dari beranda atau navbar.

### 7.1 Quick Quiz

**Mode:** Solo | **Soal:** 10 soal acak | **Waktu:** 30 detik/soal

1. Klik kartu **"Quick Quiz"** di halaman kuis
2. Soal pilihan ganda tampil satu per satu
3. Pilih salah satu dari 4 jawaban sebelum waktu habis
4. Lihat **hasil akhir** dengan skor, akurasi, dan waktu tempuh

### 7.2 Tantangan Harian

**Mode:** Solo | **Soal:** 5 soal baru setiap hari | **Bonus:** Streak harian

1. Klik kartu **"Tantangan Harian"**
2. Selesaikan 5 soal yang berganti setiap hari
3. Streak bertambah jika Anda bermain tiap hari berturut-turut

### 7.3 Kuis Provinsi

**Mode:** Solo | **Soal:** Spesifik per daerah/provinsi

1. Klik kartu **"Kuis Provinsi"**
2. Pilih provinsi yang ingin diuji
3. Jawab soal-soal budaya khusus provinsi tersebut

### 7.4 Classroom Mode (Multiplayer)

Mode kompetitif **real-time** bergaya Kahoot. Terdapat dua peran:

- **Host** — Guru/moderator yang membuat dan mengendalikan sesi kuis
- **Guest/Peserta** — Siswa yang bergabung dengan kode ruangan

---

## 8. Sistem Penilaian & Skor

### Rumus Skor (Classroom Mode)

```
Skor = 1000 × (Waktu Tersisa / Total Waktu)
Minimum Skor = 500 XP (jika menjawab benar namun lambat)
```

| Kondisi                      | Skor         |
| ---------------------------- | ------------ |
| Jawaban benar + sangat cepat | ~900–1000 XP |
| Jawaban benar + normal       | ~500–800 XP  |
| Jawaban salah                | 0 XP         |
| Tidak menjawab (waktu habis) | 0 XP         |

### Hasil Kuis Solo (QuizResult)

| Persentase Benar | Predikat         |
| ---------------- | ---------------- |
| ≥ 90%            | 🏆 Sang Master!  |
| ≥ 70%            | 🌟 Luar Biasa!   |
| ≥ 50%            | 👍 Cukup Bagus   |
| < 50%            | 💪 Perlu Latihan |

---

## 9. Papan Peringkat & Badge

### Papan Peringkat Global

- Terletak di bagian bawah halaman kuis
- Menampilkan peringkat semua pengguna berdasarkan total skor
- Diperbarui secara otomatis setiap sesi selesai

### Koleksi Badge

| Badge         | Cara Mendapatkan                |
| ------------- | ------------------------------- |
| ⭐ Pemula     | Menyelesaikan kuis perdana      |
| 🏅 Ahli Jawa  | Menjawab sempurna soal Jawa     |
| 🎯 Geografi   | Menjawab 50 soal geografi       |
| ⚡ Streak Api | 10 jawaban benar berturut-turut |

---

## 10. Efek Suara & Pengalaman Audio

Website dilengkapi efek suara untuk meningkatkan pengalaman belajar:

| Momen                         | Suara                                         |
| ----------------------------- | --------------------------------------------- |
| Jawaban **benar** (Classroom) | `correct.mp3` — nada positif                  |
| Jawaban **salah** (Classroom) | `Incorrect.mp3` — nada negatif                |
| Waktu habis / Intermission    | `correctstreak5.mp3` — fanfare singkat        |
| Kuis selesai / Podium         | `diatas90.mp3` — fanfare meriah               |
| Hasil solo ≥ 90%              | `diatas90.mp3` + konfeti                      |
| Hasil solo < 90%              | `dibawah90.mp3`                               |
| Hover pulau di peta           | Audio intro wilayah (misal: `jawa_hover.mp3`) |

> **Catatan:** Audio diputar otomatis. Pastikan volume perangkat Anda aktif.

---

## 11. Panduan untuk Guru/Host

### Langkah Membuat Sesi Kuis Classroom

**Persyaratan:** Akun terdaftar (Login wajib untuk Host)

#### Step 1 — Buka Halaman Kuis

Klik **"Mainkan Kuis"** dari beranda atau navbar.

#### Step 2 — Buat Room Baru

Klik tombol **"⚔ Buat Room Baru (Host)"** di panel Classroom Mode.

> Sistem akan otomatis membuat **kode ruangan 6 digit** (contoh: `FGQOUS`).

#### Step 3 — Bagikan Kode ke Siswa

- Kode ruangan tampil besar di layar Host
- Sampaikan kode kepada siswa/peserta
- Tunggu hingga siswa bergabung (nama mereka akan muncul di layar)

#### Step 4 — Mulai Kuis

Setelah semua siswa bergabung, klik **"▶ Mulai Kuis Sekarang"**.

> Tombol ini hanya aktif jika **minimal 1 peserta** sudah bergabung.

#### Step 5 — Kendalikan Alur Soal

- Layar Host menampilkan soal + timer countdown
- Setelah timer habis → layar beralih ke **Klasemen Sementara**
- Klik **"Soal 2 →"** untuk melanjutkan ke soal berikutnya

#### Step 6 — Lihat Hasil Akhir

Setelah semua soal selesai, klik **"🏆 Lihat Hasil Akhir"**.

Layar podium menampilkan:

- 🥇 Juara 1 — animasi turun dari atas + mahkota bergoyang
- 🥈 Juara 2 — animasi dari kiri
- 🥉 Juara 3 — animasi dari kanan
- Peserta lainnya dalam daftar di bawah podium
- Konfeti otomatis + musik fanfare

#### Step 7 — Tutup Ruangan

Klik **"Tutup Ruangan"** untuk mengakhiri sesi.

---

### Tampilan Host saat Kuis Berlangsung

```
┌─────────────────────────────────┐
│  SOAL 3/10           ⏱ 28s      │
├─────────────────────────────────┤
│                                 │
│   [Teks Pertanyaan]             │
│                                 │
│  ┌──────────┐  ┌──────────┐    │
│  │  Opsi A  │  │  Opsi B  │    │
│  └──────────┘  └──────────┘    │
│  ┌──────────┐  ┌──────────┐    │
│  │  Opsi C  │  │  Opsi D  │    │
│  └──────────┘  └──────────┘    │
│                                 │
│  "Menunggu peserta menjawab..." │
└─────────────────────────────────┘
```

### Tampilan Intermission (Klasemen Sementara)

```
┌─────────────────────────────────┐
│ 🏆 Klasemen Sementara           │
│                   Soal 3/10     │
├─────────────────────────────────┤
│ 🥇 Budi              1.850 ↑2  │
│ 🥈 Siti              1.700      │
│ 🥉 Andi              1.500      │
│    #4 Rudi           1.200      │
│    #5 Dewi             800      │
├─────────────────────────────────┤
│       [ Soal 4 → ]             │
└─────────────────────────────────┘
```

**Indikator delta peringkat:**

- `↑2` — naik 2 peringkat (hijau)
- `↓1` — turun 1 peringkat (merah)

---

## 12. Panduan untuk Siswa/Guest

### Cara Bergabung ke Sesi Kuis

#### Option A — Tanpa Akun (sebagai Tamu)

1. Buka website → klik **"Mainkan Kuis"**
2. Di panel Classroom Mode, isi **Nama Panggilan** (3–15 karakter)
3. Masukkan **Kode 6 Digit** yang diberikan guru
4. Klik **"Gabung →"**

#### Option B — Dengan Akun (Login)

1. Login terlebih dahulu
2. Di panel Classroom Mode, langsung masukkan **Kode 6 Digit**
3. Klik **"Gabung →"** (nama dari akun otomatis digunakan)

### Tampilan Saat Menunggu

```
        ⏳ (animasi loading)

    Kamu sudah masuk!
  Menunggu Host memulai kuis...

      Bermain sebagai:
         [Nama Kamu]
```

### Tampilan Saat Menjawab Soal

```
┌──────────────────────────────────┐
│ Soal 1/10      ⚡ 750 XP   ⏱24  │
│ ─────────────────────────────── │
│                                  │
│   [Teks Pertanyaan]              │
│                                  │
│  ┌────────────┐ ┌─────────────┐  │
│  │  ▲  Beras  │ │  ◆  Garam  │  │
│  └────────────┘ └─────────────┘  │
│  ┌────────────┐ ┌─────────────┐  │
│  │  ●  Kakao  │ │  ■  Teh    │  │
│  └────────────┘ └─────────────┘  │
└──────────────────────────────────┘
```

**Keterangan tombol:**

- **▲ Merah** = Opsi A
- **◆ Biru** = Opsi B
- **● Kuning/Amber** = Opsi C
- **■ Hijau** = Opsi D

**Timer bulat** di pojok kanan atas menunjukkan waktu tersisa. Berubah merah dan berkedip saat ≤5 detik.

> ⚠️ **Penting:** Jawab secepat mungkin! Semakin cepat menjawab benar, semakin besar XP yang diperoleh.

### Tampilan Setelah Menjawab

**Jawaban Benar:**

```
    ✅

  Benar! 🎉

  ⚡ +711 XP

─────────────────────
🏆 Nama Kamu       #1
─────────────────────
🥇 Nama Kamu      711
🥈 Teman A        650
🥉 Teman B        500

  Menunggu soal selanjutnya...
```

**Jawaban Salah:**

```
    ✗

  Salah!

  Jawaban benar: Garam

─────────────────────
Klasemen Sementara
🥇 Teman A        711
🥈 Nama Kamu  #2  500
...
```

**Waktu Habis (tidak sempat menjawab):**

```
    ⏰

  Waktu Habis!

  Jawaban benar: Garam
```

### Tampilan Layar Selesai (Guest)

```
      🏆 (atau 🥈/🥉 tergantung peringkat)

    Kuis Selesai!

      Peringkat kamu
          #2
       1,350 XP

    [ Keluar Ruangan ]
```

---

## 13. Troubleshooting

### ❌ "Gagal membuat ruangan"

**Penyebab:** Belum login atau koneksi internet bermasalah.
**Solusi:** Pastikan Anda sudah login sebelum klik "Buat Room Baru (Host)".

### ❌ "Ruangan tidak ditemukan atau sudah ditutup"

**Penyebab:** Kode ruangan salah atau sesi sudah berakhir.
**Solusi:** Minta kode yang benar dari guru/Host. Pastikan kode 6 digit ditulis kapital semua.

### ❌ "Kuis sudah dimulai, tidak bisa bergabung"

**Penyebab:** Kuis sudah dalam status `playing`.
**Solusi:** Bergabunglah sebelum Host menekan "Mulai Kuis Sekarang".

### ❌ Layar Guest tidak berubah saat Host mulai

**Penyebab:** Koneksi Supabase Realtime terputus.
**Solusi:** Refresh halaman (F5) dan masuk ulang dengan kode yang sama.

### ❌ Audio tidak terdengar

**Penyebab:** Browser memblokir autoplay audio.
**Solusi:** Klik di mana saja di halaman terlebih dahulu (interaksi user diperlukan browser untuk mengizinkan audio).

### ❌ Peta tidak muncul / loading lama

**Penyebab:** File `indonesia.json` besar, koneksi lambat.
**Solusi:** Tunggu beberapa detik. Jika tetap tidak muncul, refresh halaman.

---

## Informasi Teknis

| Item            | Detail                                 |
| --------------- | -------------------------------------- |
| **Framework**   | React + Vite (TypeScript)              |
| **Database**    | Supabase (PostgreSQL + Realtime)       |
| **Autentikasi** | Supabase Auth (Email + Google OAuth)   |
| **Animasi**     | Framer Motion (motion/react)           |
| **Peta**        | react-simple-maps + TopoJSON Indonesia |
| **Audio**       | Web Audio API (`HTMLAudioElement`)     |
| **Konfeti**     | canvas-confetti                        |

---

_Dokumen ini dibuat pada 2026-04-21. Diperbarui seiring perkembangan fitur._
