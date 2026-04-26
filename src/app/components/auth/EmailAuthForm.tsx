import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';

interface EmailAuthFormProps {
  mode: 'login' | 'register';
  onSuccess?: () => void;
}

export const EmailAuthForm: React.FC<EmailAuthFormProps> = ({ mode, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'register') {
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            }
          }
        });
        if (error) throw error;
        if (data.session) {
            toast.success('Pendaftaran berhasil!');
            onSuccess?.();
        } else {
            toast.success('Pendaftaran berhasil! Silakan periksa email Anda untuk verifikasi.');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success('Berhasil masuk!');
        onSuccess?.();
      }
    } catch (error: any) {
      toast.error(`Gagal ${mode === 'login' ? 'masuk' : 'mendaftar'}: ` + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === 'register' && (
        <div className="space-y-2">
          <Label htmlFor="name" className="text-amber-100">Nama Lengkap</Label>
          <Input 
            id="name" 
            placeholder="Nusantara Explorer" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-[#0a1628]/50 border-amber-500/20 text-white placeholder:text-slate-500 focus-visible:ring-amber-500"
          />
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-amber-100">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="nama@email.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-[#0a1628]/50 border-amber-500/20 text-white placeholder:text-slate-500 focus-visible:ring-amber-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-amber-100">Password</Label>
        <Input 
          id="password" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="bg-[#0a1628]/50 border-amber-500/20 text-white focus-visible:ring-amber-500"
        />
      </div>

      <Button 
        type="submit" 
        disabled={loading} 
        className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
      >
        {loading ? 'Memproses...' : (mode === 'login' ? 'Masuk' : 'Daftar')}
      </Button>
    </form>
  );
};
