import { ProvinceData } from "./province-types";

export const jawaProvinces: ProvinceData[] = [
  {
    id: "Banten",
    name: "Banten",
    island: "jawa",
    capital: "Serang",
    region: "Jawa",
    description: "Banten merupakan wilayah yang memadukan budaya pesisir utara peninggalan Kesultanan Banten dengan masyarakat Baduy yang teguh mempertahankan tradisi di pedalaman.",
    heroImage: "https://images.unsplash.com/photo-1627993077306-0cd50172c3d5?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Rampak Bedug", description: "Tarian unik yang mengkombinasikan gerakan tarian silat dengan tabuhan bedug yang dinamis." },
      { category: "Pakaian", icon: "shirt", title: "Baju Pangsi", description: "Pakaian tradisional perpaduan budaya Sunda dan Banten yang sederhana." },
      { category: "Kuliner", icon: "utensils", title: "Sate Bandeng", description: "Ikan bandeng tanpa tulang khas Serang bumbu rempah dan santan kental yang dipanggang." },
      { category: "Seni", icon: "headphones", title: "Debus", description: "Kesenian bela diri ekstrem khas Banten yang mempertunjukkan kekebalan tubuh." }
    ],
    facts: { population: "12,25 Juta", area: "9.662 km²", uniqueFact: "Memiliki Suku Baduy yang hidup tanpa listrik dan modernisasi.", established: "4 Oktober 2000" },
    geography: { type: "inland", landmarks: ["Ujung Kulon", "Gunung Krakatau", "Masjid Agung Banten"] }
  },
  {
    id: "DKI Jakarta",
    name: "DKI Jakarta",
    island: "jawa",
    capital: "Jakarta Pusat",
    region: "Jawa",
    description: "Ibu kota multikultural yang menampung masyarakat Betawi asli serta berbagai etnis dari penjuru Nusantara, pusat ekonomi dan sejarah modern.",
    heroImage: "https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=1080&q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Yapong", description: "Berasal dari kebudayaan Betawi, Tari Yapong merupakan tarian pergaulan ceria yang diiringi musik gamelan." },
      { category: "Pakaian", icon: "shirt", title: "Baju Sadariah", description: "Kemeja kerah koko dengan sarung melingkar di leher dan peci hitam." },
      { category: "Kuliner", icon: "utensils", title: "Kerak Telor", description: "Jajanan tradisional yang terbuat dari beras ketan putih, telur bebek, disangrai dengan ebi." },
      { category: "Seni", icon: "headphones", title: "Ondel-Ondel", description: "Kesenian boneka raksasa ikonik setinggi 2.5 meter sebagai penolak bala." }
    ],
    facts: { population: "10,6 Juta", area: "661,5 km²", uniqueFact: "Dulu bernama Batavia dan memiliki museum pelabuhan bersejarah Sunda Kelapa.", established: "22 Juni 1527" },
    geography: { type: "coastal", landmarks: ["Monas", "Kota Tua", "Taman Mini"] }
  },
  {
    id: "Jawa Barat",
    name: "Jawa Barat",
    island: "jawa",
    capital: "Bandung",
    region: "Jawa",
    description: "Provinsi yang berakar pada peradaban Sunda yang sangat kaya budaya lisan, seni angklung, tari klasik, serta lansekap alam perbukitan hijau.",
    heroImage: "https://images.unsplash.com/photo-1582239401765-a8907304df36?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Jaipong", description: "Tarian Sunda berirama cepat dengan instrumen kendang yang menjadi ciri khas Jawa Barat." },
      { category: "Pakaian", icon: "shirt", title: "Kebaya Sunda", description: "Kebaya tradisional berpotongan simetris klasik dengan corak batik parahyangan." },
      { category: "Kuliner", icon: "utensils", title: "Surabi", description: "Pancake beras tradisional dengan varian kuah oncom atau kuah kinca manis." },
      { category: "Musik", icon: "headphones", title: "Angklung", description: "Instrumen musik bambu warisan dunia (UNESCO) yang dimainkan secara massal." }
    ],
    facts: { population: "49,4 Juta", area: "35.377 km²", uniqueFact: "Penduduk mayoritas suku Sunda dengan sistem kekerabatan patrilineal-bilateral.", established: "19 Agustus 1945" },
    geography: { type: "inland", landmarks: ["Gunung Tangkuban Perahu", "Kawah Putih"] }
  },
  {
    id: "Jawa Tengah",
    name: "Jawa Tengah",
    island: "jawa",
    capital: "Semarang",
    region: "Jawa",
    description: "Jantung kebudayaan klasik Jawa, tempat berdirinya candi-candi megah peninggalan Mataram, serta memiliki masyarakat yang menerapkan nilai-nilai keraton.",
    heroImage: "https://images.unsplash.com/photo-1684189162727-3b0fd73ba9e3?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Bedhaya", description: "Tari keraton sakral pelambang keharmonisan semesta." },
      { category: "Pakaian", icon: "shirt", title: "Jawi Jangkep", description: "Baju beskap elegan pria dengan corak lurik atau batik asli keraton." },
      { category: "Kuliner", icon: "utensils", title: "Lumpia Semarang", description: "Makan ikonik dari rebung dengan pengaruh akulturasi kuliner Tionghoa-Jawa." },
      { category: "Musik", icon: "headphones", title: "Gamelan", description: "Himpunan alat musik tetabuhan logam perunggu bermelodi syahdu." }
    ],
    facts: { population: "36,7 Juta", area: "32.800 km²", uniqueFact: "Merupakan pusat letak candi Buddha terbesar di dunia, Borobudur.", established: "15 Agustus 1950" },
    geography: { type: "inland", landmarks: ["Candi Borobudur", "Taman Nasional Karimunjawa"] }
  },
  {
    id: "DI Yogyakarta",
    name: "DI Yogyakarta",
    island: "jawa",
    capital: "Yogyakarta",
    region: "Jawa",
    description: "Daerah istimewa dengan kepemimpinan kesultanan yang masih aktif, pusat pendidikan, sekaligus magnet budaya tradisional yang terus lestari.",
    heroImage: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Beksan Wireng", description: "Tari klasik ciptaan Sri Sultan, yang melambangkan sosok parjurit gagah perkasa." },
      { category: "Pakaian", icon: "shirt", title: "Surjan", description: "Pakaian pria motif bunga/lurik khas Yogya yang sarat makna tauhid." },
      { category: "Kuliner", icon: "utensils", title: "Gudeg", description: "Olahan nangka muda manis, dipadu krecek dan telur pindang." },
      { category: "Musik", icon: "headphones", title: "Gamelan Keraton", description: "Lantunan gamelan pakem yang dijaga pusakanya dalam Keraton Yogyakarta." }
    ],
    facts: { population: "3,9 Juta", area: "3.185 km²", uniqueFact: "Status istimewa menjadikan gubernur dijabat oleh Sultan keraton.", established: "4 Maret 1950" },
    geography: { type: "inland", landmarks: ["Keraton Yogyakarta", "Candi Prambanan"] }
  },
  {
    id: "Jawa Timur",
    name: "Jawa Timur",
    island: "jawa",
    capital: "Surabaya",
    region: "Jawa",
    description: "Membentang dari Gunung Semeru hingga Banyuwangi, provinsi ini punya budaya Arek dan Madura yang tegas, serta lanskap vulkanik luar biasa.",
    heroImage: "https://images.unsplash.com/photo-1627889139268-cb09d020d912?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Reog Ponorogo", description: "Pertunjukan teaterikal bertopeng raksasa Dadak Merak." },
      { category: "Pakaian", icon: "shirt", title: "Pesa'an Madura", description: "Kaus merah-putih bergaris khas nelayan Madura yang maskulin paduan luar hitam." },
      { category: "Kuliner", icon: "utensils", title: "Rawon", description: "Sup daging pekat kehitaman yang dihasilkan dari bumbu buah keluak kaya rasa." },
      { category: "Seni", icon: "headphones", title: "Tari Remo", description: "Tari penyambutan meriah panggung ludruk." }
    ],
    facts: { population: "41,1 Juta", area: "47.800 km²", uniqueFact: "Ada Kawah Ijen dengan fenomena api biru terbesar dunia.", established: "12 Oktober 1945" },
    geography: { type: "coastal", landmarks: ["Gunung Bromo", "Kawah Ijen", "Jembatan Suramadu"] }
  }
];
