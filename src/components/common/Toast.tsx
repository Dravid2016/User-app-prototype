import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 animate-bounce">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#111111] text-white text-xs font-extrabold rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-[#FFD21F]">
        <CheckCircle2 size={16} className="text-[#FFD21F]" />
        <span>{message}</span>
      </div>
    </div>
  );
};
