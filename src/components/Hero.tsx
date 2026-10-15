import React from 'react';
import { ActiveTab, StatsResponse } from '../types';
import { 
  GraduationCap, 
  Building2, 
  CheckCircle2, 
  MapPin, 
  Search, 
  ArrowRight, 
  Zap, 
  Sparkles,
  Layers,
  Globe2,
  RefreshCw
} from 'lucide-react';

interface HeroProps {
  stats: StatsResponse | null;
  onSelectTab?: (tab: ActiveTab) => void;
  onOpenCommandPalette?: () => void;
  onStartTour?: () => void;
  onOpenSyncAgent?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ stats, onSelectTab, onOpenCommandPalette, onStartTour, onOpenSyncAgent }) => {
  const uniCount = stats?.universities.total || 6299;
  const compCount = stats ? (stats.employers.federal_total / 1000000).toFixed(2) + 'M' : '7.17M';
  const linksCount = stats ? (stats.employers.verified_carriers_applied / 1000000).toFixed(2) + 'M+' : '3.51M+';
  const regionsCount = stats?.state_counts || 132;

  return (
    <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-6">
      <div className="relative rounded-3xl glass-card p-5 sm:p-8 lg:p-10 overflow-hidden bg-mesh transition-all border border-slate-200/90 dark:border-white/10 shadow-xl dark:shadow-2xl">
        
        {/* Trichromatic Atmospheric Luminous Ambient Field */}
        <div className="absolute -top-32 -right-32 w-80 sm:w-96 h-80 sm:h-96 bg-brand-500/20 dark:bg-brand-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 sm:w-96 h-80 sm:h-96 bg-cyan-500/15 dark:bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Hairline Cockpit Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-10">
          
          {/* Left Column: Hero Narrative, Title & Responsive Action Cockpit */}
          <div className="max-w-2xl flex-1">
            
            {/* Live Authority Telemetry Pill */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-white/10 backdrop-blur-md text-xs font-semibold mb-4 shadow-sm">
              <span className="flex items-center space-x-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-brand-600 dark:text-brand-300 font-bold uppercase tracking-wider text-[11px]">
                  Omni-Intelligence
                </span>
              </span>
              <span className="text-slate-300 dark:text-white/20">|</span>
              <span className="text-slate-700 dark:text-slate-300 text-[11px] font-mono">
                132 Territories
              </span>
              <span className="hidden sm:inline text-slate-300 dark:text-white/20">|</span>
              <span className="hidden sm:inline text-emerald-600 dark:text-emerald-400 text-[11px] font-mono font-semibold">
                {linksCount} Live Portals
              </span>
            </div>
            
            {/* Dynamic Cinematic Display Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-black tracking-[-0.035em] text-slate-900 dark:text-white leading-[1.08]">
              Campus to Corporate{' '}
              <span className="block mt-1 bg-gradient-to-r from-brand-600 via-indigo-500 to-cyan-500 dark:from-brand-400 dark:via-indigo-300 dark:to-cyan-300 bg-clip-text text-transparent">
                Talent Intelligence
              </span>
            </h1>
            
            {/* Mission Statement */}
            <p className="mt-3.5 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Unifying <strong className="text-slate-900 dark:text-white font-bold">{uniCount.toLocaleString()} higher-ed institutions</strong> with{' '}
              <strong className="text-slate-900 dark:text-white font-bold">{compCount}+ enterprise employers</strong> across all 12 industries worldwide ({linksCount} verified live hiring portals).
            </p>

            {/* RESPONSIVE BUTTONS COCKPIT */}
            <div className="mt-6 sm:mt-8 space-y-3">
              
              {/* Primary Action Row: Omni-Search & Interactive Auto-Tour */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                {onOpenCommandPalette && (
                  <button
                    onClick={onOpenCommandPalette}
                    className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-600 text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 active:scale-[0.98] transition-all flex items-center justify-between sm:justify-start space-x-3 group border border-white/20 cursor-pointer"
                    aria-label="Open Instant Omni-Search"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="p-1.5 rounded-xl bg-white/20 group-hover:rotate-12 transition-transform duration-200">
                        <Search className="w-4 h-4 text-white" />
                      </div>
                      <span className="tracking-tight">Instant Omni-Search</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] text-white/80 font-normal hidden sm:inline">Search all entities</span>
                      <kbd className="text-[11px] bg-white/20 dark:bg-black/25 px-2 py-0.5 rounded-lg font-mono font-bold border border-white/25">
                        ⌘K
                      </kbd>
                    </div>
                  </button>
                )}

                {onStartTour && (
                  <button
                    onClick={onStartTour}
                    className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-white/90 hover:bg-slate-100 dark:bg-slate-900/90 dark:hover:bg-slate-800 border border-brand-500/30 text-brand-700 dark:text-brand-300 hover:border-brand-500/60 transition-all shadow-md flex items-center justify-center space-x-2.5 group cursor-pointer active:scale-[0.98]"
                    aria-label="Start Guided Interactive Auto-Tour"
                  >
                    <div className="p-1 rounded-lg bg-brand-500/10 text-brand-500 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span>Interactive Auto-Tour</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-brand-500/15 text-brand-600 dark:text-brand-300 font-bold border border-brand-500/30">
                      LIVE
                    </span>
                  </button>
                )}

                {onOpenSyncAgent && (
                  <button
                    onClick={onOpenSyncAgent}
                    className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-800 dark:text-emerald-300 border border-emerald-500/35 hover:border-emerald-500/60 transition-all shadow-md flex items-center justify-center space-x-2.5 group cursor-pointer active:scale-[0.98]"
                    aria-label="Open Autonomous Live Data Sync Agent"
                  >
                    <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 group-hover:rotate-180 transition-transform duration-500">
                      <RefreshCw className="w-4 h-4" />
                    </div>
                    <span>Sync Live Intel</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
                  </button>
                )}
              </div>

              {/* Secondary Navigation Buttons - Fully Responsive Grid */}
              {onSelectTab && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 pt-1">
                  
                  {/* Button 1: Higher-Ed Directory */}
                  <button
                    onClick={() => onSelectTab('universities')}
                    className="w-full px-3.5 py-2.5 rounded-xl text-left bg-white/90 hover:bg-slate-100 dark:bg-slate-900/80 dark:hover:bg-slate-800/90 border border-slate-200/90 dark:border-white/10 text-slate-800 dark:text-slate-200 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-purple-500/40 group flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500/20 transition-colors flex-shrink-0">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold block truncate text-slate-900 dark:text-white">
                          Campus Network
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block truncate">
                          {uniCount.toLocaleString()} Schools
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-1.5" />
                  </button>

                  {/* Button 2: Enterprise Directory */}
                  <button
                    onClick={() => onSelectTab('companies')}
                    className="w-full px-3.5 py-2.5 rounded-xl text-left bg-white/90 hover:bg-slate-100 dark:bg-slate-900/80 dark:hover:bg-slate-800/90 border border-slate-200/90 dark:border-white/10 text-slate-800 dark:text-slate-200 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-cyan-500/40 group flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:bg-cyan-500/20 transition-colors flex-shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold block truncate text-slate-900 dark:text-white">
                          Enterprise Index
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block truncate">
                          {compCount}+ Employers
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-1.5" />
                  </button>

                  {/* Button 3: Talent Bridge */}
                  <button
                    onClick={() => onSelectTab('bridge')}
                    className="w-full px-3.5 py-2.5 rounded-xl text-left bg-white/90 hover:bg-slate-100 dark:bg-slate-900/80 dark:hover:bg-slate-800/90 border border-slate-200/90 dark:border-white/10 text-slate-800 dark:text-slate-200 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-500/40 group flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500/20 transition-colors flex-shrink-0">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold block truncate text-slate-900 dark:text-white">
                          Talent Bridge
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block truncate">
                          132 Corridors
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-1.5" />
                  </button>

                </div>
              )}

            </div>
          </div>

          {/* Right Column: 4 Interactive Bento Metric Tiles */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:w-[22rem] xl:w-[24rem] flex-shrink-0">
            
            {/* Bento Pod 1: Higher-Ed IPEDS */}
            <div
              onClick={() => onSelectTab?.('universities')}
              className="relative overflow-hidden bg-white/80 dark:bg-slate-900/85 border border-slate-200/90 dark:border-white/[0.08] rounded-2xl p-4 text-left shadow-sm hover:border-purple-500/50 hover:-translate-y-1 hover:shadow-lg cursor-pointer transition-all duration-200 group"
              role="button"
              tabIndex={0}
              aria-label="View Higher-Ed Institutions"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-transparent" />
              <div className="flex items-center justify-between text-purple-600 dark:text-purple-400 mb-2">
                <GraduationCap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">IPEDS</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                {uniCount.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5 flex items-center justify-between">
                <span>Institutions</span>
                <ArrowRight className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>

            {/* Bento Pod 2: Employers National Registry */}
            <div
              onClick={() => onSelectTab?.('companies')}
              className="relative overflow-hidden bg-white/80 dark:bg-slate-900/85 border border-slate-200/90 dark:border-white/[0.08] rounded-2xl p-4 text-left shadow-sm hover:border-cyan-500/50 hover:-translate-y-1 hover:shadow-lg cursor-pointer transition-all duration-200 group"
              role="button"
              tabIndex={0}
              aria-label="View Enterprise Employers"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent" />
              <div className="flex items-center justify-between text-cyan-600 dark:text-cyan-400 mb-2">
                <Building2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">REGISTRY</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono tracking-tight">
                {compCount}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5 flex items-center justify-between">
                <span>Employers</span>
                <ArrowRight className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>

            {/* Bento Pod 3: Live Verified Career Portals */}
            <div
              onClick={() => onSelectTab?.('companies')}
              className="relative overflow-hidden bg-white/80 dark:bg-slate-900/85 border border-slate-200/90 dark:border-white/[0.08] rounded-2xl p-4 text-left shadow-sm hover:border-emerald-500/50 hover:-translate-y-1 hover:shadow-lg cursor-pointer transition-all duration-200 group"
              role="button"
              tabIndex={0}
              aria-label="View Verified Career Portals"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-transparent" />
              <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mb-2">
                <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-wider">LIVE</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono tracking-tight">
                {linksCount}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5 flex items-center justify-between">
                <span>Verified Portals</span>
                <ArrowRight className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>

            {/* Bento Pod 4: Global Regional Bridges */}
            <div
              onClick={() => onSelectTab?.('bridge')}
              className="relative overflow-hidden bg-white/80 dark:bg-slate-900/85 border border-slate-200/90 dark:border-white/[0.08] rounded-2xl p-4 text-left shadow-sm hover:border-brand-500/50 hover:-translate-y-1 hover:shadow-lg cursor-pointer transition-all duration-200 group"
              role="button"
              tabIndex={0}
              aria-label="View Regional Talent Bridge"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-500 to-transparent" />
              <div className="flex items-center justify-between text-brand-500 mb-2">
                <Globe2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">GLOBAL</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-brand-600 dark:text-brand-400 font-mono tracking-tight">
                {regionsCount}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5 flex items-center justify-between">
                <span>Territories</span>
                <ArrowRight className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
