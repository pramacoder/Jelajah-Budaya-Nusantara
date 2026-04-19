import { ProvinceData } from "./province-types";

export const sulawesiProvinces: ProvinceData[] = [
  {
    id: "Sulawesi Utara",
    name: "Sulawesi Utara",
    island: "sulawesi",
    capital: "Manado",
    region: "Sulawesi",
    description: "Pesona jazirah utara yang diberkati kekayaan koral taman laut Bunaken, serta masyarakat Minahasa toleran yang lekat tradisi Mapalus.",
    heroImage: "https://images.unsplash.com/photo-1544644181-1484b3f8c5c4?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Maengket", description: "Tari perayaan panen Minahasa perpaduan formasi rancak putra-putri bergandengan rukun." },
      { category: "Pakaian", icon: "shirt", title: "Baniang", description: "Pakaian kemeja Minahasa putih sulaman dengan selendang menyilang merah di dada pria." },
      { category: "Kuliner", icon: "utensils", title: "Tinutuan", description: "Bubur sayur Manado bernutrisi jagung labu kuning singkong bayam kemangi lezat nan sehat." },
      { category: "Musik", icon: "headphones", title: "Kolintang", description: "Jajaran kayu ringan Minahasa yang digebuk berlompatan melahirkan nada diatonis mendunia ceria harmonis meriah semarak membahana alam pegunungan utara cemerlang nusa." }
    ],
    facts: { population: "2,6 Juta", area: "13.892 km²", uniqueFact: "Pusat konservasi primata terkecil endemik Tarsius di Tangkoko utara.", established: "13 Desember 1960" },
    geography: { type: "coastal", landmarks: ["Taman Laut Bunaken", "Danau Linow"] }
  },
  {
    id: "Gorontalo",
    name: "Gorontalo",
    island: "sulawesi",
    capital: "Gorontalo",
    region: "Sulawesi",
    description: "Kota Serambi Madinah yang makmur tenang, menjaga keberadaan hiu paus laut Teluk Tomini serta tenun Karawo warisan leluhur pahlawan Nani Wartabone terhormat bermatabat luhur mulia bersahaja tenteram damai sejahtera aman madani sentosa sejuk nyaman.",
    heroImage: "https://images.unsplash.com/photo-1616231920038-7fd5f2eb71dd?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Saronde", description: "Tari pergaulan pra-nikah Gorontalo lempar selendang pada calon meminang di balai adat resmi suci murni ikhlas janji suci berdua cinta kasih selamanya sehidup semati setia." },
      { category: "Pakaian", icon: "shirt", title: "Mili", description: "Kemben gaun ungu keemasan manik mutiara penghias dahi perempuan pesisir teluk tomini ayu jelita manis rupa paras dewi bidadari turun mandi pelangi senja sore cerah." },
      { category: "Kuliner", icon: "utensils", title: "Binte Biluhuta", description: "Sup jagung siram bening racikan udang kelapa parut jeruk limau pemanasan udara pesisiran pantai pasir putih panas sirna sekejap angin laut sore senja bertiup spoi." },
      { category: "Musik", icon: "headphones", title: "Polopalo", description: "Potongan garpu tala bambu bila diketokkan pada lutut menderukan melodi riang hibur hati nelayan sehabis jala ikan tomini raya samudera lepas ombak tenang." }
    ],
    facts: { population: "1,1 Juta", area: "11.257 km²", uniqueFact: "Tempat wisata langka menyelam bersama ikan hiu paus jinak di desa Botubarani.", established: "22 Desember 2000" },
    geography: { type: "coastal", landmarks: ["Pantai Botubarani", "Benteng Otanaha"] }
  },
  {
    id: "Sulawesi Tengah",
    name: "Sulawesi Tengah",
    island: "sulawesi",
    capital: "Palu",
    region: "Sulawesi",
    description: "Pusat megah warisan megalitikum Lore Lindu, dataran yang diapit teluk dan gunung lembah hijau berpagarkan khatulistiwa membentang memotong nusa tengah gagah berani bersatu bangkit pasca tsunami bangkit semangat baru palu nomoni lestari bersemi kembali cerah.",
    heroImage: "https://images.unsplash.com/photo-1606709827010-06b29f7ce678?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Dero", description: "Tari kerakyatan Poso melingkar berpegangan tangan hentak kaki riang perdamaian meredakan amarah bertukar kasih sayang sesama suku pamona damai lestari aman sentosa selamanya." },
      { category: "Pakaian", icon: "shirt", title: "Nggembe", description: "Pakaian blus wanita bermotif berlian kaili benang tebal penutup panjang mekar pelengkap pesta perayaan pasca panen ladang luas bukit lembah palu hijau lestari agung." },
      { category: "Kuliner", icon: "utensils", title: "Kaledo", description: "Singkatan Kaki Lembu Donggala kuah asam pedas sumsum tulang besar dihirup sedotan hangat menyehatkan badan pegal letih lelah kembali seketika segar bugar." },
      { category: "Musik", icon: "headphones", title: "Lalove", description: "Seruling panjang bambu sakral pengiring tarian bala yang tadinya pamali sembarangan dibunyikan demi jaga ketenteraman arwah kuno penjaga lembah kuno batu megalit badak babi rusa." }
    ],
    facts: { population: "3,0 Juta", area: "61.841 km²", uniqueFact: "Mempunyai situs batu megalitikum prasejarah patung purba menyerupai Pulau Paskah di Lembah Bada.", established: "13 April 1964" },
    geography: { type: "inland", landmarks: ["Taman Nasional Lore Lindu", "Pantai Tanjung Karang"] }
  },
  {
    id: "Sulawesi Barat",
    name: "Sulawesi Barat",
    island: "sulawesi",
    capital: "Mamuju",
    region: "Sulawesi",
    description: "Tanah kediaman suku Mandar maritim pemberani pembuat perahu sandeq tercepat mengarungi lautan ombak ganas selat makassar menembus pulau seberang membawa rindu dendam saudagar rempah cendana kamper nusantara jaya emas laut karang birum.",
    heroImage: "https://images.unsplash.com/photo-1627889139268-cb09d020d912?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Bulu Londong", description: "Tari patriotik suku mamasa pembakar semangat perang mengawal kemenangan tempur prajurit berani mati demi harkat martabat keluarga tanah air tanah kelahiran pusaka leluhur." },
      { category: "Pakaian", icon: "shirt", title: "Lipaq Saqbe", description: "Sarung sutra khas suku mandar kebanggaan pelaut gagah menahan angin malam selat makassar selagi mengemudi bintang pari salib selatan navigasi alam purba samudera lepas ombak pasang surut tiada henti memanggil pulang." },
      { category: "Kuliner", icon: "utensils", title: "Jepa", description: "Kepingan roti singkong pipih bakar tungku tembikar sajian pendamping ikan penja tumis cabe perasan jeruk lauk utama melaut jauh berbulan bulan rindu keluarga rindu menanti dermaga bersandar aman damai sentosa di pantai karampuang pulau surga." },
      { category: "Musik", icon: "headphones", title: "Kecapi Mandar", description: "Petikan nada dua dawai pelaut perahu sandeq melantunkan syair kesedihan membelah ombak besar menerjang layar kepiting putih angin barat melanda nusantara kalimantan selatan menyeberang berlabuh selamat sampai tujuan menukar pinang siri kapur pala rempah berkat Tuhan." }
    ],
    facts: { population: "1,4 Juta", area: "16.787 km²", uniqueFact: "Suku Mandar penemu perahu layar bercadik pendorong angin paling ngebut sedunia (Sandeq).", established: "5 Oktober 2004" },
    geography: { type: "coastal", landmarks: ["Pulau Karampuang", "Pantai Dato Majene"] }
  },
  {
    id: "Sulawesi Selatan",
    name: "Sulawesi Selatan",
    island: "sulawesi",
    capital: "Makassar",
    region: "Sulawesi",
    description: "Pusat metropolis timur Indonesia berakar tradisi layar Phinisi Bugis Makassar merantau jauh benua seberang serta Toraja magis alam abadi ritus sakral kematian pemakaman batu gunung tebing tinggi menyentuh awan berkabut pagi dingin sejuk damai.",
    heroImage: "https://images.unsplash.com/photo-1619238445475-4742e8c8ebd3?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Pakarena", description: "Gerakan lamban keibuan kontras dentuman gendang keras Makassar perlambang tabahnya pendamping pejuang suami berlayar tiada kenal lelah mengabdi selamanya setia menjaga martabat harga diri siri na pacce kokoh teguh tegak berdiri pilar jati diri suku unggul bugis jaya." },
      { category: "Pakaian", icon: "shirt", title: "Baju Bodo", description: "Baju kurung persegi megar menerawang kuno warna warni menyala merah muda jingga oranye melambangkan umur derajat sosial gadis makassar perayaan besar keraton bone gowa tallo luwu maros sungguminasa agung mulia megah." },
      { category: "Kuliner", icon: "utensils", title: "Coto Makassar", description: "Air cucian beras putih rendaman rempah rahasia memasak jeroan daging kental gurih disesap bersama burasa hangat perasan jeruk nipis pedas lombok kuning menggigit penawar masuk angin letih letih melaut jauh." },
      { category: "Musik", icon: "headphones", title: "Gendang Bulo", description: "Pukulan kendang kecil bambu beramai riang tarian pemuda memprotes jenaka penjajah zaman dahulu melalui komedi sindiran berbalut musik keras rancak berani bernyanyi lantang ria tanpa takut mati membela kebenaran." }
    ],
    facts: { population: "9,0 Juta", area: "46.717 km²", uniqueFact: "Memiliki tempat kubur tebing pahat Londa Toraja (Rambu Solo) terunik tiada duanya nusantara asia dunia.", established: "13 Desember 1960" },
    geography: { type: "coastal", landmarks: ["Pantai Losari", "Tana Toraja", "Taman Nasional Bantimurung"] }
  },
  {
    id: "Sulawesi Tenggara",
    name: "Sulawesi Tenggara",
    island: "sulawesi",
    capital: "Kendari",
    region: "Sulawesi",
    description: "Provinsi kaya tambang nikel bumi anoa surga selam bahari bawah laut wakatobi karang koral terluas kedua planet bersanding kerajinan perak filigri khas kendari warisan leluhur bugis makassar buton tolaki muna wolio kepulauan wakatobi gugusan karang atol kaledupa tomea binongko wangi wangi berkilau mentari pagi ufuk timur indonesia laut banda pesona dunia tak terhingga indahnya bersyukur nikmat sang pencipta alam semesta abadi selama lamanya.",
    heroImage: "https://images.unsplash.com/photo-1549479361-ecb791ad86df?q=80",
    culture: [
      { category: "Tarian", icon: "music", title: "Tari Lulo", description: "Genggaman erat tari kerakyatan suku tolaki merajut rekonsiliasi permusuhan diubah jadi jembatan kasih memutar alun alun desa syukuran panen beras melimpah ruah makmur sejahtera adil merata tidak ada yang kurang." },
      { category: "Pakaian", icon: "shirt", title: "Kinawo", description: "Pakaian dari kulit kayu purba digodok perasan nangka direndam jadi serat alam anti air warisan pelindung duri hutan tropis hujan meronta tak tertembus duri tajam menjaga keselamatan pengembara pedalaman rimba." },
      { category: "Kuliner", icon: "utensils", title: "Sinonggi", description: "Gumpalan sagu molor disiram kuah asam ikan laut sejenis papeda khas tolaki pengenyang malam hari pemersatu keluarga makan bersama periuk besar satu talam damai sejahtera hangat bincang santai bapak anak ibu mertua rukun selalu." },
      { category: "Musik", icon: "headphones", title: "Dimba", description: "Bedug kulit mengawal tarian mistis memanggil dewi padi kembali bermukim memberkahi kampung halaman buton muna kaledupa wangi wangi bebas tomea binongko selaras serasi menembang syahdu pelik nada tiupan gambus laut banda lepas jernih." }
    ],
    facts: { population: "2,6 Juta", area: "38.067 km²", uniqueFact: "Wakatobi memegang rekor kepemilikan 750 dari 850 ragam spesies koral berbatu perairan lautan seluruh dunia planet bumi flora fauna hayati laut biru jernih wakatobi bangga mendunia.", established: "22 September 1964" },
    geography: { type: "island", landmarks: ["Taman Nasional Wakatobi", "Pulau Labengki"] }
  }
];
