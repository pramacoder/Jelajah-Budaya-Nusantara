import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Music, UtensilsCrossed, Shirt, Headphones, X, ArrowLeft, Globe, Users, MapPin, Building2, CalendarDays } from "lucide-react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { getProvinceById } from "../data";
import type { CultureInfo } from "../data/province-types";
import { useCloudNav } from "./Layout";

const categoryIcons: Record<string, React.ReactNode> = {
  music: <Music className="w-6 h-6" />,
  utensils: <UtensilsCrossed className="w-6 h-6" />,
  shirt: <Shirt className="w-6 h-6" />,
  headphones: <Headphones className="w-6 h-6" />,
};

const regionMapConfig: Record<string, { center: [number, number]; scale: number }> = {
  "Sumatera": { center: [102, 0], scale: 2800 },
  "Jawa": { center: [111, -7.5], scale: 4500 },
  "Kalimantan": { center: [114, 0], scale: 2500 },
  "Sulawesi": { center: [121, -2], scale: 2800 },
  "Nusa Tenggara": { center: [120, -8.5], scale: 4000 },
  "Maluku": { center: [129.5, -3], scale: 3500 },
  "Papua": { center: [138, -4.5], scale: 2500 },
};

export function IslandDetail() {
  const { islandId } = useParams();
  const navigate = useCloudNav();
  const [selectedCulture, setSelectedCulture] = useState<CultureInfo | null>(null);
  const [wikiData, setWikiData] = useState<{ extract?: string; thumbnail?: { source: string } } | null>(null);

  const island = getProvinceById(islandId || "");

  useEffect(() => {
    if (island) {
      const fetchWiki = async () => {
        try {
          const response = await fetch(`https://id.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(island.name)}`);
          if (response.ok) {
            const data = await response.json();
            if (data.extract) setWikiData(data);
          }
        } catch (e) {
          console.error("Gagal fetch wikipedia", e);
        }
      };
      fetchWiki();
    }
  }, [island]);

  if (!island) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a1628] text-white">
        <h2 className="mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Provinsi tidak ditemukan
        </h2>
        <button
          onClick={() => navigate("/indonesia")}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-slate-900 rounded-lg cursor-pointer font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Peta
        </button>
      </div>
    );
  }

  const mapConfig = regionMapConfig[island.region] || { center: [118, -2], scale: 1200 };

  return (
    <div className="min-h-screen bg-[#0a1628] pt-24 pb-16 px-6 overflow-x-hidden">
      
      {/* Tombol Kembali */}
      <div className="max-w-7xl mx-auto mb-8">
        <button
          onClick={() => navigate("/indonesia")}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-200 rounded-lg cursor-pointer transition-colors border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          Peta Indonesia
        </button>
      </div>

      {/* Hero Split Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
        
        {/* Kolom Kiri: Teks & Statistik */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8"
        >
          <div>
            <span className="inline-block px-3 py-1 mb-4 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-sm tracking-wider uppercase font-medium">
              {island.region}
            </span>
            <h1 
              className="text-white mb-2"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 5vw, 4.5rem)", lineHeight: 1.1 }}
            >
              {island.name}
            </h1>
            <p className="text-xl text-amber-400/80 font-medium italic">
              {island.subtitle}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-6 p-6 bg-[#1a2744]/40 border border-blue-500/20 rounded-2xl shadow-inner">
            <div>
              <div className="flex items-center gap-2 text-blue-300/60 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider font-semibold">Populasi</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{island.facts.population}</div>
              <div className="text-xs text-blue-200/50">Jiwa (Perkiraan)</div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 text-blue-300/60 mb-1">
                <MapPin className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider font-semibold">Luas Wilayah</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{island.facts.area}</div>
              <div className="text-xs text-blue-200/50">km²</div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-blue-300/60 mb-1">
                <Building2 className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider font-semibold">Ibu Kota</span>
              </div>
              <div className="text-xl font-bold text-amber-400">{island.capital}</div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-blue-300/60 mb-1">
                <CalendarDays className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider font-semibold">Tahun Berdiri</span>
              </div>
              <div className="text-xl font-bold text-amber-400">{island.facts.established}</div>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="space-y-4">
            <p className="text-blue-100/80 text-lg leading-relaxed">
              {island.description}
            </p>
            
            {/* Wikipedia snippet */}
            {wikiData?.extract && (
              <div className="mt-4 p-5 rounded-xl bg-white/5 border-l-4 border-amber-500 relative">
                <h3 className="text-amber-400 text-sm font-semibold mb-2 uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Sekilas dari Wikipedia
                </h3>
                <p className="text-blue-200/60 text-sm leading-relaxed text-justify">
                  {wikiData.extract}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Kolom Kanan: Gambar/Map Provinsi */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-full min-h-[400px] lg:min-h-[600px] flex items-center justify-center rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/10 border border-white/10 group bg-[#0d1f38]/50 backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-transparent z-10 pointer-events-none" />
          
          <div className="w-full h-full absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity duration-700">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: mapConfig.scale, center: mapConfig.center }}
              className="w-full h-[150%] md:h-[120%] outline-none"
            >
              <Geographies geography="/indonesia.json">
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const provinceName = geo.properties.state || geo.properties.Propinsi;
                    const isMatched = 
                      island.name.toLowerCase() === provinceName?.toLowerCase() ||
                      island.id.toLowerCase() === provinceName?.toLowerCase();

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: {
                            fill: isMatched ? "#fbbf24" : "#1a365d",
                            stroke: isMatched ? "#fff" : "#4299e1",
                            strokeWidth: isMatched ? 1.5 : 0.5,
                            outline: "none",
                            opacity: isMatched ? 1 : 0.4,
                          },
                          hover: {
                            fill: isMatched ? "#fbbf24" : "#1a365d",
                            stroke: isMatched ? "#fff" : "#4299e1",
                            strokeWidth: isMatched ? 1.5 : 0.5,
                            outline: "none",
                            opacity: isMatched ? 1 : 0.6,
                          },
                          pressed: {
                            fill: isMatched ? "#d97706" : "#1a365d",
                            outline: "none",
                          },
                        }}
                        className={isMatched ? "drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]" : ""}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>
          
          <div className="absolute bottom-6 left-6 right-6 z-20">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-amber-500/30 text-amber-400 text-sm font-medium shadow-lg shadow-black/50">
                <MapPin className="w-4 h-4" /> Peta Lokasi {island.name}
             </div>
          </div>
        </motion.div>
      </div>

      {/* Culture Cards (Navy & Gold Theme) */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white text-3xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Kekayaan <span className="text-amber-400 italic">Budaya</span>
          </motion.h2>
          <div className="h-px flex-1 bg-gradient-to-r from-amber-500/50 to-transparent ml-8" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {island.culture.map((culture, index) => (
            <motion.button
              key={culture.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCulture(culture)}
              className="group flex flex-col p-6 rounded-2xl text-left transition-all duration-300 bg-[#121f36] border border-[#2a3f65] shadow-lg shadow-black/40 hover:shadow-amber-500/10 hover:border-amber-500/50 relative overflow-hidden"
            >
              {/* Subtle background glow effect on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />
              
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4 border border-amber-500/20 text-amber-400 transition-colors group-hover:bg-amber-500/20">
                {categoryIcons[culture.icon]}
              </div>
              
              <span className="block mb-2 text-amber-400/70 text-xs font-bold uppercase tracking-widest">
                {culture.category}
              </span>
              
              <h3 className="text-white text-xl mb-3 font-serif leading-tight">
                {culture.title}
              </h3>
              
              <p className="text-blue-200/60 text-sm leading-relaxed line-clamp-3">
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
            className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-[#0a1628]/80 backdrop-blur-md"
            onClick={() => setSelectedCulture(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#121f36] rounded-3xl border border-amber-500/30 overflow-hidden shadow-2xl shadow-amber-500/10"
            >
              <div className="h-2 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

              <div className="p-8">
                <button
                  onClick={() => setSelectedCulture(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium">
                  {categoryIcons[selectedCulture.icon]}
                  <span>{selectedCulture.category}</span>
                </div>

                <h2 className="text-white mb-4 text-3xl font-serif">
                  {selectedCulture.title}
                </h2>

                <p className="text-blue-200/80 text-base leading-relaxed">
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