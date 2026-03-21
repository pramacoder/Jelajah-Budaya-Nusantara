# Jelajah Budaya Nusantara 🌏

Website eksplorasi budaya Indonesia yang interaktif — memungkinkan pengguna menjelajahi kekayaan tarian, kuliner, pakaian adat, dan musik tradisional dari 6 pulau utama Nusantara.

untuk keperluan perlombaan dengan tema budaya dan batas halaman adalah 7
## Tech Stack

- **Framework**: vanila js (syarat perlombaan adalah tanpa framework)
- **Routing**: routing berbasis url dengan hash
- **Animasi**: tailwind css atau bootstrap dengan css murni tambahan agar animasi maksimal
- **Styling**: Tailwind CSS
- **Ikon**: .svg

## Cara Menjalankan

saya belum pernah menggunakan vanila js untuk membuat website, jadi saya tidak tahu cara menjalankan website ini. nantinya saya ingin anda memberi tahu cara menjalankan website ini. apakah dengan npm atau dengan cara lain?

## Struktur Halaman

Aplikasi ini memiliki 4 halaman utama yang dikelola oleh satu layout bersama.

```
/                         → Halaman Beranda (HomePage)

halaman beranda tidak memiliki navbar. berupa penjelasan singkat sistem. halaman ini memiliki 1 tombol untuk menuju ke halaman peta
/indonesia                → Peta Interaktif (IndonesiaMap)

halaman peta memiliki navbar.peta memiliki icon lokasi disetiap atas pulaunya yang dapat di klik dan di hover. saya ingin peta yang ditampilkan memenuhi layar tanpa margin. untuk pada mobile dengan lebar yang kecil peta tersebut dapat di geser sehingga user dapat mengklik pulau yang diinginkannya. saya ingin menambahkan audio yang menarik layaknya suara bot yang menjelaskan setiap pulau yang terasa di hover atau di klik.

/indonesia/:islandId      → Detail Pulau (IslandDetail)

detail pulau memiliki navbar. saya ingin detail pulau akan dapat menampilkan lebih banyak keanekaragaman budaya dari pulau tersebut. saya ingin menambahkan audio yang menarik layaknya suara bot yang menjelaskan keanekaragaman budayanya. ketika user mengklik salah satu keanekaragaman budaya, maka akan muncul modal yang menampilkan detail keanekaragaman budaya tersebut. conothnya user mengklik makanan khasnya, maka bot akan menjelaskan apa itu makanan khasnya. kemudian berikan tombol "<I vidio" untuk menampilkan keindahan pulau tersebut pada layar. 


2 halaman untuk halaman beranda dan peta interaktif. dan 5 sisanya untuk menampilkan 5 pulau yang berbeda

### 🏠 Halaman Beranda — `HomePage`
**Route:** `/`

Halaman pembuka aplikasi dengan tampilan epik bumi dari luar angkasa sebagai latar.

**Isi halaman:**
- **Hero visual** — foto bumi dengan gradasi gelap sebagai background
- **Judul utama** — *"Jelajahi Keanekaragaman Budaya Indonesia"* dengan animasi fade-in
- **Tombol CTA** — *"Mulai Perjalanan"* yang mengarahkan ke halaman Peta (`/indonesia`)
- **3 kartu fitur** di bagian bawah:
  | Ikon | Label | Deskripsi |
  |------|-------|-----------|
  | 🏝️ | 6 Pulau Utama | Jelajahi budaya unik |
  | 💃 | 24+ Budaya | Tarian, kuliner & lebih |
  | 🎵 | Interaktif | Pengalaman immersive |

**Navigasi:** Klik tombol *"Mulai Perjalanan"* → masuk ke `/indonesia` dengan animasi transisi awan. dan memulai audio bot.

---

### 🗺️ Halaman Peta Nusantara — `IndonesiaMap`
**Route:** `/indonesia`

Halaman peta interaktif Indonesia dengan hotspot yang bisa diklik di tiap pulau.

**Isi halaman:**
- **Judul** — *"Peta Nusantara"* dengan instruksi singkat cara penggunaan
- **Peta Indonesia** — gambar peta dengan overlay hotspot transparan di atas setiap pulau
- **Efek hover per pulau** — saat kursor diarahkan ke pulau, muncul kartu info singkat berisi:
  - Nama pulau
  - Tagline khas (contoh: *"Pulau Andalas — kaya rempah & tradisi Melayu"*)
  - 4 highlight budaya (Tarian, Kuliner, Pakaian, Musik) (dengan suara bot yang membantu menjelaskan layaknya membaca text) (suara tersebut berasal dari file audio yang nantinya disediakan pada folder audio)
  - Teks *"Klik untuk jelajahi"*
- **Legenda pulau** — baris tombol nama pulau di bawah peta sebagai navigasi alternatif

**6 Pulau yang tersedia:**
| Pulau | Tagline |
|-------|---------|
| Sumatra | Pulau Andalas — kaya rempah & tradisi Melayu |
| Jawa | Pulau Seribu Candi — pusat peradaban Nusantara |
| Kalimantan | Pulau Borneo — hutan tertua & budaya Dayak |
| Bali | Pulau Dewata — seni, spiritualitas & keindahan |
| Papua | Tanah Cenderawasih — 250+ suku & alam megah |

**Navigasi:** Klik hotspot atau tombol nama pulau → masuk ke `/indonesia/:islandId`.

---

### 🏛️ Halaman Detail Pulau — `IslandDetail`
**Route:** `/indonesia/:islandId`

Halaman eksplorasi mendalam untuk setiap pulau. `islandId` bisa berupa: `sumatra`, `jawa`, `kalimantan`, `sulawesi`, `bali`, atau `papua`.

**Isi halaman:**
1. **Hero Section** — foto sinematik pulau setinggi 50–60% layar dengan overlay gradasi dan:
   - Label subtitle pulau (contoh: *"Pulau Andalas"*)
   - Nama pulau besar di tengah bawah

2. **Deskripsi Pulau** — paragraf naratif tentang sejarah, geografi, dan keunikan pulau

3. **4 Kartu Budaya** — grid 4 kolom, masing-masing mewakili satu kategori:
   | Kategori | Warna | Ikon |
   |----------|-------|------|
   | 🩰 Tarian | Pink / Rose | 🎵 |
   | 🍛 Kuliner | Amber / Orange | 🍴 |
   | 👘 Pakaian | Emerald / Green | 👕 |
   | 🎵 Musik | Violet / Purple | 🎧 |

4. **Modal Detail** — saat kartu budaya diklik, muncul pop-up dengan:
   - Badge kategori berwarna
   - Judul budaya
   - Deskripsi lengkap
   - Tutup dengan klik di luar modal atau tombol ✕

**Contoh konten per pulau:**
- **Sumatra** — Tari Saman · Rendang · Ulos Batak · Gondang Sabangunan
- **Jawa** — Tari Bedhaya · Gudeg · Batik · Gamelan
- **Kalimantan** — Tari Hudoq · Juhu Singkah · Baju King Baba · Sape
- **Bali** — Tari Kecak · Babi Guling · Kebaya Bali · Gamelan Bali
- **Papua** — Tari Perang · Papeda · Koteka · Tifa

---

### ❌ Halaman 404 — `NotFound`
**Route:** `/*` (semua URL yang tidak dikenali)

Halaman sederhana dengan pesan *"Halaman Tidak Ditemukan"* dan tombol untuk kembali ke beranda. Dilengkapi pesan humoris: *"Sepertinya kamu tersesat di lautan Nusantara!"*

---

## Sistem Navigasi & Transisi Awan

Seluruh navigasi antar halaman menggunakan **animasi transisi awan** (`CloudTransition`) yang dikelola oleh `Layout`.

**Alur transisi:**
1. Pengguna klik tautan/tombol navigasi
2. Awan-awan bergerak dari kiri & kanan menutup layar (**fase closing**, ~950ms)
3. Halaman baru di-render di balik awan
4. Awan membuka kembali ke kiri & kanan (**fase opening**, ~1050ms)
5. Halaman baru terlihat penuh

**Navbar** (hanya muncul di luar halaman beranda):
- Tombol ← Kembali (navigasi mundur)
- Logo *"Nusantara"* di tengah
- Ikon 🗺️ (ke Peta) dan 🏠 (ke Beranda) di kanan

---
