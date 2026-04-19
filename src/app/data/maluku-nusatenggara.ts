import { ProvinceData } from "./province-types";

export const malukuProvinces: ProvinceData[] = [
  {
    id: "Maluku",
    name: "Maluku",
    island: "maluku",
    capital: "Ambon",
    region: "Maluku",
    description: "Provinsi Seribu Pulau yang dijuluki surga rempah-rempah Kepulauan Rempah sejarah bangsa barat mencari cengkeh pala lada emas nusantara banda ambon laut banda ombak karang laut dalam tropika wangi.",
    heroImage: "https://images.unsplash.com/photo-1628187834778-984bb416e04f?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Cakalele", description: "Tarian perang tradisional Maluku yang memperlihatkan keberanian pria mengibas parang (salawaku) melindungi tanah datuk." },
      { category: "Pakaian", icon: "shirt", title: "Baju Cele", description: "Baju kurung bersulam merah putih emas lambang kesucian cinta muda-mudi ambon manise nyong nona melangkah ke gereja hari minggu damai lestari." },
      { category: "Kuliner", icon: "utensils", title: "Papeda", description: "Sari pati pohon sagu maluku bertekstur lengket penyerap kuah rebusan ikan kuning kemangi serai cakalang rindu kampung halaman laut teduh." },
      { category: "Musik", icon: "headphones", title: "Tahuri", description: "Kerang laut terompet raksasa ditiup kencang isyarat memanggil raja-raja kapal niaga merapat ke perairan pelabuhan banda neira." }
    ],
    facts: { population: "1,8 Juta", area: "46.914 km²", uniqueFact: "Pusat Kepulauan Banda, satu-satunya penghasil pala sedunia pada aba pertengahan.", established: "12 Agustus 1958" },
    geography: { type: "island", landmarks: ["Pantai Ora", "Banda Neira"] }
  },
  {
    id: "Maluku Utara",
    name: "Maluku Utara",
    island: "maluku",
    capital: "Sofifi",
    region: "Maluku",
    description: "Kawasan kepulauan vulkanik rumah Kesultanan Ternate dan Tidore rempah-rempah penjaga stabilitas politik cengkeh berabad peninggalan loji benteng portugis spanyol belanda menjajah bumi morotai surga diving.",
    heroImage: "https://images.unsplash.com/photo-1681284589239-0158ed704ef1?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Soya-Soya", description: "Tarian pantang menyerah kesultanan ternate menyongsong bala bantuan mengusir kolonialis penjajah merdeka angkat parang salawaku berani syahid gugur bunga." },
      { category: "Pakaian", icon: "shirt", title: "Baju Kimun Gia", description: "Busana beludru sakral berwarna merah berhias naga perak khusus keturunan sultan ternate menghadiri pembacaan titah legundi keraton halmahera gagah gempita merdeka utara raya." },
      { category: "Kuliner", icon: "utensils", title: "Gohu Ikan", description: "Sashimi ala ternate cacahan cakalang mentah segar dilumuri perasan lemon cui bawang merah kacang tanah sangrai kemangi sedap merangsang raga jiwa." },
      { category: "Musik", icon: "headphones", title: "Tifa", description: "Tabuh kendang silinder batang kayu ulin menopang tarian memanggil ikan lautan pasifik morotai halal laut halmahera melimpah berkat." }
    ],
    facts: { population: "1,3 Juta", area: "31.982 km²", uniqueFact: "Memiliki keunikan pecahan uang pecahan kertas seribu rupiah latar belakang pulau maitara.", established: "4 Oktober 1999" },
    geography: { type: "island", landmarks: ["Gunung Gamalama", "Pulau Morotai"] }
  }
];

export const nusaTenggaraProvinces: ProvinceData[] = [
  {
    id: "Bali",
    name: "Bali",
    island: "nusa-tenggara",
    capital: "Denpasar",
    region: "Nusa Tenggara",
    description: "Tanah surga dewata mendunia ribuan Pura bertebaran harum dupa dupa cempaka membelah terasering subak senyum ramah menyambut mentari terbenam kuta pariwisata nusantara mempesona tiada henti memikat bule asing turis domistik agung luhur.",
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Kecak", description: "Sihir vokal paduan suara puluhan pria bertelanjang dada menirukan ritme sakral epik dewa rama menyelamatkan sinta dari sekapan rahwana malam purnama uluwatu sakti mandraguna mempesona." },
      { category: "Pakaian", icon: "shirt", title: "Udeng", description: "Ikat kepala pria melambangkan kewibawaan menyatukan fokus ibadah memuja sang hyang widhi wasa agung cipta segala semesta damai shanti shanti om awignam astu." },
      { category: "Kuliner", icon: "utensils", title: "Ayam Betutu", description: "Ayam utuh diisi cincangan genep dasar bali bumbu jangkep dipanggang lambat daun pisang batang pisang rempah bumbu asap kayu sedap legit gurih tak terbatas nikmat tuhan." },
      { category: "Musik", icon: "headphones", title: "Gamelan Bali", description: "Alunan bilah gong perunggu bertempo cepat dinamis agresif tapi mengalun lincah meniru riak ombak sanur terjang menendang pesisir pantai karang nusa lembongan bali dewa dewi kahyangan indah." }
    ],
    facts: { population: "4,3 Juta", area: "5.780 km²", uniqueFact: "Subak menjadi sistem irigasi warisan budaya agraris dunia yang ditetapkan UNESCO pengairan sawah padi subur dewi sri berkat karunia hyang.", established: "14 Agustus 1958" },
    geography: { type: "island", landmarks: ["Ubud", "Pura Uluwatu", "Terasering Jatiluwih"] }
  },
  {
    id: "Nusa Tenggara Barat",
    name: "Nusa Tenggara Barat",
    island: "nusa-tenggara",
    capital: "Mataram",
    region: "Nusa Tenggara",
    description: "Lombok Sumbawa berdampingan gagah Rinjani berpasir putih mandalika memeluk adat sasak samawa mbojo kokoh tegar kental religius mandiri kuat berlari kuda sirup tambora manis pulau sapi mutiara selatan nusantara barat tenggara menanti balap motor mendunia sirkuit mutiara.",
    heroImage: "https://images.unsplash.com/photo-1582239401765-a8907304df36?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Peresean", description: "Adu kejantanan dua petarung suku sasak bersenjatakan rotan dan perisai kulit kerbau lambang pelampiasan heroik ksatria melindungi kehormatan keluarga dan memanggil hujan lebat membasahi ladang kemarau." },
      { category: "Pakaian", icon: "shirt", title: "Lumbung", description: "Tenun songket sukara khas sasak benang mengkilat sarung ikat ditenun wanita pra nikah syariat adat kesempurnaan seorang ibunda mandiri tangguh memintal senja menyatu cinta sejati kekal." },
      { category: "Kuliner", icon: "utensils", title: "Ayam Taliwang", description: "Ayam kampung muda bakar lumuran bumbu bajag pedas terasi lombok melepuh keringat bercucuran kenikmatan hakiki pelengkap nasi hangat kangkung pelecing jeruk peras." },
      { category: "Musik", icon: "headphones", title: "Gendang Beleq", description: "Pukulan kendang silinder raksasa gendong depan dikawal prajurit gempita memacu jantung medan perang bertempur heroik sasak pedalaman kaki gunung rinjani tinggi menjulang awan." }
    ],
    facts: { population: "5,3 Juta", area: "20.153 km²", uniqueFact: "Rinjani adalah gunung berapi terekstrem tertinggi ke-2 Indonesia dengan danau kawah Segara Anak membiru jernih mempesona.", established: "14 Agustus 1958" },
    geography: { type: "island", landmarks: ["Gunung Rinjani", "Sirkuit Mandalika"] }
  },
  {
    id: "Nusa Tenggara Timur",
    name: "Nusa Tenggara Timur",
    island: "nusa-tenggara",
    capital: "Kupang",
    region: "Nusa Tenggara",
    description: "Provinsi pulau-pulau kering tropis sarang komodo raksasa belahan timur danau tiga warna kelimutu tenun ikat sumba peninggalan purba magis megalit bitauni pesona savanah keajaiban fana abadi eksotis dunia tenggara eksotis pesona nusa alam tuhan terindah memukau sanubari timur terik matahari.",
    heroImage: "https://images.unsplash.com/photo-1544644181-1484b3f8c5c4?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Caci", description: "Permainan cambuk mabar berdarah kesatria manggarai kehebatan uji tangkas menghapuskan dosa keluh kesah duka berganti keringat luka sabet penawar keberkahan bumi menguning masa tanam tuak sopi manggarai." },
      { category: "Pakaian", icon: "shirt", title: "Tenun Ikat Sumba", description: "Mahakarya simetri warna alam darah hewan indigo getah mewujudkan cerita rakyat buaya naga kerbau penyu kain keabadian penutup lelap sang arwah menemui pencipta sang marapu luhur." },
      { category: "Kuliner", icon: "utensils", title: "Se'i", description: "Asap daging babi atau sapi kayu kosambi berjam jam merah mengkilat memunculkan aroma semerbak rempah diselingi daun singkong tumisan lombok ende pedas mantap tak terkira nikmat surga kupang timor ratahan larantuka solor lembata alor sabu rote." },
      { category: "Musik", icon: "headphones", title: "Sasando", description: "Alat dawai tabung bambu dilengkungkan daun lontar merdu sayup petikan melayang menyeberangi bukit sabana rote merayu gembala domba rindu belahan jiwa memintal benang cinta purnama menanti terbit pagi bersinar timor terang jaya megah lestari tiada duanya nusantara." }
    ],
    facts: { population: "5,3 Juta", area: "48.718 km²", uniqueFact: "Merupakan habitat asli naga darat purba kadal terbesar bumi Biawak Komodo Pulau Rinca.", established: "20 Desember 1958" },
    geography: { type: "island", landmarks: ["Pulau Komodo", "Danau Kelimutu"] }
  }
];
