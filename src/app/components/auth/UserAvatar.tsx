import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useAuth } from './AuthContext';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';
import { LogOut, Trophy, User } from 'lucide-react';

export const UserAvatar = () => {
  const { user } = useAuth();

  if (!user) return null;

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Berhasil keluar');
    } catch (error: any) {
      toast.error('Gagal keluar: ' + error.message);
    }
  };

  const getInitials = (email: string | undefined) => {
    if (!email) return 'U';
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="h-9 w-9 border-2 border-amber-500/50 hover:border-amber-400 transition-colors cursor-pointer">
          <AvatarImage src={user.user_metadata?.avatar_url} />
          <AvatarFallback className="bg-[#1a2744] text-amber-400">
            {user.user_metadata?.full_name?.substring(0, 2).toUpperCase() || getInitials(user.email)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56 bg-[#0a1628]/95 border-amber-500/20 backdrop-blur-xl text-white">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-amber-100">
              {user.user_metadata?.full_name || 'Penjelajah'}
            </p>
            <p className="text-xs leading-none text-slate-400">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-700" />
        <DropdownMenuItem className="cursor-pointer hover:bg-amber-500/20 hover:text-amber-300 focus:bg-amber-500/20 focus:text-amber-300">
          <User className="mr-2 h-4 w-4" />
          <span>Profil</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer hover:bg-amber-500/20 hover:text-amber-300 focus:bg-amber-500/20 focus:text-amber-300">
          <Trophy className="mr-2 h-4 w-4" />
          <span>Papan Peringkat</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-slate-700" />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="cursor-pointer text-red-400 hover:bg-red-500/20 hover:text-red-300 focus:bg-red-500/20 focus:text-red-300"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Keluar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
