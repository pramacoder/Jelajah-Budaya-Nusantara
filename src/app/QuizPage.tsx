import React, { useState, useEffect } from 'react';
import { QuizLobby } from './components/quiz/QuizLobby';
import { QuizPlay } from './components/quiz/QuizPlay';
import { QuizResult } from './components/quiz/QuizResult';
import { HostLobby } from './components/quiz/HostLobby';
import { ClassroomLobby } from './components/quiz/ClassroomLobby';
import { useQuizDb, QuizQuestion } from './lib/useQuizDb';
import { useClassroomDb } from './lib/useClassroomDb';
import { ProtectedRoute } from './components/ProtectedRoute'; 
import { motion } from 'motion/react';

type QuizState = 'lobby' | 'loading' | 'playing' | 'result' | 'host_lobby' | 'classroom_lobby';

export function QuizPage() {
  const [quizState, setQuizState] = useState<QuizState>('lobby');
  const [mode, setMode] = useState<string>('quick');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const { fetchQuestions, submitQuizScore, error: quizError } = useQuizDb();
  
  // Classroom State
  const [activeRoomId, setActiveRoomId] = useState<string | undefined>(undefined);
  const { createRoom, joinRoom, startGame, updateParticipantScore, participants, roomState, loading: classLoading, error: classError } = useClassroomDb(activeRoomId);

  // Quiz results
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeTakenTotal, setTimeTakenTotal] = useState(0);

  // Effect to watch when a classroom starts
  useEffect(() => {
     if (quizState === 'classroom_lobby' && roomState && roomState.is_active === false) {
        // the host started the game!
        startQuiz('classroom'); // fetch random questions and transition to playing
     }
  }, [roomState, quizState]);

  const startQuiz = async (selectedMode: string) => {
    setMode(selectedMode);
    setQuizState('loading');
    
    // fetch questions based on mode
    let fetched = [];
    if (selectedMode === 'quick') {
      fetched = await fetchQuestions(10);
    } else if (selectedMode === 'daily') {
      fetched = await fetchQuestions(5);
    } else if (selectedMode === 'province') {
      fetched = await fetchQuestions(10); // currently returning random, could be filtered
    } else if (selectedMode === 'classroom') {
      fetched = await fetchQuestions(10); // random for classroom
    }

    if (fetched.length > 0) {
      setQuestions(fetched);
      setQuizState('playing');
    } else {
      setQuizState('lobby'); 
      alert(quizError || 'Gagal memuat soal. Pastikan Database Seed di-import.');
    }
  };

  const handleCreateClassroom = async () => {
    setQuizState('loading');
    const room = await createRoom();
    if (room) {
      setActiveRoomId(room.id);
      setQuizState('host_lobby');
    } else {
      setQuizState('lobby');
      alert(classError || 'Gagal membuat kelas');
    }
  };

  const handleJoinClassroom = async (pin: string) => {
    setQuizState('loading');
    const room = await joinRoom(pin);
    if (room) {
      setActiveRoomId(room.id);
      setQuizState('classroom_lobby');
    } else {
      setQuizState('lobby');
      alert(classError || 'Gagal bergabung ke kelas');
    }
  };

  const handleHostStartGame = () => {
    if (activeRoomId) {
      startGame(activeRoomId);
      // Wait for it to toggle, or just force them into game
      startQuiz('classroom');
    }
  };

  const handleFinish = async (finalScore: number, finalCorrect: number, finalTime: number) => {
    setScore(finalScore);
    setCorrectCount(finalCorrect);
    setTimeTakenTotal(finalTime);
    setQuizState('result');

    // Call Supabase to save score and stats
    await submitQuizScore(finalScore, finalCorrect, finalTime);
    
    // If playing in classroom, update the room participant score too
    if (mode === 'classroom' && activeRoomId) {
       await updateParticipantScore(activeRoomId, finalScore);
    }
  };

  const resetToLobby = () => {
    setQuizState('lobby');
    setActiveRoomId(undefined);
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

      {quizState === 'host_lobby' && roomState && (
        <HostLobby 
           roomCode={roomState.room_code}
           participants={participants}
           onStartGame={handleHostStartGame}
           onCancel={resetToLobby}
        />
      )}

      {quizState === 'classroom_lobby' && roomState && (
        <ClassroomLobby
           room={roomState}
           participants={participants}
           onLeave={resetToLobby}
        />
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
           onRetry={resetToLobby}
        />
      )}
    </div>
  );
}
