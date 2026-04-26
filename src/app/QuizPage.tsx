import React, { useState, useEffect, useRef } from 'react';
import { QuizLobby } from './components/quiz/QuizLobby';
import { QuizPlay } from './components/quiz/QuizPlay';
import { QuizResult } from './components/quiz/QuizResult';
import { ClassroomHost } from './components/quiz/ClassroomHost';
import { ClassroomGuest } from './components/quiz/ClassroomGuest';
import { useQuizDb, QuizQuestion } from './lib/useQuizDb';
import { useClassroom, QuizRoom, RoomParticipant } from './lib/useClassroom';
import { motion } from 'motion/react';
import { toast } from 'sonner';

type QuizState = 'lobby' | 'loading' | 'playing' | 'result' | 'classroom_host' | 'classroom_guest';

export function QuizPage() {
  const [quizState, setQuizState] = useState<QuizState>('lobby');
  const [mode, setMode] = useState<string>('quick');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const { fetchQuestions, submitQuizScore, error } = useQuizDb();
  
  // Classroom States
  const { createRoom, joinRoom, subscribeToRoom } = useClassroom();
  const [room, setRoom] = useState<QuizRoom | null>(null);
  const [participant, setParticipant] = useState<RoomParticipant | null>(null);
  const unsubscribeRoomRef = useRef<(() => void) | null>(null);

  // Quiz results
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeTakenTotal, setTimeTakenTotal] = useState(0);

  // =====================================================================
  // FASE 1 FIX: Central Realtime Subscription
  // QuizPage menjadi satu-satunya tempat yang subscribe ke perubahan room.
  // Ketika room di DB berubah (status/soal), state `room` di sini diupdate
  // dan diteruskan sebagai prop ke ClassroomHost & ClassroomGuest.
  // =====================================================================
  useEffect(() => {
    if (!room) return;

    // Bersihkan subscription lama jika ada
    if (unsubscribeRoomRef.current) {
      unsubscribeRoomRef.current();
    }

    // Mulai subscription baru ke room ini
    const unsubscribe = subscribeToRoom(room.id, (updatedRoom) => {
      setRoom(updatedRoom);
      // Jika status berubah ke 'finished', bisa ditangani di sini jika perlu
    });

    unsubscribeRoomRef.current = unsubscribe;

    // Cleanup saat komponen unmount atau room berganti
    return () => {
      unsubscribe();
      unsubscribeRoomRef.current = null;
    };
  }, [room?.id]); // Hanya re-subscribe jika room ID berubah (misal: masuk room baru)

  const startQuiz = async (selectedMode: string) => {
    setMode(selectedMode);
    setQuizState('loading');
    
    let fetched = [];
    if (selectedMode === 'quick') {
      fetched = await fetchQuestions(10);
    } else if (selectedMode === 'daily') {
      fetched = await fetchQuestions(5);
    } else {
      fetched = await fetchQuestions(15);
    }

    if (fetched.length > 0) {
      setQuestions(fetched);
      setQuizState('playing');
    } else {
      setQuizState('lobby');
      toast.error(error || 'Gagal memuat soal.');
    }
  };

  const handleCreateClassroom = async () => {
    setQuizState('loading');
    const newRoom = await createRoom();
    if (newRoom) {
      const fetched = await fetchQuestions(10, undefined, false); // No shuffle for sync
      setQuestions(fetched);
      setRoom(newRoom);
      setQuizState('classroom_host');
    } else {
      setQuizState('lobby');
      toast.error('Gagal membuat ruangan kuis.');
    }
  };

  const handleJoinClassroom = async (code: string, nickname: string) => {
    setQuizState('loading');
    const result = await joinRoom(code, nickname);
    if (result) {
      // FASE 1 FIX: Soal diambil dengan urutan DETERMINISTIK (by id, no shuffle)
      // Ini memastikan Host & Guest mendapatkan array soal yang IDENTIK dan
      // current_question_index dari Host bisa dipakai langsung oleh Guest.
      const fetched = await fetchQuestions(10, undefined, false);
      setQuestions(fetched);
      setRoom(result.room);
      setParticipant(result.participant);
      setQuizState('classroom_guest');
    } else {
      setQuizState('lobby');
      toast.error('Kode ruangan tidak valid atau kuis sudah dimulai.');
    }
  };

  const handleEndClassroom = () => {
    // Bersihkan subscription saat keluar dari classroom
    if (unsubscribeRoomRef.current) {
      unsubscribeRoomRef.current();
      unsubscribeRoomRef.current = null;
    }
    setRoom(null);
    setParticipant(null);
    setQuizState('lobby');
  };

  const handleFinish = async (finalScore: number, finalCorrect: number, finalTime: number) => {
    setScore(finalScore);
    setCorrectCount(finalCorrect);
    setTimeTakenTotal(finalTime);
    setQuizState('result');
    await submitQuizScore(finalScore, finalCorrect, finalTime);
  };

  return (
    <div className="min-h-screen bg-[#0a1628]">
      {quizState === 'lobby' && (
        <QuizLobby 
          onStart={startQuiz} 
          onCreateClassroom={handleCreateClassroom}
          onJoinClassroom={handleJoinClassroom}
        />
      )}
      
      {quizState === 'loading' && (
        <div className="h-screen flex items-center justify-center flex-col gap-4">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full" />
          <p className="text-blue-200">Menyiapkan tantangan kuis Anda...</p>
        </div>
      )}

      {quizState === 'playing' && (
        <QuizPlay questions={questions} onFinish={handleFinish} />
      )}

      {quizState === 'result' && (
        <QuizResult 
           score={score} 
           correctCount={correctCount} 
           total={questions.length} 
           timeTaken={timeTakenTotal}
           onRetry={() => setQuizState('lobby')}
        />
      )}

      {quizState === 'classroom_host' && room && (
        // FASE 1: `room` sekarang selalu up-to-date karena di-manage oleh QuizPage
        <ClassroomHost 
          room={room} 
          questions={questions} 
          onEnd={handleEndClassroom} 
        />
      )}

      {quizState === 'classroom_guest' && room && participant && (
        // FASE 1: `room` sekarang selalu up-to-date karena di-manage oleh QuizPage
        // ClassroomGuest tidak perlu subscribe sendiri lagi — ini lebih efisien.
        <ClassroomGuest 
          room={room} 
          participant={participant} 
          questions={questions} 
          onExit={handleEndClassroom} 
        />
      )}
    </div>
  );
}
