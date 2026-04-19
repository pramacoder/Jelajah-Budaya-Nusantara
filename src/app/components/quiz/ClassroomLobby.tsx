import React from 'react';
import { motion } from 'motion/react';
import { LogOut } from 'lucide-react';
import { RoomInfo, ParticipantInfo } from '../../lib/useClassroomDb';

interface ClassroomLobbyProps {
  room: RoomInfo;
  participants: ParticipantInfo[];
  onLeave: () => void;
}

export function ClassroomLobby({ room, participants, onLeave }: ClassroomLobbyProps) {
  return (
    <div className="max-w-xl mx-auto w-full pt-32 px-4 pb-12 flex flex-col items-center">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#1a1a2e] border border-blue-400/30 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden w-full"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500" />
        
        <div className="w-20 h-20 mx-auto rounded-full border-4 border-dashed border-amber-400/50 flex items-center justify-center mb-6">
           <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="w-16 h-16 rounded-full border-4 border-amber-400 border-t-transparent" />
        </div>

        <h1 className="text-2xl font-serif text-white mb-2">Kamu Berhasil Masuk!</h1>
        <p className="text-blue-200/70 mb-8">Menunggu Sang Host untuk memulai permainan...</p>
        
        <div className="bg-[#0a1628] rounded-xl p-4 border border-white/5 mb-8 flex justify-center items-center gap-4">
           <span className="text-sm text-blue-200">KODE KELAS:</span>
           <span className="text-2xl font-mono font-bold text-indigo-400 tracking-widest bg-indigo-500/10 px-4 py-1 rounded-lg border border-indigo-500/20">{room.room_code}</span>
        </div>

        <div className="flex justify-between items-center text-sm px-4 mb-4">
           <span className="text-blue-200/50">{participants.length} Siswa Terhubung</span>
        </div>

        <button 
           onClick={onLeave}
           className="px-6 py-3 w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl font-bold transition flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" /> Keluar dari Ruangan
        </button>
      </motion.div>
    </div>
  );
}
