import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { useAuth } from '../components/auth/AuthContext';
import { QuizQuestion } from './useQuizDb';

export interface QuizRoom {
  id: string;
  room_code: string;
  host_id: string;
  status: 'waiting' | 'playing' | 'intermission' | 'finished';
  current_question_index: number;
}

export interface RoomParticipant {
  id: string;
  room_id: string;
  user_id?: string;
  guest_name?: string;
  total_score: number;
}

export const useClassroom = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  // Buat Room Baru (Hanya untuk Host)
  const createRoom = async (): Promise<QuizRoom | null> => {
    if (!user) return null;
    setLoading(true);
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    try {
      // PERBAIKAN FK: Pastikan row profile ada sebelum insert ke quiz_rooms.
      // quiz_rooms.host_id REFERENCES profiles(id), jadi upsert profile dulu.
      const { error: profileErr } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Host',
          avatar_url: user.user_metadata?.avatar_url || null,
          provider: user.app_metadata?.provider || 'email',
        }, { onConflict: 'id', ignoreDuplicates: true });

      if (profileErr) {
        console.error('Profile upsert error:', profileErr.message);
        // Lanjut saja — mungkin profile sudah ada dan RLS menolak update (normal)
      }

      const { data, error } = await supabase
        .from('quiz_rooms')
        .insert({
          room_code: roomCode,
          host_id: user.id,
          status: 'waiting',
          current_question_index: -1,
        })
        .select()
        .single();
        
      if (error) throw error;
      return data as QuizRoom;
    } catch (err: any) {
      console.error('Create room error:', err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Join Room (Untuk Guest/Participant)
  const joinRoom = async (roomCode: string, guestName: string): Promise<{ room: QuizRoom, participant: RoomParticipant } | null> => {
    setLoading(true);
    try {
      // Cari room berdasarkan kode
      const { data: room, error: roomErr } = await supabase
        .from('quiz_rooms')
        .select('*')
        .eq('room_code', roomCode)
        .eq('is_active', true)
        .single();
        
      if (roomErr || !room) throw new Error('Ruangan tidak ditemukan atau sudah ditutup.');
      if (room.status !== 'waiting') throw new Error('Kuis sudah dimulai, tidak bisa bergabung.');

      // Masukkan participant
      const { data: participant, error: partErr } = await supabase
        .from('room_participants')
        .insert({
          room_id: room.id,
          user_id: user?.id || null, // Jika login pakai user_id, jika tidak null
          guest_name: user?.user_metadata?.full_name || guestName,
          total_score: 0
        })
        .select()
        .single();

      if (partErr) throw partErr;
      
      return { room: room as QuizRoom, participant: participant as RoomParticipant };
    } catch (err: any) {
      console.error('Join room error:', err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Host: Update status kuis
  const updateRoomState = async (roomId: string, status: string, questionIndex: number) => {
    await supabase
      .from('quiz_rooms')
      .update({ status, current_question_index: questionIndex })
      .eq('id', roomId);
  };

  // Participant: Update skor
  const updateParticipantScore = async (participantId: string, addedScore: number) => {
    const { data } = await supabase
      .from('room_participants')
      .select('total_score')
      .eq('id', participantId)
      .single();
      
    const currentScore = data?.total_score || 0;
    
    await supabase
      .from('room_participants')
      .update({ total_score: currentScore + addedScore })
      .eq('id', participantId);
  };

  // Realtime Subscription untuk Room (Dipakai oleh Guest & Host)
  const subscribeToRoom = (roomId: string, onUpdate: (room: QuizRoom) => void) => {
    const channel = supabase.channel(`room-${roomId}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'quiz_rooms', filter: `id=eq.${roomId}` }, (payload) => {
        onUpdate(payload.new as QuizRoom);
      })
      .subscribe();
      
    return () => { supabase.removeChannel(channel); };
  };

  // Realtime Subscription untuk Participants (Dipakai oleh Host & Guest)
  const subscribeToParticipants = (roomId: string, onUpdate: (participants: RoomParticipant[]) => void) => {
    const fetchParticipants = async () => {
      const { data } = await supabase.from('room_participants').select('*').eq('room_id', roomId).order('total_score', { ascending: false });
      if (data) onUpdate(data as RoomParticipant[]);
    };

    fetchParticipants(); // initial fetch

    const channel = supabase.channel(`participants-${roomId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'room_participants', filter: `room_id=eq.${roomId}` }, () => {
        fetchParticipants();
      })
      .subscribe();
      
    return () => { supabase.removeChannel(channel); };
  };

  return {
    createRoom,
    joinRoom,
    updateRoomState,
    updateParticipantScore,
    subscribeToRoom,
    subscribeToParticipants,
    loading
  };
};
