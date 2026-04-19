import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './auth/AuthContext';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-50">
        <div className="text-lg font-medium text-zinc-600 animate-pulse">Memuat data pengguna...</div>
      </div>
    );
  }

  if (!user) {
    // Arahkan ke halaman utama/login
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
