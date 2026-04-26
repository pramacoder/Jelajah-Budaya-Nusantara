import React from 'react';
import { motion } from 'motion/react';
import { Award, Star, Zap, Shield, Target } from 'lucide-react';

interface BadgeData {
  id: string;
  name: string;
  description: string;
  iconType: 'star' | 'zap' | 'shield' | 'target' | 'award';
  color: string;
  earnedAt?: string;
  isEarned: boolean;
}

const iconMap = {
  star: Star,
  zap: Zap,
  shield: Shield,
  target: Target,
  award: Award,
};

export function QuizBadge({ badges }: { badges: BadgeData[] }) {
  return (
    <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-blue-400/20 w-full shadow-xl">
      <h3 className="text-xl font-bold text-white font-serif mb-6 flex items-center gap-2">
        <Award className="w-5 h-5 text-amber-400" /> Koleksi Pencapaian
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {badges.map((badge, index) => {
          const Icon = iconMap[badge.iconType] || Award;
          
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-4 rounded-xl flex flex-col items-center text-center transition-all ${
                badge.isEarned 
                  ? `bg-gradient-to-br ${badge.color} border border-white/20 shadow-lg` 
                  : 'bg-slate-800/50 border border-slate-700 opacity-60 grayscale'
              }`}
            >
              <div className={`p-3 rounded-full mb-3 ${badge.isEarned ? 'bg-white/20' : 'bg-slate-700'}`}>
                <Icon className={`w-8 h-8 ${badge.isEarned ? 'text-white drop-shadow-md' : 'text-slate-500'}`} />
              </div>
              <h4 className={`text-sm font-bold mb-1 ${badge.isEarned ? 'text-white' : 'text-slate-400'}`}>
                {badge.name}
              </h4>
              <p className={`text-[10px] leading-tight ${badge.isEarned ? 'text-white/80' : 'text-slate-500'}`}>
                {badge.description}
              </p>
              
              {badge.isEarned && badge.earnedAt && (
                <span className="absolute top-2 right-2 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white/60"></span>
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
