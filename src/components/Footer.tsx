import React from 'react';
import { ArrowUp, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070a10] py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-sky-500 rounded-none transform rotate-45" />
              <span className="text-sm font-extrabold tracking-wider text-slate-900 dark:text-white uppercase">
                VIVEK KUSHWAHA
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 font-mono">
              BIM Project Coordinator &amp; CAD Designer · Commercial Kitchen BIM
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-sky-500" />
              <span>New Delhi, India</span>
            </span>

            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-[#0e131f] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3 text-sky-500" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500 gap-2">
          <span>&copy; {new Date().getFullYear()} Vivek Kushwaha. All professional information derived strictly from verified credentials.</span>
          <span>AUTODESK REVIT · NAVISWORKS · REVIZTO · ACC</span>
        </div>
      </div>
    </footer>
  );
};
