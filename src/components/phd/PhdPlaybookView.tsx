import React from 'react';
import { Calendar } from 'lucide-react';

export const PhdPlaybookView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-semibold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>PH.D. APPLICATION LIFECYCLE ROADMAP</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            The Complete Doctoral Admissions Strategy Guide
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            How successful applicants secure fully funded PhD offers with tuition waivers and living stipends.
          </p>
        </div>

        {/* Step-by-Step Timeline Progression */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
            <div className="flex items-center space-x-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-500 text-white text-xs font-bold font-mono">1</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Phase 1: Lab Discovery &amp; PI Matching (May – August)</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-10">
              Unlike undergraduate admissions, PhD decisions are heavily driven by individual faculty advisors (Principal Investigators / PIs). Search faculty websites for active grants (NSF, NIH, DARPA) and read their latest 2–3 papers. Identify 15–20 prospective advisors whose research aligns directly with your interests.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
            <div className="flex items-center space-x-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-500 text-white text-xs font-bold font-mono">2</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Phase 2: Statement of Purpose (SOP) Formulation (August – October)</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-10">
              A winning PhD SOP is not an autobiographical essay; it is a research proposal. Structure it around: 
              (1) Specific research questions you wish to investigate, 
              (2) Prior research projects and technical methodologies you have mastered, and 
              (3) 2–3 faculty members at that campus you wish to work with and why.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
            <div className="flex items-center space-x-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-500 text-white text-xs font-bold font-mono">3</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Phase 3: Securing 3 Strong Recommendation Letters (September – November)</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-10">
              Letters of recommendation (LORs) carry 40%+ of the weight. Prioritize research advisors and lab mentors over professors who only taught you in a lecture course. Provide your recommenders with your research draft, CV, and a deadline spreadsheet 6 weeks in advance.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
            <div className="flex items-center space-x-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-500 text-white text-xs font-bold font-mono">4</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Phase 4: Deadlines &amp; Fee Waiver Optimization (November – Dec 15)</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-10">
              Most Tier-1 US PhD deadlines fall between <strong>December 1 and December 15</strong>. Apply for Graduate Application Fee Waivers via programs like the Big Ten Academic Alliance FreeApp, GEM Consortium, or by emailing graduate program coordinators directly.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
            <div className="flex items-center space-x-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-500 text-white text-xs font-bold font-mono">5</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Phase 5: Interviews &amp; Funding Offer Review (January – April 15)</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-10">
              Admitted candidates participate in recruitment visit weekends or video interviews with potential PIs. Official offer letters detail the financial package: <strong>100% Tuition Remission + 9-to-12-month Teaching (TA) or Research (RA) Assistantship Stipend</strong>. All US Council of Graduate Schools (CGS) schools adhere to the April 15 decision resolution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
