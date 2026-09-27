import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-mono text-xs shadow-2xl border border-slate-700 dark:border-slate-300">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0" />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};
