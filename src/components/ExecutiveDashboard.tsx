import React from 'react';
import { StatsResponse } from '../types';
import { GraduationCap, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ExecutiveDashboardProps {
  stats: StatsResponse | null;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({ stats }) => {
  const atsData = stats?.universities.hiring_systems_identified || {
    NEOGOV: 91,
    PeopleAdmin: 51,
    Workday: 48,
    Paycom: 34,
    ADP: 34,
    UKG: 15,
    Oracle: 14,
    Greenhouse: 11,
  };

  const indData = stats?.employers.industries || {
    'Logistics & Transport': 2078739,
    'Healthcare Providers': 1760961,
    'IT & Software': 37819,
    'Mechanical & Manufacturing': 34680,
    'MedTech & Pharma': 19152,
  };

  const totalAts = Object.values(atsData).reduce((a, b) => a + b, 0);
  const totalCampuses = stats?.universities.total || 6299;

  return (
    <div className="space-y-6">
      {/* 3 Macro Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Universities */}
        <div className="glass-card rounded-2xl p-6 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold tracking-wider uppercase text-brand-600 dark:text-brand-400">
              Institutional Landscape
            </span>
            <div className="p-2 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
            {totalCampuses.toLocaleString()} Campuses
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Tri-national directory across US IPEDS (6,035), Canadian colleges (209), and India premier HEIs (55+).
          </p>
          <div className="space-y-2 border-t border-slate-200 dark:border-white/5 pt-3">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Faculty/Staff Job Portals</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">3,987 Confirmed (63%)</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Student Career & TPO Centers</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-mono font-bold">2,958 Confirmed (47%)</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Both Pages Live-Verified</span>
              <span className="text-purple-600 dark:text-purple-400 font-mono font-bold">2,482 Campuses</span>
            </div>
          </div>
        </div>

        {/* Card 2: Employers */}
        <div className="glass-card rounded-2xl p-6 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold tracking-wider uppercase text-cyan-600 dark:text-cyan-400">
              Corporate & Employer Index
            </span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">6.27 Million Orgs</div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Max-coverage federal register coverage across logistics, healthcare, tech startups, and NIFTY 50 leaders.
          </p>
          <div className="space-y-2 border-t border-slate-200 dark:border-white/5 pt-3">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Carrier Websites Verified</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">79,600+ Live</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">SEC Form D Issuers (Tech/VC)</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-mono font-bold">363,612 Companies</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Cross-Register Merges</span>
              <span className="text-purple-600 dark:text-purple-400 font-mono font-bold">505,068 Deduplicated</span>
            </div>
          </div>
        </div>

        {/* Card 3: Talent & Visa Authorization */}
        <div className="glass-card rounded-2xl p-6 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
              Talent & Work Authorization
            </span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">STEM & Cap Exemption</div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Cross-referenced with DHS 2024 STEM designation program list, HEA Title IV, and NIRF / NAAC rosters.
          </p>
          <div className="space-y-2 border-t border-slate-200 dark:border-white/5 pt-3">
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">H-1B Cap-Exempt Colleges</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">2,498 Institutions</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">Canada PGWP-Eligible DLI</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-mono font-bold">190 Institutions</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-400">National Campus Job Boards</span>
              <span className="text-purple-600 dark:text-purple-400 font-mono font-bold">26 Boards Tracked</span>
            </div>
          </div>
        </div>

      </div>

      {/* Analytics Distributions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ATS Systems Distribution Bar Chart */}
        <div className="glass-card rounded-2xl p-6 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Campus Hiring System (ATS) Distribution</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Top enterprise applicant tracking systems across colleges</p>
            </div>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5">
              Top ATS Vendors
            </span>
          </div>

          <div className="space-y-3">
            {Object.entries(atsData).slice(0, 7).map(([ats, count]) => {
              const pct = Math.round((count / totalAts) * 100);
              return (
                <div key={ats} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-300">{ats}</span>
                    <span className="font-mono text-slate-500 dark:text-slate-400">{count} campuses ({pct}%)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-brand-500 to-indigo-500 rounded-full transition-all duration-500" 
                      style={{ width: `${pct * 2.5}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Industry Breakdown */}
        <div className="glass-card rounded-2xl p-6 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Macro Economy & Industry Distribution</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Categorization across 6.27M registered employers</p>
            </div>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5">
              Federal Registers
            </span>
          </div>

          <div className="space-y-3">
            {Object.entries(indData).map(([ind, count], idx) => {
              const colors = ['bg-cyan-500', 'bg-brand-500', 'bg-emerald-500', 'bg-amber-500', 'bg-pink-500'];
              return (
                <div key={ind} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${colors[idx % colors.length]}`} />
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">{ind}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">{count.toLocaleString()} orgs</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
