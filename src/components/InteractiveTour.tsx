import React, { useState, useEffect, useRef } from 'react';
import { ActiveTab, InspectorEntity } from '../types';
import { 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Sparkles, 
  Search, 
  GraduationCap, 
  Building2, 
  Zap, 
  SlidersHorizontal, 
  Star 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InteractiveTourProps {
  isOpen: boolean;
  onClose: () => void;
  onTabChange: (tab: ActiveTab) => void;
  onSelectEntity: (entity: InspectorEntity | null) => void;
  onToggleCommandPalette: (open: boolean) => void;
}

interface TourStep {
  id: number;
  title: string;
  badge: string;
  description: string;
  tab: ActiveTab;
  paletteOpen?: boolean;
  showSampleEntity?: boolean;
  icon: React.ReactNode;
}

const SAMPLE_ENTITY: InspectorEntity = {
  type: 'university',
  data: {
    id: '110635',
    name: 'University of California-Berkeley',
    country: 'US',
    state: 'CA',
    city: 'Berkeley',
    sector: 'Public 4-year',
    control: 'Public',
    website: 'https://www.berkeley.edu',
    jobs_url: 'https://jobs.berkeley.edu',
    jobs_ats: 'Workday',
    career_url: 'https://career.berkeley.edu',
    career_type: 'Central Career Center & Handshake',
    students: 45307,
    employees: 16500,
    carnegie: 'Doctoral: Very High Research Activity (R1)',
    locale: 'City: midsize',
    stem_degrees: 5820,
    stem_share: 0.44,
    h1b_exempt: true
  }
};

const TOUR_STEPS: TourStep[] = [
  {
    id: 1,
    title: 'Executive Market Intelligence',
    badge: 'Step 1 of 6 · Macro Telemetry',
    description: 'Real-time telemetry monitoring 7.17M+ registered employers, 3.51M+ verified live career portals, and 6,299 postsecondary institutions across 132 global territories.',
    tab: 'overview',
    icon: <Sparkles className="w-5 h-5 text-brand-400" />
  },
  {
    id: 2,
    title: 'Instant Global Omni-Search',
    badge: 'Step 2 of 6 · Sub-10ms Index',
    description: 'Press ⌘K or click search from anywhere to query 6,299 universities, 7.17M employers, and ATS hiring systems with sub-millisecond keyboard navigation.',
    tab: 'overview',
    paletteOpen: true,
    icon: <Search className="w-5 h-5 text-cyan-400" />
  },
  {
    id: 3,
    title: 'Campus & Talent Directory',
    badge: 'Step 3 of 6 · Higher-Ed Network',
    description: 'Explore 6,299 institutions across US, Canada, and India. Filter by Carnegie R1 / NIRF, STEM Heavy (>20%), H-1B Cap Exempt status, and verified Handshake portals.',
    tab: 'universities',
    icon: <GraduationCap className="w-5 h-5 text-purple-400" />
  },
  {
    id: 4,
    title: 'Enterprise Employer Index',
    badge: 'Step 4 of 6 · 3.51M+ Portals',
    description: 'Bypass aggregator spam. Direct verified HR portals stream on-demand across 62 regional shards covering all 12 major economic sectors.',
    tab: 'companies',
    icon: <Building2 className="w-5 h-5 text-cyan-400" />
  },
  {
    id: 5,
    title: 'Regional Talent-to-Market Bridge',
    badge: 'Step 5 of 6 · Corridor Matching',
    description: 'Inspect the dual-matrix talent corridor matching regional annual STEM graduation output directly against local enterprise hiring demand.',
    tab: 'bridge',
    icon: <Zap className="w-5 h-5 text-emerald-400" />
  },
  {
    id: 6,
    title: 'Deep Entity Inspector Drawer',
    badge: 'Step 6 of 6 · Full Telemetry',
    description: 'Click any campus or corporation card to inspect verified job URLs, ATS screening systems (Workday, PeopleAdmin), student headcounts, and federal regulatory filings.',
    tab: 'universities',
    showSampleEntity: true,
    icon: <SlidersHorizontal className="w-5 h-5 text-amber-400" />
  }
];

const STEP_DURATION_SEC = 7;

export const InteractiveTour: React.FC<InteractiveTourProps> = ({
  isOpen,
  onClose,
  onTabChange,
  onSelectEntity,
  onToggleCommandPalette
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const step = TOUR_STEPS[currentStepIdx];
  const isLastStep = currentStepIdx === TOUR_STEPS.length - 1;

  // Execute step action on current step change
  useEffect(() => {
    if (!isOpen) return;

    const current = TOUR_STEPS[currentStepIdx];
    onTabChange(current.tab);

    if (current.paletteOpen) {
      onToggleCommandPalette(true);
    } else {
      onToggleCommandPalette(false);
    }

    if (current.showSampleEntity) {
      onSelectEntity(SAMPLE_ENTITY);
    } else {
      onSelectEntity(null);
    }

    setProgress(0);
  }, [currentStepIdx, isOpen]);

  // Handle auto-advance timer
  useEffect(() => {
    if (!isOpen || !isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalMs = 100;
    const increment = (intervalMs / (STEP_DURATION_SEC * 1000)) * 100;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentStepIdx < TOUR_STEPS.length - 1) {
            setCurrentStepIdx((i) => i + 1);
            return 0;
          } else {
            // End of tour
            setIsPlaying(false);
            return 100;
          }
        }
        return prev + increment;
      });
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPlaying, currentStepIdx]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleEndTour();
      } else if (e.key === 'ArrowRight' && currentStepIdx < TOUR_STEPS.length - 1) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && currentStepIdx > 0) {
        handlePrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, currentStepIdx]);

  const handleNext = () => {
    if (currentStepIdx < TOUR_STEPS.length - 1) {
      setCurrentStepIdx((i) => i + 1);
    } else {
      handleEndTour();
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((i) => i - 1);
    }
  };

  const handleEndTour = () => {
    onSelectEntity(null);
    onToggleCommandPalette(false);
    onTabChange('overview');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="pointer-events-auto w-full max-w-2xl bg-slate-900/95 dark:bg-[#0c1220]/95 backdrop-blur-2xl border border-white/15 dark:border-brand-500/30 rounded-2xl shadow-2xl overflow-hidden text-white"
      >
        {/* Animated Progress Bar */}
        <div className="w-full h-1 bg-white/10 relative">
          <div 
            className="h-full bg-gradient-to-r from-brand-500 via-cyan-400 to-emerald-400 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-4 sm:p-5 space-y-3.5">
          {/* Header Row: Badge & Controls */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-brand-500/20 border border-brand-500/30 text-brand-300">
                {step.icon}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-300 font-bold block">
                  {step.badge}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {step.title}
                </h4>
              </div>
            </div>

            {/* Top Right Action & Close */}
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-medium flex items-center space-x-1.5 transition-colors border border-white/10"
                title={isPlaying ? 'Pause Auto-Advance (Space)' : 'Play Auto-Advance (Space)'}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3 h-3 text-amber-400" />
                    <span className="hidden sm:inline text-[11px]">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                    <span className="hidden sm:inline text-[11px]">Play</span>
                  </>
                )}
              </button>

              <button
                onClick={handleEndTour}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-colors"
                title="Exit Tour (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Description Text */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {step.description}
          </p>

          {/* Bottom Control Bar */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            {/* Step Dots Indicator */}
            <div className="flex items-center space-x-1.5">
              {TOUR_STEPS.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentStepIdx(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentStepIdx
                      ? 'w-6 bg-brand-400'
                      : idx < currentStepIdx
                      ? 'w-2 bg-emerald-400/80'
                      : 'w-2 bg-white/20'
                  }`}
                  title={`Jump to ${s.title}`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                disabled={currentStepIdx === 0}
                className={`p-1.5 rounded-lg border text-xs flex items-center transition-colors ${
                  currentStepIdx === 0
                    ? 'border-white/5 text-white/20 cursor-not-allowed'
                    : 'border-white/10 bg-white/5 hover:bg-white/15 text-slate-200'
                }`}
                title="Previous step (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                className="px-3.5 py-1.5 rounded-xl font-bold text-xs bg-gradient-to-r from-brand-600 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white shadow-md shadow-brand-500/20 flex items-center space-x-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <span>{isLastStep ? 'Finish Tour' : 'Next Step'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
