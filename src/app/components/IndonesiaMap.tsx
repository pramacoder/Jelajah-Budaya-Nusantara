import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { useCloudNav } from "./Layout";
import { motion, AnimatePresence } from "motion/react";
import { allProvinces } from "../data";
import { Plus, Minus } from "lucide-react";

const geoUrl = "/indonesia.json"; // Path to geojson in public folder

export function IndonesiaMap() {
  const navigate = useCloudNav();
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ coordinates: [118, -2] as [number, number], zoom: 1 });

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (newPosition: { coordinates: [number, number]; zoom: number }) => {
    let [x, y] = newPosition.coordinates;
    
    // Batas koordinat Indonesia (Bujur 95 - 141, Lintang -11 - 6)
    // Ditambah sedikit padding agar tidak kaku
    const minX = 90;
    const maxX = 146;
    const minY = -15;
    const maxY = 10;

    if (x < minX) x = minX;
    if (x > maxX) x = maxX;
    if (y < minY) y = minY;
    if (y > maxY) y = maxY;

    setPosition({ coordinates: [x, y], zoom: newPosition.zoom });
  };

  return (
    <div className="w-full h-screen pt-16 bg-[#0a1628] overflow-hidden relative touch-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full h-full bg-[#0d1f38] relative"
      >
        {/* Zoom Controls */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 bg-white/10 hover:bg-amber-500 hover:text-[#0a1628] backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all shadow-lg border border-white/20 cursor-pointer"
            title="Zoom In"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 bg-white/10 hover:bg-amber-500 hover:text-[#0a1628] backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all shadow-lg border border-white/20 cursor-pointer"
            title="Zoom Out"
          >
            <Minus className="w-5 h-5" />
          </button>
        </div>

        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 1500, center: [118, -2] }}
          className="w-full h-full outline-none"
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
            minZoom={1}
            maxZoom={4}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const provinceName = geo.properties.state || geo.properties.Propinsi;
                  const matchedProvince = allProvinces.find(
                    (p) =>
                      p.name.toLowerCase() === provinceName?.toLowerCase() ||
                      p.id.toLowerCase() === provinceName?.toLowerCase()
                  );

                  const isHovered = hoveredProvince === matchedProvince?.id;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={(e) => {
                        if (matchedProvince) {
                          setHoveredProvince(matchedProvince.id);
                          setTooltipContent(matchedProvince.name);
                          setTooltipPosition({ x: e.clientX, y: e.clientY });
                        }
                      }}
                      onMouseMove={(e) => {
                        setTooltipPosition({ x: e.clientX, y: e.clientY });
                      }}
                      onMouseLeave={() => {
                        setHoveredProvince(null);
                        setTooltipContent("");
                      }}
                      onClick={() => {
                        if (matchedProvince) {
                          navigate(`/indonesia/${matchedProvince.id.toLowerCase().replace(/ /g, "_")}`);
                        }
                      }}
                      style={{
                        default: {
                          fill: "#1a365d",
                          stroke: "#4299e1",
                          strokeWidth: 0.5,
                          outline: "none",
                          transition: "fill 250ms",
                        },
                        hover: {
                          fill: "#fbbf24",
                          stroke: "#fff",
                          strokeWidth: 1,
                          outline: "none",
                          cursor: matchedProvince ? "pointer" : "default",
                        },
                        pressed: {
                          fill: "#d97706",
                          outline: "none",
                        },
                      }}
                      className={`transition-colors duration-300 ${isHovered ? "drop-shadow-lg" : ""}`}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {/* Custom Tooltip */}
        <AnimatePresence>
          {tooltipContent && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed z-50 pointer-events-none bg-[#1a1a2e] border border-amber-400/30 text-white px-4 py-2 rounded-lg shadow-xl"
              style={{
                top: tooltipPosition.y - 45,
                left: tooltipPosition.x - 20,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              <div className="flex flex-col">
                <span className="text-amber-400 font-medium">{tooltipContent}</span>
                <span className="text-xs text-blue-200/70 hidden sm:inline">Klik untuk jelajah</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
