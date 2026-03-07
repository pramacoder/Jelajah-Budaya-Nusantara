import { motion } from "motion/react";
const cloud1 = "/images/cloud1.svg";
const cloud2 = "/images/cloud2.svg";

interface CloudTransitionProps {
  phase: "closing" | "opening" | "idle";
}

interface CloudItem {
  id: number;
  img: string;
  side: "left" | "right";
  top: string;
  width: string;
  opacity: number;
  rotate: number;
  flipX: boolean;
  flipY: boolean;
  delay: number;
  zIndex: number;
  overlapPercent: string;
}

const clouds: CloudItem[] = [
  // =============================================
  // TOP SECTION — flipped vertically so cloud mass covers top of screen
  // =============================================
  // Large top-left flipped cloud
  { id: 1, img: cloud1, side: "left", top: "-45%", width: "130vw", opacity: 1, rotate: 0, flipX: false, flipY: true, delay: 0, zIndex: 8, overlapPercent: "35%" },
  // Large top-right flipped cloud
  { id: 2, img: cloud2, side: "right", top: "-45%", width: "130vw", opacity: 1, rotate: 0, flipX: true, flipY: true, delay: 0, zIndex: 8, overlapPercent: "35%" },
  // Second row flipped left
  { id: 3, img: cloud2, side: "left", top: "-35%", width: "120vw", opacity: 0.95, rotate: 2, flipX: true, flipY: true, delay: 0.02, zIndex: 7, overlapPercent: "30%" },
  // Second row flipped right
  { id: 4, img: cloud1, side: "right", top: "-35%", width: "120vw", opacity: 0.95, rotate: -2, flipX: false, flipY: true, delay: 0.02, zIndex: 7, overlapPercent: "30%" },

  // =============================================
  // LEFT GROUP — normal orientation, covers middle to bottom
  // =============================================
  { id: 5, img: cloud1, side: "left", top: "10%", width: "120vw", opacity: 1, rotate: 0, flipX: false, flipY: false, delay: 0, zIndex: 5, overlapPercent: "25%" },
  { id: 6, img: cloud2, side: "left", top: "25%", width: "115vw", opacity: 0.95, rotate: 2, flipX: true, flipY: false, delay: 0.03, zIndex: 4, overlapPercent: "22%" },
  { id: 7, img: cloud1, side: "left", top: "42%", width: "118vw", opacity: 1, rotate: -2, flipX: false, flipY: false, delay: 0.04, zIndex: 3, overlapPercent: "24%" },
  { id: 8, img: cloud2, side: "left", top: "58%", width: "115vw", opacity: 0.95, rotate: 3, flipX: true, flipY: false, delay: 0.05, zIndex: 3, overlapPercent: "22%" },
  { id: 9, img: cloud1, side: "left", top: "75%", width: "120vw", opacity: 1, rotate: -1, flipX: false, flipY: false, delay: 0.02, zIndex: 2, overlapPercent: "25%" },

  // =============================================
  // RIGHT GROUP — normal orientation, covers middle to bottom
  // =============================================
  { id: 10, img: cloud2, side: "right", top: "12%", width: "120vw", opacity: 1, rotate: 0, flipX: true, flipY: false, delay: 0, zIndex: 5, overlapPercent: "25%" },
  { id: 11, img: cloud1, side: "right", top: "28%", width: "115vw", opacity: 0.95, rotate: -3, flipX: false, flipY: false, delay: 0.03, zIndex: 4, overlapPercent: "22%" },
  { id: 12, img: cloud2, side: "right", top: "45%", width: "118vw", opacity: 1, rotate: 2, flipX: true, flipY: false, delay: 0.04, zIndex: 3, overlapPercent: "24%" },
  { id: 13, img: cloud1, side: "right", top: "62%", width: "115vw", opacity: 0.95, rotate: -2, flipX: false, flipY: false, delay: 0.05, zIndex: 3, overlapPercent: "22%" },
  { id: 14, img: cloud2, side: "right", top: "78%", width: "120vw", opacity: 1, rotate: 2, flipX: true, flipY: false, delay: 0.02, zIndex: 2, overlapPercent: "25%" },

  // =============================================
  // BOTTOM SEAL — extra clouds at very bottom
  // =============================================
  { id: 15, img: cloud2, side: "left", top: "88%", width: "125vw", opacity: 1, rotate: 0, flipX: false, flipY: false, delay: 0.01, zIndex: 6, overlapPercent: "30%" },
  { id: 16, img: cloud1, side: "right", top: "88%", width: "125vw", opacity: 1, rotate: 0, flipX: true, flipY: false, delay: 0.01, zIndex: 6, overlapPercent: "30%" },

  // =============================================
  // CENTER FILL — deep overlap to seal the left-right seam
  // =============================================
  { id: 17, img: cloud1, side: "left", top: "20%", width: "90vw", opacity: 0.9, rotate: 4, flipX: false, flipY: false, delay: 0.07, zIndex: 7, overlapPercent: "40%" },
  { id: 18, img: cloud2, side: "right", top: "35%", width: "90vw", opacity: 0.9, rotate: -4, flipX: true, flipY: false, delay: 0.07, zIndex: 7, overlapPercent: "40%" },
  { id: 19, img: cloud1, side: "left", top: "52%", width: "85vw", opacity: 0.85, rotate: -3, flipX: true, flipY: false, delay: 0.09, zIndex: 7, overlapPercent: "38%" },
  { id: 20, img: cloud2, side: "right", top: "68%", width: "88vw", opacity: 0.85, rotate: 3, flipX: false, flipY: false, delay: 0.09, zIndex: 7, overlapPercent: "38%" },

  // =============================================
  // TOP CENTER FILL — flipped clouds filling seam at top
  // =============================================
  { id: 21, img: cloud1, side: "left", top: "-25%", width: "95vw", opacity: 0.9, rotate: -3, flipX: true, flipY: true, delay: 0.06, zIndex: 9, overlapPercent: "42%" },
  { id: 22, img: cloud2, side: "right", top: "-25%", width: "95vw", opacity: 0.9, rotate: 3, flipX: false, flipY: true, delay: 0.06, zIndex: 9, overlapPercent: "42%" },
];

export function CloudTransition({ phase }: CloudTransitionProps) {
  if (phase === "idle") return null;

  const isClosing = phase === "closing";

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {/* Soft white backdrop to fill any micro-gaps */}
      <motion.div
        initial={isClosing ? { opacity: 0 } : { opacity: 1 }}
        animate={isClosing ? { opacity: 1 } : { opacity: 0 }}
        transition={{
          duration: isClosing ? 0.5 : 0.4,
          delay: isClosing ? 0.35 : 0.15,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-gradient-to-b from-[#e8e4e0] via-[#f0ece8] to-[#ddd8d2]"
        style={{ zIndex: 0 }}
      />

      {clouds.map((c) => {
        const hideX = c.side === "left" ? "-105%" : "105%";
        const showX = "0%";

        const positionStyle: React.CSSProperties = {
          top: c.top,
          width: c.width,
          zIndex: c.zIndex,
          ...(c.side === "left"
            ? { right: c.overlapPercent }
            : { left: c.overlapPercent }),
        };

        // Build transform: combine rotate, flipX, flipY
        const scaleX = c.flipX ? -1 : 1;
        const scaleY = c.flipY ? -1 : 1;
        const imgTransform = `rotate(${c.rotate}deg) scale(${scaleX}, ${scaleY})`;

        return (
          <motion.div
            key={c.id}
            initial={isClosing ? { x: hideX } : { x: showX }}
            animate={isClosing ? { x: showX } : { x: hideX }}
            transition={{
              duration: isClosing ? 0.8 : 0.85,
              delay: c.delay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="absolute"
            style={positionStyle}
          >
            <img
              src={c.img}
              alt=""
              draggable={false}
              className="w-full h-auto select-none"
              style={{
                transform: imgTransform,
                opacity: c.opacity,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
