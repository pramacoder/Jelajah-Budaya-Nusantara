import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { useAuth } from '../components/auth/AuthContext';

export interface RoomInfo {
  id: string;
  room_code: string;
  host_id: string;
  is_active: boolean;
}

export interface ParticipantInfo {
  id: string;
  user_id: string;
  total_score: number;
  profiles: {
    name: string;
    avatar_url: string;
  };
}

export const useClassroomDb = (roomId?: string) => {
  const { user } = useAuth();
  const [participants, setParticipants] = useState<ParticipantInfo[]>([]);
  const [roomState, setRoomState] = useState<RoomInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate a random 6 char alpha numeric PIN
  const generatePin = () => Math.random().toString(36).substring(2, 8).toUpperCase();

  const createRoom = async (): Promise<RoomInfo | null> => {
    if (!user) return null;
    setLoading(true);
    try {
      const pin = generatePin();
      const { data, error: err } = await supabase
        .from('quiz_rooms')
        .insert({ room_code: pin, host_id: user.id })
        .select()
        .single();
        
      if (err) throw err;
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const joinRoom = async (pin: string): Promise<RoomInfo | null> => {
    if (!user) return null;
    setLoading(true);
    try {
      // Find room
      const { data: room, error: errRoom } = await supabase
        .from('quiz_rooms')
        .select('*')
        .eq('room_code', pin)
        .eq('is_active', true)
        .single();

      if (errRoom || !room) throw new Error("Ruangan tidak ditemukan atau sudah tidak aktif");

      // Insert participant if not already in
      const { data: existingPart } = await supabase
        .from('room_participants')
        .select('*')
        .eq('room_id', room.id)
        .eq('user_id', user.id)
        .single();

      if (!existingPart) {
        await supabase
          .from('room_participants')
          .insert({ room_id: room.id, user_id: user.id });
      }

      return room;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchParticipants = async (rId: string) => {
    const { data } = await supabase
      .from('room_participants')
      .select('*, profiles(name, avatar_url)')
      .eq('room_id', rId)
      .order('total_score', { ascending: false });
    
    if (data) {
      setParticipants(data as unknown as ParticipantInfo[]);
    }
  };

  const startGame = async (rId: string) => {
    // We update is_active to false indicating waiting is over (or add a 'status' = 'playing')
    // For simplicity, we just toggle is_active to false so no new joins happen, 
    // and broadcast an event (but since we don't have custom payload, we just watch is_active change)
    await supabase.from('quiz_rooms').update({ is_active: false }).eq('id', rId);
  };

  const updateParticipantScore = async (rId: string, addedScore: number) => {
     if(!user) return;
     // Get current score
     const { data } = await supabase.from('room_participants').select('total_score').eq('room_id', rId).eq('user_id', user.id).single();
     if(data) {
        await supabase.from('room_participants').update({ total_score: data.total_score + addedScore }).eq('room_id', rId).eq('user_id', user.id);
     }
  };

  useEffect(() => {
    if (!roomId) return;
    
    // Initial fetch
    fetchParticipants(roomId);
    supabase.from('quiz_rooms').select('*').eq('id', roomId).single().then(({data}) => {
       if (data) setRoomState(data);
    });

    // Subscribe to Participants changes (someone joins or score updates)
    const partSub = supabase
      .channel('room_participants_chan')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'room_participants', filter: `room_id=eq.${roomId}` }, () => {
        fetchParticipants(roomId);
      })
      .subscribe();

    // Subscribe to Room changes (Host starts game)
    const roomSub = supabase
      .channel('quiz_rooms_chan')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'quiz_rooms', filter: `id=eq.${roomId}` }, (payload) => {
        setRoomState(payload.new as RoomInfo);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(partSub);
      supabase.removeChannel(roomSub);
    };
  }, [roomId]);

  return { createRoom, joinRoom, startGame, updateParticipantScore, participants, roomState, loading, error };
};
