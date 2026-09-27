import React, { useEffect, useRef } from 'react';
import { Building2, Calendar, Box, Cpu, AlertTriangle, FileText, GraduationCap } from 'lucide-react';
import { animateStaggerList } from '../utils/animation';

const TASKS = [
  { icon: Box, title: '3D BIM Modeling', items: ['LOD 100–500 commercial kitchen modeling', 'Parametric family creation & spatial planning'] },
  { icon: Cpu, title: 'MEP Coordination', items: ['Electrical, plumbing, & drainage routing', 'Ventilation canopy alignment'] },
  { icon: AlertTriangle, title: 'Clash Detection', items: ['Navisworks & Revizto hard/soft clash', 'Issue tracking & resolution management'] },
  { icon: FileText, title: 'Documentation', items: ['Construction & contractor shop drawings', 'As-built documentation handover'] },
];

export const Experience: React.FC = () => {
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
    <section ref={sectionRef} id="experience" className="py-20 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-6 font-semibold">
          <span>02</span><span className="w-8 h-px bg-sky-500/50" /><span>Work History</span>
        </div>

        {/* Increased Heading Size */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-10">
          Experience & Education
        </h2>

        <div className="border-l-4 border-sky-500 pl-5 mb-10">
          <div className="flex items-center gap-2 text-sm font-mono text-sky-600 dark:text-sky-400 mb-2 font-bold">
            <Building2 className="w-4 h-4" /> BuiltPride Design Services Pvt. Ltd.
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">BIM Project Coordinator</h3>
          <div className="flex items-center gap-2 mt-2 text-sm font-mono text-slate-500">
            <Calendar className="w-4 h-4" /> Jan 2023 – Present
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {TASKS.map((task, idx) => {
            const Icon = task.icon;
            return (
              <div key={idx} className="p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e131f]">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-6 h-6 text-sky-500" />
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">{task.title}</h4>
                </div>
                <ul className="space-y-2">
                  {task.items.map((item, i) => (
                    <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="border-l-4 border-emerald-500 pl-5">
          <div className="flex items-center gap-2 text-sm font-mono text-emerald-600 dark:text-emerald-400 mb-2 font-bold">
            <GraduationCap className="w-4 h-4" /> Shivaji College
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Bachelor of Business Administration (BBA)</h3>
          <div className="mt-2 text-sm text-slate-500 font-mono">Pursuing · New Delhi, India</div>
        </div>
      </div>
    </section>
  );
};