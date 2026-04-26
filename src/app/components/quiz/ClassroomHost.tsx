import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Play, SkipForward, Trophy, Crown, TrendingUp, TrendingDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useClassroom, QuizRoom, RoomParticipant } from '../../lib/useClassroom';
import { QuizQuestion } from '../../lib/useQuizDb';
import { playSound, AUDIO_PATHS } from '../../utils/audio';

interface ClassroomHostProps {
  room: QuizRoom;
  questions: QuizQuestion[];
  onEnd: () => void;
}

export function ClassroomHost({ room, questions, onEnd }: ClassroomHostProps) {
  const { subscribeToParticipants, updateRoomState } = useClassroom();
  const [participants, setParticipants] = useState<RoomParticipant[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  // FASE 2: Simpan posisi peringkat sebelumnya untuk hitung delta
  const prevRankMapRef = useRef<Map<string, number>>(new Map());
  const [rankDeltas, setRankDeltas] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    const unsubscribe = subscribeToParticipants(room.id, (data) => {
      // Hitung perubahan peringkat
      const newDeltas = new Map<string, number>();
      data.forEach((p, newIdx) => {
        const prevRank = prevRankMapRef.current.get(p.id);
        if (prevRank !== undefined) {
          newDeltas.set(p.id, prevRank - newIdx); // positif = naik, negatif = turun
        }
      });
      // Update ref dengan posisi saat ini
      data.forEach((p, idx) => prevRankMapRef.current.set(p.id, idx));
      setRankDeltas(newDeltas);
      setParticipants(data);
    });
    return () => { unsubscribe(); };
  }, [room.id]);

  // FASE 3: Audio saat status room berubah
  useEffect(() => {
    if (room.status === 'intermission') {
      // Bunyi setelah waktu habis
      playSound(AUDIO_PATHS.CLASSROOM_STREAK, 0.6);
    }
    if (room.status === 'finished') {
      // Fanfare podium
      setTimeout(() => playSound(AUDIO_PATHS.CLASSROOM_FINISH, 0.8), 600);

      // Confetti tembakan selama 3 detik
      const duration = 3 * 1000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#f59e0b', '#3b82f6', '#10b981'] });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#f59e0b', '#3b82f6', '#10b981'] });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [room.status]);

  useEffect(() => {
    if (room.status === 'playing' && room.current_question_index >= 0) {
      const q = questions[room.current_question_index];
      setTimeLeft(q?.time_limit || 30);
      
      // Guard untuk mencegah updateRoomState dipanggil lebih dari sekali
      // per soal, meski prop `room` diupdate ulang dari Supabase realtime.
      let hasFired = false;
      
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            // Waktu habis, otomatis masuk status intermission
            if (!hasFired) {
              hasFired = true;
              updateRoomState(room.id, 'intermission', room.current_question_index);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => {
        clearInterval(timer);
        hasFired = true; // Pastikan tidak fire saat cleanup
      };
    }
  }, [room.status, room.current_question_index, room.id, questions]);

  const handleStartGame = () => {
    updateRoomState(room.id, 'playing', 0);
  };

  const handleNextQuestion = () => {
    if (room.current_question_index < questions.length - 1) {
      updateRoomState(room.id, 'playing', room.current_question_index + 1);
    } else {
      updateRoomState(room.id, 'finished', room.current_question_index);
    }
  };

  if (room.status === 'waiting') {
    return (
      <div className="min-h-screen bg-[#0a1628] pt-24 px-6 flex flex-col items-center">
        <div className="bg-[#1a1a2e] border-2 border-indigo-500/30 rounded-3xl p-10 max-w-2xl w-full text-center shadow-2xl shadow-indigo-500/20">
          <h2 className="text-blue-200 uppercase tracking-widest text-sm mb-4 font-bold">Kode Ruangan:</h2>
          <h1 className="text-6xl md:text-8xl font-mono text-amber-400 font-bold mb-8 tracking-widest">{room.room_code}</h1>
          
          <div className="flex items-center justify-center gap-2 mb-8 text-blue-200">
            <Users className="w-5 h-5" /> 
            <span>{participants.length} Peserta Menunggu...</span>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {participants.map(p => (
              <span key={p.id} className="px-4 py-2 bg-white/10 rounded-full text-white font-medium border border-white/20 animate-pulse">
                {p.guest_name}
              </span>
            ))}
            {participants.length === 0 && <p className="text-slate-500 text-sm italic">Belum ada yang bergabung.</p>}
          </div>

          <button 
            onClick={handleStartGame}
            disabled={participants.length === 0}
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-white rounded-xl font-bold transition text-xl flex items-center justify-center gap-2 mx-auto w-full max-w-sm shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <Play className="w-6 h-6" /> Mulai Kuis Sekarang
          </button>
        </div>
      </div>
    );
  }

  if (room.status === 'finished') {
    const winner1 = participants[0];
    const winner2 = participants[1];
    const winner3 = participants[2];
    const others  = participants.slice(3);

    return (
      <div className="min-h-screen bg-[#0a1628] flex flex-col items-center overflow-x-hidden pt-16 px-4 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-12 text-center"
        >
          <Trophy className="w-10 h-10 text-amber-400" />
          <h1 className="text-4xl md:text-5xl font-serif text-amber-400">Pemenang Kuis!</h1>
          <Trophy className="w-10 h-10 text-amber-400" />
        </motion.div>

        {/* ── PODIUM ── */}
        <div className="flex items-end justify-center gap-3 md:gap-8 mb-14 w-full max-w-2xl">

          {/* Juara 2 — masuk dari kiri */}
          <div className="flex flex-col items-center flex-1">
            {winner2 ? (
              <motion.div
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
                className="flex flex-col items-center w-full"
              >
                <div className="text-3xl mb-1">🥈</div>
                <div className="text-base font-bold text-white text-center mb-1 line-clamp-1">{winner2.guest_name}</div>
                <div className="text-emerald-400 font-bold text-sm mb-2">{winner2.total_score.toLocaleString()} XP</div>
                <div className="w-full h-28 bg-gradient-to-t from-slate-500 to-slate-400 rounded-t-xl flex items-start justify-center pt-4 border-t-4 border-slate-300 shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                  <span className="text-5xl font-black text-slate-200 z-10">2</span>
                </div>
              </motion.div>
            ) : <div className="h-28" />}
          </div>

          {/* Juara 1 — masuk dari atas, lebih tinggi */}
          <div className="flex flex-col items-center flex-1">
            {winner1 ? (
              <motion.div
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, type: 'spring', stiffness: 120, damping: 12 }}
                className="flex flex-col items-center w-full"
              >
                <motion.div
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                  <Crown className="w-12 h-12 text-amber-400 mb-1" />
                </motion.div>
                <div className="text-lg font-black text-amber-300 text-center mb-1 line-clamp-1">{winner1.guest_name}</div>
                <div className="text-emerald-400 font-black text-base mb-2">{winner1.total_score.toLocaleString()} XP</div>
                <div className="w-full h-44 bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-xl flex items-start justify-center pt-4 border-t-4 border-amber-200 shadow-2xl shadow-amber-500/40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
                  {/* Shimmer effect */}
                  <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'linear', repeatDelay: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  />
                  <span className="text-6xl font-black text-amber-100 z-10">1</span>
                </div>
              </motion.div>
            ) : <div className="h-44" />}
          </div>

          {/* Juara 3 — masuk dari kanan */}
          <div className="flex flex-col items-center flex-1">
            {winner3 ? (
              <motion.div
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
                className="flex flex-col items-center w-full"
              >
                <div className="text-3xl mb-1">🥉</div>
                <div className="text-base font-bold text-white text-center mb-1 line-clamp-1">{winner3.guest_name}</div>
                <div className="text-emerald-400 font-bold text-sm mb-2">{winner3.total_score.toLocaleString()} XP</div>
                <div className="w-full h-20 bg-gradient-to-t from-orange-800 to-orange-600 rounded-t-xl flex items-start justify-center pt-3 border-t-4 border-orange-400 shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
                  <span className="text-4xl font-black text-orange-200 z-10">3</span>
                </div>
              </motion.div>
            ) : <div className="h-20" />}
          </div>
        </div>

        {/* Peserta Lainnya */}
        {others.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="w-full max-w-2xl bg-[#1a1a2e] border border-blue-400/20 rounded-2xl p-6 mb-8"
          >
            <h3 className="text-blue-200 font-bold mb-4 text-sm uppercase tracking-widest">Peserta Lainnya</h3>
            <div className="flex flex-col gap-2">
              {others.map((p, i) => (
                <div key={p.id} className="flex justify-between items-center p-3 bg-black/20 rounded-lg border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 font-bold text-sm w-6">#{i + 4}</span>
                    <span className="text-white font-medium">{p.guest_name}</span>
                  </div>
                  <span className="text-emerald-400 font-bold">{p.total_score.toLocaleString()} XP</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tombol Tutup */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          onClick={onEnd}
          className="px-10 py-4 bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white rounded-xl transition cursor-pointer font-bold text-lg"
        >
          Tutup Ruangan
        </motion.button>
      </div>
    );
  }


  const currentQ = questions[room.current_question_index];

  return (
    <div className="min-h-screen bg-[#0a1628] pt-24 px-6 flex flex-col items-center overflow-x-hidden">
      <div className="w-full max-w-4xl flex justify-between items-center mb-8">
        <div className="text-xl font-bold text-blue-200">SOAL {room.current_question_index + 1}/{questions.length}</div>
        <div className={`text-3xl font-mono font-bold ${timeLeft <= 5 ? 'text-red-500 animate-bounce' : 'text-amber-400'}`}>
          {room.status === 'intermission' ? 'WAKTU HABIS' : `${timeLeft}s`}
        </div>
      </div>

      <div className="bg-[#1a1a2e] border border-blue-400/20 rounded-2xl p-8 w-full max-w-4xl text-center shadow-xl mb-8">
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-8 leading-relaxed">{currentQ?.question}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQ?.options.map((opt, i) => {
            let style = 'bg-[#0a1628] border-blue-400/30 text-white';
            if (room.status === 'intermission') {
              if (i === currentQ.correct) {
                style = 'bg-emerald-500/20 border-emerald-500 text-emerald-400'; // Benar
              } else {
                style = 'bg-slate-800/50 border-slate-700 text-slate-500 opacity-50'; // Salah
              }
            }
            return (
              <div key={i} className={`p-6 rounded-xl border-2 text-lg font-medium transition-all ${style}`}>
                {opt}
              </div>
            );
          })}
        </div>
      </div>

      {room.status === 'intermission' ? (
        <div className="w-full max-w-4xl flex flex-col items-center">
          {/* FASE 2: Leaderboard Sementara dengan animasi & rank delta */}
          <div className="w-full bg-[#1a1a2e] border border-amber-500/30 p-6 rounded-2xl mb-8 shadow-2xl shadow-amber-500/10">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-amber-400 font-bold flex items-center gap-2 text-lg">
                <Trophy className="w-5 h-5" /> Klasemen Sementara
              </h3>
              <span className="text-slate-500 text-sm">
                Soal {room.current_question_index + 1}/{questions.length} selesai
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <AnimatePresence>
                {participants.slice(0, 5).map((p, i) => {
                  const delta = rankDeltas.get(p.id) ?? 0;
                  const medals = ['🥇', '🥈', '🥉'];
                  const isTop3 = i < 3;
                  return (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 border
                        ${ i === 0
                          ? 'bg-amber-500/15 border-amber-500/40'
                          : i === 1
                          ? 'bg-slate-400/10 border-slate-400/30'
                          : i === 2
                          ? 'bg-orange-700/15 border-orange-600/30'
                          : 'bg-black/20 border-white/5'
                        }`}
                    >
                      {/* Rank + Nama */}
                      <div className="flex items-center gap-3">
                        <span className="text-2xl w-8 text-center">
                          {isTop3 ? medals[i] : <span className="text-slate-500 font-bold text-sm">#{i+1}</span>}
                        </span>
                        <span className={`font-bold ${ i === 0 ? 'text-amber-300' : 'text-white'}`}>
                          {p.guest_name}
                        </span>
                      </div>

                      {/* Skor + Delta Peringkat */}
                      <div className="flex items-center gap-3">
                        {/* Indikator naik/turun */}
                        {delta !== 0 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full
                              ${ delta > 0
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-red-500/20 text-red-400'
                              }`}
                          >
                            {delta > 0 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {Math.abs(delta)}
                          </motion.div>
                        )}
                        <span className={`font-black text-lg ${ i === 0 ? 'text-amber-300' : 'text-emerald-400'}`}>
                          {p.total_score.toLocaleString()}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {participants.length === 0 && (
                <p className="text-slate-500 text-center text-sm py-4">Belum ada peserta yang menjawab.</p>
              )}
            </div>
          </div>

          <button
            onClick={handleNextQuestion}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer text-lg"
          >
            {room.current_question_index < questions.length - 1
              ? `Soal ${room.current_question_index + 2} →`
              : '🏆 Lihat Hasil Akhir'}
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <p className="text-blue-200/50 animate-pulse text-lg">Menunggu peserta menjawab...</p>
      )}
    </div>
  );
}
