import React, { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';
import { 
  Building2, 
  Utensils, 
  Coffee, 
  ChefHat, 
  Flame, 
  Landmark, 
  Store,
  MapPin
} from 'lucide-react';

const REGIONS = [
  { id: 'ind', label: 'India', desc: 'Base of Operations', loc: [28.6139, 77.2090] },
  { id: 'uae', label: 'Dubai / UAE', desc: 'GCC BIM Standards', loc: [25.2048, 55.2708] },
  { id: 'ksa', label: 'Saudi Arabia', desc: 'Middle East Compliance', loc: [24.7136, 46.6753] },
  { id: 'gcc', label: 'Qatar (GCC)', desc: 'Regional Frameworks', loc: [25.2854, 51.5310] },
  { id: 'uk',  label: 'United Kingdom', desc: 'BS/UK BIM Mandates', loc: [51.5074, -0.1278] },
  { id: 'eur', label: 'France (Europe)', desc: 'Eurocodes & ISO', loc: [48.8566, 2.3522] }
];

const PROJECT_TYPES = [
  { label: 'Hotels', icon: Building2 },
  { label: 'Restaurants', icon: Utensils },
  { label: 'Hospitality', icon: Coffee },
  { label: 'Catering', icon: ChefHat },
  { label: 'Bulk Cooking', icon: Flame },
  { label: 'Institutional Facilities', icon: Landmark },
  { label: 'Commercial Facilities', icon: Store }
];

// Helper to calculate exact center facing the camera in Cobe WebGL
const getCenterAngles = (loc: number[]) => {
  const latRad = (loc[0] * Math.PI) / 180;
  const lonRad = (loc[1] * Math.PI) / 180;
  return {
    phi: 1.5 * Math.PI - lonRad, // Official offset correction for centering longitude
    theta: latRad
  };
};

export const InternationalExposure: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [activeTab, setActiveTab] = useState<'regions' | 'types'>('regions');
  const [activeRegionId, setActiveRegionId] = useState<string>('ind');
  
  // Interaction state refs to avoid re-renders during 60fps animation loop
  const activeRegionIdRef = useRef<string>('ind');
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  
  // Start facing India exactly in the center
  const initialAngles = getCenterAngles(REGIONS[0].loc);
  const currentAngles = useRef({ phi: initialAngles.phi, theta: initialAngles.theta }); 
  const focusRef = useRef<{ phi: number; theta: number } | null>({
    phi: initialAngles.phi,
    theta: initialAngles.theta
  });

  useEffect(() => {
    let width = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateWidth = () => {
      width = canvas.offsetWidth;
    };
    window.addEventListener('resize', updateWidth);
    updateWidth();

    // Map configuration to include IDs (required for Cobe v2 CSS Anchors)
    const mapMarkers = (activeId: string) => 
      REGIONS.map(r => ({
        id: r.id, 
        location: r.loc as [number, number], 
        size: r.id === activeId ? 0.08 : 0.04 
      }));

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: currentAngles.current.phi,
      theta: currentAngles.current.theta,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.15, 0.15, 0.18], 
      markerColor: [1, 1, 1], 
      glowColor: [0.03, 0.04, 0.06], 
      markers: mapMarkers(activeRegionIdRef.current),
      arcs: [
        { id: 'arc1', from: REGIONS[0].loc as [number, number], to: REGIONS[1].loc as [number, number] }, 
        { id: 'arc2', from: REGIONS[0].loc as [number, number], to: REGIONS[2].loc as [number, number] }, 
        { id: 'arc3', from: REGIONS[0].loc as [number, number], to: REGIONS[3].loc as [number, number] }, 
        { id: 'arc4', from: REGIONS[0].loc as [number, number], to: REGIONS[4].loc as [number, number] }, 
        { id: 'arc5', from: REGIONS[0].loc as [number, number], to: REGIONS[5].loc as [number, number] },  
      ],
      arcColor: [0.22, 0.74, 0.97],
      arcWidth: 1.2,
      arcHeight: 0.3,
    });

    let animationFrameId: number;

    const animate = () => {
      if (pointerInteracting.current === null) {
        if (focusRef.current) {
          // Shortest Path Rotation Algorithm (prevents wild spinning if manually dragged prior)
          let dPhi = focusRef.current.phi - currentAngles.current.phi;
          dPhi = dPhi % (2 * Math.PI);
          if (dPhi > Math.PI) dPhi -= 2 * Math.PI;
          if (dPhi < -Math.PI) dPhi += 2 * Math.PI;
          
          currentAngles.current.phi += dPhi * 0.08;
          currentAngles.current.theta += (focusRef.current.theta - currentAngles.current.theta) * 0.08;
        } else {
          // Gentle auto-rotate when idle
          currentAngles.current.phi += 0.002;
        }
      }

      globe.update({
        phi: currentAngles.current.phi,
        theta: currentAngles.current.theta,
        width: width * 2,
        height: width * 2,
        markers: mapMarkers(activeRegionIdRef.current)
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', updateWidth);
      cancelAnimationFrame(animationFrameId);
      globe.destroy();
    };
  }, []);

  const handleRegionClick = (id: string, loc: number[]) => {
    setActiveRegionId(id);
    activeRegionIdRef.current = id;
    focusRef.current = getCenterAngles(loc);
  };

  return (
    <section id="exposure" className="py-20 border-b border-slate-200 dark:border-slate-800 overflow-hidden relative">
      
      {/* Required CSS to enable Cobe's native Anchor Positioning */}
      <style>{`
        .cobe-marker-label {
          position: absolute;
          bottom: anchor(top);
          left: anchor(center);
          translate: -50% -4px;
          pointer-events: auto;
          transition: opacity 0.3s ease, filter 0.3s ease, transform 0.2s ease;
          z-index: 20;
        }
        
        /* Fallback: Hide labels entirely if the browser doesn't support CSS Anchors yet */
        @supports not (anchor-name: --test) {
          .cobe-marker-label {
            display: none !important;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-6 font-semibold">
          <span>06</span><span className="w-8 h-px bg-sky-500/50" /><span>Global Reach</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="z-10 order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight uppercase tracking-tight">
              International Project Exposure
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 mb-8 max-w-lg leading-relaxed">
              Ensuring strict BIM coordination compliance across distinct regional standards. Delivering highly accurate 3D models and documentation for complex culinary spaces worldwide.
            </p>
            
            <div className="flex p-1 mb-6 bg-slate-200/50 dark:bg-[#0a0e17] rounded-lg max-w-md border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setActiveTab('regions')}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-bold font-mono rounded-md transition-all duration-200 ${
                  activeTab === 'regions' 
                    ? 'bg-white dark:bg-[#151b2b] text-sky-500 shadow-sm border border-slate-200 dark:border-slate-700/50' 
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 border border-transparent'
                }`}
              >
                REGIONS
              </button>
              <button
                onClick={() => setActiveTab('types')}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-bold font-mono rounded-md transition-all duration-200 ${
                  activeTab === 'types' 
                    ? 'bg-white dark:bg-[#151b2b] text-sky-500 shadow-sm border border-slate-200 dark:border-slate-700/50' 
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 border border-transparent'
                }`}
              >
                PROJECT TYPES
              </button>
            </div>

            <div className="min-h-[260px]">
              {/* Interactive Left-Side Grid */}
              {activeTab === 'regions' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {REGIONS.map((region) => {
                    const isActive = region.id === activeRegionId;
                    return (
                      <div 
                        key={region.id} 
                        onClick={() => handleRegionClick(region.id, region.loc)}
                        className={`p-3 sm:p-4 border rounded-lg transition-all duration-300 cursor-pointer flex items-start gap-3 ${
                          isActive 
                            ? 'border-sky-500 bg-sky-500/10 shadow-[0_0_15px_rgba(56,189,248,0.15)]' 
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e131f] hover:border-sky-500/40 hover:bg-sky-500/5'
                        }`}
                      >
                        <MapPin className={`w-4 h-4 mt-0.5 shrink-0 transition-colors ${isActive ? 'text-sky-500' : 'text-slate-400'}`} />
                        <div>
                          <div className={`text-sm font-bold transition-colors ${isActive ? 'text-sky-600 dark:text-sky-400' : 'text-slate-900 dark:text-white'}`}>
                            {region.label}
                          </div>
                          <div className={`text-xs mt-1 transition-colors ${isActive ? 'text-sky-700 dark:text-sky-300' : 'text-slate-500'}`}>
                            {region.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === 'types' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PROJECT_TYPES.map((type, i) => {
                    const Icon = type.icon;
                    return (
                      <div 
                        key={i} 
                        className="p-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0e131f] rounded-lg flex items-center gap-3 hover:border-sky-500/40 hover:bg-sky-500/5 transition-all group"
                      >
                        <div className="p-2 bg-slate-50 dark:bg-[#070a10] rounded-md group-hover:bg-sky-500/10 transition-colors">
                          <Icon className="w-4 h-4 text-slate-500 group-hover:text-sky-500 transition-colors" />
                        </div>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                          {type.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Interactive Cobe Globe */}
          <div className="relative w-full max-w-lg mx-auto aspect-square order-1 lg:order-2 flex items-center justify-center select-none group">
            
            <div className="absolute inset-0 bg-sky-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none transition-opacity duration-700 opacity-50 group-hover:opacity-100" />
            
            <div className="relative w-full h-full">
              <canvas 
                ref={canvasRef} 
                className="w-full h-full opacity-90 transition-opacity duration-500 hover:opacity-100 rounded-full"
                style={{ contain: 'layout paint size', cursor: 'grab' }} 
                onPointerDown={(e) => {
                  pointerInteracting.current = { x: e.clientX, y: e.clientY };
                  e.currentTarget.style.cursor = 'grabbing';
                  focusRef.current = null; 
                }}
                onPointerUp={(e) => {
                  pointerInteracting.current = null;
                  e.currentTarget.style.cursor = 'grab';
                }}
                onPointerOut={(e) => {
                  pointerInteracting.current = null;
                  e.currentTarget.style.cursor = 'grab';
                }}
                onPointerMove={(e) => {
                  if (pointerInteracting.current !== null) {
                    const deltaX = e.clientX - pointerInteracting.current.x;
                    const deltaY = e.clientY - pointerInteracting.current.y;
                    
                    currentAngles.current.phi += deltaX * 0.005;
                    currentAngles.current.theta -= deltaY * 0.005; 
                    
                    // Clamp vertical tilt to prevent flipping
                    currentAngles.current.theta = Math.max(-Math.PI/2, Math.min(Math.PI/2, currentAngles.current.theta));

                    pointerInteracting.current = { x: e.clientX, y: e.clientY };
                  }
                }}
              />
              
              {/* Native Vercel-Style Cobe v2 Labels */}
              {REGIONS.map((region) => (
                <div
                  key={`label-${region.id}`}
                  className="cobe-marker-label"
                  style={{
                    // Cast to any to bypass TS complaining about positionAnchor until React types update
                    ['positionAnchor' as any]: `--cobe-${region.id}`,
                    opacity: `var(--cobe-visible-${region.id}, 0)`,
                    // Fallback to blur when hidden over the horizon
                    filter: `blur(var(--cobe-visible-${region.id}, 8px))`
                  } as React.CSSProperties}
                >
                  <div 
                    onClick={() => handleRegionClick(region.id, region.loc)}
                    className={`flex flex-col items-center cursor-pointer transition-transform hover:scale-110`}
                  >
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-extrabold shadow-lg border whitespace-nowrap ${
                        activeRegionId === region.id 
                          ? 'bg-sky-500 text-slate-950 border-sky-400' 
                          : 'bg-white dark:bg-[#0e131f] text-slate-900 dark:text-white border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {activeRegionId === region.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse" />
                      )}
                      {region.label}
                    </div>
                    {/* Tiny connecting arrow pointing to the node */}
                    <div className={`w-0 h-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent drop-shadow-md ${
                      activeRegionId === region.id ? 'border-t-sky-500' : 'border-t-white dark:border-t-[#0e131f]'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-full text-[10px] font-mono text-slate-300 flex items-center gap-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              <span>Drag to rotate</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};