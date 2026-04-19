import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Play, Copy, CheckCircle2, UserPlus, LogOut } from 'lucide-react';
import { ParticipantInfo } from '../../lib/useClassroomDb';

interface HostLobbyProps {
  roomCode: string;
  participants: ParticipantInfo[];
  onStartGame: () => void;
  onCancel: () => void;
}

export function HostLobby({ roomCode, participants, onStartGame, onCancel }: HostLobbyProps) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto w-full pt-16 px-4 pb-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#1a1a2e] to-[#0f1b33] border border-blue-400/30 rounded-3xl p-8 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-bl-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-tr-full blur-3xl"></div>

        <div className="flex flex-col items-center justify-center relative z-10 text-center mb-10">
          <h2 className="text-blue-200/80 uppercase tracking-widest text-sm mb-4 font-bold flex items-center justify-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" /> KODE KELAS
          </h2>
          
          <div 
             onClick={copyToClipboard}
             className="relative group bg-[#0a1628]/80 border-2 border-indigo-400/40 hover:border-indigo-400 p-6 rounded-2xl cursor-pointer transition-all w-64 shadow-xl"
          >
            <h1 className="text-5xl font-mono text-white tracking-[0.2em] ml-2">{roomCode}</h1>
            <div className="absolute -top-3 -right-3 text-white transition-transform group-hover:scale-110">
              {copied ? <CheckCircle2 className="w-8 h-8 text-emerald-400 bg-[#0a1628] rounded-full" /> : <Copy className="w-8 h-8 text-indigo-400 bg-[#0a1628] rounded-full p-1" />}
            </div>
            <div className="absolute -bottom-10 left-0 right-0 text-xs text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity">
              Klik untuk Salin
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-10 relative z-10">
          <button 
             onClick={onCancel}
             className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/50 rounded-xl font-bold flex items-center gap-2 transition"
          >
            <LogOut className="w-5 h-5" /> Batal
          </button>
          <button 
             onClick={onStartGame}
             disabled={participants.length === 0}
             className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-lg shadow-orange-500/20 text-lg flex items-center gap-2 transition"
          >
            Mulai Ujian <Play className="w-5 h-5 fill-current" />
          </button>
        </div>

        {/* Participants Grid */}
        <div className="relative z-10 border-t border-white/5 pt-8">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-xl font-serif text-white">Murid Mengantre</h3>
             <span className="px-4 py-1 bg-white/10 rounded-full text-blue-200 font-bold">{participants.length} Terhubung</span>
           </div>

           {participants.length === 0 ? (
             <div className="text-center py-12 bg-black/20 rounded-2xl border border-white/5 border-dashed flex flex-col items-center">
               <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <UserPlus className="w-12 h-12 text-indigo-400/50 mb-4" />
               </motion.div>
               <p className="text-blue-200/50">Minta murid untuk memasukkan kode di atas pada menu Kuis.</p>
             </div>
           ) : (
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <AnimatePresence>
                 {participants.map((p) => (
                   <motion.div 
                     key={p.user_id}
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.8 }}
                     className="bg-[#0a1628] border border-blue-400/20 p-4 rounded-xl flex items-center gap-3 shadow-lg"
                   >
                     <img src={p.profiles.avatar_url || `https://ui-avatars.com/api/?name=${p.profiles.name || 'User'}&background=random`} alt="avatar" className="w-10 h-10 rounded-full bg-blue-500" />
                     <span className="text-white font-medium truncate">{p.profiles.name || 'Student'}</span>
                   </motion.div>
                 ))}
               </AnimatePresence>
             </div>
           )}
        </div>
      </motion.div>
    </div>
  );
}
