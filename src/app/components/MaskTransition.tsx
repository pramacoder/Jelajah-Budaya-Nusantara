import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  phase: "idle" | "closing" | "opening";
}

export function MaskTransition({ phase }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1 = useRef<HTMLDivElement>(null);
  const layer2 = useRef<HTMLDivElement>(null);
  const layer3 = useRef<HTMLDivElement>(null);

  // Pola belah ketupat (diamond) yang akan melebar menutupi layar penuh
  const pointZero = "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)";
  const fullCover = "polygon(50% -150%, 250% 50%, 50% 250%, -150% 50%)";

  useEffect(() => {
    if (phase === "idle") return;

    const tl = gsap.timeline();

    if (phase === "closing") {
      gsap.set(containerRef.current, { display: "block" });
      
      gsap.set([layer1.current, layer2.current, layer3.current], { 
        clipPath: pointZero
      });

      // Animasi melebar keluar (berlapis)
      tl.to(layer1.current, { clipPath: fullCover, duration: 0.6, ease: "power2.inOut" }, 0)
        .to(layer2.current, { clipPath: fullCover, duration: 0.6, ease: "power2.inOut" }, 0.1)
        .to(layer3.current, { clipPath: fullCover, duration: 0.6, ease: "power2.inOut" }, 0.2);

    } else if (phase === "opening") {
      // Menyusut ke tengah (kembali ke bentuk titik nol)
      gsap.set([layer1.current, layer2.current, layer3.current], { 
        clipPath: fullCover 
      });

      tl.to(layer3.current, { clipPath: pointZero, duration: 0.6, ease: "power2.inOut" }, 0)
        .to(layer2.current, { clipPath: pointZero, duration: 0.6, ease: "power2.inOut" }, 0.1)
        .to(layer1.current, { clipPath: pointZero, duration: 0.6, ease: "power2.inOut" }, 0.2)
        .set(containerRef.current, { display: "none" });
    }
  }, [phase]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{ display: phase === "idle" ? "none" : "block" }}
    >
      {/* Lapis 1: Motif Emas */}
      <div 
        ref={layer1} 
        className="absolute inset-0 bg-amber-500 flex items-center justify-center"
      />
      {/* Lapis 2: Motif Pola Terang */}
      <div 
        ref={layer2} 
        className="absolute inset-0 bg-[#e2e8f0]"
      />
      {/* Lapis 3: Motif Navy Gelap */}
      <div 
        ref={layer3} 
        className="absolute inset-0 bg-[#0a1628] flex items-center justify-center"
      >
         {/* Hiasan geometris batik kecil di tengah layar yang muncul saat layar tertutup */}
         <div className="w-16 h-16 border-2 border-amber-400 rotate-45 flex items-center justify-center animate-pulse">
            <div className="w-8 h-8 bg-amber-500 rotate-45" />
         </div>
      </div>
    </div>
  );
}
