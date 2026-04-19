import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface GsapTransitionProps {
  phase: "closing" | "opening" | "idle";
}

export function GsapTransition({ phase }: GsapTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (phase === "idle") {
      gsap.set(containerRef.current, { display: 'none', zIndex: -1 });
      return;
    }

    gsap.set(containerRef.current, { display: 'block', zIndex: 9999 });

    if (phase === "closing") {
      // Swipe UP (from bottom to top) to cover screen
      const tl = gsap.timeline();
      tl.fromTo(panelRef.current, 
        { y: '100%', height: '100vh', borderTopLeftRadius: '100%', borderTopRightRadius: '100%' }, 
        { y: '0%', borderTopLeftRadius: '0%', borderTopRightRadius: '0%', duration: 0.8, ease: 'power3.inOut' }
      );
      tl.fromTo(logoRef.current, 
        { opacity: 0, scale: 0.5, y: 50 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' },
        "-=0.3"
      );
    } 
    else if (phase === "opening") {
      // Reveal (continue swiping UP from screen to top)
      const tl = gsap.timeline();
      tl.to(logoRef.current, { opacity: 0, scale: 0.5, y: -50, duration: 0.3, ease: 'power2.in' });
      tl.to(panelRef.current, 
        { y: '-100%', borderBottomLeftRadius: '100%', borderBottomRightRadius: '100%', duration: 0.7, ease: 'power3.inOut' },
        "-=0.1"
      );
    }
  }, [phase]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none hidden">
      <div 
        ref={panelRef} 
        className="absolute inset-x-0 bottom-0 top-0 bg-gradient-to-tr from-[#0a1628] to-[#1a2744] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden"
        style={{ willChange: 'transform, border-radius' }}
      >
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400 via-[#0a1628] to-transparent mix-blend-screen" />
      </div>

      {/* Center Motif / Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div ref={logoRef} className="opacity-0 flex flex-col items-center">
           <div className="w-16 h-16 border-4 border-amber-400/80 border-t-amber-400 rounded-full animate-spin shadow-[0_0_20px_rgba(251,191,36,0.5)]"></div>
           <h2 className="mt-6 text-2xl text-amber-400 tracking-[0.2em] uppercase font-serif drop-shadow-lg font-bold">Nusantara</h2>
        </div>
      </div>
    </div>
  );
}
