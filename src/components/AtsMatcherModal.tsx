import React, { useState } from 'react';
import {
  X,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Zap,
  ArrowRight,
  Copy,
  RotateCcw,
  Shield,
  Layers,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from './Toast';

interface AtsMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ATS_PROFILES = [
  {
    id: 'workday',
    name: 'Workday ATS',
    badge: 'Enterprise & Top Universities',
    focus: 'Strict keyword frequency, skills taxonomy matching, standardized section headers.',
    keywords: [
      'developed', 'implemented', 'managed', 'led', 'architected', 'optimized',
      'collaborated', 'analyzed', 'streamlined', 'delivered', 'designed',
      'cross-functional', 'stakeholder management', 'kpi', 'roi', 'scalability'
    ],
  },
  {
    id: 'peopleadmin',
    name: 'PeopleAdmin',
    badge: 'Higher-Ed & Faculty',
    focus: 'Degree credentials, accreditation, research citations, teaching pedagogy, institutional service.',
    keywords: [
      'curriculum', 'pedagogy', 'instruction', 'faculty', 'research', 'published',
      'advising', 'accreditation', 'tenure', 'grant', 'fellowship', 'academic',
      'peer-reviewed', 'diversity', 'committee'
    ],
  },
  {
    id: 'neogov',
    name: 'NEOGOV',
    badge: 'Public Sector & State Colleges',
    focus: 'Minimum qualifications compliance, civil service standards, certifications, regulatory compliance.',
    keywords: [
      'compliance', 'policy', 'regulatory', 'statutory', 'public records',
      'standard operating procedures', 'sop', 'auditing', 'ethics',
      'safety standards', 'training', 'state guidelines'
    ],
  },
  {
    id: 'greenhouse',
    name: 'Greenhouse / Lever',
    badge: 'Tech & Growth Enterprises',
    focus: 'Problem-solving metrics, impact quantification, modern tech stack proficiency, agile methodologies.',
    keywords: [
      'agile', 'scrum', 'ci/cd', 'full-stack', 'api', 'metrics', 'growth',
      'user experience', 'automated', 'refactored', 'performance', 'cloud'
    ],
  },
];

const SAMPLE_RESUMES = {
  tech: `Senior Software Engineer with 4+ years of experience building scalable distributed web applications.
Led cross-functional team of 6 engineers to develop and architect microservices handling 2M+ daily requests.
Optimized API response latency by 35% using Redis caching and streamlined PostgreSQL database queries.
Collaborated with product managers and stakeholders to deliver core checkout features resulting in 18% ROI increase.
Automated CI/CD deployment pipelines using Docker, GitHub Actions, and AWS ECS.`,
  academic: `Assistant Professor of Computer Science with demonstrated record of innovative curriculum design and pedagogy.
Published 8 peer-reviewed research papers in IEEE and ACM journals focusing on distributed systems.
Advised 45+ undergraduate students in capstone research projects and served on department accreditation committee.
Secured $120,000 in federal grant funding for student research fellowship program.
Designed inclusive syllabus and instruction modules integrating modern software development practices.`,
};

export const AtsMatcherModal: React.FC<AtsMatcherModalProps> = ({ isOpen, onClose }) => {
  const [selectedAts, setSelectedAts] = useState('workday');
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState<{
    score: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    actionVerbCount: number;
    hasMetrics: boolean;
    suggestions: string[];
  } | null>(null);

  const { showToast } = useToast();

  if (!isOpen) return null;

  const currentProfile = ATS_PROFILES.find((p) => p.id === selectedAts) || ATS_PROFILES[0];

  const handleAnalyze = () => {
    if (!resumeText.trim()) {
      showToast('Please paste your resume text to analyze', 'error');
      return;
    }

    const text = resumeText.toLowerCase();
    const matched: string[] = [];
    const missing: string[] = [];

    currentProfile.keywords.forEach((kw) => {
      if (text.includes(kw.toLowerCase())) {
        matched.push(kw);
      } else {
        missing.push(kw);
      }
    });

    // Check for quantifiable metrics (%, $, numbers)
    const hasMetrics = /\d+[%$kM]|\b\d+\s*(percent|dollars|users|clients|students|teams|projects)\b/i.test(resumeText);

    // Calculate score
    const kwScore = (matched.length / currentProfile.keywords.length) * 60;
    const metricScore = hasMetrics ? 20 : 5;
    const lengthScore = resumeText.length > 200 ? 20 : 10;
    const totalScore = Math.min(100, Math.round(kwScore + metricScore + lengthScore));

    const suggestions: string[] = [];
    if (!hasMetrics) {
      suggestions.push('Add quantifiable numbers (e.g., "improved speed by 25%", "managed $50k budget") to prove impact.');
    }
    if (missing.length > 5) {
      suggestions.push(`Include high-frequency ${currentProfile.name} power words like: ${missing.slice(0, 4).join(', ')}.`);
    }
    if (resumeText.split(/\s+/).length < 50) {
      suggestions.push('Your text is brief. Provide complete bullet points with Action Verb + Context + Result.');
    }
    if (suggestions.length === 0) {
      suggestions.push('Strong ATS alignment! Your text demonstrates strong action verbs and role relevance.');
    }

    setAnalysisResult({
      score: totalScore,
      matchedKeywords: matched,
      missingKeywords: missing,
      actionVerbCount: matched.length,
      hasMetrics,
      suggestions,
    });

    showToast(`ATS Analysis Complete: ${totalScore}% Match Score!`, 'success');
  };

  const handleLoadSample = (type: 'tech' | 'academic') => {
    setResumeText(SAMPLE_RESUMES[type]);
    if (type === 'academic') {
      setSelectedAts('peopleadmin');
    } else {
      setSelectedAts('workday');
    }
  };

  const handleClear = () => {
    setResumeText('');
    setJobDescription('');
    setAnalysisResult(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        />

        <div className="flex min-h-full items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-3xl bg-white dark:bg-[#0c101c] border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6 my-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-500 to-cyan-500 flex items-center justify-center text-white shadow-glow-sm">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <span>ATS Resume Keyword Scanner</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-brand-500/15 text-brand-700 dark:text-brand-300 border border-brand-500/30">
                      100% Client-Side Private
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Analyze your resume keywords against Workday, PeopleAdmin, NEOGOV &amp; Greenhouse screening patterns
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ATS Target Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Select Target Employer ATS System:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ATS_PROFILES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedAts(p.id);
                      setAnalysisResult(null);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedAts === p.id
                        ? 'bg-brand-500/10 border-brand-500 text-brand-700 dark:text-brand-300 shadow-sm'
                        : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{p.name}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {p.badge}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Resume Input Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Paste Resume Experience or Summary:
                </label>
                <div className="flex items-center space-x-2 text-[11px]">
                  <span className="text-slate-400">Load Sample:</span>
                  <button
                    onClick={() => handleLoadSample('tech')}
                    className="text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    Enterprise
                  </button>
                  <span className="text-slate-400">·</span>
                  <button
                    onClick={() => handleLoadSample('academic')}
                    className="text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    Academic
                  </button>
                  <span className="text-slate-400">·</span>
                  <button
                    onClick={handleClear}
                    className="text-slate-500 hover:text-rose-500"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={5}
                placeholder="Paste your resume work experience bullet points or professional summary here..."
                className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] p-3 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/40 resize-none leading-relaxed"
              />
            </div>

            {/* Action Button */}
            <div className="flex justify-end">
              <button
                onClick={handleAnalyze}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white font-semibold text-xs shadow-md shadow-brand-500/20 flex items-center space-x-2 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Run {currentProfile.name} Analysis</span>
              </button>
            </div>

            {/* Analysis Results View */}
            {analysisResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.03] space-y-4"
              >
                {/* Score Banner */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500">Screening Compatibility</span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {currentProfile.name} Optimization Score
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className={`text-2xl font-black font-mono px-3 py-1 rounded-xl border ${
                        analysisResult.score >= 75
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30'
                          : analysisResult.score >= 50
                          ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30'
                          : 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30'
                      }`}
                    >
                      {analysisResult.score}%
                    </div>
                  </div>
                </div>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400">Power Verbs Found</span>
                    <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>{analysisResult.matchedKeywords.length} of {currentProfile.keywords.length}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400">Quantified Impact</span>
                    <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                      {analysisResult.hasMetrics ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>Metrics Detected (%, $)</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          <span>No Numbers/Metrics</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400">Target System</span>
                    <div className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                      {currentProfile.name}
                    </div>
                  </div>
                </div>

                {/* Matched Keywords Tags */}
                {analysisResult.matchedKeywords.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                      ✓ Detected ATS Power Words:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {analysisResult.matchedKeywords.map((kw) => (
                        <span
                          key={kw}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-semibold"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing Keywords Tags */}
                {analysisResult.missingKeywords.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400">
                      ⚡ Recommended High-Frequency Additions:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {analysisResult.missingKeywords.slice(0, 8).map((kw) => (
                        <span
                          key={kw}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-200/70 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-white/10"
                        >
                          + {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions List */}
                <div className="p-3 rounded-xl bg-brand-500/10 border border-brand-500/20 space-y-1.5 text-xs">
                  <span className="font-bold text-brand-700 dark:text-brand-300 flex items-center space-x-1.5">
                    <Zap className="w-3.5 h-3.5 text-brand-500" />
                    <span>Actionable Recommendations:</span>
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
                    {analysisResult.suggestions.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
