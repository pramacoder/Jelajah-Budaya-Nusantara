import React from 'react';
import { motion } from 'motion/react';
import { Award, RefreshCcw, Home, Share2 } from 'lucide-react';
import { useCloudNav } from '../Layout';

interface QuizResultProps {
  score: number;
  correctCount: number;
  total: number;
  timeTaken: number;
  onRetry: () => void;
}

export function QuizResult({ score, correctCount, total, timeTaken, onRetry }: QuizResultProps) {
  const navigate = useCloudNav();
  const percentage = (correctCount / total) * 100;
  
  let gradeText = "Perlu Belajar Lagi";
  let gradeColor = "text-red-400";
  if (percentage >= 90) { gradeText = "Sempurna! Sang Master"; gradeColor = "text-emerald-400"; }
  else if (percentage >= 70) { gradeText = "Luar Biasa!"; gradeColor = "text-amber-400"; }
  else if (percentage >= 50) { gradeText = "Cukup Bagus"; gradeColor = "text-blue-400"; }

  return (
    <div className="max-w-2xl mx-auto w-full pt-20 px-4 pb-12 flex flex-col items-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring" }}
        className="bg-[#1a1a2e] border-2 border-blue-400/30 rounded-3xl p-8 w-full text-center shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-600/20 to-transparent"></div>
        
        <div className="relative z-10">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 p-1 mb-6 shadow-xl shadow-orange-500/20">
             <div className="w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center">
                <Award className={`w-12 h-12 ${gradeColor}`} />
             </div>
          </div>

          <h1 className="text-3xl font-serif text-white mb-2">Kuis Selesai!</h1>
          <p className={`text-xl font-bold mb-8 ${gradeColor}`}>{gradeText}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#0a1628] rounded-xl p-4 border border-white/5">
              <div className="text-sm text-blue-200/50 mb-1">Total Poin</div>
              <div className="text-2xl font-bold text-amber-400">+{score}</div>
            </div>
            <div className="bg-[#0a1628] rounded-xl p-4 border border-white/5">
              <div className="text-sm text-blue-200/50 mb-1">Akurasi</div>
              <div className="text-2xl font-bold text-emerald-400">{Math.round(percentage)}%</div>
            </div>
            <div className="bg-[#0a1628] rounded-xl p-4 border border-white/5">
              <div className="text-sm text-blue-200/50 mb-1">Benar</div>
              <div className="text-2xl font-bold text-white">{correctCount}/{total}</div>
            </div>
            <div className="bg-[#0a1628] rounded-xl p-4 border border-white/5">
              <div className="text-sm text-blue-200/50 mb-1">Waktu</div>
              <div className="text-2xl font-bold text-white">{timeTaken}s</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={onRetry}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition flex items-center justify-center gap-2"
            >
              <RefreshCcw className="w-5 h-5" /> Main Lagi
            </button>
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" /> Beranda
            </button>
            <button className="px-6 py-3 border border-blue-400/50 text-blue-300 hover:bg-blue-400/10 rounded-xl font-bold transition flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5" /> Pamerkan
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
