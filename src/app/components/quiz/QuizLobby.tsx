import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../auth/AuthContext';
import { Trophy, Clock, Swords, Globe, ArrowRight, Play, BookOpen } from 'lucide-react';
import { QuizLeaderboard } from './QuizLeaderboard';
import { QuizBadge } from './QuizBadge';

export function QuizLobby({ onStart, onJoinClassroom, onCreateClassroom }: { onStart: (mode: string) => void, onJoinClassroom: (code: string, name: string) => void, onCreateClassroom: () => void }) {
  const { user } = useAuth();
  const [roomCode, setRoomCode] = useState('');
  const [nickname, setNickname] = useState('');

  const modes = [
    { id: 'quick', title: 'Quick Quiz', icon: <Clock className="w-6 h-6" />, desc: '10 Soal Acak, total 30 detik tiap soal.', color: 'from-blue-500 to-cyan-400' },
    { id: 'daily', title: 'Tantangan Harian', icon: <Swords className="w-6 h-6" />, desc: '5 Soal baru setiap hari. Dapatkan bonus Streak!', color: 'from-amber-400 to-orange-500' },
    { id: 'province', title: 'Kuis Provinsi', icon: <Globe className="w-6 h-6" />, desc: 'Uji pengetahuan secara spesifik per daerah.', color: 'from-emerald-400 to-green-500' },
  ];

  const myBadges: any[] = [
    { id: '1', name: 'Pemula', description: 'Menyelesaikan kuis perdana', iconType: 'star', color: 'from-blue-400 to-cyan-500', isEarned: true, earnedAt: '2026-04-20' },
    { id: '2', name: 'Ahli Jawa', description: 'Menjawab sempurna soal Jawa', iconType: 'award', color: 'from-amber-400 to-orange-500', isEarned: true, earnedAt: '2026-04-20' },
    { id: '3', name: 'Geografi', description: 'Menjawab 50 soal geografi', iconType: 'target', color: 'from-emerald-400 to-green-500', isEarned: false },
    { id: '4', name: 'Streak Api', description: '10 jawaban benar berturut-turut', iconType: 'zap', color: 'from-purple-400 to-violet-500', isEarned: false },
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left flex-1">
            <h3 className="text-xl font-bold text-white mb-2 font-serif">Classroom Mode</h3>
            <p className="text-indigo-200/80 text-sm mb-4">
              Main bersama dalam satu kelas (Kahoot-style). Host mengontrol soal, peserta bersaing secara real-time!
            </p>
            {user && (
              <button 
                onClick={onCreateClassroom}
                className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition flex items-center gap-2 shadow-lg shadow-purple-500/20"
              >
                <Swords className="w-4 h-4" /> Buat Room Baru (Host)
              </button>
            )}
          </div>
          
          <div className="flex-1 bg-black/20 p-4 rounded-xl border border-white/5 flex flex-col gap-3">
            {!user && (
              <input 
                type="text" 
                placeholder="Nama Panggilan..." 
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                maxLength={15}
                className="px-4 py-3 bg-[#0a1628] border border-indigo-500/50 rounded-lg text-white outline-none focus:border-amber-400 w-full"
              />
            )}
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Kode 6 Digit..." 
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                maxLength={6}
                className="px-4 py-3 bg-[#0a1628] border border-indigo-500/50 rounded-lg text-white font-mono tracking-widest outline-none focus:border-amber-400 text-center w-full uppercase"
              />
              <button 
                disabled={roomCode.length < 5 || (!user && nickname.length < 3)}
                onClick={() => onJoinClassroom(roomCode, nickname)}
                className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 disabled:bg-gray-600 text-white rounded-lg font-medium transition flex items-center gap-2"
              >
                Gabung <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
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

      {/* Leaderboard & Badges Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <QuizLeaderboard />
        <QuizBadge badges={myBadges} />
      </div>
    </div>
  );
}
