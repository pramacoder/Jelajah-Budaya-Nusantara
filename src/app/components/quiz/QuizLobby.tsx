import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../auth/AuthContext';
import { Trophy, Clock, Swords, Globe, ArrowRight, Play, BookOpen } from 'lucide-react';

export function QuizLobby({ onStart }: { onStart: (mode: string) => void }) {
  const { user } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  const modes = [
    { id: 'quick', title: 'Quick Quiz', icon: <Clock className="w-6 h-6" />, desc: '10 Soal Acak, total 30 detik tiap soal.', color: 'from-blue-500 to-cyan-400' },
    { id: 'daily', title: 'Tantangan Harian', icon: <Swords className="w-6 h-6" />, desc: '5 Soal baru setiap hari. Dapatkan bonus Streak!', color: 'from-amber-400 to-orange-500' },
    { id: 'province', title: 'Kuis Provinsi', icon: <Globe className="w-6 h-6" />, desc: 'Uji pengetahuan secara spesifik per daerah.', color: 'from-emerald-400 to-green-500' },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full pt-20 px-4 pb-12">
      {/* Header Profile */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1a1a2e] border border-blue-400/20 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between shadow-2xl"
      >
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 p-0.5">
            <img src={user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${user?.email}&background=random`} alt="Avatar" className="w-full h-full rounded-full border-2 border-[#1a1a2e]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-serif">{user?.user_metadata?.full_name || user?.email?.split('@')[0]}</h2>
            <div className="flex items-center gap-2 text-amber-400 text-sm mt-1">
               <Trophy className="w-4 h-4" />
               <span>Tingkat Pemula</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Classroom Mode Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-indigo-600/30 to-purple-600/30 border border-indigo-400/30 rounded-2xl p-6 mb-8 text-center shadow-lg"
      >
        <h3 className="text-xl font-bold text-white mb-2 font-serif">Classroom Mode</h3>
        <p className="text-indigo-200/80 mb-4 text-sm">Masukkan kode PIN dari host untuk bermain kuis bersama 1 kelas. Skor terekam mandiri per room.</p>
        <div className="flex justify-center flex-wrap gap-3">
          <input 
            type="text" 
            placeholder="Kode 6 Digit..." 
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            maxLength={6}
            className="px-4 py-3 bg-[#0a1628] border border-indigo-500/50 rounded-lg text-white font-mono tracking-widest outline-none focus:border-amber-400 text-center w-48"
          />
          <button 
            disabled={roomCode.length < 5}
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 disabled:bg-gray-600 text-white rounded-lg font-medium transition flex items-center gap-2"
          >
            Gabung Ruang <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {modes.map((mode, i) => (
          <motion.button
            key={mode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + (i * 0.1) }}
            onClick={() => onStart(mode.id)}
            className="group relative bg-[#1a1a2e] border border-blue-400/20 rounded-2xl p-6 text-left hover:border-amber-400/50 transition-all shadow-xl overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${mode.color} opacity-10 rounded-bl-full transition-transform group-hover:scale-110`} />
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:shadow-${mode.color.split(' ')[0].replace('from-', '')}/50`}>
              {mode.icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{mode.title}</h3>
            <p className="text-sm text-blue-200/70 mb-4">{mode.desc}</p>
            <div className="flex items-center gap-1 text-amber-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Mainkan Sekarang</span>
              <Play className="w-4 h-4 fill-current" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
