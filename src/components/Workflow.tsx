import React, { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';

const WORKFLOWS = {
  consultant: [
    { title: 'Design Concept (LOD 100-200)', desc: 'Initial space allocation, kitchen operational zoning, flow planning, and schematic spatial modeling.' },
    { title: 'Equipment Selection', desc: 'Equipment selection, functional grouping (cooking, prep, wash, cold storage), and capacity specification.' },
    { title: 'Revit Modeling (LOD 300)', desc: 'Parametric 3D Revit modeling with accurate physical geometry, clearances, and family parameters.' },
    { title: 'Clash Detection & Tender', desc: 'Running multi-discipline interference checks and publishing coordinated tender packages.' }
  ],
  contractor: [
    { title: 'Coordination Reviews (LOD 350)', desc: 'Ingesting tender BIM models, verifying site structural boundaries, and initiating contractor coordination.' },
    { title: 'Shop Drawings (LOD 400)', desc: 'Authoring highly detailed shop drawings, fabrication plans, and dimensional rough-in elevations.' },
    { title: 'Site Modifications', desc: 'Incorporating site changes, approved Requests for Information (RFIs), and field modifications.' },
    { title: 'As-Built Handover (LOD 500)', desc: 'Final asset handover deliverables, maintenance data parameters, and digital O&M records.' }
  ]
};

export const Workflow: React.FC = () => {
  const [activeConsultant, setActiveConsultant] = useState<number | null>(0);
  const [activeContractor, setActiveContractor] = useState<number | null>(0);

  const toggleConsultant = (idx: number) => setActiveConsultant(activeConsultant === idx ? null : idx);
  const toggleContractor = (idx: number) => setActiveContractor(activeContractor === idx ? null : idx);

  return (
    <section id="workflow" className="py-20 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-6 font-semibold">
          <span>04</span><span className="w-8 h-px bg-sky-500/50" /><span>Lifecycle</span>
        </div>

        {/* Increased Heading Size */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-10">
          Project Lifecycle
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Consultant Interactive Column */}
          <div className="p-6 sm:p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e131f]">
            <h3 className="text-xl font-bold text-sky-600 dark:text-sky-400 mb-6">Consultant Stage</h3>
            <div className="space-y-3">
              {WORKFLOWS.consultant.map((step, i) => (
                <div 
                  key={i} 
                  onClick={() => toggleConsultant(i)}
                  className={`border transition-all cursor-pointer ${activeConsultant === i ? 'border-sky-500 bg-sky-500/5 dark:bg-sky-500/10' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070a10] hover:border-sky-300'}`}
                >
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs font-bold ${activeConsultant === i ? 'text-sky-500' : 'text-slate-400'}`}>0{i + 1}</span>
                      <span className={`font-bold text-sm sm:text-base ${activeConsultant === i ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>{step.title}</span>
                    </div>
                    {activeConsultant === i ? <ChevronDown className="w-4 h-4 text-sky-500" /> : <Plus className="w-4 h-4 text-slate-400" />}
                  </div>
                  {activeConsultant === i && (
                    <div className="px-4 pb-4 pt-1 text-sm text-slate-600 dark:text-slate-400 ml-7 border-t border-slate-200/50 dark:border-slate-800/50 mt-2">
                      {step.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contractor Interactive Column */}
          <div className="p-6 sm:p-8 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e131f]">
            <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">Contractor Stage</h3>
            <div className="space-y-3">
              {WORKFLOWS.contractor.map((step, i) => (
                <div 
                  key={i} 
                  onClick={() => toggleContractor(i)}
                  className={`border transition-all cursor-pointer ${activeContractor === i ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070a10] hover:border-emerald-300'}`}
                >
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs font-bold ${activeContractor === i ? 'text-emerald-500' : 'text-slate-400'}`}>0{i + 1}</span>
                      <span className={`font-bold text-sm sm:text-base ${activeContractor === i ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>{step.title}</span>
                    </div>
                    {activeContractor === i ? <ChevronDown className="w-4 h-4 text-emerald-500" /> : <Plus className="w-4 h-4 text-slate-400" />}
                  </div>
                  {activeContractor === i && (
                    <div className="px-4 pb-4 pt-1 text-sm text-slate-600 dark:text-slate-400 ml-7 border-t border-slate-200/50 dark:border-slate-800/50 mt-2">
                      {step.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};