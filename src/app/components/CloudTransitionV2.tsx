import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  phase: "idle" | "closing" | "opening";
}

// Komponen SVG Awan Halus
const CloudSVG = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      d="M400,240c-11-84-142-126-194-48c-66-26-137,28-112,96c-59,20-56,110,6,112h272C457.6,400,458.7,262.3,400,240z"
      fill="currentColor"
    />
  </svg>
);

export function CloudTransitionV2({ phase }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cloudLayer1 = useRef<HTMLDivElement>(null);
  const cloudLayer2 = useRef<HTMLDivElement>(null);
  const cloudLayer3 = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase === "idle") return;

    const tl = gsap.timeline();

    if (phase === "closing") {
      // Pastikan container terlihat
      gsap.set(containerRef.current, { display: "block" });
      
      // Reset posisi awal awan (berada di luar layar/bawah)
      gsap.set([cloudLayer1.current, cloudLayer2.current, cloudLayer3.current], { 
        y: "120%", 
        scale: 1,
        opacity: 1
      });
      gsap.set(bgRef.current, { opacity: 0 });

      // Animasi awan naik menutupi layar
      tl.to(cloudLayer3.current, { y: "-10%", duration: 0.6, ease: "power2.out" }, 0)
        .to(cloudLayer2.current, { y: "-5%", duration: 0.7, ease: "power2.out" }, 0.1)
        .to(cloudLayer1.current, { y: "0%", duration: 0.8, ease: "power2.out" }, 0.2)
        .to(bgRef.current, { opacity: 1, duration: 0.4 }, 0.4); // Background padat untuk menutupi transisi halaman

    } else if (phase === "opening") {
      // Animasi seolah-olah kamera melesat menembus awan (Scale membesar, Opacity menghilang)
      tl.to(bgRef.current, { opacity: 0, duration: 0.4 }, 0)
        .to(cloudLayer1.current, { scale: 3, opacity: 0, duration: 0.8, ease: "power2.inOut" }, 0)
        .to(cloudLayer2.current, { scale: 4, opacity: 0, duration: 0.8, ease: "power2.inOut" }, 0.1)
        .to(cloudLayer3.current, { scale: 5, opacity: 0, duration: 0.8, ease: "power2.inOut" }, 0.2)
        .set(containerRef.current, { display: "none" }); // Sembunyikan sepenuhnya agar tidak mengganggu klik
    }
  }, [phase]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{ display: phase === "idle" ? "none" : "block" }}
    >
      {/* Background Penutup Layar Saat Closing */}
      <div 
        ref={bgRef} 
        className="absolute inset-0 bg-slate-100" 
        style={{ opacity: 0 }} 
      />

      {/* Layer 3: Awan Belakang (Kecil, Pudar) */}
      <div ref={cloudLayer3} className="absolute inset-0 flex items-center justify-center opacity-80 text-blue-100">
        <CloudSVG className="absolute top-[10%] left-[-10%] w-[60vw] h-auto" />
        <CloudSVG className="absolute top-[30%] right-[-10%] w-[70vw] h-auto" />
        <CloudSVG className="absolute bottom-[20%] left-[20%] w-[50vw] h-auto" />
      </div>

      {/* Layer 2: Awan Tengah */}
      <div ref={cloudLayer2} className="absolute inset-0 flex items-center justify-center opacity-90 text-slate-200">
        <CloudSVG className="absolute top-[-5%] right-[10%] w-[80vw] h-auto" />
        <CloudSVG className="absolute bottom-[10%] left-[-20%] w-[90vw] h-auto" />
        <CloudSVG className="absolute top-[40%] left-[30%] w-[60vw] h-auto" />
      </div>

      {/* Layer 1: Awan Depan (Paling Besar, Paling Putih) */}
      <div ref={cloudLayer1} className="absolute inset-0 flex items-center justify-center text-white">
        <CloudSVG className="absolute top-[20%] left-[-30%] w-[120vw] h-auto" />
        <CloudSVG className="absolute bottom-[-10%] right-[-20%] w-[130vw] h-auto" />
        <CloudSVG className="absolute top-[-20%] left-[10%] w-[100vw] h-auto" />
      </div>
    </div>
  );
}
