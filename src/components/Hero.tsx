import React from 'react';
import { ActiveTab, StatsResponse } from '../types';
import { GraduationCap, Building2, CheckCircle2, MapPin, Search, ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  stats: StatsResponse | null;
  onSelectTab?: (tab: ActiveTab) => void;
  onOpenCommandPalette?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ stats, onSelectTab, onOpenCommandPalette }) => {
  const uniCount = stats?.universities.total || 6299;
  const compCount = stats ? (stats.employers.federal_total / 1000000).toFixed(2) + 'M' : '6.27M';
  const linksCount = (79600).toLocaleString();
  const regionsCount = stats?.state_counts || 74;

  return (
    <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
      <div className="relative rounded-3xl glass-card p-6 sm:p-10 overflow-hidden bg-mesh transition-colors">
        {/* Trichromatic Atmospheric Glows */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl">
            {/* Etched Authority Status Badge */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-brand-500/10 dark:bg-white/[0.06] border border-brand-500/25 dark:border-white/10 backdrop-blur-md text-xs font-semibold mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-glow-emerald" />
              <span className="text-brand-600 dark:text-brand-300 font-bold uppercase tracking-wider text-[11px]">
                Omni-Intelligence
              </span>
              <span className="text-slate-400 dark:text-white/30">|</span>
              <span className="text-slate-700 dark:text-slate-300 text-[11px] font-mono">
                🇺🇸 US · 🇨🇦 CA · 🇮🇳 IN
              </span>
              <span className="hidden sm:inline text-slate-400 dark:text-white/30">|</span>
              <span className="hidden sm:inline text-emerald-600 dark:text-emerald-400 text-[11px] font-mono">
                79,600+ Portals Live
              </span>
            </div>
            
            {/* Display Heading with Cinematic Pacing */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-[-0.03em] text-slate-900 dark:text-white leading-[1.08]">
              Campus to Corporate{' '}
              <span className="block mt-1 bg-gradient-to-r from-brand-500 via-indigo-500 to-cyan-500 dark:from-brand-400 dark:via-indigo-300 dark:to-cyan-300 bg-clip-text text-transparent">
                Talent Intelligence
              </span>
            </h1>
            
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Unifying <strong className="text-slate-900 dark:text-white font-semibold">{uniCount.toLocaleString()} postsecondary institutions</strong> with{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">6.27M+ enterprise employers</strong> across the US, Canada, and India. Real-time hiring portal links, STEM graduate outputs, and regional industry bridges.
            </p>

            {/* Quick Interactive Intelligence Actions */}
            <div className="flex flex-wrap items-center gap-2.5 mt-6">
              {onOpenCommandPalette && (
                <button
                  onClick={onOpenCommandPalette}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-500 text-white shadow-glow-sm hover:bg-brand-600 active:scale-95 transition-all flex items-center space-x-2"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Instant Omni-Search</span>
                  <kbd className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono font-bold">⌘K</kbd>
                </button>
              )}

              {onSelectTab && (
                <>
                  <button
                    onClick={() => onSelectTab('universities')}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/80 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 transition-colors flex items-center space-x-1.5"
                  >
                    <span>🎓 Higher-Ed Directory</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>

                  <button
                    onClick={() => onSelectTab('companies')}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/80 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 transition-colors flex items-center space-x-1.5"
                  >
                    <span>🏢 Enterprise Employers</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>

                  <button
                    onClick={() => onSelectTab('bridge')}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 transition-colors flex items-center space-x-1.5"
                  >
                    <span>⚡ Regional Talent Bridge</span>
                    <ArrowRight className="w-3 h-3 text-emerald-500" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Metric Bento Counters Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:w-96 flex-shrink-0">
            {/* Bento Pod 1: Universities */}
            <div
              onClick={() => onSelectTab?.('universities')}
              className="relative overflow-hidden bg-slate-50/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/[0.08] rounded-2xl p-4 text-left shadow-sm hover:border-purple-500/50 hover:-translate-y-1 cursor-pointer transition-all duration-200 group"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-transparent" />
              <div className="flex items-center justify-between text-purple-600 dark:text-purple-400 mb-2">
                <GraduationCap className="w-5 h-5" />
                <span className="text-[10px] font-mono text-slate-400 uppercase">IPEDS</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                {uniCount.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                Institutions
              </div>
            </div>

            {/* Bento Pod 2: Employers */}
            <div
              onClick={() => onSelectTab?.('companies')}
              className="relative overflow-hidden bg-slate-50/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/[0.08] rounded-2xl p-4 text-left shadow-sm hover:border-cyan-500/50 hover:-translate-y-1 cursor-pointer transition-all duration-200 group"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent" />
              <div className="flex items-center justify-between text-cyan-600 dark:text-cyan-400 mb-2">
                <Building2 className="w-5 h-5" />
                <span className="text-[10px] font-mono text-slate-400 uppercase">EDGAR</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono tracking-tight">
                {compCount}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                Employers
              </div>
            </div>

            {/* Bento Pod 3: Verified Links */}
            <div className="relative overflow-hidden bg-slate-50/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/[0.08] rounded-2xl p-4 text-left shadow-sm hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-200 group">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-transparent" />
              <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mb-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-[10px] font-mono text-emerald-500 uppercase">LIVE</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">
                {linksCount}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                Verified Portals
              </div>
            </div>

            {/* Bento Pod 4: Regions */}
            <div
              onClick={() => onSelectTab?.('bridge')}
              className="relative overflow-hidden bg-slate-50/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/[0.08] rounded-2xl p-4 text-left shadow-sm hover:border-brand-500/50 hover:-translate-y-1 cursor-pointer transition-all duration-200 group"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-500 to-transparent" />
              <div className="flex items-center justify-between text-brand-500 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="text-[10px] font-mono text-slate-400 uppercase">GLOBAL</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-brand-600 dark:text-brand-400 font-mono tracking-tight">
                {regionsCount}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                Territories
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
