import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { StatsResponse } from '../types';
import { GraduationCap, Building2, ShieldCheck } from 'lucide-react';

interface ExecutiveDashboardProps {
  stats: StatsResponse | null;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({ stats }) => {
  const atsCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const indCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const atsChartInstance = useRef<Chart | null>(null);
  const indChartInstance = useRef<Chart | null>(null);

  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

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

  const totalCampuses = stats?.universities.total || 6299;

  // Render original Chart.js visual charts
  useEffect(() => {
    const textColor = isDark ? '#94a3b8' : '#475569';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.06)';

    // 1. ATS Systems Bar Chart (The original Chart.js bar graph)
    if (atsCanvasRef.current) {
      if (atsChartInstance.current) {
        atsChartInstance.current.destroy();
      }

      const atsLabels = Object.keys(atsData);
      const atsValues = Object.values(atsData);

      atsChartInstance.current = new Chart(atsCanvasRef.current, {
        type: 'bar',
        data: {
          labels: atsLabels,
          datasets: [{
            label: 'Institutions',
            data: atsValues,
            backgroundColor: 'rgba(139, 92, 246, 0.75)',
            borderColor: '#8b5cf6',
            borderWidth: 1,
            borderRadius: 6,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.95)',
              titleColor: isDark ? '#f8fafc' : '#0f172a',
              bodyColor: isDark ? '#cbd5e1' : '#334155',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              borderWidth: 1,
              padding: 10,
              displayColors: false,
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: textColor, font: { size: 10, weight: 'bold' } },
            },
            y: {
              grid: { color: gridColor },
              ticks: { color: textColor, font: { size: 10 } },
            },
          },
        },
      });
    }

    // 2. Industry Distribution Doughnut Chart (The original Chart.js doughnut chart)
    if (indCanvasRef.current) {
      if (indChartInstance.current) {
        indChartInstance.current.destroy();
      }

      const indLabels = Object.keys(indData);
      const indValues = Object.values(indData);

      indChartInstance.current = new Chart(indCanvasRef.current, {
        type: 'doughnut',
        data: {
          labels: indLabels,
          datasets: [{
            data: indValues,
            backgroundColor: [
              '#06b6d4',
              '#8b5cf6',
              '#10b981',
              '#f59e0b',
              '#ec4899',
              '#6366f1',
              '#14b8a6',
              '#f43f5e',
            ],
            borderWidth: 0,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                color: textColor,
                boxWidth: 12,
                font: { size: 11, weight: 'bold' },
                padding: 12,
              },
            },
            tooltip: {
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(255, 255, 255, 0.95)',
              titleColor: isDark ? '#f8fafc' : '#0f172a',
              bodyColor: isDark ? '#cbd5e1' : '#334155',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              borderWidth: 1,
              padding: 10,
            },
          },
        },
      });
    }

    return () => {
      if (atsChartInstance.current) {
        atsChartInstance.current.destroy();
        atsChartInstance.current = null;
      }
      if (indChartInstance.current) {
        indChartInstance.current.destroy();
        indChartInstance.current = null;
      }
    };
  }, [atsData, indData, isDark]);

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

      {/* Interactive Charts Grid - The exact authentic charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ATS Systems Chart - Original Bar Graph */}
        <div className="glass-card rounded-2xl p-6 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Campus Hiring System (ATS) Distribution
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Identified enterprise applicant tracking systems across colleges
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5">
              Top ATS Vendors
            </span>
          </div>
          <div className="h-64 flex items-center justify-center relative">
            <canvas ref={atsCanvasRef} />
          </div>
        </div>

        {/* Industry Breakdown Chart - Original Doughnut Chart */}
        <div className="glass-card rounded-2xl p-6 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Macro Economy & Industry Distribution
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Categorization across 6.27M registered employers
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5">
              Federal Registers
            </span>
          </div>
          <div className="h-64 flex items-center justify-center relative">
            <canvas ref={indCanvasRef} />
          </div>
        </div>

      </div>
    </div>
  );
};
