export interface CultureInfo {
  category: string;
  icon: string;
  title: string;
  description: string;
}

export interface IslandData {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  heroImage: string;
  culture: CultureInfo[];
}

export const islands: Record<string, IslandData> = {
  sumatra: {
    id: "sumatra",
    name: "Sumatra",
    subtitle: "Pulau Andalas",
    description:
      "Sumatra adalah pulau terbesar keenam di dunia, kaya akan keanekaragaman alam dan budaya. Dari Danau Toba yang megah hingga hutan tropis yang lebat, Sumatra menyimpan keajaiban tak terhingga.",
    heroImage:
      "https://images.unsplash.com/photo-1615009820619-d69e2f948e8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMYWtlJTIwVG9iYSUyMFN1bWF0cmElMjBJbmRvbmVzaWF8ZW58MXx8fHwxNzcyODAwNzU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    culture: [
      {
        category: "Tarian",
        icon: "music",
        title: "Tari Saman",
        description:
          "Tarian tradisional Aceh yang terkenal dengan gerakan tangan dan tubuh yang sinkron. Dikenal sebagai 'Tari Seribu Tangan' dan telah diakui UNESCO sebagai warisan budaya tak benda.",
      },
      {
        category: "Kuliner",
        icon: "utensils",
        title: "Rendang",
        description:
          "Masakan khas Minangkabau yang telah dinobatkan sebagai makanan terlezat di dunia. Dibuat dari daging sapi yang dimasak lama dengan santan dan rempah-rempah.",
      },
      {
        category: "Pakaian",
        icon: "shirt",
        title: "Ulos Batak",
        description:
          "Kain tenun tradisional suku Batak yang memiliki makna filosofis mendalam. Ulos digunakan dalam berbagai upacara adat dan melambangkan kasih sayang.",
      },
      {
        category: "Musik",
        icon: "headphones",
        title: "Gondang Sabangunan",
        description:
          "Ensambel musik tradisional Batak Toba yang menggunakan taganing (drum), ogung (gong), dan alat musik tiup. Dimainkan dalam upacara adat.",
      },
    ],
  },
  jawa: {
    id: "jawa",
    name: "Jawa",
    subtitle: "Pulau Seribu Candi",
    description:
      "Pulau Jawa adalah pusat peradaban Indonesia dengan sejarah ribuan tahun. Dari candi megah Borobudur hingga keraton-keraton yang anggun, Jawa menyimpan kekayaan budaya yang tak ternilai.",
    heroImage:
      "https://images.unsplash.com/photo-1684189162727-3b0fd73ba9e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCb3JvYnVkdXIlMjB0ZW1wbGUlMjBKYXZhJTIwSW5kb25lc2lhfGVufDF8fHx8MTc3Mjc4NDg2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    culture: [
      {
        category: "Tarian",
        icon: "music",
        title: "Tari Bedhaya",
        description:
          "Tarian sakral keraton Jawa yang dilakukan oleh 9 penari putri. Melambangkan keagungan dan keharmonisan alam semesta dalam filosofi Jawa.",
      },
      {
        category: "Kuliner",
        icon: "utensils",
        title: "Gudeg",
        description:
          "Masakan khas Yogyakarta dari nangka muda yang dimasak dengan santan dan gula merah. Rasa manis yang khas menjadi identitas kuliner Jawa Tengah.",
      },
      {
        category: "Pakaian",
        icon: "shirt",
        title: "Batik",
        description:
          "Kain tradisional dengan motif yang dibuat menggunakan teknik perintang warna (wax-resist dyeing). Telah diakui UNESCO sebagai warisan budaya tak benda.",
      },
      {
        category: "Musik",
        icon: "headphones",
        title: "Gamelan",
        description:
          "Ensambel musik tradisional yang menggunakan instrumen perkusi perunggu. Gamelan Jawa memiliki suara yang lembut dan meditatif.",
      },
    ],
  },
  kalimantan: {
    id: "kalimantan",
    name: "Kalimantan",
    subtitle: "Pulau Borneo",
    description:
      "Kalimantan, bagian Indonesia dari pulau Borneo, dikenal dengan hutan hujan tropis tertua di dunia dan keanekaragaman hayati yang luar biasa. Budaya Dayak yang kaya menjadi daya tarik utama.",
    heroImage:
      "https://images.unsplash.com/photo-1624605707211-7109c1899164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmFuZ3V0YW4lMjBCb3JuZW8lMjBLYWxpbWFudGFuJTIwcmFpbmZvcmVzdHxlbnwxfHx8fDE3NzI4MDA3NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    culture: [
      {
        category: "Tarian",
        icon: "music",
        title: "Tari Hudoq",
        description:
          "Tarian ritual suku Dayak Bahau dan Modang yang menggunakan topeng kayu. Dilakukan untuk memohon kesuburan tanah dan perlindungan panen.",
      },
      {
        category: "Kuliner",
        icon: "utensils",
        title: "Juhu Singkah",
        description:
          "Sayur umbut rotan khas Dayak yang dimasak dengan santan. Masakan unik dari bahan yang hanya ditemukan di hutan Kalimantan.",
      },
      {
        category: "Pakaian",
        icon: "shirt",
        title: "Baju King Baba",
        description:
          "Pakaian adat suku Dayak yang dihiasi manik-manik dengan motif alam. Setiap motif memiliki makna spiritual dan menceritakan kisah leluhur.",
      },
      {
        category: "Musik",
        icon: "headphones",
        title: "Sape",
        description:
          "Alat musik petik tradisional Dayak yang memiliki suara merdu dan menenangkan. Sering dimainkan dalam upacara adat dan ritual.",
      },
    ],
  },
  sulawesi: {
    id: "sulawesi",
    name: "Sulawesi",
    subtitle: "Pulau Celebes",
    description:
      "Sulawesi memiliki bentuk yang unik dan menyimpan budaya yang sangat beragam. Dari upacara Rambu Solo Toraja hingga tradisi pelaut Bugis, pulau ini penuh dengan keajaiban.",
    heroImage:
      "https://images.unsplash.com/photo-1619238445475-4742e8c8ebd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb3JhamElMjB0cmFkaXRpb25hbCUyMGhvdXNlJTIwU3VsYXdlc2l8ZW58MXx8fHwxNzcyODAwNzUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    culture: [
      {
        category: "Tarian",
        icon: "music",
        title: "Tari Pakarena",
        description:
          "Tarian tradisional Makassar yang dilakukan oleh penari perempuan dengan gerakan lemah gemulai. Melambangkan keanggunan dan kesabaran.",
      },
      {
        category: "Kuliner",
        icon: "utensils",
        title: "Coto Makassar",
        description:
          "Sup daging khas Makassar dengan bumbu rempah yang kaya. Disajikan dengan ketupat dan sambal tauco yang khas.",
      },
      {
        category: "Pakaian",
        icon: "shirt",
        title: "Baju Bodo",
        description:
          "Pakaian adat wanita Bugis-Makassar yang dikenal sebagai salah satu pakaian tertua di dunia. Warna baju menunjukkan status sosial pemakainya.",
      },
      {
        category: "Musik",
        icon: "headphones",
        title: "Pa'pompang",
        description:
          "Alat musik tiup tradisional Toraja yang terbuat dari bambu. Dimainkan dalam berbagai upacara adat dan perayaan.",
      },
    ],
  },
  bali: {
    id: "bali",
    name: "Bali",
    subtitle: "Pulau Dewata",
    description:
      "Bali, Pulau Dewata, terkenal di seluruh dunia dengan keindahan alam, budaya yang kaya, dan spiritualitas yang mendalam. Setiap sudut pulau ini memancarkan keindahan seni dan tradisi.",
    heroImage: "__BALI_IMAGE__",
    culture: [
      {
        category: "Tarian",
        icon: "music",
        title: "Tari Kecak",
        description:
          "Pertunjukan tari dan drama yang melibatkan puluhan penari pria yang duduk melingkar sambil menyerukan 'cak'. Menggambarkan kisah epik Ramayana.",
      },
      {
        category: "Kuliner",
        icon: "utensils",
        title: "Babi Guling",
        description:
          "Hidangan khas Bali berupa babi yang dipanggang utuh dengan bumbu rempah khas. Menjadi sajian penting dalam upacara keagamaan Hindu Bali.",
      },
      {
        category: "Pakaian",
        icon: "shirt",
        title: "Kebaya Bali",
        description:
          "Pakaian tradisional wanita Bali yang elegan, biasanya dipadukan dengan kain songket. Digunakan dalam upacara keagamaan dan adat.",
      },
      {
        category: "Musik",
        icon: "headphones",
        title: "Gamelan Bali",
        description:
          "Berbeda dengan Gamelan Jawa, Gamelan Bali memiliki tempo yang lebih cepat dan dinamis. Mengiringi hampir semua upacara dan pertunjukan di Bali.",
      },
    ],
  },
  papua: {
    id: "papua",
    name: "Papua",
    subtitle: "Tanah Cenderawasih",
    description:
      "Papua adalah rumah bagi salah satu keanekaragaman budaya terbesar di dunia dengan lebih dari 250 suku asli. Alamnya yang megah dari pegunungan hingga lautan menyimpan keajaiban tak terbatas.",
    heroImage:
      "https://images.unsplash.com/photo-1650445332429-75ceee3f3226?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSYWphJTIwQW1wYXQlMjBQYXB1YSUyMEluZG9uZXNpYXxlbnwxfHx8fDE3NzI4MDA3NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    culture: [
      {
        category: "Tarian",
        icon: "music",
        title: "Tari Perang",
        description:
          "Tarian tradisional yang menggambarkan semangat keberanian prajurit Papua. Penari menggunakan kostum perang lengkap dengan senjata tradisional.",
      },
      {
        category: "Kuliner",
        icon: "utensils",
        title: "Papeda",
        description:
          "Makanan pokok Papua yang terbuat dari sagu. Teksturnya lengket dan biasanya disajikan dengan kuah ikan kuning yang kaya rempah.",
      },
      {
        category: "Pakaian",
        icon: "shirt",
        title: "Koteka",
        description:
          "Pakaian tradisional pria suku Dani di pegunungan tengah Papua. Terbuat dari labu kering dan merupakan simbol identitas budaya.",
      },
      {
        category: "Musik",
        icon: "headphones",
        title: "Tifa",
        description:
          "Alat musik perkusi tradisional Papua yang terbuat dari kayu dan kulit binatang. Suaranya menggelegar dalam setiap upacara adat.",
      },
    ],
  },
};

export const islandPositions: Record<
  string,
  { top: string; left: string; width: string; height: string }
> = {
  sumatra: { top: "28%", left: "8%", width: "18%", height: "45%" },
  jawa: { top: "62%", left: "22%", width: "18%", height: "14%" },
  kalimantan: { top: "20%", left: "28%", width: "22%", height: "38%" },
  sulawesi: { top: "22%", left: "50%", width: "16%", height: "40%" },
  bali: { top: "60%", left: "42%", width: "6%", height: "10%" },
  papua: { top: "25%", left: "70%", width: "22%", height: "35%" },
};
