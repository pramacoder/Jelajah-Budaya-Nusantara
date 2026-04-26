import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { GoogleSignIn } from './GoogleSignIn';
import { EmailAuthForm } from './EmailAuthForm';

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#0a1628]/95 border-amber-500/20 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-amber-400 font-serif text-center">Jelajah Budaya</DialogTitle>
          <DialogDescription className="text-slate-300 text-center">
            Masuk untuk menyimpan progres kuis dan mengoleksi badge pencapaian.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#1a2744]/50">
              <TabsTrigger 
                value="login"
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900"
              >
                Masuk
              </TabsTrigger>
              <TabsTrigger 
                value="register"
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900"
              >
                Daftar Baru
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <EmailAuthForm mode="login" onSuccess={() => onOpenChange(false)} />
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4">
              <EmailAuthForm mode="register" onSuccess={() => onOpenChange(false)} />
            </TabsContent>
          </Tabs>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0a1628] px-2 text-slate-400">Atau lanjutkan dengan</span>
            </div>
          </div>

          <GoogleSignIn />
        </div>
      </DialogContent>
    </Dialog>
  );
};
