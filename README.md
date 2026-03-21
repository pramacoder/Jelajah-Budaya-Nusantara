# Jelajah Budaya Nusantara 🌏

Website interaktif eksplorasi budaya Indonesia untuk lomba bertema budaya. Dibangun dengan **Vanilla JS murni** (tanpa framework) sesuai syarat perlombaan.

---

## 🚀 Cara Menjalankan

**Tidak perlu npm, tidak perlu install apapun!**

1. Buka folder `vanilla-version/` di VS Code
2. Klik kanan `index.html` → **Open with Live Server**
3. Buka browser di `http://localhost:5500`

> **Catatan**: Gunakan Live Server agar audio dan aset lokal berjalan normal. Jangan buka file secara langsung via `file://`.

---

## 🗺️ Struktur Halaman (7 Halaman)

| Route | Halaman | Keterangan |
|-------|---------|------------|
| `#/` | Beranda | Hero bumi, tombol mulai, tanpa navbar |
| `#/indonesia` | Peta Nusantara | Peta interaktif dengan hotspot 5 pulau |
| `#/indonesia/sumatra` | Detail Sumatra | 8 kategori budaya |
| `#/indonesia/jawa` | Detail Jawa | 8 kategori budaya |
| `#/indonesia/kalimantan` | Detail Kalimantan | 8 kategori budaya |
| `#/indonesia/bali` | Detail Bali | 8 kategori budaya |
| `#/indonesia/papua` | Detail Papua | 8 kategori budaya |

---

## 🎙️ Menyiapkan Audio

Siapkan 52 file `.mp3` dan letakkan di `vanilla-version/audio/`.
Lihat `vanilla-version/audio/DAFTAR_AUDIO.md` untuk daftar nama file lengkap.

---

## 🎬 Menambahkan Video YouTube

Buka `vanilla-version/js/data/islands.js`, cari baris `youtubeId: 'PLACEHOLDER_...'` dan ganti dengan ID video YouTube:

```js
youtubeId: 'dQw4w9WgXcQ', // ID dari https://youtube.com/watch?v=dQw4w9WgXcQ
```

---

## 🛠️ Tech Stack

- **Bahasa**: HTML5, CSS3, JavaScript (ES6 Modules)
- **Styling**: Tailwind CSS CDN + CSS Murni
- **Font**: Google Fonts (Playfair Display + Inter)
- **Routing**: Hash-based (`#/`, `#/indonesia`, dll.)
- **Animasi**: CSS Keyframes (cloud transition, fade-in)

---

## 📁 Struktur Folder

```
vanilla-version/
├── index.html          ← SPA shell (satu file untuk semua halaman)
├── css/
│   ├── main.css        ← Global styles, animasi, komponen
│   ├── navbar.css      ← Navbar
│   └── transitions.css ← Animasi transisi awan
├── js/
│   ├── main.js         ← Entry point
│   ├── router.js       ← Hash router + lazy load
│   ├── audio.js        ← Audio manager
│   ├── transition.js   ← Cloud transition
│   ├── navbar.js       ← Navbar component
│   ├── data/
│   │   └── islands.js  ← Data 5 pulau × 8 kategori
│   └── pages/
│       ├── home.js     ← Halaman beranda
│       ├── map.js      ← Halaman peta
│       └── island.js   ← Halaman detail pulau
├── assets/images/      ← Gambar (earth, peta, cloud, hero)
└── audio/              ← File audio .mp3 (diisi manual)
```