import { useState } from "react";
import { useCloudNav } from "./Layout";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, ChevronRight } from "lucide-react";
import mapImage from "../../assets/indonesia-map.png";
import { islandPositions } from "./island-data";

const islandNames: Record<string, string> = {
  sumatra: "Sumatra",
  jawa: "Jawa",
  kalimantan: "Kalimantan",
  sulawesi: "Sulawesi",
  bali: "Bali",
  papua: "Papua",
};

const islandBriefs: Record<
  string,
  { tagline: string; highlights: string[] }
> = {
  sumatra: {
    tagline: "Pulau Andalas — kaya rempah & tradisi Melayu",
    highlights: ["Tari Saman", "Rendang", "Ulos Batak", "Gondang"],
  },
  jawa: {
    tagline: "Pulau Seribu Candi — pusat peradaban Nusantara",
    highlights: ["Tari Bedhaya", "Gudeg", "Batik", "Gamelan"],
  },
  kalimantan: {
    tagline: "Pulau Borneo — hutan tertua & budaya Dayak",
    highlights: ["Tari Hudoq", "Juhu Singkah", "King Baba", "Sape"],
  },
  sulawesi: {
    tagline: "Pulau Celebes — Toraja, Bugis & keberagaman",
    highlights: ["Tari Pakarena", "Coto Makassar", "Baju Bodo", "Pa'pompang"],
  },
  bali: {
    tagline: "Pulau Dewata — seni, spiritualitas & keindahan",
    highlights: ["Tari Kecak", "Babi Guling", "Kebaya Bali", "Gamelan Bali"],
  },
  papua: {
    tagline: "Tanah Cenderawasih — 250+ suku & alam megah",
    highlights: ["Tari Perang", "Papeda", "Koteka", "Tifa"],
  },
};

const highlightIcons = ["💃", "🍛", "👘", "🎵"];

// Where to place the info card relative to each island hotspot
// so it doesn't go off-screen
type CardSide = "right" | "left" | "top";
const cardSide: Record<string, CardSide> = {
  sumatra: "right",
  jawa: "top",
  kalimantan: "right",
  sulawesi: "left",
  bali: "top",
  papua: "left",
};

function getCardPositionClasses(side: CardSide): string {
  switch (side) {
    case "right":
      return "left-full top-1/2 -translate-y-1/2 ml-3";
    case "left":
      return "right-full top-1/2 -translate-y-1/2 mr-3";
    case "top":
      return "bottom-full left-1/2 -translate-x-1/2 mb-3";
  }
}

function getCardInitial(side: CardSide) {
  switch (side) {
    case "right":
      return { opacity: 0, x: -12, scale: 0.95 };
    case "left":
      return { opacity: 0, x: 12, scale: 0.95 };
    case "top":
      return { opacity: 0, y: 12, scale: 0.95 };
  }
}

function getArrowClasses(side: CardSide): string {
  switch (side) {
    case "right":
      return "absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-[#1a1a2e] rotate-45 border-l border-b border-amber-400/30";
    case "left":
      return "absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-[#1a1a2e] rotate-45 border-r border-t border-amber-400/30";
    case "top":
      return "absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1a1a2e] rotate-45 border-r border-b border-amber-400/30";
  }
}

export function IndonesiaMap() {
  const navigate = useCloudNav();
  const [hoveredIsland, setHoveredIsland] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-16 bg-[#0a1628]">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-8 px-4"
      >
        <h1
          className="text-white mb-2"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
          }}
        >
          Peta <span className="text-amber-400">Nusantara</span>
        </h1>
        <p className="text-blue-200/70" style={{ fontSize: "0.95rem" }}>
          Arahkan kursor ke pulau untuk melihat ringkasan budaya, lalu klik
          untuk menjelajahi
        </p>
      </motion.div>

      {/* Map Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative max-w-6xl mx-auto px-4 pb-12"
      >
        <div className="relative rounded-2xl overflow-visible shadow-2xl border border-blue-400/20">
          <img
            src={mapImage}
            alt="Peta Indonesia"
            className="w-full h-auto rounded-2xl"
            draggable={false}
          />

          {/* Island Hotspots */}
          {Object.entries(islandPositions).map(([id, pos]) => {
            const brief = islandBriefs[id];
            const side = cardSide[id];

            return (
              <motion.button
                key={id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + Math.random() * 0.5,
                }}
                className="absolute cursor-pointer group"
                style={{
                  top: pos.top,
                  left: pos.left,
                  width: pos.width,
                  height: pos.height,
                }}
                onMouseEnter={() => setHoveredIsland(id)}
                onMouseLeave={() => setHoveredIsland(null)}
                onClick={() => navigate(`/indonesia/${id}`)}
              >
                {/* Highlight overlay */}
                <div
                  className={`absolute inset-0 rounded-xl transition-all duration-300 ${hoveredIsland === id
                    ? "bg-amber-400/25 border-2 border-amber-400/60 shadow-lg shadow-amber-400/20"
                    : "bg-transparent border-2 border-transparent hover:bg-white/10"
                    }`}
                />

                {/* Pin icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={
                      hoveredIsland === id
                        ? { scale: 1.2, y: -4 }
                        : { scale: 1, y: 0 }
                    }
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <MapPin
                      className={`w-6 h-6 md:w-8 md:h-8 drop-shadow-lg transition-colors ${hoveredIsland === id ? "text-amber-400" : "text-white"
                        }`}
                      fill={
                        hoveredIsland === id
                          ? "rgba(251,191,36,0.3)"
                          : "rgba(255,255,255,0.2)"
                      }
                    />
                  </motion.div>
                </div>

                {/* Info Card on Hover */}
                <AnimatePresence>
                  {hoveredIsland === id && brief && (
                    <motion.div
                      initial={getCardInitial(side)}
                      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className={`absolute z-20 w-56 ${getCardPositionClasses(side)}`}
                      style={{ pointerEvents: "none" }}
                    >
                      <div className="relative bg-[#1a1a2e] border border-amber-400/30 rounded-xl p-3.5 shadow-2xl shadow-black/40">
                        {/* Arrow */}
                        <div className={getArrowClasses(side)} />

                        {/* Island name */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className="text-amber-400"
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              fontSize: "1.05rem",
                            }}
                          >
                            {islandNames[id]}
                          </span>
                        </div>

                        {/* Tagline */}
                        <p
                          className="text-blue-200/70 mb-2.5"
                          style={{ fontSize: "0.72rem", lineHeight: "1.3" }}
                        >
                          {brief.tagline}
                        </p>

                        {/* Highlights grid */}
                        <div className="grid grid-cols-2 gap-1.5 mb-2.5">
                          {brief.highlights.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-1.5 bg-white/5 rounded-md px-2 py-1"
                            >
                              <span style={{ fontSize: "0.75rem" }}>
                                {highlightIcons[i]}
                              </span>
                              <span
                                className="text-blue-100/90 truncate"
                                style={{ fontSize: "0.68rem" }}
                              >
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center gap-1 text-amber-400/80">
                          <span style={{ fontSize: "0.7rem" }}>
                            Klik untuk jelajahi
                          </span>
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

        {/* Island legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {Object.entries(islandNames).map(([id, name]) => (
            <button
              key={id}
              onClick={() => navigate(`/indonesia/${id}`)}
              onMouseEnter={() => setHoveredIsland(id)}
              onMouseLeave={() => setHoveredIsland(null)}
              className={`px-4 py-2 rounded-full border transition-all cursor-pointer ${hoveredIsland === id
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-white/5 text-blue-200/80 border-blue-400/20 hover:bg-white/10"
                }`}
              style={{ fontSize: "0.85rem" }}
            >
              {name}
            </button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
