import React, { useEffect, useRef } from 'react';
import { Layers, ShieldCheck, Check } from 'lucide-react';
import { animateStaggerList } from '../utils/animation';

const SKILLS = [
  { icon: Layers, title: 'BIM & Design', items: ['Parametric Revit Modeling', 'Kitchen Equipment Layouts', 'MEP Interface Rough-ins', 'LOD 100-500 Documentation'] },
  { icon: ShieldCheck, title: 'Coordination & Quality', items: ['Navisworks Clash Detection', 'Revizto Issue Tracking', 'Model Auditing & QC', 'ACC/BIM 360 CDE Management'] }
];

export const Expertise: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && gridRef.current) {
        animateStaggerList(gridRef.current.children);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(sectionRef.current);
  }, []);

  return (
    <section ref={sectionRef} id="expertise" className="py-20 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-6 font-semibold">
          <span>03</span><span className="w-8 h-px bg-sky-500/50" /><span>Capabilities</span>
        </div>

        {/* Increased Heading Size */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-10">
          Core Competencies
        </h2>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILLS.map((skill, idx) => {
            const Icon = skill.icon;
            return (
              <div key={idx} className="p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e131f]">
                <div className="flex items-center gap-4 mb-6">
                  <Icon className="w-8 h-8 text-sky-500" />
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{skill.title}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skill.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-[#070a10] border border-slate-100 dark:border-slate-800/50">
                      <Check className="w-4 h-4 text-sky-500 shrink-0" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};