import React, { useEffect, useRef } from 'react';
import { MapPin, ArrowUpRight, ArrowDown } from 'lucide-react';
import { animateFadeUp } from '../utils/animation';
import { ProfileImage } from './ProfileImage';
import { BimVisualizer } from './BimVisualizer';

export const Hero: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const visualizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) animateFadeUp(contentRef.current, { delay: 50, duration: 500 });
    if (visualizerRef.current) animateFadeUp(visualizerRef.current, { delay: 150, duration: 600 });
  }, []);

  const mailtoLink = "mailto:facilityvivekkushwaha@gmail.com?subject=Project%20Inquiry%20-%20BIM%20Coordination&body=Hi%20Vivek,%0D%0A%0D%0AI%20would%20like%20to%20discuss%20a%20potential%20collaboration...%0D%0A%0D%0AThank%20you.";

  return (
    <section className="pt-24 sm:pt-28 pb-16 sm:pb-20 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono tracking-wider text-slate-500 dark:text-slate-400 mb-6">
          <span className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-sky-500" />
            <span>NEW DELHI, INDIA</span>
          </span>
          <span aria-hidden="true" className="text-slate-400 dark:text-slate-700">·</span>
          <span className="text-sky-600 dark:text-sky-400 font-medium">BIM / CAD ARCHITECTURE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div ref={contentRef} className="lg:col-span-7">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
              <ProfileImage />
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-2">
                  VIVEK KUSHWAHA
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  BIM Coordinator <br />
                  <span className="text-slate-600 dark:text-slate-400 text-3xl sm:text-4xl lg:text-5xl">&amp; CAD Designer</span>
                </h1>
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl mt-6">
              Specializing in commercial kitchen BIM and multidisciplinary MEP coordination. Delivering precise LOD 100–500 workflows for international consultants and trade contractors.
            </p>

            <div className="mt-8 flex gap-4">
              <a href={mailtoLink} className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase text-slate-950 bg-sky-400 hover:bg-sky-300 transition-colors shadow-md shadow-sky-500/20">
                <span>Contact Me</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a href="#experience" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-[#0e131f] dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 transition-colors">
                <span>View Work</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div ref={visualizerRef} className="lg:col-span-5 w-full">
            <BimVisualizer />
          </div>
        </div>
      </div>
    </section>
  );
};