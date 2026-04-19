import { useCloudNav } from "./Layout";
import { motion } from "motion/react";
import { Home } from "lucide-react";

export function NotFound() {
  const navigate = useCloudNav();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a1628] text-white px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-6xl mb-4">🏝️</div>
        <h1
          className="text-white mb-3"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem" }}
        >
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-blue-200/60 mb-8">
          Sepertinya kamu tersesat di lautan Nusantara!
        </p>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full mx-auto cursor-pointer"
        >
          <Home className="w-4 h-4" />
          Kembali ke Beranda
        </button>
      </motion.div>
    </div>
  );
}