import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { useCloudNav } from "./Layout";
import { motion, AnimatePresence } from "motion/react";
import { allProvinces } from "../data";

const geoUrl = "/indonesia.json"; // Path to geojson in public folder

export function IndonesiaMap() {
  const navigate = useCloudNav();
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  return (
    <div className="min-h-screen pt-16 bg-[#0a1628] flex flex-col items-center">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-8 px-4"
      >
        <h1
          className="text-white mb-2"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
        >
          Peta <span className="text-amber-400">Nusantara</span>
        </h1>
        <p className="text-blue-200/70" style={{ fontSize: "0.95rem" }}>
          Jelajahi 38 Provinsi Kekayaan Budaya Indonesia
        </p>
      </motion.div>

      {/* Map Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full max-w-6xl mx-auto px-4 pb-12"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-blue-400/20 bg-[#0d1f38] group">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 1400, center: [118, -2] }} /* Center on Indonesia */
            className="w-full h-auto"
            style={{ minHeight: "500px" }}
          >
            <ZoomableGroup center={[118, -2]} zoom={1} minZoom={1} maxZoom={4}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const provinceName = geo.properties.state || geo.properties.Propinsi; // Adjust based on JSON properties
                    // Attempt to match geometry province name to our database
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
                            transition: "all 250ms",
                          },
                          hover: {
                            fill: "#fbbf24", // amber-400
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
                  <span className="text-xs text-blue-200/70">Klik untuk jelajah</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
