import React from 'react';

const TOOLS = [
  { 
    name: 'Revit', 
    desc: '3D BIM Modeling',
    logo: <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white font-bold text-xl rounded-md shadow-md border-2 border-blue-400/50">R</div>
  },
  { 
    name: 'AutoCAD', 
    desc: '2D Detailing',
    logo: <div className="w-10 h-10 flex items-center justify-center bg-red-600 text-white font-bold text-xl rounded-md shadow-md border-2 border-red-400/50">A</div>
  },
  { 
    name: 'Navisworks', 
    desc: 'Clash Detection',
    logo: <div className="w-10 h-10 flex items-center justify-center bg-green-600 text-white font-bold text-xl rounded-md shadow-md border-2 border-green-400/50">N</div>
  },
  { 
    name: 'Revizto', 
    desc: 'Issue Tracking',
    logo: <div className="w-10 h-10 flex items-center justify-center bg-purple-600 text-white font-bold text-lg rounded-md shadow-md border-2 border-purple-400/50">Rv</div>
  },
  { 
    name: 'BIM 360 / ACC', 
    desc: 'Cloud CDE',
    logo: <div className="w-10 h-10 flex items-center justify-center bg-sky-500 text-white font-bold text-xl rounded-full shadow-md border-2 border-sky-300/50">☁</div>
  },
  { 
    name: 'Excel', 
    desc: 'Data Schedules',
    logo: <div className="w-10 h-10 flex items-center justify-center bg-emerald-600 text-white font-bold text-xl rounded-md shadow-md border-2 border-emerald-400/50">X</div>
  }
];

export const Tools: React.FC = () => {
  return (
    <section id="software" className="py-20 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-6 font-semibold">
          <span>05</span><span className="w-8 h-px bg-sky-500/50" /><span>Software</span>
        </div>
        
        {/* Increased Heading Size */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-10">
          Tools & Technology
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {TOOLS.map((tool, idx) => (
            <div key={idx} className="p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e131f] flex items-center gap-4 hover:border-sky-500/50 transition-colors">
              <div className="shrink-0">{tool.logo}</div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white block text-sm sm:text-base">{tool.name}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5 block">{tool.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};