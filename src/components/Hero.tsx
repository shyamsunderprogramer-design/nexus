import React from 'react';
import { StatsResponse } from '../types';
import { GraduationCap, Building2, CheckCircle2, MapPin } from 'lucide-react';

interface HeroProps {
  stats: StatsResponse | null;
}

export const Hero: React.FC<HeroProps> = ({ stats }) => {
  const uniCount = stats?.universities.total || 6244;
  const compCount = stats ? (stats.employers.federal_total / 1000000).toFixed(2) + 'M' : '6.27M';
  const linksCount = (79571).toLocaleString();
  const regionsCount = stats?.state_counts || 63;

  return (
    <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
      <div className="relative rounded-2xl glass-card p-6 sm:p-8 overflow-hidden bg-mesh">
        {/* Glow Accents */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-medium mb-3">
              <span>National Employment & eXploration Unified System</span>
              <span className="text-white/40">·</span>
              <span>🇺🇸 US · 🇨🇦 Canada · 🇮🇳 India Global Coverage</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Campus to Corporate{' '}
              <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                Talent Intelligence
              </span>
            </h1>
            
            <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Unifying <span className="text-white font-semibold">{uniCount.toLocaleString()} postsecondary institutions</span> with{' '}
              <span className="text-white font-semibold">6,274,467+ enterprise employers</span> across the US, Canada, and India. Real-time hiring portal links, STEM graduate outputs, and regional industry bridges.
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-3.5">
              <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900/80 border border-white/10 text-slate-300">
                🇺🇸 United States (6,035 Campuses · 6.27M Employers)
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900/80 border border-white/10 text-slate-300">
                🇨🇦 Canada (209 Campuses)
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-brand-500/10 border border-brand-500/30 text-brand-300">
                🇮🇳 India (55+ Premier HEIs · NIFTY 50 Blue-Chips)
              </span>
            </div>
          </div>

          {/* Metric Counters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:w-auto">
            <div className="bg-slate-900/80 border border-white/5 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center text-purple-400 mb-1">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono">{uniCount.toLocaleString()}</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Campuses</div>
            </div>

            <div className="bg-slate-900/80 border border-white/5 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center text-cyan-400 mb-1">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">{compCount}</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Employers</div>
            </div>

            <div className="bg-slate-900/80 border border-white/5 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center text-emerald-400 mb-1">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">{linksCount}</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Verified Links</div>
            </div>

            <div className="bg-slate-900/80 border border-white/5 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center text-brand-400 mb-1">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-brand-400 font-mono">{regionsCount}</div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Regions</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
