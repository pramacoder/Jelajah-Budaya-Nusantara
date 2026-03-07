import { useCloudNav } from "./Layout";
import { motion } from "motion/react";
import { Compass, Sparkles, Globe } from "lucide-react";
import earthImage from "../../assets/earth.png";

export function HomePage() {
  const navigate = useCloudNav();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={earthImage}
          alt="Earth view of Indonesia"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <Globe className="w-16 h-16 text-amber-400 mx-auto" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white mb-3"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: 1.2,
          }}
        >
          Jelajahi Keanekaragaman
          <br />
          <span className="text-amber-400">Budaya Indonesia</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-white/80 max-w-xl mb-10"
          style={{ fontSize: "clamp(0.9rem, 2vw, 1.15rem)" }}
        >
          Temukan keajaiban dari Sabang sampai Merauke. Jelajahi tarian, kuliner,
          pakaian adat, dan musik tradisional dari setiap pulau di Nusantara.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 98, 26, 0.4)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/indonesia")}
          className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full shadow-lg cursor-pointer"
          style={{ fontSize: "1.1rem" }}
        >
          <Compass className="w-5 h-5" />
          Mulai Perjalanan
          <Sparkles className="w-5 h-5" />
        </motion.button>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full"
        >
          {[
            { icon: "🏝️", label: "6 Pulau Utama", desc: "Jelajahi budaya unik" },
            { icon: "💃", label: "24+ Budaya", desc: "Tarian, kuliner & lebih" },
            { icon: "🎵", label: "Interaktif", desc: "Pengalaman immersive" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-white">{item.label}</div>
              <div className="text-white/60" style={{ fontSize: "0.85rem" }}>
                {item.desc}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}