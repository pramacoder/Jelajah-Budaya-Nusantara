import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { useAuth } from '../components/auth/AuthContext';

export interface QuizQuestion {
  id: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  province_id?: string;
  question: string;
  image_url?: string;
  options: string[];
  correct: number;
  explanation: string;
  points: number;
  time_limit: number;
}

export interface PlayerStats {
  id: string;
  name: string | null;
  avatar_url: string | null;
  total_score: number;
  quizzes_taken: number;
  rank?: number;
}

export const useQuizDb = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = async (limit: number = 10, category?: string): Promise<QuizQuestion[]> => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from('questions').select('*').eq('is_active', true);
      if (category) {
        query = query.eq('category', category);
      }
      
      const { data, error: err } = await query.limit(limit);
      
      if (err) throw err;
      
      // Shuffle questions
      const shuffled = (data as QuizQuestion[]).sort(() => 0.5 - Math.random());
      return shuffled;
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getGlobalLeaderboard = async (): Promise<PlayerStats[]> => {
    setLoading(true);
    try {
      // the leaderboard view might not exist if view creation failed, fallback to profiles query
      const { data, error: err } = await supabase
        .from('profiles')
        .select('id, name, avatar_url, total_score')
        .order('total_score', { ascending: false })
        .limit(20);

      if (err) throw err;
      return (data || []).map((row, index) => ({
        ...row,
        quizzes_taken: 0,
        rank: index + 1
      })) as PlayerStats[];
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const submitQuizScore = async (score: number, correctCount: number, timeTaken: number) => {
    if (!user) return;
    try {
      // 1. Fetch current profile stats
      const { data: profile } = await supabase
        .from('profiles')
        .select('total_score')
        .eq('id', user.id)
        .single();
        
      const currentScore = profile?.total_score || 0;

      // 2. Update profile score
      await supabase
        .from('profiles')
        .update({ 
          total_score: currentScore + score,
          last_quiz_at: new Date().toISOString()
        })
        .eq('id', user.id);

      // 3. Insert session record
      await supabase
        .from('quiz_sessions')
        .insert({
          user_id: user.id,
          mode: 'quick',
          score,
          correct_count: correctCount,
          time_taken: timeTaken,
          completed_at: new Date().toISOString()
        });

    } catch (err: any) {
      console.error('Error submitting score:', err.message);
    }
  };

  return {
    fetchQuestions,
    getGlobalLeaderboard,
    submitQuizScore,
    loading,
    error
  };
};
