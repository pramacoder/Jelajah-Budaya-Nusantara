import React, { useState, useEffect } from 'react';
import { QuizLobby } from './components/quiz/QuizLobby';
import { QuizPlay } from './components/quiz/QuizPlay';
import { QuizResult } from './components/quiz/QuizResult';
import { useQuizDb, QuizQuestion } from './lib/useQuizDb';
import { ProtectedRoute } from './components/ProtectedRoute'; // adjust based on folder
import { motion } from 'motion/react';

type QuizState = 'lobby' | 'loading' | 'playing' | 'result';

export function QuizPage() {
  const [quizState, setQuizState] = useState<QuizState>('lobby');
  const [mode, setMode] = useState<string>('quick');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const { fetchQuestions, submitQuizScore, error } = useQuizDb();
  
  // Quiz results
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeTakenTotal, setTimeTakenTotal] = useState(0);

  const startQuiz = async (selectedMode: string) => {
    setMode(selectedMode);
    setQuizState('loading');
    
    // fetch questions based on mode
    let categoryLimit = 10;
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
      setQuizState('lobby'); // fallback if fetch failed
      alert(error || 'Gagal memuat soal. Pastikan Anda telah mengimpor Database Seed.');
    }
  };

  const handleFinish = async (finalScore: number, finalCorrect: number, finalTime: number) => {
    setScore(finalScore);
    setCorrectCount(finalCorrect);
    setTimeTakenTotal(finalTime);
    setQuizState('result');

    // Call Supabase to save score and stats
    await submitQuizScore(finalScore, finalCorrect, finalTime);
  };

  return (
    <div className="min-h-screen bg-[#0a1628]">
      {quizState === 'lobby' && <QuizLobby onStart={startQuiz} />}
      
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
    </div>
  );
}
