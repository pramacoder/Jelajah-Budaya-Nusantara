import { ProvinceData } from "./province-types";

export const sumateraProvinces: ProvinceData[] = [
  {
    id: "Aceh",
    name: "Aceh",
    island: "sumatra",
    capital: "Banda Aceh",
    region: "Sumatera",
    description: "Provinsi paling ujung barat Indonesia, kental akan syariat Islam dan sejarah kesultanan. Dikenal pula sebagai Serambi Mekkah.",
    heroImage: "https://images.unsplash.com/photo-1596409899321-4f762696b0cd?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Saman", description: "Tari tepuk tangan dan dada tanpa musik eksternal, disahkan dunia UNESCO." },
      { category: "Pakaian", icon: "shirt", title: "Ulee Balang", description: "Pakaian sutera kerajaan yang dipadu benang rajut emas asli." },
      { category: "Kuliner", icon: "utensils", title: "Mie Aceh", description: "Mie tebal ekstra pedas disajikan bertabur kepiting, daging sapi atau laut." },
      { category: "Musik", icon: "headphones", title: "Serune Kalee", description: "Seruling kayu bermoncong khas, biasa dipentaskan ketika hajatan besar." }
    ],
    facts: { population: "5,3 Juta", area: "57.956 km²", uniqueFact: "Satu-satunya daerah yang memiliki kebebasan legislasi hukum lokal Islam.", established: "7 Desember 1956" },
    geography: { type: "inland", landmarks: ["Masjid Raya Baiturrahman", "Pulau Weh", "Gunung Leuser"] }
  },
  {
    id: "Sumatera Utara",
    name: "Sumatera Utara",
    island: "sumatra",
    capital: "Medan",
    region: "Sumatera",
    description: "Rumah bagi keajaiban Danau Toba dan Suku Batak Raya, provinsi ini kaya pegunungan, etnik budaya, serta lahan perkebunan tropika.",
    heroImage: "https://images.unsplash.com/photo-1615009820619-d69e2f948e8d?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Tor-Tor", description: "Tari persembahan dari Batak Toba yang diiringi seperangkat gondang sedih dan gembira." },
      { category: "Pakaian", icon: "shirt", title: "Kain Ulos", description: "Tenun sakral bermotif geometri pembawa berkah bagi pengantin atau duka." },
      { category: "Kuliner", icon: "utensils", title: "Bika Ambon", description: "Kudapan bolu kuning berongga beraroma pandan semerbak." },
      { category: "Musik", icon: "headphones", title: "Gondang Sabangunan", description: "Alat tabuh drum etnis perayaan syukur di tatar Batak." }
    ],
    facts: { population: "14,8 Juta", area: "72.981 km²", uniqueFact: "Terdapat Danau Toba, kawah vulkanik terdalam ke-2 di lautan Asia.", established: "15 April 1948" },
    geography: { type: "inland", landmarks: ["Danau Toba", "Pulau Nias"] }
  },
  {
    id: "Sumatera Barat",
    name: "Sumatera Barat",
    island: "sumatra",
    capital: "Padang",
    region: "Sumatera",
    description: "Tanah Minangkabau ternama dengan adat matrilineal terkuat, pesona Ngarai Sianok, serta masakan terenak legendaris dunia: Rendang.",
    heroImage: "https://images.unsplash.com/photo-1616231920038-7fd5f2eb71dd?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Piring", description: "Tari tangkas mengayun dua piring porselen di tangan tanpa terlempar." },
      { category: "Pakaian", icon: "shirt", title: "Bundo Kanduang", description: "Pakaian adat pelambang kehormatan ibunda bersanggul rumah tajam." },
      { category: "Kuliner", icon: "utensils", title: "Rendang Sapi", description: "Daging karamel hitam kelapa kental yang tersohor nomor wahid di CNN." },
      { category: "Musik", icon: "headphones", title: "Saluang", description: "Sebentuk suling magis bambu pengiring pantun sedih bukit barisan." }
    ],
    facts: { population: "5,5 Juta", area: "42.012 km²", uniqueFact: "Sistem pewarisan silsilah garis keturunan diatur berdasar ibu (matrilineal).", established: "1 Oktober 1945" },
    geography: { type: "inland", landmarks: ["Jam Gadang", "Ngarai Sianok"] }
  },
  {
    id: "Riau",
    name: "Riau",
    island: "sumatra",
    capital: "Pekanbaru",
    region: "Sumatera",
    description: "Jantung kebudayaan Melayu yang kental, rumah bagi istana-istana lama, dengan kekayaan ladang sumber gas serta perminyakan.",
    heroImage: "https://images.unsplash.com/photo-1606709827010-06b29f7ce678?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Zapin", description: "Tari Melayu rancak akulturasi Arab, didominasi olah langkah kaki lincah." },
      { category: "Pakaian", icon: "shirt", title: "Baju Kurung", description: "Baju kurung Melayu Teluk Belanga berlengan panjang longgar pelindung aurat." },
      { category: "Kuliner", icon: "utensils", title: "Gulai Belacan", description: "Sajian kuah udang terasi Melayu kental bersantan nan sedap." },
      { category: "Musik", icon: "headphones", title: "Gambus", description: "Alat dawai serumpun Semenanjung identik dakwah rohani Islam." }
    ],
    facts: { population: "6,4 Juta", area: "87.023 km²", uniqueFact: "Merupakan pusat kebudayaan literasi bahasa Indonesia akar logat Melayu.", established: "25 Juli 1958" },
    geography: { type: "inland", landmarks: ["Istana Siak Sri Indrapura"] }
  },
  {
    id: "Kepulauan Riau",
    name: "Kepulauan Riau",
    island: "sumatra",
    capital: "Tanjungpinang",
    region: "Sumatera",
    description: "Gugusan kepulauan perbatasan antarnegara, menyimpan laut jernih, kota niaga, serta budaya laut suku laut yang berdaulat.",
    heroImage: "https://images.unsplash.com/photo-1628187834778-984bb416e04f?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Mak Yong", description: "Drama sandiwara teater tradisi yang dulunya memenghibur pesisir nelayan." },
      { category: "Pakaian", icon: "shirt", title: "Teluk Belanga", description: "Atasan pria dengan kancing tekak berlapis samping songket Riau." },
      { category: "Kuliner", icon: "utensils", title: "Gonggong", description: "Siput pesisir rebus yang direndam sambal dabu istimewa lokal Kepri." },
      { category: "Musik", icon: "headphones", title: "Kompang", description: "Kendang kecil dimainkan berkeliling sebagai barisan selamat datang tamu." }
    ],
    facts: { population: "2,0 Juta", area: "8.201 km²", uniqueFact: "Menjadi provinsi kepulauan karena 96% dari teritorialnya adalah lautan natuna.", established: "24 September 2002" },
    geography: { type: "island", landmarks: ["Pulau Bintan", "Kepulauan Natuna"] }
  },
  {
    id: "Jambi",
    name: "Jambi",
    island: "sumatra",
    capital: "Jambi",
    region: "Sumatera",
    description: "Pemegang kunci sejarah kedatuan Muaro Jambi, berhutan gambut lebat dan kaya akan jejak purbakala pelaut melayu tua.",
    heroImage: "https://images.unsplash.com/photo-1681284589239-0158ed704ef1?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Sekapur Sirih", description: "Tari penerimaan tetamu penting sambil membagikan wadah persahabatan sekapur." },
      { category: "Pakaian", icon: "shirt", title: "Baju Kurung Jambi", description: "Dihiasi benang bordir emas melati atau motif angsa beringiring." },
      { category: "Kuliner", icon: "utensils", title: "Tempoyak", description: "Fermentasi durian asam pedas yang dilahap pas dengan ikan Patin Sungai." },
      { category: "Musik", icon: "headphones", title: "Kelintang", description: "Perkusi alat pukul kuningan pembangun irama melodis melayu pesisiran." }
    ],
    facts: { population: "3,5 Juta", area: "50.058 km²", uniqueFact: "Situs Kompleks Candi Muaro Jambi adalah kawasan purbakala Buddha terbesar di Asia Tenggara.", established: "6 Januari 1957" },
    geography: { type: "inland", landmarks: ["Candi Muaro Jambi", "Gunung Kerinci"] }
  },
  {
    id: "Bengkulu",
    name: "Bengkulu",
    island: "sumatra",
    capital: "Bengkulu",
    region: "Sumatera",
    description: "Pesona alam bunga raksasa, menyimpan sejarah perbentengan masa kependudukan kolonial Inggris yang kuat (Bencoolen).",
    heroImage: "https://images.unsplash.com/photo-1678122097058-2de9ef92f254?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Andun", description: "Tarian masal rakyat yang digelar kala syukuran masa pasca pemanenan tani." },
      { category: "Pakaian", icon: "shirt", title: "Rejang Lebong", description: "Balutan busana sutra mahkota merica bertahtakan koin abad silam." },
      { category: "Kuliner", icon: "utensils", title: "Pendap", description: "Racikan rempah yang membebat potongan ikan dililit terusan berdaun keladi lebat." },
      { category: "Musik", icon: "headphones", title: "Dhol", description: "Tabuh bongkok raksasa bergetar yang dulu dibawa imigran timur saat hari Tabot." }
    ],
    facts: { population: "2,0 Juta", area: "19.919 km²", uniqueFact: "Ditemukannya Bunga Rafflesia Arnoldii, kembang tunggal terlebar dunia di hutannya.", established: "18 November 1968" },
    geography: { type: "inland", landmarks: ["Benteng Marlborough", "Pantai Panjang"] }
  },
  {
    id: "Sumatera Selatan",
    name: "Sumatera Selatan",
    island: "sumatra",
    capital: "Palembang",
    region: "Sumatera",
    description: "Dikenal sebagai Bumi Sriwijaya, dilintasi sungai megah Musi, pusat kuliner pempek dan jembatan merah ikonik Ampera.",
    heroImage: "https://images.unsplash.com/photo-1596700684711-bbaab60ab43c?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Gending Sriwijaya", description: "Pementasan keagungan Kerajaan maritim lama nan penuh martabat dan etika santun." },
      { category: "Pakaian", icon: "shirt", title: "Aesan Gede", description: "Busana pengantin mewah kerajaan berselempang manik-manik megah warna teratai." },
      { category: "Kuliner", icon: "utensils", title: "Pempek", description: "Olahan ikan tenggiri yang menyatu dengan kanji sagu berlumur kuah cuka hitam (cukoo)." },
      { category: "Musik", icon: "headphones", title: "Tenun Songket", description: "Bukan saja seutas kain emas, namun ditenun melalui tatanan musik pelengkap harmonisasi irama lokal." }
    ],
    facts: { population: "8,5 Juta", area: "91.592 km²", uniqueFact: "Situs ibu kota pertama peradaban bahari paling berkuasa (Sriwijaya).", established: "14 Agustus 1950" },
    geography: { type: "inland", landmarks: ["Jembatan Ampera", "Pulau Kemaro"] }
  },
  {
    id: "Kepulauan Bangka Belitung",
    name: "Kepulauan Bangka Belitung",
    island: "sumatra",
    capital: "Pangkalpinang",
    region: "Sumatera",
    description: "Kepingan laskar pelangi berhamburan granit gigantik di tepi air pirus, lumbung timah dan asimilasi Melayu dan Tionghoa.",
    heroImage: "https://images.unsplash.com/photo-1549479361-ecb791ad86df?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Campak", description: "Tarian asimilasi Portugal dan lokal pasca pemungutan melada gembira pemuda-pemudi." },
      { category: "Pakaian", icon: "shirt", title: "Seting dan Cual", description: "Perpaduan luaran sutra bergaya kurung Melayu ditambal kain merah Cual Belitung asli." },
      { category: "Kuliner", icon: "utensils", title: "Mie Belitung", description: "Mie kuning hangat menggugah berbalur udang laut manis kerupuk kentang renyah." },
      { category: "Musik", icon: "headphones", title: "Dambus", description: "Bunyi gitar gambus peninggalan akulturasi Arab berbentuk rusa lincah menarinari." }
    ],
    facts: { population: "1,5 Juta", area: "16.424 km²", uniqueFact: "Produsen bijih mineral timah dan merica berkualitas top internasional.", established: "21 November 2000" },
    geography: { type: "island", landmarks: ["Pantai Tanjung Tinggi", "Danau Kaolin"] }
  },
  {
    id: "Lampung",
    name: "Lampung",
    island: "sumatra",
    capital: "Bandar Lampung",
    region: "Sumatera",
    description: "Gerbang batas pesisir lintas pulau Jawa yang memelihara konservasi fauna gajah taman nasional Way Kambas nan rimbun hijau.",
    heroImage: "https://images.unsplash.com/photo-1582239401765-a8907304df36?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Sigeh Penguten", description: "Bentuk murni kemuliaan penyambut tamu dipersatukan dengan mahkota siger melintang terang." },
      { category: "Pakaian", icon: "shirt", title: "Tulang Bawang", description: "Mahkota kuning Siger lempeng tujuh susun ciri mutlak kemegahan wanita tanah Pepadun." },
      { category: "Kuliner", icon: "utensils", title: "Seruit", description: "Panganan sambal cacahan ikan sungai difermentasi lazat cocol membakar lidah (Tempoyak)." },
      { category: "Musik", icon: "headphones", title: "Cetik / Bende", description: "Serangkaian gong pipih alat pertanda perkumpulan balai adat perundingan Marga." }
    ],
    facts: { population: "9,0 Juta", area: "34.623 km²", uniqueFact: "Dilengkapi stasiun pelabuhan penyeberangan feri terpadat nasional di Merak/Bakauheni.", established: "18 Maret 1964" },
    geography: { type: "coastal", landmarks: ["Way Kambas", "Teluk Kiluan"] }
  }
];
