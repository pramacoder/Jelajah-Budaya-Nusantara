import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Crown } from 'lucide-react';
import { useQuizDb, PlayerStats } from '../../lib/useQuizDb';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Skeleton } from '../ui/skeleton';

export function QuizLeaderboard() {
  const { getGlobalLeaderboard, loading, error } = useQuizDb();
  const [leaderboard, setLeaderboard] = useState<PlayerStats[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await getGlobalLeaderboard();
      setLeaderboard(data);
    };
    fetchLeaderboard();
  }, []);

  if (loading && leaderboard.length === 0) {
    return (
      <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-blue-400/20 w-full max-w-md mx-auto">
        <h3 className="text-xl font-bold text-amber-400 font-serif mb-6 flex items-center gap-2">
          <Trophy className="w-5 h-5" /> Papan Peringkat
        </h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="w-6 h-6 rounded-full bg-slate-700" />
              <Skeleton className="w-10 h-10 rounded-full bg-slate-700" />
              <div className="flex-1">
                <Skeleton className="h-4 w-24 bg-slate-700 mb-2" />
                <Skeleton className="h-3 w-16 bg-slate-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-red-500/20 text-red-400 text-center text-sm">
        Gagal memuat papan peringkat.
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-blue-400/20 w-full max-w-md mx-auto shadow-xl">
      <h3 className="text-xl font-bold text-amber-400 font-serif mb-6 flex items-center gap-2">
        <Trophy className="w-5 h-5" /> Papan Peringkat Global
      </h3>
      
      {leaderboard.length === 0 ? (
        <p className="text-slate-400 text-sm text-center py-4">Belum ada skor yang tercatat. Jadilah yang pertama!</p>
      ) : (
        <div className="space-y-3">
          {leaderboard.map((player, index) => {
            const rank = player.rank || index + 1;
            let RankIcon = <span className="font-bold text-slate-400 w-6 text-center">{rank}</span>;
            
            if (rank === 1) RankIcon = <Crown className="w-6 h-6 text-yellow-400 drop-shadow-md" />;
            if (rank === 2) RankIcon = <Medal className="w-6 h-6 text-slate-300 drop-shadow-md" />;
            if (rank === 3) RankIcon = <Medal className="w-6 h-6 text-amber-600 drop-shadow-md" />;

            return (
              <motion.div 
                key={player.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${rank <= 3 ? 'bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20' : 'hover:bg-white/5'}`}
              >
                <div className="w-6 flex justify-center">{RankIcon}</div>
                
                <Avatar className="h-10 w-10 border border-slate-600">
                  <AvatarImage src={player.avatar_url || ''} />
                  <AvatarFallback className="bg-slate-700 text-white text-xs">
                    {(player.name || 'User').substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{player.name || 'Penjelajah Rahasia'}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-amber-400 font-bold">{player.total_score}</p>
                  <p className="text-[10px] text-slate-400">XP</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
