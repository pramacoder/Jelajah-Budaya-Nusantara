import { useState, useCallback, useEffect, useRef, createContext, useContext } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { Home, ArrowLeft, Map } from "lucide-react";
import { motion } from "motion/react";
import { MaskTransition } from "./MaskTransition";
import { useAuth } from "./auth/AuthContext";
import { UserAvatar } from "./auth/UserAvatar";
import { AuthModal } from "./auth/AuthModal";
import logoSvg from "../../assets/logo.svg";

type NavigateFn = (to: string | number) => void;
const CloudNavContext = createContext<NavigateFn>(() => {});
export const useCloudNav = () => useContext(CloudNavContext);

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [phase, setPhase] = useState<"idle" | "closing" | "opening">("idle");
  const pendingNav = useRef<string | number | null>(null);
  const isTransitioning = useRef(false);

  // Cloud-wrapped navigate: clouds close → navigate → clouds open
  const cloudNavigate: NavigateFn = useCallback(
    (to: string | number) => {
      if (isTransitioning.current) return;
      isTransitioning.current = true;
      pendingNav.current = to;
      setPhase("closing");
    },
    []
  );

  // After closing animation finishes, perform the actual navigation
  useEffect(() => {
    if (phase === "closing") {
      const timer = setTimeout(() => {
        const dest = pendingNav.current;
        if (dest !== null) {
          if (typeof dest === "number") {
            navigate(dest);
          } else {
            navigate(dest);
          }
        }
        // Small delay so the new page renders behind clouds before opening
        setTimeout(() => setPhase("opening"), 50);
      }, 850); // wait for swipe to cover screen
      return () => clearTimeout(timer);
    }

    if (phase === "opening") {
      const timer = setTimeout(() => {
        setPhase("idle");
        isTransitioning.current = false;
        pendingNav.current = null;
      }, 1000); // wait for wipe to uncover screen
      return () => clearTimeout(timer);
    }
  }, [phase, navigate]);

  return (
    <CloudNavContext.Provider value={cloudNavigate}>
      <div
        className="min-h-screen flex flex-col"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Screen Wipe overlay */}
        <MaskTransition phase={phase} />

        {!isHome && (
          <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 backdrop-blur-md bg-white/80 border-b border-border shadow-sm"
          >
            {/* Kiri */}
            <div className="flex-1 flex justify-start">
              <button
                onClick={() => cloudNavigate(-1)}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5 text-primary" />
                <span className="text-primary hidden sm:inline">Kembali</span>
              </button>
            </div>

            {/* Tengah */}
            <button
              onClick={() => cloudNavigate("/")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img src={logoSvg} alt="Logo" className="w-8 h-8" />
              <span
                className="text-primary text-lg sm:text-xl font-bold truncate"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Nusantara
              </span>
            </button>

            {/* Kanan */}
            <div className="flex-1 flex justify-end items-center gap-1 sm:gap-2">
              <button
                onClick={() => cloudNavigate("/indonesia")}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
                title="Peta Indonesia"
              >
                <Map className="w-5 h-5 text-primary" />
              </button>
              <button
                onClick={() => cloudNavigate("/")}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
                title="Beranda"
              >
                <Home className="w-5 h-5 text-primary" />
              </button>
              {user ? (
                <UserAvatar />
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="ml-1 sm:ml-2 px-3 sm:px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-full font-medium transition-colors text-xs sm:text-sm cursor-pointer whitespace-nowrap"
                >
                  Masuk
                </button>
              )}
            </div>
          </motion.nav>
        )}

        <AuthModal isOpen={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </CloudNavContext.Provider>
  );
}