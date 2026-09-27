import React, { useState } from 'react';
import { Layers, CheckCircle2, Sliders, Box, Compass } from 'lucide-react';

interface LayerState {
  grid: boolean;
  equipment: boolean;
  mep: boolean;
  clashes: boolean;
}

export const BimVisualizer: React.FC = () => {
  const [layers, setLayers] = useState<LayerState>({
    grid: true,
    equipment: true,
    mep: true,
    clashes: true,
  });

  const [viewMode, setViewMode] = useState<'iso' | 'plan'>('iso');
  const [activeItem, setActiveItem] = useState<string | null>('K-01');
  const [coords, setCoords] = useState({ x: '24.85', y: '16.20', z: '+2.85' });

  const toggleLayer = (layerKey: keyof LayerState) => {
    setLayers((prev) => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * 40;
    const relY = ((e.clientY - rect.top) / rect.height) * 30;
    setCoords({
      x: relX.toFixed(2),
      y: relY.toFixed(2),
      z: '+2.85',
    });
  };

  return (
    <div className="relative w-full border border-slate-800 bg-[#0e131f] overflow-hidden shadow-2xl">
      {/* Top Header Bar / Model Coordinate Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-slate-800 bg-[#0a0e17] text-[11px] font-mono">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-200">COORDINATION MODEL</span>
          <span className="text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400">COMMERCIAL KITCHEN · LOD 400</span>
        </div>

        <div className="flex items-center gap-2 text-slate-400 tabular-nums">
          <span>X: {coords.x}m</span>
          <span>Y: {coords.y}m</span>
          <span className="hidden sm:inline">Z: {coords.z}m</span>
        </div>
      </div>

      {/* Main Interactive CAD / BIM Canvas */}
      <div className="relative aspect-4/3 sm:aspect-16/11 w-full bg-[#070a10] overflow-hidden select-none">
        {/* Subtle CAD Grid background */}
        <div className="absolute inset-0 cad-grid-pattern opacity-40 pointer-events-none" />

        <svg
          viewBox="0 0 800 550"
          className="w-full h-full cursor-crosshair"
          onMouseMove={handleMouseMove}
        >
          <defs>
            <linearGradient id="ductGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="pipeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.9" />
            </linearGradient>
            <pattern id="cadCrossGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.75" />
              <circle cx="20" cy="20" r="0.75" fill="#38bdf8" fillOpacity="0.3" />
            </pattern>
          </defs>

          {/* Grid pattern layer */}
          {layers.grid && (
            <g id="grid-layer" className="transition-opacity duration-300">
              <rect width="800" height="550" fill="url(#cadCrossGrid)" opacity="0.6" />

              {/* Grid Axis Lines & Labels */}
              <line x1="80" y1="40" x2="80" y2="500" stroke="#334155" strokeWidth="1" strokeDasharray="6,4" />
              <line x1="280" y1="40" x2="280" y2="500" stroke="#334155" strokeWidth="1" strokeDasharray="6,4" />
              <line x1="480" y1="40" x2="480" y2="500" stroke="#334155" strokeWidth="1" strokeDasharray="6,4" />
              <line x1="680" y1="40" x2="680" y2="500" stroke="#334155" strokeWidth="1" strokeDasharray="6,4" />

              <line x1="40" y1="120" x2="740" y2="120" stroke="#334155" strokeWidth="1" strokeDasharray="6,4" />
              <line x1="40" y1="280" x2="740" y2="280" stroke="#334155" strokeWidth="1" strokeDasharray="6,4" />
              <line x1="40" y1="440" x2="740" y2="440" stroke="#334155" strokeWidth="1" strokeDasharray="6,4" />

              {/* Grid Bubble Tags */}
              <g className="text-[10px] font-mono fill-slate-400 select-none">
                <circle cx="80" cy="30" r="10" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                <text x="80" y="34" textAnchor="middle">A</text>
                <circle cx="280" cy="30" r="10" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                <text x="280" y="34" textAnchor="middle">B</text>
                <circle cx="480" cy="30" r="10" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                <text x="480" y="34" textAnchor="middle">C</text>
                <circle cx="680" cy="30" r="10" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                <text x="680" y="34" textAnchor="middle">D</text>

                <circle cx="25" cy="120" r="10" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                <text x="25" y="124" textAnchor="middle">1</text>
                <circle cx="25" cy="280" r="10" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                <text x="25" y="284" textAnchor="middle">2</text>
                <circle cx="25" cy="440" r="10" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                <text x="25" y="444" textAnchor="middle">3</text>
              </g>

              {/* Boundary / Wall lines */}
              <rect x="70" y="70" width="660" height="420" fill="none" stroke="#64748b" strokeWidth="2.5" strokeOpacity="0.7" />
              <path d="M 70 70 L 60 60 M 730 70 L 740 60 M 70 490 L 60 500 M 730 490 L 740 500" stroke="#64748b" strokeWidth="1" />
            </g>
          )}

          {/* VIEW MODE: 3D ISOMETRIC PROJECTION */}
          {viewMode === 'iso' ? (
            <g id="iso-projection" transform="translate(400, 290) scale(1, 0.58) rotate(45)">
              {/* Floor Base */}
              <polygon
                points="-180,-180 180,-180 180,180 -180,180"
                fill="#0f172a"
                fillOpacity="0.7"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />

              {/* Internal Cooking Line Zone Boundary */}
              <rect x="-140" y="-140" width="280" height="280" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4,4" />

              {/* MEP SERVICES ROUTING (Underfloor & Ceiling) */}
              {layers.mep && (
                <g id="iso-mep">
                  {/* Drainage Main (Purple) */}
                  <path
                    d="M -160,140 L -60,140 L -60,-120 L 140,-120"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="4"
                    strokeOpacity="0.8"
                    strokeLinecap="round"
                  />
                  {/* Water Supply Line (Blue) */}
                  <path
                    d="M -150,120 L -40,120 L -40,-100 L 150,-100"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3.5"
                    strokeOpacity="0.9"
                    strokeLinecap="round"
                  />
                  {/* Electrical Conduit / Cable Tray (Amber) */}
                  <path
                    d="M 120,160 L 120,-60 L -120,-60 L -120,-150"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeOpacity="0.9"
                    strokeDasharray="8,3"
                  />
                  {/* HVAC Extract Hood Duct Envelope (Teal) */}
                  <polygon
                    points="-110,-40 70,-40 70,60 -110,60"
                    fill="#0284c7"
                    fillOpacity="0.15"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                    strokeDasharray="4,2"
                  />
                </g>
              )}

              {/* COMMERCIAL KITCHEN EQUIPMENT BLOCKS (LOD 350-400) */}
              {layers.equipment && (
                <g id="iso-equipment">
                  {/* EQ-K01: Combi Oven Block with extruded 3D height */}
                  <g
                    className="cursor-pointer transition-transform hover:opacity-90"
                    onClick={() => setActiveItem('K-01')}
                  >
                    <polygon points="-100,-30 -40,-30 -40,30 -100,30" fill={activeItem === 'K-01' ? '#0369a1' : '#1e293b'} stroke="#38bdf8" strokeWidth="2" />
                    <text x="-70" y="5" fill="#f8fafc" fontSize="12" fontFamily="monospace" textAnchor="middle">K-01</text>
                  </g>

                  {/* EQ-K02: Heavy Duty Cooking Range */}
                  <g
                    className="cursor-pointer transition-transform hover:opacity-90"
                    onClick={() => setActiveItem('K-02')}
                  >
                    <polygon points="-30,-30 30,-30 30,30 -30,30" fill={activeItem === 'K-02' ? '#0369a1' : '#1e293b'} stroke="#38bdf8" strokeWidth="2" />
                    <text x="0" y="5" fill="#f8fafc" fontSize="12" fontFamily="monospace" textAnchor="middle">K-02</text>
                  </g>

                  {/* EQ-K03: Deep Fryer Battery */}
                  <g
                    className="cursor-pointer transition-transform hover:opacity-90"
                    onClick={() => setActiveItem('K-03')}
                  >
                    <polygon points="40,-30 80,-30 80,30 40,30" fill={activeItem === 'K-03' ? '#0369a1' : '#1e293b'} stroke="#38bdf8" strokeWidth="2" />
                    <text x="60" y="5" fill="#f8fafc" fontSize="12" fontFamily="monospace" textAnchor="middle">K-03</text>
                  </g>

                  {/* EQ-K04: Stainless Prep & Wash Island with Sinks */}
                  <g
                    className="cursor-pointer transition-transform hover:opacity-90"
                    onClick={() => setActiveItem('K-04')}
                  >
                    <polygon points="-100,80 80,80 80,120 -100,120" fill={activeItem === 'K-04' ? '#0369a1' : '#1e293b'} stroke="#38bdf8" strokeWidth="2" />
                    <text x="-10" y="105" fill="#f8fafc" fontSize="12" fontFamily="monospace" textAnchor="middle">PREP / SINK ISLAND</text>
                  </g>

                  {/* EQ-K05: Walk-In Cooler Footprint */}
                  <g
                    className="cursor-pointer transition-transform hover:opacity-90"
                    onClick={() => setActiveItem('K-05')}
                  >
                    <polygon points="90,-150 160,-150 160,-50 90,-50" fill={activeItem === 'K-05' ? '#0369a1' : '#1e293b'} stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,2" />
                    <text x="125" y="-95" fill="#f8fafc" fontSize="11" fontFamily="monospace" textAnchor="middle">WALK-IN</text>
                  </g>
                </g>
              )}

              {/* CLASH DETECTION NODES (RESOLVED) */}
              {layers.clashes && (
                <g id="iso-clashes">
                  {/* Clash node 1: Pipe vs Duct solved */}
                  <g transform="translate(-40, -100)">
                    <circle cx="0" cy="0" r="9" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="3" fill="#10b981" />
                  </g>
                  {/* Clash node 2: Grease Trap vs Electrical Conduit solved */}
                  <g transform="translate(80, 80)">
                    <circle cx="0" cy="0" r="9" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="3" fill="#10b981" />
                  </g>
                </g>
              )}
            </g>
          ) : (
            /* 2D PLAN VIEW COORDINATION */
            <g id="plan-view" transform="translate(100, 90)">
              {/* Floor Plan Boundary */}
              <rect x="0" y="0" width="600" height="340" fill="#0f172a" fillOpacity="0.5" stroke="#334155" strokeWidth="1.5" />

              {/* Dimension lines */}
              <g stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" fontSize="10" fontFamily="monospace" fill="#94a3b8">
                <line x1="30" y1="20" x2="570" y2="20" />
                <text x="300" y="16" textAnchor="middle">DIM: 18,500 mm (OVERALL COOKING ZONE)</text>
              </g>

              {/* MEP Lines in Plan View */}
              {layers.mep && (
                <g id="plan-mep">
                  {/* Drainage main */}
                  <path d="M 50,290 L 550,290" stroke="#a855f7" strokeWidth="3" strokeOpacity="0.8" />
                  <text x="560" y="294" fill="#a855f7" fontSize="9" fontFamily="monospace">Ø110 DRAIN</text>

                  {/* Water Cold & Hot */}
                  <path d="M 50,190 L 550,190" stroke="#38bdf8" strokeWidth="2.5" strokeOpacity="0.8" />
                  <text x="560" y="194" fill="#38bdf8" fontSize="9" fontFamily="monospace">Ø28 CW/HW</text>

                  {/* Exhaust Hood Canopy Boundary */}
                  <rect x="120" y="60" width="360" height="90" fill="#0284c7" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6,4" />
                  <text x="300" y="105" fill="#38bdf8" fontSize="11" fontFamily="monospace" textAnchor="middle">EXHAUST CANOPY OVER HOT LINE (EXTRACT + MAKE-UP AIR)</text>
                </g>
              )}

              {/* Equipment in Plan View */}
              {layers.equipment && (
                <g id="plan-equipment">
                  {/* Combi Oven */}
                  <rect
                    x="140" y="65" width="80" height="80"
                    fill={activeItem === 'K-01' ? '#0284c7' : '#1e293b'}
                    stroke="#38bdf8" strokeWidth="1.5"
                    className="cursor-pointer"
                    onClick={() => setActiveItem('K-01')}
                  />
                  <text x="180" y="110" fill="#f8fafc" fontSize="11" fontFamily="monospace" textAnchor="middle">K-01</text>

                  {/* 6-Burner Range */}
                  <rect
                    x="230" y="65" width="100" height="80"
                    fill={activeItem === 'K-02' ? '#0284c7' : '#1e293b'}
                    stroke="#38bdf8" strokeWidth="1.5"
                    className="cursor-pointer"
                    onClick={() => setActiveItem('K-02')}
                  />
                  <text x="280" y="110" fill="#f8fafc" fontSize="11" fontFamily="monospace" textAnchor="middle">K-02</text>

                  {/* Fryers */}
                  <rect
                    x="340" y="65" width="60" height="80"
                    fill={activeItem === 'K-03' ? '#0284c7' : '#1e293b'}
                    stroke="#38bdf8" strokeWidth="1.5"
                    className="cursor-pointer"
                    onClick={() => setActiveItem('K-03')}
                  />
                  <text x="370" y="110" fill="#f8fafc" fontSize="11" fontFamily="monospace" textAnchor="middle">K-03</text>

                  {/* Salamander / Griddle */}
                  <rect
                    x="410" y="65" width="60" height="80"
                    fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5"
                  />
                  <text x="440" y="110" fill="#f8fafc" fontSize="11" fontFamily="monospace" textAnchor="middle">K-04</text>

                  {/* Prep Sink Table */}
                  <rect
                    x="140" y="210" width="330" height="60"
                    fill={activeItem === 'K-04' ? '#0284c7' : '#1e293b'}
                    stroke="#38bdf8" strokeWidth="1.5"
                    className="cursor-pointer"
                    onClick={() => setActiveItem('K-04')}
                  />
                  <text x="305" y="245" fill="#f8fafc" fontSize="11" fontFamily="monospace" textAnchor="middle">PREP & WASH TABLES WITH INTEGRAL SINKS</text>
                </g>
              )}

              {/* Resolved Clash Markers */}
              {layers.clashes && (
                <g id="plan-clashes">
                  <g transform="translate(180, 190)">
                    <circle cx="0" cy="0" r="8" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="3" fill="#10b981" />
                  </g>
                  <g transform="translate(370, 190)">
                    <circle cx="0" cy="0" r="8" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="3" fill="#10b981" />
                  </g>
                </g>
              )}
            </g>
          )}

          {/* Interactive Inspection Callout Overlay */}
          <g transform="translate(30, 470)" className="text-[11px] font-mono">
            <rect width="400" height="60" fill="#0b0f19" fillOpacity="0.95" stroke="#334155" strokeWidth="1" />
            <text x="12" y="20" fill="#38bdf8" fontWeight="bold">
              {activeItem === 'K-01' && 'ITEM: K-01 · 20-PAN COMBI STEAM OVEN (LOD 400)'}
              {activeItem === 'K-02' && 'ITEM: K-02 · 6-BURNER HEAVY RANGE + CONVECTION (LOD 350)'}
              {activeItem === 'K-03' && 'ITEM: K-03 · DUAL TANK HIGH EFFICIENCY FRYER (LOD 350)'}
              {activeItem === 'K-04' && 'ITEM: PREP ISLAND · 304 STAINLESS FABRICATION (LOD 400)'}
              {activeItem === 'K-05' && 'ITEM: WALK-IN MODULAR COLD STORAGE (LOD 300)'}
            </text>
            <text x="12" y="38" fill="#94a3b8">
              {activeItem === 'K-01' && 'MEP: 415V 3P+N+E 38kW · CW 3/4" · CONDENSATE Ø50mm'}
              {activeItem === 'K-02' && 'MEP: GAS 1-1/4" NPT · 140,000 BTU/HR · ELEC 230V 1P'}
              {activeItem === 'K-03' && 'MEP: GAS 3/4" · ELEC 230V 1P · FIRE SUPPRESSION LINK'}
              {activeItem === 'K-04' && 'MEP: CW/HW 1/2" MIXER · WASTE Ø50mm GREASE TRAP'}
              {activeItem === 'K-05' && 'MEP: CONDENSER LINE · FLOOR DRAIN · ELEC 415V'}
            </text>
            <text x="12" y="52" fill="#10b981" fontWeight="600">
              STATUS: CLASH FREE · REVIZTO ISSUE #142 CLOSED · ACC SYNCED
            </text>
          </g>
        </svg>

        {/* View Switcher Controls (Top Right of Canvas) */}
        <div className="absolute top-3 right-3 flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setViewMode('iso')}
            className={`flex items-center gap-1.5 px-2.5 py-1 transition-colors ${
              viewMode === 'iso'
                ? 'bg-sky-500 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D ISO</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('plan')}
            className={`flex items-center gap-1.5 px-2.5 py-1 transition-colors ${
              viewMode === 'plan'
                ? 'bg-sky-500 text-slate-950 font-bold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>2D PLAN</span>
          </button>
        </div>
      </div>

      {/* Bottom Layer Toggles & Status */}
      <div className="p-3 bg-[#0a0e17] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Layers:</span>
          </span>

          <button
            type="button"
            onClick={() => toggleLayer('grid')}
            className={`px-2.5 py-1 font-mono text-[11px] transition-colors border ${
              layers.grid
                ? 'bg-slate-200 text-slate-950 border-transparent font-semibold'
                : 'bg-transparent text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            Grid Axis
          </button>

          <button
            type="button"
            onClick={() => toggleLayer('equipment')}
            className={`px-2.5 py-1 font-mono text-[11px] transition-colors border ${
              layers.equipment
                ? 'bg-sky-400 text-slate-950 border-transparent font-semibold'
                : 'bg-transparent text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            Kitchen Equipment
          </button>

          <button
            type="button"
            onClick={() => toggleLayer('mep')}
            className={`px-2.5 py-1 font-mono text-[11px] transition-colors border ${
              layers.mep
                ? 'bg-amber-400 text-slate-950 border-transparent font-semibold'
                : 'bg-transparent text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            MEP Utilities
          </button>

          <button
            type="button"
            onClick={() => toggleLayer('clashes')}
            className={`px-2.5 py-1 font-mono text-[11px] transition-colors border ${
              layers.clashes
                ? 'bg-emerald-400 text-slate-950 border-transparent font-semibold'
                : 'bg-transparent text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            Clash Resolved
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>Navisworks &amp; Revizto Verified</span>
        </div>
      </div>
    </div>
  );
};
