import React, { useState } from 'react';
import { University } from '../types';
import {
  Microscope,
  BookOpen,
  Send,
  GraduationCap,
} from 'lucide-react';
import { PhdDirectoryView } from './phd/PhdDirectoryView';
import { PhdPlaybookView } from './phd/PhdPlaybookView';
import { PhdColdEmailView } from './phd/PhdColdEmailView';

interface PhdAdmissionsHubProps {
  onSelectUniversity: (u: University) => void;
}

type HubViewMode = 'directory' | 'playbook' | 'cold_email';

export const PhdAdmissionsHub: React.FC<PhdAdmissionsHubProps> = ({ onSelectUniversity }) => {
  const [viewMode, setViewMode] = useState<HubViewMode>('directory');

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden glass-card rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-gradient-to-br from-amber-500/15 via-purple-500/15 to-transparent blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-semibold">
            <Microscope className="w-3.5 h-3.5" />
            <span>DOCTORAL ADMISSIONS &amp; RESEARCH INTELLIGENCE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            PhD &amp; Doctoral Admissions Command Hub
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            A comprehensive gateway to <strong className="text-slate-900 dark:text-white">1,080+ research universities</strong> conferring 
            Doctor of Philosophy (PhD) and Doctor of Business Administration (DBA) degrees. Access full funding breakdowns, research discipline profiles, faculty outreach templates, and direct application portals.
          </p>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-sm">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">Doctoral Campuses</span>
              <span className="text-xl font-extrabold font-mono text-purple-600 dark:text-purple-400 mt-0.5 block">1,086</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-sm">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">Typical PhD Funding</span>
              <span className="text-xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5 block">100% Waived</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-sm">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">Annual Stipends</span>
              <span className="text-xl font-extrabold font-mono text-blue-600 dark:text-blue-400 mt-0.5 block">$28k–$48k</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 backdrop-blur-sm">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">Executive DBA Hubs</span>
              <span className="text-xl font-extrabold font-mono text-amber-600 dark:text-amber-400 mt-0.5 block">13 Programs</span>
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-200/80 dark:border-white/10 mt-6">
          <button
            onClick={() => setViewMode('directory')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'directory'
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25 ring-2 ring-brand-500/30'
                : 'bg-white/80 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Doctoral Campus Directory</span>
          </button>

          <button
            onClick={() => setViewMode('playbook')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'playbook'
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25 ring-2 ring-brand-500/30'
                : 'bg-white/80 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>PhD Admissions Playbook &amp; Timeline</span>
          </button>

          <button
            onClick={() => setViewMode('cold_email')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'cold_email'
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25 ring-2 ring-brand-500/30'
                : 'bg-white/80 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>PI / Advisor Cold Email Generator</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: DOCTORAL CAMPUS DIRECTORY */}
      {viewMode === 'directory' && (
        <PhdDirectoryView onSelectUniversity={onSelectUniversity} />
      )}

      {/* VIEW 2: PHD ADMISSIONS PLAYBOOK & TIMELINE */}
      {viewMode === 'playbook' && (
        <PhdPlaybookView />
      )}

      {/* VIEW 3: COLD EMAIL PI ADVISOR OUTREACH GENERATOR */}
      {viewMode === 'cold_email' && (
        <PhdColdEmailView />
      )}
    </div>
  );
};
