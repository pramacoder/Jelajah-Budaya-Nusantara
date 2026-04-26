import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { RefreshCcw, Home, Share2, Trophy, Zap, Target, Clock } from 'lucide-react';
import { useCloudNav } from '../Layout';
import confetti from 'canvas-confetti';
import { playSound, AUDIO_PATHS } from '../../utils/audio';

interface QuizResultProps {
  score: number;
  correctCount: number;
  total: number;
  timeTaken: number;
  onRetry: () => void;
}

// Grade config
const getGrade = (pct: number) => {
  if (pct >= 90) return { text: 'Sang Master! 🏆', color: 'text-amber-400', bg: 'from-amber-500/20 to-orange-500/10', border: 'border-amber-500/30' };
  if (pct >= 70) return { text: 'Luar Biasa! 🌟',  color: 'text-emerald-400', bg: 'from-emerald-500/20 to-green-500/10', border: 'border-emerald-500/30' };
  if (pct >= 50) return { text: 'Cukup Bagus 👍',  color: 'text-blue-400',    bg: 'from-blue-500/20 to-cyan-500/10',    border: 'border-blue-500/30' };
  return          { text: 'Perlu Latihan 💪',       color: 'text-red-400',     bg: 'from-red-500/20 to-rose-500/10',     border: 'border-red-500/30' };
};

export function QuizResult({ score, correctCount, total, timeTaken, onRetry }: QuizResultProps) {
  const navigate = useCloudNav();
  const percentage = (correctCount / total) * 100;
  const grade = getGrade(percentage);
  const confettiFired = useRef(false);

  // FASE 3: Audio + Confetti saat hasil muncul
  useEffect(() => {
    if (confettiFired.current) return;
    confettiFired.current = true;

    if (percentage >= 90) {
      playSound(AUDIO_PATHS.ABOVE_90, 0.8);
      // Confetti meriah untuk hasil sempurna
      const end = Date.now() + 2500;
      const frame = () => {
        confetti({ particleCount: 6, angle: 60,  spread: 60, origin: { x: 0 }, colors: ['#f59e0b', '#fbbf24', '#fcd34d'] });
        confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1 }, colors: ['#10b981', '#34d399', '#6ee7b7'] });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    } else {
      playSound(AUDIO_PATHS.BELOW_90, 0.7);
    }
  }, []);

  const handleShare = () => {
    const text = `Saya baru menyelesaikan Kuis Budaya Nusantara!\n🎯 Skor: ${score} XP\n✅ Benar: ${correctCount}/${total} (${Math.round(percentage)}%)\n\nCoba juga di Jelajah Budaya Nusantara!`;
    if (navigator.share) {
      navigator.share({ title: 'Kuis Budaya Nusantara', text });
    } else {
      navigator.clipboard.writeText(text).then(() => alert('Hasil disalin ke clipboard!'));
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full pt-20 px-4 pb-12 flex flex-col items-center">

      {/* Card Utama */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 160, damping: 14 }}
        className={`bg-[#1a1a2e] border-2 ${grade.border} rounded-3xl p-8 w-full text-center shadow-2xl relative overflow-hidden`}
      >
        {/* Gradient BG */}
        <div className={`absolute inset-0 bg-gradient-to-br ${grade.bg} pointer-events-none`} />

        <div className="relative z-10">
          {/* Trophy Icon */}
          <motion.div
            initial={{ rotate: -15, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
            className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 p-1 mb-5 shadow-xl shadow-amber-500/30"
          >
            <div className="w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center">
              <Trophy className={`w-12 h-12 ${grade.color}`} />
            </div>
          </motion.div>

          <h1 className="text-3xl font-serif text-white mb-1">Kuis Selesai!</h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`text-2xl font-black mb-8 ${grade.color}`}
          >
            {grade.text}
          </motion.p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { icon: <Zap className="w-5 h-5" />, label: 'Total XP', value: `+${score.toLocaleString()}`, color: 'text-amber-400' },
              { icon: <Target className="w-5 h-5" />, label: 'Akurasi', value: `${Math.round(percentage)}%`, color: 'text-emerald-400' },
              { icon: <Trophy className="w-5 h-5" />, label: 'Benar', value: `${correctCount}/${total}`, color: 'text-blue-400' },
              { icon: <Clock className="w-5 h-5" />, label: 'Waktu', value: `${timeTaken}s`, color: 'text-purple-400' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="bg-[#0a1628] rounded-xl p-4 border border-white/5"
              >
                <div className={`flex justify-center mb-1 ${stat.color} opacity-70`}>{stat.icon}</div>
                <div className="text-xs text-blue-200/50 mb-1">{stat.label}</div>
                <div className={`text-xl font-black ${stat.color}`}>{stat.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Progress Bar Akurasi */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-slate-500 mb-2">
              <span>Persentase Benar</span>
              <span>{Math.round(percentage)}%</span>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                className={`h-full rounded-full ${
                  percentage >= 90 ? 'bg-amber-400' :
                  percentage >= 70 ? 'bg-emerald-400' :
                  percentage >= 50 ? 'bg-blue-400' : 'bg-red-400'
                }`}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row justify-center gap-3"
          >
            <button
              onClick={onRetry}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer"
            >
              <RefreshCcw className="w-5 h-5" /> Main Lagi
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Home className="w-5 h-5" /> Beranda
            </button>
            <button
              onClick={handleShare}
              className="px-6 py-3 border border-blue-400/50 text-blue-300 hover:bg-blue-400/10 rounded-xl font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Share2 className="w-5 h-5" /> Pamerkan
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
