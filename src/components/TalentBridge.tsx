import React, { useState, useEffect } from 'react';
import { StateBridgeData } from '../types';
import { api } from '../services/api';
import { GraduationCap, Building2, Zap, ArrowRight, ExternalLink, Copy } from 'lucide-react';
import { useToast } from './Toast';

export const TalentBridge: React.FC = () => {
  const [selectedState, setSelectedState] = useState('CA');
  const [bridgeData, setBridgeData] = useState<StateBridgeData | null>(null);
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const handleCopy = (e: React.MouseEvent, text: string, name: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    showToast(`Copied ${name} portal URL`, 'success');
  };

  const REGION_GROUPS = {
    '🇮🇳 India Hubs': [
      { code: 'KA', name: 'KA · Karnataka (Bengaluru Tech Capital)' },
      { code: 'MH', name: 'MH · Maharashtra (Mumbai Financial & Pune)' },
      { code: 'DL', name: 'DL · Delhi-NCR (National Capital Region)' },
      { code: 'TS', name: 'TS · Telangana (Hyderabad Cyberabad)' },
      { code: 'TN', name: 'TN · Tamil Nadu (Chennai SaaS & Auto Hub)' },
      { code: 'UP', name: 'UP · Uttar Pradesh (Noida & IIT Kanpur)' },
      { code: 'WB', name: 'WB · West Bengal (Kolkata & Kharagpur)' },
      { code: 'GJ', name: 'GJ · Gujarat (Ahmedabad & Gandhinagar)' },
      { code: 'HR', name: 'HR · Haryana (Gurugram Tech Hub)' },
      { code: 'PB', name: 'PB · Punjab (Chandigarh & Mohali)' }
    ],
    '🇺🇸 United States': [
      { code: 'CA', name: 'CA · California (Silicon Valley)' },
      { code: 'NY', name: 'NY · New York (Finance & Media)' },
      { code: 'TX', name: 'TX · Texas (Austin Tech & Energy)' },
      { code: 'WA', name: 'WA · Washington (Cloud & Aerospace)' },
      { code: 'MA', name: 'MA · Massachusetts (Biotech & AI)' },
      { code: 'FL', name: 'FL · Florida' },
      { code: 'IL', name: 'IL · Illinois (Chicago Enterprise)' },
      { code: 'PA', name: 'PA · Pennsylvania' },
      { code: 'NC', name: 'NC · North Carolina (Research Triangle)' },
      { code: 'GA', name: 'GA · Georgia (Fintech)' },
      { code: 'OH', name: 'OH · Ohio' },
      { code: 'MI', name: 'MI · Michigan (Auto Engineering)' },
      { code: 'VA', name: 'VA · Virginia (Data Centers)' },
      { code: 'CO', name: 'CO · Colorado' },
      { code: 'AZ', name: 'AZ · Arizona (Semiconductors)' }
    ],
    '🇨🇦 Canada': [
      { code: 'ON', name: 'ON · Ontario (Toronto & Waterloo)' },
      { code: 'BC', name: 'BC · British Columbia (Vancouver)' },
      { code: 'QC', name: 'QC · Quebec (Montreal AI)' },
      { code: 'AB', name: 'AB · Alberta (Calgary & Edmonton)' }
    ]
  };

  useEffect(() => {
    let active = true;
    setLoading(true);
    api.getBridge(selectedState).then((data) => {
      if (active) {
        setBridgeData(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [selectedState]);

  return (
    <div className="space-y-6">
      {/* Region Selector Bar */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Regional Talent Pipeline & Employer Nexus</h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Select any state, province, or tech hub to cross-reference academic degree outputs with active hiring demand
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Select Region:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-brand-500/30 rounded-xl px-4 py-2 text-sm text-brand-700 dark:text-brand-300 font-bold focus:outline-none transition-colors"
            >
              {Object.entries(REGION_GROUPS).map(([group, list]) => (
                <optgroup key={group} label={group} className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white font-sans">
                  {list.map((r) => (
                    <option key={r.code} value={r.code} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                      {r.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Hub Jump Keys */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Top Tech Corridors:</span>
          {[
            { code: 'KA', label: '🇮🇳 Bengaluru' },
            { code: 'CA', label: '🇺🇸 Silicon Valley' },
            { code: 'MH', label: '🇮🇳 Mumbai / Pune' },
            { code: 'TX', label: '🇺🇸 Austin / Texas' },
            { code: 'ON', label: '🇨🇦 Toronto Hub' },
            { code: 'TS', label: '🇮🇳 Hyderabad' },
            { code: 'WA', label: '🇺🇸 Seattle Corridor' },
            { code: 'DL', label: '🇮🇳 Delhi-NCR' },
          ].map((hub) => (
            <button
              key={hub.code}
              onClick={() => setSelectedState(hub.code)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                selectedState === hub.code
                  ? 'bg-brand-500 text-white shadow-glow-sm border-brand-400 scale-[1.02]'
                  : 'bg-slate-100/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 border-slate-200/80 dark:border-white/10 hover:border-brand-500/40'
              }`}
            >
              {hub.label}
            </button>
          ))}
        </div>
      </div>

      {loading || !bridgeData ? (
        <div className="glass-card rounded-2xl p-12 text-center text-slate-600 dark:text-slate-400 animate-pulse font-mono text-xs">
          Synchronizing talent corridor telemetry for {selectedState}...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
          
          {/* Bidirectional Talent Conduit Connector */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center pointer-events-none">
            <div className="px-3.5 py-1.5 rounded-full bg-slate-900/95 border border-brand-500/60 shadow-glow text-white text-[11px] font-mono font-bold flex items-center space-x-2 backdrop-blur-2xl">
              <span className="text-purple-400">ACADEMIC SUPPLY</span>
              <span className="text-brand-400 font-black animate-pulse">⇄</span>
              <span className="text-cyan-400">ENTERPRISE DEMAND</span>
            </div>
          </div>

          {/* Left Column: Campus Pipeline */}
          <div className="relative overflow-hidden glass-card rounded-2xl p-6 space-y-5">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-500 to-transparent" />
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Higher-Ed Talent Supply</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-brand-500/10 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300 border border-brand-500/30">
                {bridgeData.universities_count} Campuses
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-white/5">
                <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                  {bridgeData.total_students.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Total Students</div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-white/5">
                <div className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {bridgeData.stem_graduates_yearly.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">STEM Grads/Yr</div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-white/5">
                <div className="text-lg font-bold font-mono text-brand-600 dark:text-brand-400">
                  {bridgeData.h1b_exempt_campuses}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Cap-Exempt</div>
              </div>
            </div>

            {/* Top Colleges in the Region */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Key Talent Producers in {selectedState}:
              </h4>

              {bridgeData.top_institutions.map((inst, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 text-xs hover:border-brand-500/30 transition-colors"
                >
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{inst.name}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {inst.city} · {inst.students.toLocaleString()} students
                    </div>
                  </div>

                  {inst.jobs_url && (
                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={(e) => handleCopy(e, inst.jobs_url!, inst.name)}
                        title="Copy jobs URL"
                        className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <a
                        href={inst.jobs_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded bg-brand-500/10 hover:bg-brand-500/20 dark:bg-brand-500/20 dark:hover:bg-brand-500/30 text-brand-700 dark:text-brand-300 text-[10px] font-semibold flex items-center space-x-1 border border-brand-500/20"
                      >
                        <span>Jobs Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Active Regional Employers */}
          <div className="relative overflow-hidden glass-card rounded-2xl p-6 space-y-5">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent" />
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Regional Hiring Demand</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
                {bridgeData.companies_curated_count} Employers
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-white/5">
                <div className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                  {bridgeData.companies_curated_count.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Curated Enterprises</div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-white/5">
                <div className="text-lg font-bold font-mono text-cyan-600 dark:text-cyan-400">
                  {bridgeData.companies_verified_web.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Verified Live Portals</div>
              </div>
            </div>

            {/* Top Local Employers */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Prominent Employers Operating in {selectedState}:
              </h4>

              {bridgeData.top_employers.map((comp, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 text-xs hover:border-cyan-500/30 transition-colors"
                >
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{comp.name}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {comp.cat} · {comp.city || 'Regional HQ'}
                    </div>
                  </div>

                  {comp.careers_url && (
                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={(e) => handleCopy(e, comp.careers_url!, comp.name)}
                        title="Copy careers URL"
                        className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <a
                        href={comp.careers_url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 dark:bg-cyan-500/20 dark:hover:bg-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-[10px] font-semibold flex items-center space-x-1 border border-cyan-500/20"
                      >
                        <span>Careers Hub</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
