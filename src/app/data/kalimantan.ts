import { ProvinceData } from "./province-types";

export const kalimantanProvinces: ProvinceData[] = [
  {
    id: "Kalimantan Barat",
    name: "Kalimantan Barat",
    island: "kalimantan",
    capital: "Pontianak",
    region: "Kalimantan",
    description: "Dikenal dengan julukan Provinsi Seribu Sungai dan dilewati garis imajiner khatulistiwa persis di ibu kotanya yang dilintasi sungai Kapuas membelah kota.",
    heroImage: "https://images.unsplash.com/photo-1624605707211-7109c1899164?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Monong", description: "Tarian penolak bala pengobatan sakral Dayak menangkal energi marabahaya penyakit." },
      { category: "Pakaian", icon: "shirt", title: "King Baba", description: "Baju kulit kayu tenun serat kapuo ukiran alam satwa warna kemerahan Dayak." },
      { category: "Kuliner", icon: "utensils", title: "Choi Pan", description: "Jajanan kukus isi bengkuang serutan udang akulturasi lezat membaur Hakka Tionghoa pontianak." },
      { category: "Musik", icon: "headphones", title: "Tuma", description: "Tabung kendang balok kayu pelengkap irama lantunan alat musik gong perunggu." }
    ],
    facts: { population: "5,4 Juta", area: "147.307 km²", uniqueFact: "Merupakan lokasi berdirinya tugu garis edar Khatulistiwa titik nol lintang dunia.", established: "7 Desember 1956" },
    geography: { type: "inland", landmarks: ["Tugu Khatulistiwa", "Sungai Kapuas"] }
  },
  {
    id: "Kalimantan Tengah",
    name: "Kalimantan Tengah",
    island: "kalimantan",
    capital: "Palangka Raya",
    region: "Kalimantan",
    description: "Merupakan provinsi terluas di Borneo Indonesia, menyimpan kekayaan fauna lindung Tanjung Puting (Orang Utan) dengan belantara tiada putus.",
    heroImage: "https://images.unsplash.com/photo-1542157585-ef20bfcdd8e7?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Balean Dadas", description: "Tari shamanisme pengobatan bergelar gelang kuningan mendering gemerincing sakti merasuk sukma." },
      { category: "Pakaian", icon: "shirt", title: "Baju Sangkarut", description: "Rompi anti sajam bersisik manik trenggiling kebanggaan peperangan masyarakat Iban kuno zaman pahlawan." },
      { category: "Kuliner", icon: "utensils", title: "Juhu Singkah", description: "Sayur rotan muda berkhasiat dihiasi kuah santan lauk pauk segar penawar racun hutan belantara." },
      { category: "Musik", icon: "headphones", title: "Sape", description: "Suling petikan tali lembut pendayu pendamaian kalbu Dayak pedalaman Ngaju bertapa." }
    ],
    facts: { population: "2,6 Juta", area: "153.564 km²", uniqueFact: "Taman Nasional Tanjung Puting merupakan situs pelestarian liar primata kera Orangutan terbesar global.", established: "23 Mei 1957" },
    geography: { type: "inland", landmarks: ["Tanjung Puting", "Danau Tahai"] }
  },
  {
    id: "Kalimantan Selatan",
    name: "Kalimantan Selatan",
    island: "kalimantan",
    capital: "Banjarmasin",
    region: "Kalimantan",
    description: "Pusat peradaban sungai rawa mempopulerkan keramaian pasar terapung tradisional serta pengolahan batu mulia intan martapura abadi.",
    heroImage: "https://images.unsplash.com/photo-1628187834778-984bb416e04f?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Baksa Kembang", description: "Tari persembahan putri keraton diselingi mahkota bogam bungan kenanga manis gemulai penyambut tamu kesultanan agung Banjar Raya." },
      { category: "Pakaian", icon: "shirt", title: "Bagajah Gamuling", description: "Mahkota kepala raja berhias dahan kuncup menjuntai lambang superioritas tata boga keagungan bangsawan ningrat bahari." },
      { category: "Kuliner", icon: "utensils", title: "Soto Banjar", description: "Soto berkuah susu cair kayu manis pelengkap kentang tumbuk berhias ketupat telur bebek kenikmatan rempah cengkeh wangi surgawi timur rempah kalimantan murni bening hangat." },
      { category: "Musik", icon: "headphones", title: "Kintung", description: "Potongan bilah bambu yang jika dihempaskan mengeluarkan rima musikal memanggil awan mendung memohon rahmat hujan pada kuasa alam semesta." }
    ],
    facts: { population: "4,0 Juta", area: "38.744 km²", uniqueFact: "Di Martapura terdapat pasar permata lelong intan berlian permata zamrud merah gosokan alam langka.", established: "14 Agustus 1950" },
    geography: { type: "coastal", landmarks: ["Pasar Terapung Lok Baintan", "Bukit Matang Kaladan"] }
  },
  {
    id: "Kalimantan Timur",
    name: "Kalimantan Timur",
    island: "kalimantan",
    capital: "Samarinda",
    region: "Kalimantan",
    description: "Ladang emas perminyakan industri strategis letaknya memeluk teluk Makassar bermahkotakan Kepulauan Derawan nan permai lokasi Ibu Kota Negara Nusantara menatap masa depan Indonesia maju gemilang jaya sentosa makmur bersama alam rimba lestari khatulistiwa nusantara baru ini.",
    heroImage: "https://images.unsplash.com/photo-1681284589239-0158ed704ef1?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Hudoq", description: "Topeng paruh kayu naga leluhur memanggil pengusir wabah panen merangkak berkeliling rumah bantai suku Dayak Bahau purba mitologis magis keramat ritmis dinamis memutar magis kuno asli alam roh hutan bukit kalimantan dalam nan sunyi lebat teduh sejuk rimbun damai sejahtera meriah bergeming." },
      { category: "Pakaian", icon: "shirt", title: "Taqwo", description: "Adaptasi luaran keraton Kutai keemasan membedakan kelas kerabat berdarah biru peninggalan kemaharajaan hindu tertua kutai martadipura yang mahsyur legenda yupa tujuh prasasti mulawarman sejarah peradaban pertama abjad palawa sanksekerta archa brahmana dewa siwa parwati nandi kura perak emas murni permata delima pusaka sakti mandraguna." },
      { category: "Kuliner", icon: "utensils", title: "Ayam Cincane", description: "Ayam kampung merah bakar berselimut bumbu jahe laos serai merah merona primadona hajatan rakyat etnik tepian sungai keraton kerajaan kesultanan samarendah memikat cita rasa gurih pedas manis legit mantap menyelaraskan selera nusa merata kalimantan daratan pesisir timur berangin utara laut luas sejauh memandang telapan mata kalbu nurani sanubari." },
      { category: "Musik", icon: "headphones", title: "Kadire", description: "Seruling labu tabung yang ditiup layaknya bagpipe menghasilkan dengung merdu menemani kidung rindu ladang meramu." }
    ],
    facts: { population: "3,7 Juta", area: "129.066 km²", uniqueFact: "Kerajaan tertua pra-hindu nusantara ditemukannya tujuh yupa berdiri tegak yakni kutai martadipura abad kelima awal prasejarah.", established: "1 Januari 1957" },
    geography: { type: "coastal", landmarks: ["Kepulauan Derawan", "IKN Nusantara"] }
  },
  {
    id: "Kalimantan Utara",
    name: "Kalimantan Utara",
    island: "kalimantan",
    capital: "Tanjung Selor",
    region: "Kalimantan",
    description: "Provinsi termuda daratan Borneo bermarkaskan suku Tidung tapal batas negeri Malaysia kaya keindahan alam pegunungan sejuk serta sungai kayan membentang arus deras jeram menantang nyali mempesona mata jiwa raga patriotik bersemayam damai.",
    heroImage: "https://images.unsplash.com/photo-1650445332429-75ceee3f3226?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Kancet Papatai", description: "Tarian kepahlawanan lincah akrobatik perang tanding Mandau menangkis perisai Tameng ulin menantang mandau kayu di hadapan sang musuh serigala taring ganas pemberani." },
      { category: "Pakaian", icon: "shirt", title: "Sapei Sapaq", description: "Bawahan tenun sirat dayak menyilang penuh rumbai menghiasi kegagahan pria bulungan tidung melangkah tapak rimba rimba rawa rawa pesisir tepi selat utara kepulauan nunukan sebatik laut sempit lepas timur." },
      { category: "Kuliner", icon: "utensils", title: "Kepiting Soka", description: "Kepiting cangkang lunak tarakan berpadu bumbu saus tiram nan asin gurih renyah tanpa cangkang menusuk." },
      { category: "Musik", icon: "headphones", title: "Sluding", description: "Gambang kayu nada xilofon bertalu nyaring pengiring pantun berbalas sastra adat turun temurun pesisiran timur utara kalimantan rimba hutan khatulistiwa damai." }
    ],
    facts: { population: "0,7 Juta", area: "75.467 km²", uniqueFact: "Mempunyai perbatasan darat langsung negara malaysia Sabah perbukitan sempadan.", established: "25 Oktober 2012" },
    geography: { type: "inland", landmarks: ["Sungai Kayan", "Taman Nasional Kayan Mentarang"] }
  }
];
