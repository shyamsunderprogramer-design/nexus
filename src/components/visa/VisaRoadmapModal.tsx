import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Shield,
  GraduationCap,
  Sparkles,
  Calendar,
  CheckCircle2,
  Copy,
  ExternalLink,
  ArrowRight,
  AlertCircle,
  FileCheck,
  Globe2,
  Building2,
  Clock,
  Compass,
} from 'lucide-react';
import { useToast } from '../Toast';

interface VisaRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreCapExempt: () => void;
}

type TabType = 'us_opt' | 'stem_ext' | 'cap_exempt' | 'canada_pgwp';

export const VisaRoadmapModal: React.FC<VisaRoadmapModalProps> = ({
  isOpen,
  onClose,
  onExploreCapExempt,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('cap_exempt');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const { showToast } = useToast();

  if (!isOpen) return null;

  const toggleStep = (id: string) => {
    setCompletedSteps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopyRoadmap = () => {
    const text = `=== NEXUS INTERNATIONAL STUDENT VISA & H-1B ROADMAP ===\nSource: https://nexus-global.is-a.dev/\n\n` +
      `1. F-1 INITIAL OPT (12 MONTHS):\n` +
      `   • Apply within 90 days before graduation to 60 days after program end date.\n` +
      `   • Obtain OPT I-20 from DSO and file Form I-765 with USCIS.\n` +
      `   • Max 90 days of unemployment.\n\n` +
      `2. 24-MONTH STEM OPT EXTENSION (36 MONTHS TOTAL):\n` +
      `   • Requires DHS STEM-designated CIP degree.\n` +
      `   • Employer must be enrolled in USCIS E-Verify.\n` +
      `   • File Form I-983 Training Plan up to 90 days before initial OPT expires.\n\n` +
      `3. H-1B CAP-EXEMPT GOLDEN PATHWAY (HEA 101a / INA § 214(g)(5)(A)):\n` +
      `   • Higher-ed institutions, affiliated university hospitals & nonprofit research centers are 100% EXEMPT from the annual 85k lottery cap.\n` +
      `   • Sponsoring petitions can be filed any day of the year with zero lottery rejection risk.\n` +
      `   • NEXUS indexes 3,564 verified Cap-Exempt postsecondary institutions.\n\n` +
      `4. CANADA PGWP (POST-GRADUATION WORK PERMIT):\n` +
      `   • Must graduate from an IRCC Designated Learning Institution (DLI).\n` +
      `   • Programs of 2+ years or Master's/PhDs qualify for full 3-year open work permit with no job offer required.\n`;

    navigator.clipboard.writeText(text);
    showToast('Visa roadmap summary copied to clipboard · ⭐ Star NEXUS on GitHub!', 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 26 }}
          className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl glass-card bg-slate-900/95 dark:bg-[#080d18]/95 border border-slate-700/60 dark:border-white/10 shadow-2xl text-slate-100 overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-800/80 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950/50">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-brand-500/20 border border-purple-500/30 text-purple-400">
                <Compass className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    International Student Visa &amp; Career Roadmap
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    F-1 · OPT · H-1B · PGWP
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Strategic regulatory navigation for F-1 OPT, 24-mo STEM extensions, Canada PGWP, and 3,564 Cap-Exempt employers.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 self-end sm:self-center">
              <button
                onClick={handleCopyRoadmap}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-white/10 hover:border-brand-500/40 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-sm"
              >
                <Copy className="w-3.5 h-3.5 text-brand-400" />
                <span className="hidden sm:inline">Copy Roadmap</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Visa Roadmap Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center space-x-2 px-5 py-3 border-b border-slate-800/60 dark:border-white/5 bg-slate-950/30 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('cap_exempt')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'cap_exempt'
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25 ring-1 ring-purple-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>H-1B Cap-Exempt Pathway (Zero Lottery)</span>
            </button>

            <button
              onClick={() => setActiveTab('stem_ext')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'stem_ext'
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 ring-1 ring-emerald-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>24-Month STEM OPT Extension</span>
            </button>

            <button
              onClick={() => setActiveTab('us_opt')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'us_opt'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>F-1 Initial OPT (12 Mo)</span>
            </button>

            <button
              onClick={() => setActiveTab('canada_pgwp')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'canada_pgwp'
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25 ring-1 ring-amber-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>Canada DLI &amp; PGWP (3-Year)</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
            {activeTab === 'cap_exempt' && (
              <div className="space-y-6">
                {/* Hero Callout */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-900/30 via-brand-900/20 to-purple-900/30 border border-purple-500/30 space-y-3">
                  <div className="flex items-center space-x-2 text-purple-300 font-bold text-xs uppercase tracking-wider font-mono">
                    <Shield className="w-4 h-4 text-purple-400" />
                    <span>THE LOTTERY-FREE CAREER OPPORTUNITY</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    What is H-1B Cap-Exempt &amp; Why Does It Matter?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Under the Immigration and Nationality Act (INA § 214(g)(5)(A)) and Higher Education Act (HEA 101a), institutions of higher education, affiliated university teaching hospitals, and nonprofit research organizations are <strong className="text-white">100% EXEMPT from the annual 85,000 H-1B visa lottery cap</strong>.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Lottery Risk</span>
                      <span className="text-base font-extrabold text-emerald-400 mt-0.5 block">0% (Guaranteed Filing)</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Filing Window</span>
                      <span className="text-base font-extrabold text-purple-400 mt-0.5 block">365 Days / Year</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">NEXUS Index</span>
                      <span className="text-base font-extrabold text-cyan-400 mt-0.5 block">3,564 Institutions</span>
                    </div>
                  </div>
                </div>

                {/* Key Advantages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                    <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Immediate Sponsorship (No Lottery)</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Cap-exempt employers do not participate in the annual March lottery. They can submit an H-1B petition with USCIS at any time, with approval typically in 15 days via Premium Processing.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                    <div className="flex items-center space-x-2 text-brand-400 font-bold text-xs">
                      <Building2 className="w-4 h-4" />
                      <span>Concurrent Employment</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Once on a cap-exempt H-1B, candidates can petition for a secondary "concurrent H-1B" with a private commercial company without undergoing the lottery cap.
                    </p>
                  </div>
                </div>

                {/* Direct Action Banner */}
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-white">Find Your Next Cap-Exempt Institution</h4>
                    <p className="text-xs text-slate-300">
                      Explore 3,564 universities and medical centers with verified direct HR jobs portals.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onExploreCapExempt();
                    }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors shadow-lg shadow-purple-600/30 whitespace-nowrap cursor-pointer"
                  >
                    <span>Browse 3,564 Institutions</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'stem_ext' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900/30 via-slate-900/50 to-emerald-900/30 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs font-mono uppercase">
                    <Sparkles className="w-4 h-4" />
                    <span>36 MONTHS TOTAL US EMPLOYMENT AUTHORIZATION</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    24-Month STEM OPT Extension Breakdown
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    F-1 students who receive a qualifying degree in a Department of Homeland Security (DHS) STEM-designated field can apply for a 24-month extension of their post-completion OPT.
                  </p>
                </div>

                {/* Requirements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Requirement 1</span>
                    <h4 className="text-xs font-bold text-white">DHS STEM CIP Code</h4>
                    <p className="text-[11px] text-slate-400">
                      Degree major must match an authorized 6-digit CIP code on the DHS STEM Designated Degree Program list.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">Requirement 2</span>
                    <h4 className="text-xs font-bold text-white">E-Verify Employer</h4>
                    <p className="text-[11px] text-slate-400">
                      The employer must be enrolled in USCIS E-Verify and have an active Federal Employer Identification Number (EIN).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                    <span className="text-[10px] font-mono font-bold text-purple-400 uppercase">Requirement 3</span>
                    <h4 className="text-xs font-bold text-white">Form I-983 Training Plan</h4>
                    <p className="text-[11px] text-slate-400">
                      Formal mentoring and training objectives signed by both the student and supervisor submitted to your university DSO.
                    </p>
                  </div>
                </div>

                {/* Timeline Box */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>Critical STEM Filing Deadlines</span>
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span><strong>90-Day Window:</strong> You can file Form I-765 with USCIS up to 90 days before your initial 12-month OPT EAD expires.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span><strong>Automatic 180-Day Extension:</strong> Once timely filed, your employment authorization is automatically extended for up to 180 days while awaiting adjudication.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'us_opt' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900/30 via-slate-900/50 to-blue-900/30 border border-blue-500/30 space-y-3">
                  <div className="flex items-center space-x-2 text-blue-400 font-bold text-xs font-mono uppercase">
                    <Clock className="w-4 h-4" />
                    <span>INITIAL POST-COMPLETION PRACTICAL TRAINING</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    F-1 Initial 12-Month OPT Rules
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    All graduating F-1 students in valid status for at least one full academic year qualify for 12 months of employment authorization directly related to their major area of study.
                  </p>
                </div>

                {/* Interactive Checklist */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-blue-400" />
                    <span>Your Step-by-Step OPT Checklist</span>
                  </h4>

                  <div className="space-y-2">
                    {[
                      { id: 'opt_1', text: 'Request OPT Recommendation I-20 from university DSO (earliest: 90 days prior to graduation).' },
                      { id: 'opt_2', text: 'Prepare 2x2 passport photos and digital copy of previous I-20s & passport.' },
                      { id: 'opt_3', text: 'Submit Form I-765 online at my.uscis.gov within 30 days of DSO recommendation.' },
                      { id: 'opt_4', text: 'Receive Form I-797C Notice of Action receipt number for tracking.' },
                      { id: 'opt_5', text: 'Receive EAD card and activate SEVP Student Portal to report employment.' },
                    ].map((step) => (
                      <div
                        key={step.id}
                        onClick={() => toggleStep(step.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center space-x-3 ${
                          completedSteps[step.id]
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                            : 'bg-white/[0.03] border-white/5 text-slate-300 hover:bg-white/[0.06]'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-lg flex items-center justify-center border ${
                          completedSteps[step.id]
                            ? 'bg-emerald-500 border-emerald-400 text-white'
                            : 'border-slate-500'
                        }`}>
                          {completedSteps[step.id] && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-xs leading-relaxed">{step.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'canada_pgwp' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-900/30 via-slate-900/50 to-amber-900/30 border border-amber-500/30 space-y-3">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs font-mono uppercase">
                    <Globe2 className="w-4 h-4" />
                    <span>IMMIGRATION, REFUGEES AND CITIZENSHIP CANADA (IRCC)</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Canada Post-Graduation Work Permit (PGWP)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Canada offers an open work permit allowing international graduates from eligible Designated Learning Institutions (DLIs) to work for any employer anywhere across Canada.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                    <h4 className="text-xs font-bold text-amber-400 font-mono uppercase">Program Length vs PGWP Duration</h4>
                    <ul className="text-xs text-slate-300 space-y-1.5">
                      <li>• <strong>Under 8 months:</strong> Not eligible for PGWP.</li>
                      <li>• <strong>Between 8 months and 2 years:</strong> Work permit matching length of study.</li>
                      <li>• <strong>2+ Years, Master's, or PhD:</strong> Full <span className="text-amber-400 font-bold">3-Year Open Work Permit</span>!</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
                    <h4 className="text-xs font-bold text-emerald-400 font-mono uppercase">No Job Offer Required</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Unlike traditional US work visas, Canada's PGWP does not require a formal job offer or employer sponsorship to apply. You can apply within 180 days of receiving final marks.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
