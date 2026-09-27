import React, { useEffect, useRef } from 'react';
import { Compass, FileSpreadsheet, Globe2, Layers } from 'lucide-react';
import { animateFadeUp, animateStaggerList } from '../utils/animation';

const PILLARS = [
  { icon: Compass, title: 'Commercial Kitchens', desc: 'Specialized facility layouts and complex MEP integrations.' },
  { icon: Layers, title: 'LOD 100–500 BIM', desc: 'Design models for consultants to as-builts for contractors.' },
  { icon: FileSpreadsheet, title: 'MEP Interface', desc: 'Precision coordination of electrical, plumbing, and ventilation.' },
  { icon: Globe2, title: 'Global Delivery', desc: 'Cross-border project delivery across GCC, UK, and Europe.' },
];

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (textRef.current) animateFadeUp(textRef.current);
        if (gridRef.current) animateStaggerList(gridRef.current.children);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(sectionRef.current);
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-6 font-semibold">
          <span>01</span><span className="w-8 h-px bg-sky-500/50" /><span>Profile Overview</span>
        </div>

        <div ref={textRef} className="max-w-4xl mb-12">
          {/* Increased Heading Size */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-5 leading-tight">
            Bridging design consultants and trade contractors with coordinated 3D models.
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl">
            3+ years of professional experience managing clash-free models, construction documentation, and CDE collaboration across global building standards.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div key={idx} className="p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e131f] hover:border-sky-500/50 transition-colors">
                <Icon className="w-6 h-6 text-sky-500 mb-4" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{pillar.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};