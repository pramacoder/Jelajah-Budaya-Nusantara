import { useCloudNav } from "./Layout";
import { motion } from "motion/react";
import {
  Compass,
  Sparkles,
  Globe,
  Gamepad2,
  Map,
  BookOpen,
  Users,
  Trophy,
  ChevronRight,
  Music,
  UtensilsCrossed,
  Shirt,
  Headphones,
  Zap,
  Star,
} from "lucide-react";
import earthImage from "../../assets/earth.png";
import logoSvg from "../../assets/logo.svg";
import { useState } from "react";
import { useAuth } from "./auth/AuthContext";
import { UserAvatar } from "./auth/UserAvatar";
import { AuthModal } from "./auth/AuthModal";

/* ── Statistik singkat ── */
const STATS = [
  { value: "34", label: "Provinsi", icon: <Map className="w-4 h-4" /> },
  { value: "4", label: "Kategori Budaya", icon: <BookOpen className="w-4 h-4" /> },
  { value: "100+", label: "Entri Budaya", icon: <Star className="w-4 h-4" /> },
  { value: "3", label: "Mode Kuis", icon: <Gamepad2 className="w-4 h-4" /> },
];

/* ── Kategori budaya yang tersedia ── */
const CULTURE_CATEGORIES = [
  {
    icon: <Music className="w-7 h-7" />,
    label: "Tarian & Seni",
    desc: "Ragam tari tradisional dari setiap penjuru Nusantara, dari Saman hingga Kecak.",
    color: "#4cc9f0",
    glow: "rgba(76,201,240,0.15)",
  },
  {
    icon: <UtensilsCrossed className="w-7 h-7" />,
    label: "Kuliner Khas",
    desc: "Cita rasa autentik dari dapur tradisional setiap daerah di Indonesia.",
    color: "#e85d04",
    glow: "rgba(232,93,4,0.15)",
  },
  {
    icon: <Shirt className="w-7 h-7" />,
    label: "Pakaian Adat",
    desc: "Busana kebesaran dan pakaian upacara yang sarat makna filosofi lokal.",
    color: "#06d6a0",
    glow: "rgba(6,214,160,0.15)",
  },
  {
    icon: <Headphones className="w-7 h-7" />,
    label: "Musik Tradisional",
    desc: "Alat musik dan irama khas dari Sabang sampai Merauke.",
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.15)",
  },
];

/* ── Fitur utama sistem ── */
const FEATURES = [
  {
    step: "01",
    icon: <Map className="w-6 h-6" />,
    title: "Peta Interaktif Indonesia",
    desc: "Klik provinsi mana saja di peta Indonesia untuk langsung masuk ke halaman budaya daerah tersebut. Dilengkapi zoom & navigasi bebas.",
    color: "#4cc9f0",
    action: "/indonesia",
    actionLabel: "Buka Peta",
  },
  {
    step: "02",
    icon: <BookOpen className="w-6 h-6" />,
    title: "Ensiklopedia Budaya",
    desc: "Setiap provinsi memiliki halaman detail lengkap: deskripsi, statistik populasi, luas wilayah, dan minimal 4 entri budaya unik.",
    color: "#06d6a0",
    action: null,
    actionLabel: null,
  },
  {
    step: "03",
    icon: <Gamepad2 className="w-6 h-6" />,
    title: "Kuis Budaya",
    desc: "Tiga mode kuis: Kuis Cepat (10 soal acak), Kuis Harian (reset tiap hari), dan Kuis per Provinsi untuk mendalami daerah tertentu.",
    color: "#a855f7",
    action: "/quiz",
    actionLabel: "Mulai Kuis",
  },
  {
    step: "04",
    icon: <Users className="w-6 h-6" />,
    title: "Mode Kelas (Multiplayer)",
    desc: "Host membuat room berkode, peserta bergabung, dan semua bersaing menjawab soal secara real-time dalam satu sesi kelas yang seru.",
    color: "#f72585",
    action: "/quiz",
    actionLabel: "Masuk Kelas",
  },
  {
    step: "05",
    icon: <Trophy className="w-6 h-6" />,
    title: "Leaderboard & Podium",
    desc: "Setiap sesi kelas diakhiri dengan podium juara, animasi konfeti, dan skor real-time yang terakumulasi selama permainan.",
    color: "#fbbf24",
    action: null,
    actionLabel: null,
  },
  {
    step: "06",
    icon: <Zap className="w-6 h-6" />,
    title: "Akun & Progres",
    desc: "Daftar akun gratis untuk menyimpan riwayat kuis, memantau progres belajar, dan mengakses fitur eksklusif member.",
    color: "#D4621A",
    action: null,
    actionLabel: null,
  },
];

export function HomePage() {
  const navigate = useCloudNav();
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "#070c16" }}>

      {/* ══════════════════════════════════
          HERO
      ══════════════════════════════════ */}
      <div className="relative min-h-screen overflow-hidden flex flex-col">

        {/* Earth background */}
        <div className="absolute inset-0 pointer-events-none">
          <img src={earthImage} alt="Bumi Indonesia" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, rgba(7,12,22,0.65) 0%, rgba(7,12,22,0.3) 50%, rgba(7,12,22,1) 100%)"
          }} />
          {/* subtle radial glow */}
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(212,98,26,0.08) 0%, transparent 70%)"
          }} />
        </div>

        {/* ── Navbar ── */}
        <div className="relative z-50 flex items-center justify-between px-6 md:px-10 py-5 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <img src={logoSvg} alt="Logo Jelajah Budaya Nusantara" className="w-9 h-9 rounded-full" />
            <span className="text-white font-bold text-base hidden sm:block"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Jelajah Budaya Nusantara
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/indonesia")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-white/70 hover:text-white text-sm font-medium transition-colors cursor-pointer"
            >
              <Map className="w-4 h-4" /> Peta
            </button>
            <button
              onClick={() => navigate("/quiz")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-white/70 hover:text-white text-sm font-medium transition-colors cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4" /> Kuis
            </button>
            {user ? (
              <UserAvatar />
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-5 py-2 rounded-full font-bold shadow-lg transition-all cursor-pointer text-sm"
                style={{ background: "#D4621A", color: "#fff" }}
              >
                Masuk / Daftar
              </button>
            )}
          </div>
        </div>

        {/* ── Hero Content ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center pb-28 pt-4">

          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-6"
          >
            <img
              src={logoSvg}
              alt="Logo Jelajah Budaya Nusantara"
              className="w-24 h-24 mx-auto rounded-full drop-shadow-[0_0_20px_rgba(251,191,36,0.3)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{
              background: "rgba(212,98,26,0.12)",
              color: "#D4621A",
              border: "1px solid rgba(212,98,26,0.3)",
            }}
          >
            Platform Edukatif Budaya Indonesia
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-white mb-5"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
              lineHeight: 1.15,
              textShadow: "0 2px 30px rgba(0,0,0,0.5)",
            }}
          >
            Jelajahi Keanekaragaman
            <br />
            <span style={{ color: "#fbbf24" }}>Budaya Indonesia</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-white/65 max-w-2xl mb-10"
            style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", lineHeight: 1.75 }}
          >
            Satu platform untuk mengenal tarian, kuliner, pakaian adat & musik tradisional
            dari <span className="text-amber-300 font-semibold">34 Provinsi</span> di
            seluruh Nusantara — lengkap dengan peta interaktif & kuis seru.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(212,98,26,0.5)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/indonesia")}
              className="flex items-center justify-center gap-3 px-9 py-4 rounded-full text-white font-bold shadow-xl cursor-pointer"
              style={{ background: "#D4621A", fontSize: "1.05rem" }}
            >
              <Compass className="w-5 h-5" />
              Mulai Perjalanan
              <Sparkles className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/quiz")}
              className="flex items-center justify-center gap-3 px-9 py-4 rounded-full text-white font-bold cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(12px)",
                fontSize: "1.05rem",
              }}
            >
              <Gamepad2 className="w-5 h-5 text-amber-400" />
              Mainkan Kuis
            </motion.button>
          </motion.div>
        </div>

        {/* Stats bar — pinned to bottom of hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="relative z-20 w-full max-w-3xl mx-auto px-6 pb-10"
        >
          <div className="grid grid-cols-4 gap-px overflow-hidden rounded-2xl"
            style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}>
            {STATS.map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center py-4 px-2 gap-1"
                style={{ background: "rgba(13,21,32,0.7)", backdropFilter: "blur(12px)" }}>
                <span className="text-amber-400/60">{s.icon}</span>
                <span className="text-white font-bold text-lg leading-none">{s.value}</span>
                <span className="text-white/40 text-xs text-center leading-tight">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════
          KATEGORI BUDAYA
      ══════════════════════════════════ */}
      <section className="px-6 md:px-10 py-24 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{ background: "rgba(251,191,36,0.08)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.2)" }}>
            Konten Tersedia
          </span>
          <h2 className="text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)" }}>
            4 Kategori <span style={{ color: "#fbbf24" }}>Kekayaan Budaya</span>
          </h2>
          <p className="text-white/45 max-w-lg mx-auto text-sm leading-relaxed">
            Setiap provinsi dirangkum dalam empat dimensi budaya yang saling melengkapi.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CULTURE_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="group relative rounded-2xl p-6 overflow-hidden transition-all duration-300 cursor-default"
              style={{
                background: "#0d1520",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = cat.color + "45";
                el.style.boxShadow = `0 0 28px ${cat.glow}`;
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }} />

              {/* Subtle corner glow */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: cat.glow }} />

              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{
                  background: cat.color + "12",
                  border: `1px solid ${cat.color}28`,
                  color: cat.color,
                }}>
                {cat.icon}
              </div>

              <h3 className="text-white font-bold text-base mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                {cat.label}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          CARA KERJA SISTEM (FITUR)
      ══════════════════════════════════ */}
      <section className="px-6 md:px-10 py-24"
        style={{ background: "linear-gradient(180deg, transparent, rgba(212,98,26,0.03), transparent)" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{ background: "rgba(212,98,26,0.1)", color: "#D4621A", border: "1px solid rgba(212,98,26,0.28)" }}>
              Cara Kerja
            </span>
            <h2 className="text-white mb-3"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)" }}>
              Semua yang Ada di <span style={{ color: "#fbbf24" }}>Platform Ini</span>
            </h2>
            <p className="text-white/45 max-w-lg mx-auto text-sm leading-relaxed">
              Dari eksplorasi mandiri hingga kompetisi kelas — lengkap dalam satu tempat.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: "#0d1520",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = f.color + "40";
                  el.style.boxShadow = `0 0 28px ${f.color}18`;
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.06)";
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Step number accent */}
                <div className="absolute top-5 right-5 text-5xl font-black leading-none select-none pointer-events-none"
                  style={{ color: f.color + "10", fontFamily: "'Playfair Display', serif" }}>
                  {f.step}
                </div>

                <div className="p-7">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: f.color + "12", border: `1px solid ${f.color}28`, color: f.color }}>
                    {f.icon}
                  </div>

                  <h3 className="text-white font-bold text-base mb-2 pr-8"
                    style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.35 }}>
                    {f.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed mb-5">{f.desc}</p>

                  {f.action && (
                    <button
                      onClick={() => navigate(f.action!)}
                      className="flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer group-hover:gap-2.5"
                      style={{ color: f.color }}
                    >
                      {f.actionLabel}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          CTA
      ══════════════════════════════════ */}
      <section className="px-6 md:px-10 py-24">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden text-center px-8 py-16"
            style={{
              background: "linear-gradient(135deg, #130800 0%, #0d1520 60%)",
              border: "1px solid rgba(251,191,36,0.12)",
              boxShadow: "0 0 80px rgba(212,98,26,0.12)",
            }}
          >
            {/* Top amber glow */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-40 rounded-full blur-3xl pointer-events-none"
              style={{ background: "rgba(212,98,26,0.18)" }} />

            {/* Decorative lines */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.4), transparent)" }} />

            <div className="relative z-10">
              <img src={logoSvg} alt="Logo" className="w-16 h-16 mx-auto rounded-full mb-6 drop-shadow-[0_0_16px_rgba(251,191,36,0.25)]" />

              <h2 className="text-white mb-3"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}>
                Siap Memulai <span style={{ color: "#fbbf24" }}>Perjalanan?</span>
              </h2>
              <p className="text-white/50 mb-10 max-w-md mx-auto text-sm leading-relaxed">
                Mulai jelajahi peta interaktif atau langsung uji pengetahuanmu lewat kuis budaya.
                Daftarkan akun gratis untuk menyimpan progresmu.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(212,98,26,0.5)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/indonesia")}
                  className="flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold cursor-pointer"
                  style={{ background: "#D4621A", fontSize: "1rem" }}
                >
                  <Compass className="w-5 h-5" />
                  Jelajahi Peta Indonesia
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate("/quiz")}
                  className="flex items-center gap-2.5 px-8 py-4 rounded-full text-amber-400 font-bold cursor-pointer"
                  style={{
                    border: "1px solid rgba(251,191,36,0.28)",
                    background: "rgba(251,191,36,0.05)",
                    fontSize: "1rem",
                  }}
                >
                  <Gamepad2 className="w-5 h-5" />
                  Coba Kuis Sekarang
                </motion.button>
              </div>

              {!user && (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="mt-6 text-white/35 hover:text-white/60 text-sm underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Atau daftar akun gratis →
                </button>
              )}
            </div>
          </motion.div>
        </div>

        <p className="text-center text-white/20 text-xs mt-14">
          © 2025 Jelajah Budaya Nusantara · Dibuat dengan ❤️ untuk Indonesia
        </p>
      </section>

      <AuthModal isOpen={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </div>
  );
}