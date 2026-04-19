import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuizQuestion } from '../../lib/useQuizDb';
import { playSound, AUDIO_PATHS } from '../../utils/audio';

interface QuizPlayProps {
  questions: QuizQuestion[];
  onFinish: (scoreBase: number, correctCount: number, timeTaken: number) => void;
}

export function QuizPlay({ questions, onFinish }: QuizPlayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeTakenTotal, setTimeTakenTotal] = useState(0);

  const question = questions[currentIndex];

  useEffect(() => {
    if (showExplanation) return;
    setTimeLeft(question?.time_limit || 30);
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentIndex, showExplanation, question]);

  const handleTimeOut = () => {
    playSound(AUDIO_PATHS.INCORRECT);
    setStreak(0);
    setShowExplanation(true);
  };

  const handleAnswer = (index: number) => {
    if (showExplanation) return;
    setSelectedOption(index);
    setShowExplanation(true);
    
    // Time spent on this question
    const timeSpent = (question.time_limit || 30) - timeLeft;
    setTimeTakenTotal(prev => prev + timeSpent);

    if (index === question.correct) {
      // Score calculation: base points + speed bonus
      const speedBonus = Math.floor((timeLeft / (question.time_limit || 30)) * 5);
      const earned = question.points + speedBonus;
      setScore(prev => prev + earned);
      setCorrectCount(prev => prev + 1);
      
      const newStreak = streak + 1;
      setStreak(newStreak);
      
      if (newStreak === 5) {
        playSound(AUDIO_PATHS.STREAK5);
      } else {
        playSound(AUDIO_PATHS.CORRECT);
      }
    } else {
      setStreak(0);
      playSound(AUDIO_PATHS.INCORRECT);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setSelectedOption(null);
      setShowExplanation(false);
      setCurrentIndex(prev => prev + 1);
    } else {
      // Finish quiz
      onFinish(score, correctCount, timeTakenTotal);
      
      // Determine final sound
      const percentage = (correctCount / questions.length) * 100;
      if (percentage >= 90) playSound(AUDIO_PATHS.ABOVE_90);
      else playSound(AUDIO_PATHS.BELOW_90);
    }
  };

  if (!question) return <div className="text-white text-center mt-20">Memuat soal...</div>;

  return (
    <div className="max-w-3xl mx-auto w-full pt-16 px-4 pb-12">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6 bg-[#1a1a2e] p-4 rounded-xl border border-blue-400/20 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="text-blue-200/70 text-sm font-medium">SOAL {currentIndex + 1}/{questions.length}</div>
          <div className="bg-white/10 h-2 w-32 rounded-full overflow-hidden">
             <div className="bg-amber-400 h-full transition-all" style={{ width: `${((currentIndex+1)/questions.length)*100}%` }} />
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <span className="text-xs text-blue-200/50">STREAK</span>
            <span className="text-lg font-bold text-orange-400">{streak} 🔥</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-blue-200/50">SKOR</span>
            <span className="text-lg font-bold text-emerald-400">{score} XP</span>
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <motion.div 
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-[#1a1a2e] border border-blue-400/20 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Timer Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-800">
           <div 
             className={`h-full ${timeLeft < 10 ? 'bg-red-500' : 'bg-blue-500'} transition-all ease-linear`} 
             style={{ width: `${(timeLeft / (question.time_limit || 30)) * 100}%`, duration: '1000ms' }}
           />
        </div>

        <div className="flex justify-between items-start mb-6 mt-4">
          <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-blue-200 uppercase tracking-widest">{question.category}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${question.difficulty === 'hard' ? 'bg-red-500/20 text-red-400' : question.difficulty === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
            {question.difficulty}
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-serif text-white mb-8">{question.question}</h2>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {question.options.map((opt, i) => {
            const isSelected = selectedOption === i;
            const isCorrect = i === question.correct;
            let btnClass = "bg-[#0a1628] border-blue-400/30 hover:border-amber-400 text-blue-100 hover:bg-[#112240]";
            
            if (showExplanation) {
               if (isCorrect) btnClass = "bg-emerald-500/20 border-emerald-500 text-white";
               else if (isSelected && !isCorrect) btnClass = "bg-red-500/20 border-red-500 text-white";
               else btnClass = "bg-[#0a1628] border-gray-600/30 text-gray-400 opacity-50";
            }

            return (
              <button
                key={i}
                disabled={showExplanation}
                onClick={() => handleAnswer(i)}
                className={`relative border-2 rounded-xl p-4 text-left font-medium transition-all duration-300 ${btnClass}`}
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center font-bold">{String.fromCharCode(65 + i)}</span>
                  <span>{opt}</span>
                </div>
              </button>
            )
          })}
        </div>
        
        {/* Explanation Area */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="border-t border-white/10 pt-6 mt-6"
            >
              <div className={`p-4 rounded-xl ${selectedOption === question.correct ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-amber-500/10 border border-amber-500/30'}`}>
                <h4 className={`font-bold mb-2 ${selectedOption === question.correct ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {selectedOption === question.correct ? '🔥 Tepat Sekali!' : '💡 Penjelasan:'}
                </h4>
                <p className="text-blue-100/90 text-sm leading-relaxed">{question.explanation}</p>
              </div>
              <button 
                onClick={nextQuestion}
                className="w-full mt-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-colors shadow-lg shadow-blue-500/20"
              >
                {currentIndex < questions.length - 1 ? 'LANJUT SOAL BERIKUTNYA' : 'LIHAT HASIL KUIS'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}
