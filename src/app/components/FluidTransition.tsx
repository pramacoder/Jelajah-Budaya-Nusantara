import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  phase: "idle" | "closing" | "opening";
}

export function FluidTransition({ phase }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1 = useRef<HTMLDivElement>(null);
  const layer2 = useRef<HTMLDivElement>(null);
  const layer3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase === "idle") return;

    const tl = gsap.timeline();

    if (phase === "closing") {
      gsap.set(containerRef.current, { display: "block" });
      
      // Posisi awal: semua layer di bawah layar (y: "100vh")
      // Layer ini sangat tinggi (150vh) dan ujung atasnya melengkung.
      gsap.set([layer1.current, layer2.current, layer3.current], { 
        y: "100vh",
        borderTopLeftRadius: "50%",
        borderTopRightRadius: "50%"
      });

      // Animasi gelombang naik
      // y: "-20vh" memastikan lengkungan ujung atas melewati layar
      // dan menyisakan bagian bawah layer yang kotak untuk menutupi layar sepenuhnya.
      tl.to(layer1.current, { y: "-20vh", duration: 0.6, ease: "power2.inOut" }, 0)
        .to(layer2.current, { y: "-20vh", duration: 0.6, ease: "power2.inOut" }, 0.1)
        .to(layer3.current, { y: "-20vh", duration: 0.6, ease: "power2.inOut" }, 0.2)
        
        // Ratakan lengkungan saat menutupi layar agar terlihat rata sebelum ganti halaman
        .to([layer1.current, layer2.current, layer3.current], {
          borderTopLeftRadius: "0%",
          borderTopRightRadius: "0%",
          duration: 0.2
        }, 0.5);

    } else if (phase === "opening") {
      // Saat membuka halaman baru, layer turun kembali ke bawah
      
      // Kembalikan efek lengkung untuk animasi turun
      gsap.set([layer1.current, layer2.current, layer3.current], {
        borderTopLeftRadius: "50%",
        borderTopRightRadius: "50%"
      });

      tl.to(layer3.current, { y: "100vh", duration: 0.6, ease: "power2.inOut" }, 0)
        .to(layer2.current, { y: "100vh", duration: 0.6, ease: "power2.inOut" }, 0.1)
        .to(layer1.current, { y: "100vh", duration: 0.6, ease: "power2.inOut" }, 0.2)
        .set(containerRef.current, { display: "none" });
    }
  }, [phase]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
      style={{ display: phase === "idle" ? "none" : "block" }}
    >
      {/* Lapisan 1: Emas */}
      <div 
        ref={layer1} 
        className="absolute left-0 right-0 top-0 h-[150vh] bg-amber-500 shadow-2xl" 
        style={{ transform: "translateY(100vh)" }} 
      />
      {/* Lapisan 2: Biru Terang */}
      <div 
        ref={layer2} 
        className="absolute left-0 right-0 top-0 h-[150vh] bg-blue-400 shadow-2xl" 
        style={{ transform: "translateY(100vh)" }} 
      />
      {/* Lapisan 3: Biru Navy Gelap (Tema Website) */}
      <div 
        ref={layer3} 
        className="absolute left-0 right-0 top-0 h-[150vh] bg-[#0a1628] shadow-2xl" 
        style={{ transform: "translateY(100vh)" }} 
      />
    </div>
  );
}
