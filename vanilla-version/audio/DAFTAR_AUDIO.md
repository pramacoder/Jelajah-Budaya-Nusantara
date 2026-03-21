# Daftar File Audio 🎙️

Semua file audio harus dalam format **.mp3** dan diletakkan di folder ini (`vanilla-version/audio/`).

Jika file belum tersedia, sistem akan melewatinya tanpa error.

---

## 🏠 Audio Umum (2 file)

| Nama File | Diputar Saat |
|-----------|-------------|
| `welcome.mp3` | Halaman beranda dibuka |
| `map_intro.mp3` | Halaman peta dibuka |

---

## 🗺️ Audio Hover Peta (5 file)

Diputar saat user mengarahkan kursor ke pulau di peta.

| Nama File | Pulau |
|-----------|-------|
| `sumatra_hover.mp3` | Sumatra |
| `jawa_hover.mp3` | Jawa |
| `kalimantan_hover.mp3` | Kalimantan |
| `bali_hover.mp3` | Bali |
| `papua_hover.mp3` | Papua |

**Contoh isi narasi** `sumatra_hover.mp3`:
> *"Sumatra, Pulau Andalas — kaya akan rempah dan tradisi Melayu. Klik untuk menjelajahi lebih dalam."*

---

## 🏛️ Audio Intro Detail Pulau (5 file)

Diputar otomatis saat halaman detail pulau dibuka.

| Nama File | Pulau |
|-----------|-------|
| `sumatra_intro.mp3` | Sumatra |
| `jawa_intro.mp3` | Jawa |
| `kalimantan_intro.mp3` | Kalimantan |
| `bali_intro.mp3` | Bali |
| `papua_intro.mp3` | Papua |

---

## 🎭 Audio Budaya per Pulau (40 file)

Diputar saat user mengklik kartu budaya dan modal muncul.

Pola nama file: `[pulau]_[kategori].mp3`

### Kategori:
| Kode | Kategori |
|------|----------|
| `tarian` | Tarian Tradisional |
| `kuliner` | Kuliner Khas |
| `pakaian` | Pakaian Adat |
| `musik` | Musik Tradisional |
| `senjata` | Senjata Tradisional |
| `rumah` | Rumah Adat |
| `upacara` | Upacara Adat |
| `kerajinan` | Kerajinan Tangan |

### Sumatra (8 file)
```
sumatra_tarian.mp3
sumatra_kuliner.mp3
sumatra_pakaian.mp3
sumatra_musik.mp3
sumatra_senjata.mp3
sumatra_rumah.mp3
sumatra_upacara.mp3
sumatra_kerajinan.mp3
```

### Jawa (8 file)
```
jawa_tarian.mp3
jawa_kuliner.mp3
jawa_pakaian.mp3
jawa_musik.mp3
jawa_senjata.mp3
jawa_rumah.mp3
jawa_upacara.mp3
jawa_kerajinan.mp3
```

### Kalimantan (8 file)
```
kalimantan_tarian.mp3
kalimantan_kuliner.mp3
kalimantan_pakaian.mp3
kalimantan_musik.mp3
kalimantan_senjata.mp3
kalimantan_rumah.mp3
kalimantan_upacara.mp3
kalimantan_kerajinan.mp3
```

### Bali (8 file)
```
bali_tarian.mp3
bali_kuliner.mp3
bali_pakaian.mp3
bali_musik.mp3
bali_senjata.mp3
bali_rumah.mp3
bali_upacara.mp3
bali_kerajinan.mp3
```

### Papua (8 file)
```
papua_tarian.mp3
papua_kuliner.mp3
papua_pakaian.mp3
papua_musik.mp3
papua_senjata.mp3
papua_rumah.mp3
papua_upacara.mp3
papua_kerajinan.mp3
```

---

## 📊 Ringkasan

| Kelompok | Jumlah File |
|----------|-------------|
| Audio umum | 2 |
| Hover peta | 5 |
| Intro detail pulau | 5 |
| Budaya (8 × 5 pulau) | 40 |
| **Total** | **52 file** |

---

## 💡 Tips Merekam / Membuat Audio

- Gunakan nada tenang, ramah, seperti pemandu wisata virtual
- Durasi per file: **10–30 detik** (cukup singkat dan informatif)
- Kualitas: **128 kbps MP3** sudah cukup untuk web
- Tools gratis: [Murf.ai](https://murf.ai), [ElevenLabs](https://elevenlabs.io), atau rekam sendiri dengan Audacity
