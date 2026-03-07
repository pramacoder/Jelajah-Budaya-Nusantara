import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Music, UtensilsCrossed, Shirt, Headphones, X, ArrowLeft } from "lucide-react";
import { islands } from "./island-data";
import type { CultureInfo } from "./island-data";
const baliImage = "/images/bali.jpg";
import { useCloudNav } from "./Layout";

const categoryIcons: Record<string, React.ReactNode> = {
  music: <Music className="w-6 h-6" />,
  utensils: <UtensilsCrossed className="w-6 h-6" />,
  shirt: <Shirt className="w-6 h-6" />,
  headphones: <Headphones className="w-6 h-6" />,
};

const categoryColors: Record<string, string> = {
  Tarian: "from-pink-500 to-rose-600",
  Kuliner: "from-amber-500 to-orange-600",
  Pakaian: "from-emerald-500 to-green-600",
  Musik: "from-violet-500 to-purple-600",
};

const categoryBg: Record<string, string> = {
  Tarian: "bg-pink-500/20 border-pink-400/30 text-pink-300",
  Kuliner: "bg-amber-500/20 border-amber-400/30 text-amber-300",
  Pakaian: "bg-emerald-500/20 border-emerald-400/30 text-emerald-300",
  Musik: "bg-violet-500/20 border-violet-400/30 text-violet-300",
};

export function IslandDetail() {
  const { islandId } = useParams();
  const navigate = useCloudNav();
  const [selectedCulture, setSelectedCulture] = useState<CultureInfo | null>(null);

  const island = islands[islandId || ""];

  if (!island) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a1628] text-white">
        <h2 className="mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Pulau tidak ditemukan
        </h2>
        <button
          onClick={() => navigate("/indonesia")}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Peta
        </button>
      </div>
    );
  }

  const heroImage = island.id === "bali" ? baliImage : island.heroImage;

  return (
    <div className="min-h-screen bg-[#0a1628]">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <img
          src={heroImage}
          alt={island.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0a1628]" />

        {/* Island Title Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-8 left-0 right-0 text-center px-6"
        >
          <span
            className="inline-block px-3 py-1 mb-3 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30"
            style={{ fontSize: "0.85rem" }}
          >
            {island.subtitle}
          </span>
          <h1
            className="text-white"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.2,
            }}
          >
            {island.name}
          </h1>
        </motion.div>
      </div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-3xl mx-auto px-6 py-8 text-center"
      >
        <p className="text-blue-200/70" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
          {island.description}
        </p>
      </motion.div>

      {/* Culture Cards */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white text-center mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Kekayaan Budaya
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {island.culture.map((culture, index) => (
            <motion.button
              key={culture.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCulture(culture)}
              className={`p-5 rounded-xl border backdrop-blur-sm text-left cursor-pointer transition-all ${categoryBg[culture.category]}`}
            >
              <div className="mb-3">{categoryIcons[culture.icon]}</div>
              <span
                className="block mb-1 text-white/50"
                style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}
              >
                {culture.category}
              </span>
              <h3 className="text-white" style={{ fontSize: "1.1rem" }}>
                {culture.title}
              </h3>
              <p
                className="mt-2 opacity-60 line-clamp-2"
                style={{ fontSize: "0.85rem" }}
              >
                {culture.description}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal / Pop-up */}
      <AnimatePresence>
        {selectedCulture && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedCulture(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-[#1a2744] rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
            >
              {/* Gradient header */}
              <div
                className={`h-2 bg-gradient-to-r ${categoryColors[selectedCulture.category]}`}
              />

              <div className="p-6">
                <button
                  onClick={() => setSelectedCulture(null)}
                  className="absolute top-4 right-4 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4 text-white" />
                </button>

                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 ${categoryBg[selectedCulture.category]}`}
                  style={{ fontSize: "0.8rem" }}
                >
                  {categoryIcons[selectedCulture.icon]}
                  <span>{selectedCulture.category}</span>
                </div>

                <h2
                  className="text-white mb-4"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.5rem",
                  }}
                >
                  {selectedCulture.title}
                </h2>

                <p
                  className="text-blue-200/70"
                  style={{ fontSize: "0.95rem", lineHeight: 1.7 }}
                >
                  {selectedCulture.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}