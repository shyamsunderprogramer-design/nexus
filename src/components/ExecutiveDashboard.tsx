import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StatsResponse } from '../types';
import { GraduationCap, Building2, ShieldCheck, BarChart3, List, PieChart } from 'lucide-react';

interface ExecutiveDashboardProps {
  stats: StatsResponse | null;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({ stats }) => {
  const [atsView, setAtsView] = useState<'bar' | 'list'>('bar');
  const [indView, setIndView] = useState<'donut' | 'list'>('donut');
  const [hoveredAts, setHoveredAts] = useState<{ name: string; count: number; pct: number } | null>(null);
  const [hoveredInd, setHoveredInd] = useState<string | null>(null);

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

  const atsEntries = Object.entries(atsData);
  const totalAts = atsEntries.reduce((a, [, b]) => a + b, 0);
  const totalCampuses = stats?.universities.total || 6299;
  const maxAtsCount = Math.max(...Object.values(atsData), 100);
  const yAxisMax = Math.ceil(maxAtsCount / 20) * 20; // Round up to nice tick (100)

  // Industry donut calculations
  const indEntries = Object.entries(indData);
  const totalInd = indEntries.reduce((a, [, b]) => a + b, 0);
  const indColors = [
    { stroke: '#06b6d4', bg: 'bg-cyan-500', text: 'text-cyan-500' },
    { stroke: '#8b5cf6', bg: 'bg-violet-500', text: 'text-violet-500' },
    { stroke: '#10b981', bg: 'bg-emerald-500', text: 'text-emerald-500' },
    { stroke: '#f59e0b', bg: 'bg-amber-500', text: 'text-amber-500' },
    { stroke: '#ec4899', bg: 'bg-pink-500', text: 'text-pink-500' },
  ];

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPct = 0;

  const macroCards = [
    {
      title: 'Institutional Landscape',
      icon: GraduationCap,
      color: 'brand',
      metric: `${totalCampuses.toLocaleString()} Campuses`,
      desc: 'Tri-national directory across US IPEDS (6,035), Canadian colleges (209), and India premier HEIs (55+).',
      stats: [
        { label: 'Faculty/Staff Job Portals', val: '3,987 Confirmed (63%)', color: 'emerald' },
        { label: 'Student Career & TPO Centers', val: '2,958 Confirmed (47%)', color: 'cyan' },
        { label: 'Both Pages Live-Verified', val: '2,482 Campuses', color: 'purple' },
      ],
    },
    {
      title: 'Corporate & Employer Index',
      icon: Building2,
      color: 'cyan',
      metric: '6.27 Million Orgs',
      desc: 'Max-coverage federal register coverage across logistics, healthcare, tech startups, and NIFTY 50 leaders.',
      stats: [
        { label: 'Carrier Websites Verified', val: '79,600+ Live', color: 'emerald' },
        { label: 'SEC Form D Issuers (Tech/VC)', val: '363,612 Companies', color: 'cyan' },
        { label: 'Cross-Register Merges', val: '505,068 Deduplicated', color: 'purple' },
      ],
    },
    {
      title: 'Talent & Work Authorization',
      icon: ShieldCheck,
      color: 'emerald',
      metric: 'STEM & Cap Exemption',
      desc: 'Cross-referenced with DHS 2024 STEM designation program list, HEA Title IV, and NIRF / NAAC rosters.',
      stats: [
        { label: 'H-1B Cap-Exempt Colleges', val: '2,498 Institutions', color: 'emerald' },
        { label: 'Canada PGWP-Eligible DLI', val: '190 Institutions', color: 'cyan' },
        { label: 'National Campus Job Boards', val: '26 Boards Tracked', color: 'purple' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* 3 Macro KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {macroCards.map((card) => {
          const Icon = card.icon;
          return (
            <div 
              key={card.title} 
              className={`glass-card rounded-2xl p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:border-${card.color}-500/30`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-bold tracking-wider uppercase text-${card.color}-600 dark:text-${card.color}-400`}>
                  {card.title}
                </span>
                <div className={`p-2 rounded-lg bg-${card.color}-500/10 text-${card.color}-600 dark:text-${card.color}-400`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">
                {card.metric}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {card.desc}
              </p>
              <div className="space-y-2 border-t border-slate-200 dark:border-white/5 pt-3">
                {card.stats.map((s) => (
                  <div key={s.label} className="flex justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400">{s.label}</span>
                    <span className={`text-${s.color}-600 dark:text-${s.color}-400 font-mono font-bold`}>{s.val}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Distributions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ATS Systems Distribution - Authentic Vertical Bar Chart */}
        <div className="glass-card rounded-2xl p-6 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-brand-500" />
                Campus Hiring System (ATS) Distribution
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Top enterprise applicant tracking systems across colleges
              </p>
            </div>
            
            {/* View Switcher: Bar Graph vs List */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg border border-slate-200 dark:border-white/10 self-start sm:self-auto">
              <button
                onClick={() => setAtsView('bar')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all ${
                  atsView === 'bar'
                    ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Vertical Bar Graph"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Bar Graph</span>
              </button>
              <button
                onClick={() => setAtsView('list')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all ${
                  atsView === 'list'
                    ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="List Breakdown"
              >
                <List className="w-3.5 h-3.5" />
                <span>List</span>
              </button>
            </div>
          </div>

          {atsView === 'bar' ? (
            /* VERTICAL BAR GRAPH VIEW */
            <div className="space-y-4">
              {/* Interactive Tooltip Banner */}
              <div className="h-6 flex items-center justify-between px-2 text-xs">
                {hoveredAts ? (
                  <span className="font-semibold text-brand-600 dark:text-brand-300 animate-fadeIn">
                    {hoveredAts.name}: <span className="font-mono font-bold">{hoveredAts.count}</span> campuses ({hoveredAts.pct}% of identified)
                  </span>
                ) : (
                  <span className="text-slate-400 dark:text-slate-500 italic">
                    Hover over any column to inspect vendor details
                  </span>
                )}
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  Total Identified: {totalAts}
                </span>
              </div>

              {/* Chart Canvas Area */}
              <div className="relative h-56 pt-4 pb-1 pl-9 pr-2">
                {/* Y-Axis Grid Lines & Tick Labels */}
                {[100, 75, 50, 25, 0].map((tick) => {
                  const bottomPct = (tick / yAxisMax) * 100;
                  return (
                    <div 
                      key={tick} 
                      className="absolute left-0 right-0 flex items-center pointer-events-none"
                      style={{ bottom: `${bottomPct}%` }}
                    >
                      <span className="w-7 text-[10px] font-mono text-slate-400 dark:text-slate-500 text-right pr-2">
                        {tick}
                      </span>
                      <div className="flex-1 border-b border-dashed border-slate-200 dark:border-white/10" />
                    </div>
                  );
                })}

                {/* Vertical Bars Columns */}
                <div className="relative h-full flex items-end justify-between gap-1 sm:gap-2 z-10">
                  {atsEntries.map(([ats, count], idx) => {
                    const pct = Math.round((count / totalAts) * 100);
                    const heightPct = Math.round((count / yAxisMax) * 100);
                    const isHovered = hoveredAts?.name === ats;

                    return (
                      <div
                        key={ats}
                        className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                        onMouseEnter={() => setHoveredAts({ name: ats, count, pct })}
                        onMouseLeave={() => setHoveredAts(null)}
                      >
                        {/* Value Pill above bar */}
                        <span className={`text-[10px] font-mono font-bold mb-1 transition-all ${
                          isHovered 
                            ? 'text-brand-600 dark:text-brand-300 scale-110' 
                            : 'text-slate-500 dark:text-slate-400 opacity-80'
                        }`}>
                          {count}
                        </span>

                        {/* Animated Bar Column */}
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${heightPct}%` }}
                          transition={{ duration: 0.6, delay: idx * 0.05, ease: 'easeOut' }}
                          className={`w-full max-w-[38px] rounded-t-lg transition-all duration-300 ${
                            isHovered
                              ? 'bg-gradient-to-t from-violet-600 to-indigo-400 shadow-md shadow-indigo-500/30 brightness-110'
                              : 'bg-gradient-to-t from-violet-600/90 to-indigo-500/90 hover:from-violet-500 hover:to-indigo-400'
                          }`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* X-Axis Labels */}
              <div className="flex justify-between pl-9 pr-2 pt-1 border-t border-slate-200 dark:border-white/10">
                {atsEntries.map(([ats]) => (
                  <div key={ats} className="flex-1 text-center">
                    <span 
                      className={`text-[10px] block truncate transition-colors ${
                        hoveredAts?.name === ats
                          ? 'font-bold text-brand-600 dark:text-brand-300'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                      title={ats}
                    >
                      {ats}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* LIST / PROGRESS ROW VIEW */
            <div className="space-y-3">
              {atsEntries.map(([ats, count]) => {
                const pct = Math.round((count / totalAts) * 100);
                return (
                  <div key={ats} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-800 dark:text-slate-300">{ats}</span>
                      <span className="font-mono text-slate-500 dark:text-slate-400">{count} campuses ({pct}%)</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500" 
                        style={{ width: `${(count / maxAtsCount) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Industry Breakdown - Interactive Donut & Distribution */}
        <div className="glass-card rounded-2xl p-6 transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <PieChart className="w-4 h-4 text-cyan-500" />
                Macro Economy & Industry Distribution
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Categorization across 6.27M registered employers
              </p>
            </div>

            {/* View Switcher: Donut Chart vs List */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg border border-slate-200 dark:border-white/10 self-start sm:self-auto">
              <button
                onClick={() => setIndView('donut')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all ${
                  indView === 'donut'
                    ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Donut Chart"
              >
                <PieChart className="w-3.5 h-3.5" />
                <span>Donut</span>
              </button>
              <button
                onClick={() => setIndView('list')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-all ${
                  indView === 'list'
                    ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="List Breakdown"
              >
                <List className="w-3.5 h-3.5" />
                <span>List</span>
              </button>
            </div>
          </div>

          {indView === 'donut' ? (
            /* INTERACTIVE DONUT CHART VIEW */
            <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
              {/* SVG Donut */}
              <div className="relative w-44 h-44 flex-shrink-0">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="text-slate-200 dark:text-slate-800"
                    strokeWidth="12"
                    stroke="currentColor"
                    fill="transparent"
                  />
                  {indEntries.map(([ind, count], idx) => {
                    const pct = count / totalInd;
                    const strokeDasharray = `${pct * circumference} ${circumference}`;
                    const strokeDashoffset = -accumulatedPct * circumference;
                    accumulatedPct += pct;
                    const color = indColors[idx % indColors.length];
                    const isHovered = hoveredInd === ind;

                    return (
                      <circle
                        key={ind}
                        cx="50"
                        cy="50"
                        r={radius}
                        stroke={color.stroke}
                        strokeWidth={isHovered ? '14' : '12'}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        fill="transparent"
                        className="transition-all duration-300 cursor-pointer"
                        onMouseEnter={() => setHoveredInd(ind)}
                        onMouseLeave={() => setHoveredInd(null)}
                      />
                    );
                  })}
                </svg>

                {/* Donut Center Display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-2">
                  <span className="text-lg font-extrabold text-slate-900 dark:text-white font-mono leading-none">
                    6.27M
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Federal Orgs
                  </span>
                </div>
              </div>

              {/* Legend & Breakdown */}
              <div className="flex-1 w-full space-y-2">
                {indEntries.map(([ind, count], idx) => {
                  const color = indColors[idx % indColors.length];
                  const pct = Math.round((count / totalInd) * 100);
                  const isHovered = hoveredInd === ind;

                  return (
                    <div
                      key={ind}
                      onMouseEnter={() => setHoveredInd(ind)}
                      onMouseLeave={() => setHoveredInd(null)}
                      className={`flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer border ${
                        isHovered
                          ? 'bg-slate-100 dark:bg-slate-800/80 border-slate-300 dark:border-white/20 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200/60 dark:border-white/5'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 truncate">
                        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${color.bg}`} />
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {ind}
                        </span>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                          {count.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-1.5">
                          ({pct}%)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* DETAILED LIST VIEW */
            <div className="space-y-3">
              {indEntries.map(([ind, count], idx) => {
                const color = indColors[idx % indColors.length];
                const pct = Math.round((count / totalInd) * 100);
                return (
                  <div key={ind} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/5">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${color.bg}`} />
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">{ind}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                      {count.toLocaleString()} orgs ({pct}%)
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

