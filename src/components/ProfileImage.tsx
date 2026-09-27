import React, { useEffect, useRef } from 'react';
import { animateScaleIn } from '../utils/animation';

export const ProfileImage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      animateScaleIn(containerRef.current, { delay: 100, duration: 600 });
    }
  }, []);

  return (
    <div ref={containerRef} className="relative group w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 shrink-0 select-none">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-sky-500/25 via-sky-500/10 to-transparent blur-md group-hover:from-sky-500/35 transition-all duration-500 pointer-events-none" />

      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-sky-500/30 dark:border-sky-500/30 border-slate-300 bg-white dark:bg-[#0c121e] shadow-xl p-1.5 flex items-center justify-center">
        
        <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-sky-400 z-20 pointer-events-none" />
        <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-sky-400 z-20 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-sky-400 z-20 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-sky-400 z-20 pointer-events-none" />

        {/* Changed Image Source to Profile.jpg */}
        <img
          src="/Profile.jpeg"
          onError={(e) => { e.currentTarget.src = '/profile.svg'; }}
          alt="Vivek Kushwaha"
          className="w-full h-full object-cover object-top rounded-xl transition-transform duration-500 group-hover:scale-[1.02]"
        />

        <div className="absolute bottom-2.5 left-2.5 right-2.5 py-1 px-2.5 bg-slate-900/90 dark:bg-[#070a10]/90 backdrop-blur-md border border-sky-500/30 rounded-md flex items-center justify-between text-[10px] font-mono text-slate-200 z-20 shadow-md">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold tracking-wider uppercase">V. KUSHWAHA</span>
          </span>
          <span className="text-sky-400 font-bold uppercase tracking-wider">BIM · CAD</span>
        </div>
      </div>
    </div>
  );
};