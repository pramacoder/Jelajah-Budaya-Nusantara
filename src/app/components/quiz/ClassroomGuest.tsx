import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Loader2, Clock, Zap, Trophy } from 'lucide-react';
import { useClassroom, QuizRoom, RoomParticipant } from '../../lib/useClassroom';
import { QuizQuestion } from '../../lib/useQuizDb';
import { playSound, AUDIO_PATHS } from '../../utils/audio';

interface ClassroomGuestProps {
  room: QuizRoom;
  participant: RoomParticipant;
  questions: QuizQuestion[];
  onExit: () => void;
}

// Warna Kahoot-style untuk 4 opsi jawaban (A, B, C, D)
const OPTION_COLORS = [
  { bg: 'bg-red-500',     hover: 'hover:bg-red-400',     border: 'border-red-400',     shape: '▲' },
  { bg: 'bg-blue-500',    hover: 'hover:bg-blue-400',    border: 'border-blue-400',    shape: '◆' },
  { bg: 'bg-amber-500',   hover: 'hover:bg-amber-400',   border: 'border-amber-400',   shape: '●' },
  { bg: 'bg-emerald-500', hover: 'hover:bg-emerald-400', border: 'border-emerald-400', shape: '■' },
];

const RANK_ICONS = ['🥇', '🥈', '🥉'];

// ClassroomGuest: driven sepenuhnya oleh prop `room` dari QuizPage (live via Supabase)
export function ClassroomGuest({ room, participant, questions, onExit }: ClassroomGuestProps) {
  const { updateParticipantScore, subscribeToParticipants } = useClassroom();
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [scoreEarned, setScoreEarned] = useState(0);        // XP yang baru didapat
  const [answerTime, setAnswerTime] = useState<number>(0);

  // Timer lokal countdown
  const [timeLeft, setTimeLeft] = useState(30);

  // FASE 2: Leaderboard sementara untuk tampil di Guest saat intermission
  const [leaderboard, setLeaderboard] = useState<RoomParticipant[]>([]);
  const [myRank, setMyRank] = useState<number | null>(null);

  // Ref untuk melacak soal sebelumnya
  const prevQuestionIndexRef = useRef<number>(-1);

  // ─── Subscribe ke participants untuk leaderboard realtime ────────────
  useEffect(() => {
    const unsubscribe = subscribeToParticipants(room.id, (data) => {
      setLeaderboard(data); // data sudah diurutkan descending by score
      const myIdx = data.findIndex(p => p.id === participant.id);
      setMyRank(myIdx >= 0 ? myIdx + 1 : null);
    });
    return () => unsubscribe();
  }, [room.id, participant.id]);

  // ─── Deteksi pergantian soal dari prop `room` ─────────────────────────
  useEffect(() => {
    const isNewQuestion =
      room.status === 'playing' &&
      room.current_question_index !== prevQuestionIndexRef.current;

    if (isNewQuestion) {
      const q = questions[room.current_question_index];
      setHasAnswered(false);
      setSelectedIndex(null);
      setIsCorrect(null);
      setScoreEarned(0);
      setAnswerTime(Date.now());
      setTimeLeft(q?.time_limit || 30);
      prevQuestionIndexRef.current = room.current_question_index;
    }
  }, [room.status, room.current_question_index]);

  // ─── Set waktu mulai awal ─────────────────────────────────────────────
  useEffect(() => {
    if (room.status === 'playing' && answerTime === 0) {
      const q = questions[room.current_question_index];
      setAnswerTime(Date.now());
      setTimeLeft(q?.time_limit || 30);
      prevQuestionIndexRef.current = room.current_question_index;
    }
  }, [room.status]);

  // ─── Timer Countdown Lokal ────────────────────────────────────────────
  useEffect(() => {
    if (room.status !== 'playing' || hasAnswered) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [room.status, room.current_question_index, hasAnswered]);

  // ─── Handle Jawaban ───────────────────────────────────────────────────
  const handleAnswer = (index: number) => {
    if (hasAnswered || room.status !== 'playing') return;
    setHasAnswered(true);
    setSelectedIndex(index);

    const currentQ = questions[room.current_question_index];
    if (!currentQ) return;

    const correct = index === currentQ.correct;
    setIsCorrect(correct);

    if (correct) {
      // FASE 2: Rumus skor "Cepat & Tepat" yang disempurnakan
      // Basis 1000 XP, dikali rasio waktu tersisa
      // Minimum 500 XP agar tidak terlalu mengecewakan
      const totalTime = currentQ.time_limit || 30;
      const earned = Math.max(500, Math.round(1000 * (timeLeft / totalTime)));
      setScoreEarned(earned);
      updateParticipantScore(participant.id, earned);
      // FASE 3: Audio feedback benar
      playSound(AUDIO_PATHS.CLASSROOM_CORRECT, 0.8);
    } else {
      // FASE 3: Audio feedback salah
      playSound(AUDIO_PATHS.CLASSROOM_INCORRECT, 0.7);
    }
  };

  // ──────────────────────────────────────────────────────────────────────
  // LAYAR: Menunggu Host Mulai
  // ──────────────────────────────────────────────────────────────────────
  if (room.status === 'waiting') {
    return (
      <div className="min-h-screen bg-[#0a1628] flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <Loader2 className="w-20 h-20 text-amber-400 animate-spin mb-6" />
        </motion.div>
        <h2 className="text-3xl font-serif text-white mb-2">Kamu sudah masuk!</h2>
        <p className="text-blue-200/80 text-xl mb-10">Menunggu Host memulai kuis...</p>
        <div className="px-8 py-4 bg-[#1a1a2e] rounded-2xl border border-indigo-400/20 shadow-xl">
          <p className="text-sm text-slate-400 mb-1">Bermain sebagai:</p>
          <p className="text-2xl font-bold text-emerald-400">{participant.guest_name}</p>
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────
  // LAYAR: Kuis Selesai (di Guest) — tampilkan peringkat final + audio
  // ──────────────────────────────────────────────────────────────────────
  if (room.status === 'finished') {
    const myFinalRank = myRank;
    const myScore = leaderboard.find(p => p.id === participant.id)?.total_score ?? 0;

    return (
      <div className="min-h-screen bg-[#0a1628] flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 160, damping: 14 }}
          className="flex flex-col items-center"
        >
          <div className="text-8xl mb-4">
            {myFinalRank === 1 ? '🏆' : myFinalRank === 2 ? '🥈' : myFinalRank === 3 ? '🥉' : '🎮'}
          </div>
          <h2 className="text-4xl font-serif text-amber-400 mb-2">Kuis Selesai!</h2>

          {myFinalRank && (
            <div className="mt-4 mb-8 flex flex-col items-center gap-2">
              <p className="text-blue-200/70 text-sm uppercase tracking-widest">Peringkat kamu</p>
              <div className="text-7xl font-black text-white">#{myFinalRank}</div>
              <div className="text-emerald-400 font-bold text-2xl">{myScore.toLocaleString()} XP</div>
            </div>
          )}

          <button
            onClick={onExit}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition text-lg cursor-pointer shadow-lg shadow-indigo-500/30"
          >
            Keluar Ruangan
          </button>
        </motion.div>
      </div>
    );
  }

  const currentQ = questions[room.current_question_index];
  const totalTime = currentQ?.time_limit || 30;
  const timerPercent = (timeLeft / totalTime) * 100;
  const timerIsUrgent = timeLeft <= 5;

  // ──────────────────────────────────────────────────────────────────────
  // LAYAR: Feedback Intermission (FASE 2 — dengan skor & peringkat)
  // ──────────────────────────────────────────────────────────────────────
  if (room.status === 'intermission' || hasAnswered) {
    const timedOut = room.status === 'intermission' && !hasAnswered;
    const displayCorrect = timedOut ? false : isCorrect;
    const myCurrentScore = leaderboard.find(p => p.id === participant.id)?.total_score ?? 0;

    return (
      <AnimatePresence>
        <div className={`min-h-screen flex flex-col ${displayCorrect ? 'bg-emerald-600' : 'bg-red-700'}`}>

          {/* Bagian Atas: Ikon + Hasil */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
            >
              {displayCorrect ? (
                <CheckCircle2 className="w-28 h-28 text-white mb-4 drop-shadow-2xl" />
              ) : timedOut ? (
                <Clock className="w-28 h-28 text-white mb-4 drop-shadow-2xl" />
              ) : (
                <XCircle className="w-28 h-28 text-white mb-4 drop-shadow-2xl" />
              )}
            </motion.div>

            <h2 className="text-5xl font-black text-white mb-3 drop-shadow">
              {displayCorrect ? 'Benar! 🎉' : timedOut ? 'Waktu Habis!' : 'Salah!'}
            </h2>

            {/* FASE 2: Tampilkan XP yang diperoleh di soal ini */}
            {displayCorrect && scoreEarned > 0 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="flex items-center gap-2 bg-white/20 rounded-full px-6 py-3 mb-2"
              >
                <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                <span className="text-white font-black text-2xl">+{scoreEarned.toLocaleString()} XP</span>
              </motion.div>
            )}

            {!displayCorrect && currentQ && (
              <p className="text-white/70 text-base mt-1">
                Jawaban benar: <span className="text-white font-bold">{currentQ.options[currentQ.correct]}</span>
              </p>
            )}
          </motion.div>

          {/* Bagian Bawah: Klasemen Mini (FASE 2) */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="bg-black/30 backdrop-blur-sm border-t border-white/10 p-5"
          >
            {/* Peringkat saya */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-amber-300" />
                <span className="text-white font-bold text-lg">
                  {participant.guest_name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {myRank && (
                  <span className="text-white/70 text-sm">
                    {myRank <= 3 ? RANK_ICONS[myRank - 1] : `#${myRank}`}
                  </span>
                )}
                <span className="text-emerald-300 font-black text-xl">
                  {myCurrentScore.toLocaleString()} XP
                </span>
              </div>
            </div>

            {/* Top 3 Leaderboard Mini */}
            {leaderboard.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Klasemen Sementara</p>
                {leaderboard.slice(0, 3).map((p, i) => {
                  const isMe = p.id === participant.id;
                  return (
                    <motion.div
                      key={p.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className={`flex items-center justify-between rounded-xl px-4 py-2.5 border
                        ${isMe
                          ? 'bg-white/20 border-white/30 shadow-lg'
                          : 'bg-white/10 border-white/10'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{RANK_ICONS[i] ?? `#${i + 1}`}</span>
                        <span className={`font-bold ${isMe ? 'text-white' : 'text-white/80'}`}>
                          {p.guest_name}
                          {isMe && <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">Kamu</span>}
                        </span>
                      </div>
                      <span className={`font-black ${isMe ? 'text-yellow-300' : 'text-emerald-300'}`}>
                        {p.total_score.toLocaleString()}
                      </span>
                    </motion.div>
                  );
                })}
                {/* Tampilkan posisi saya kalau di luar top 3 */}
                {myRank && myRank > 3 && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.85 }}
                    className="flex items-center justify-between rounded-xl px-4 py-2.5 bg-white/20 border border-white/30 mt-1"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-white/60">#{myRank}</span>
                      <span className="font-bold text-white">
                        {participant.guest_name}
                        <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">Kamu</span>
                      </span>
                    </div>
                    <span className="font-black text-yellow-300">{myCurrentScore.toLocaleString()}</span>
                  </motion.div>
                )}
              </div>
            )}

            <p className="text-white/40 text-xs text-center mt-4">Menunggu soal selanjutnya...</p>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  // ──────────────────────────────────────────────────────────────────────
  // LAYAR: Bermain — Pilih Jawaban (Kahoot-style)
  // ──────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a1628] flex flex-col">
      {/* Header: Nomor soal + Timer + Skor */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-blue-200/70 text-xs font-bold uppercase tracking-widest">
            Soal {room.current_question_index + 1}/{questions.length}
          </span>
          {/* Skor saat ini */}
          <span className="text-emerald-400 font-black text-sm">
            {(leaderboard.find(p => p.id === participant.id)?.total_score ?? 0).toLocaleString()} XP
          </span>
        </div>

        {/* Timer Bulat SVG */}
        <div className="relative w-14 h-14 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
            <circle
              cx="28" cy="28" r="24"
              fill="none"
              stroke={timerIsUrgent ? '#ef4444' : '#f59e0b'}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 24}`}
              strokeDashoffset={`${2 * Math.PI * 24 * (1 - timerPercent / 100)}`}
              style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
            />
          </svg>
          <span className={`text-lg font-black z-10 ${timerIsUrgent ? 'text-red-400 animate-pulse' : 'text-amber-400'}`}>
            {timeLeft}
          </span>
        </div>
      </div>

      {/* Progress Bar Soal */}
      <div className="h-1 bg-white/5 mx-4 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-amber-400 rounded-full transition-all"
          style={{ width: `${((room.current_question_index + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Teks Soal */}
      <div className="flex-1 flex flex-col px-4">
        <div className="flex-1 flex items-center justify-center py-4">
          <p className="text-xl md:text-2xl text-white font-serif text-center leading-relaxed line-clamp-4">
            {currentQ?.question}
          </p>
        </div>

        {/* Grid 4 Opsi Kahoot-style */}
        <div className="grid grid-cols-2 gap-3 pb-6">
          {currentQ?.options.map((opt, i) => {
            const color = OPTION_COLORS[i % 4];
            return (
              <motion.button
                key={i}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleAnswer(i)}
                disabled={hasAnswered}
                className={`
                  w-full min-h-[90px] rounded-2xl text-white font-bold
                  flex flex-col items-center justify-center gap-1 px-3 py-4
                  shadow-xl border-b-4 transition-all cursor-pointer
                  disabled:opacity-60 disabled:cursor-not-allowed
                  ${color.bg} ${color.hover} ${color.border}
                `}
              >
                <span className="text-2xl">{color.shape}</span>
                <span className="text-sm md:text-base text-center leading-tight">{opt}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
