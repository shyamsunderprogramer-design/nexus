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
  Briefcase,
  Check,
  ListChecks,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from './Toast';

interface AtsMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ScanMode = 'job_match' | 'ats_profile';

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

const COMMON_STOP_WORDS = new Set([
  'and', 'the', 'for', 'with', 'that', 'this', 'from', 'have', 'your', 'will',
  'our', 'you', 'are', 'not', 'all', 'can', 'has', 'more', 'about', 'must',
  'who', 'were', 'been', 'which', 'their', 'work', 'working', 'ability', 'looking',
  'candidate', 'role', 'team', 'company', 'position', 'experience', 'years',
  'preferred', 'required', 'responsibilities', 'qualifications', 'job', 'skills',
  'strong', 'excellent', 'such', 'well', 'join', 'opportunity', 'within', 'across'
]);

const SAMPLE_JOB_DESCRIPTION = `We are seeking a Senior Full-Stack Software Engineer to architect and scale our enterprise cloud platform.
Key Requirements:
- 4+ years experience with React, TypeScript, Node.js, and PostgreSQL.
- Proven track record optimizing REST API response times and microservices scalability.
- Hands-on expertise with AWS, Docker, Kubernetes, and CI/CD pipelines.
- Experience leading agile scrums, conducting code reviews, and collaborating with cross-functional stakeholders.
- Strong ability to deliver quantifiable business impact and monitor system KPIs.`;

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

// Word boundary matching helper that handles symbols (like C++, CI/CD, .NET)
const testWordMatch = (text: string, term: string): boolean => {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(^|\\W)${escaped}(\\W|$)`, 'i');
  return regex.test(text);
};

export const AtsMatcherModal: React.FC<AtsMatcherModalProps> = ({ isOpen, onClose }) => {
  const [scanMode, setScanMode] = useState<ScanMode>('job_match');
  const [selectedAts, setSelectedAts] = useState('workday');
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [copied, setCopied] = useState(false);

  const [analysisResult, setAnalysisResult] = useState<{
    score: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    hardSkillsMatched: string[];
    hardSkillsMissing: string[];
    hasMetrics: boolean;
    hasStandardSections: boolean;
    formatWarnings: string[];
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

    if (scanMode === 'job_match' && !jobDescription.trim()) {
      showToast('Please paste the target job description to run 1-to-1 matching', 'error');
      return;
    }

    const resumeLower = resumeText.toLowerCase();

    // 1. Quantifiable metrics check (%, $, numbers)
    const hasMetrics = /\d+[%$kM]|\b\d+\s*(percent|dollars|users|clients|students|teams|projects|engineers|papers)\b/i.test(resumeText);

    // 2. Standard section headers check
    const sectionHeaders = ['experience', 'education', 'skills', 'projects', 'summary', 'certifications'];
    const detectedSections = sectionHeaders.filter((sec) => new RegExp(`(^|\\n)\\s*${sec}`, 'i').test(resumeText));
    const hasStandardSections = detectedSections.length >= 2;

    const formatWarnings: string[] = [];
    if (!hasStandardSections) {
      formatWarnings.push('Missing standard ATS headers (e.g., "Experience", "Education", "Skills"). Use standard labels for reliable robot parsing.');
    }
    if (resumeText.includes('\t')) {
      formatWarnings.push('Tab characters detected. ATS parsers prefer clean spaces or standard bullet characters (•, -).');
    }

    let matched: string[] = [];
    let missing: string[] = [];
    let hardSkillsMatched: string[] = [];
    let hardSkillsMissing: string[] = [];
    let totalScore = 0;
    const suggestions: string[] = [];

    if (scanMode === 'job_match') {
      // DUAL PANE: Extract high-value keywords and skills from the Job Description
      const jdWords = jobDescription
        .toLowerCase()
        .replace(/[^a-z0-9+#/.-]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 2 && !COMMON_STOP_WORDS.has(w));

      // Calculate term frequency
      const freqMap: Record<string, number> = {};
      jdWords.forEach((word) => {
        freqMap[word] = (freqMap[word] || 0) + 1;
      });

      // Filter high-priority job requirements (top terms appearing in JD)
      const uniqueJdKeywords = Object.keys(freqMap)
        .sort((a, b) => freqMap[b] - freqMap[a])
        .slice(0, 24);

      uniqueJdKeywords.forEach((kw) => {
        if (testWordMatch(resumeLower, kw)) {
          matched.push(kw);
        } else {
          missing.push(kw);
        }
      });

      // Technical & Hard Skill detection
      const knownTechTerms = [
        'react', 'typescript', 'javascript', 'python', 'node.js', 'aws', 'docker',
        'kubernetes', 'postgresql', 'sql', 'redis', 'ci/cd', 'git', 'microservices',
        'api', 'rest', 'graphql', 'cloud', 'agile', 'scrum', 'html', 'css', 'linux'
      ];

      const techInJd = knownTechTerms.filter((term) => testWordMatch(jobDescription, term));
      techInJd.forEach((term) => {
        if (testWordMatch(resumeLower, term)) {
          hardSkillsMatched.push(term);
        } else {
          hardSkillsMissing.push(term);
        }
      });

      const keywordRatio = uniqueJdKeywords.length > 0 ? (matched.length / uniqueJdKeywords.length) * 60 : 40;
      const metricBonus = hasMetrics ? 20 : 5;
      const sectionBonus = hasStandardSections ? 10 : 5;
      const lengthBonus = resumeText.length > 250 ? 10 : 5;

      totalScore = Math.min(100, Math.round(keywordRatio + metricBonus + sectionBonus + lengthBonus));

      if (hardSkillsMissing.length > 0) {
        suggestions.push(`High Priority: Add missing technical requirements from the JD: ${hardSkillsMissing.slice(0, 5).join(', ')}.`);
      }
      if (!hasMetrics) {
        suggestions.push('Add quantifiable numbers (e.g., "improved performance by 35%", "led team of 6") to prove your contributions.');
      }
      if (missing.length > 6) {
        suggestions.push(`Integrate key terms repeated in the job posting: ${missing.slice(0, 5).join(', ')}.`);
      }
    } else {
      // ATS PROFILE MODE (Workday, PeopleAdmin, NEOGOV, Greenhouse)
      currentProfile.keywords.forEach((kw) => {
        if (testWordMatch(resumeLower, kw)) {
          matched.push(kw);
        } else {
          missing.push(kw);
        }
      });

      const kwScore = (matched.length / currentProfile.keywords.length) * 60;
      const metricScore = hasMetrics ? 20 : 5;
      const lengthScore = resumeText.length > 200 ? 20 : 10;
      totalScore = Math.min(100, Math.round(kwScore + metricScore + lengthScore));

      if (!hasMetrics) {
        suggestions.push('Add quantifiable numbers (e.g., "improved speed by 25%", "managed $50k budget") to prove impact.');
      }
      if (missing.length > 4) {
        suggestions.push(`Include high-frequency ${currentProfile.name} power words like: ${missing.slice(0, 4).join(', ')}.`);
      }
      if (resumeText.split(/\s+/).length < 50) {
        suggestions.push('Your text is brief. Provide complete bullet points with Action Verb + Context + Result.');
      }
    }

    if (suggestions.length === 0) {
      suggestions.push('Outstanding ATS alignment! Your resume demonstrates strong keyword density, quantified achievements, and role relevance.');
    }

    setAnalysisResult({
      score: totalScore,
      matchedKeywords: matched,
      missingKeywords: missing,
      hardSkillsMatched,
      hardSkillsMissing,
      hasMetrics,
      hasStandardSections,
      formatWarnings,
      suggestions,
    });

    showToast(`ATS Analysis Complete: ${totalScore}% Match Score!`, 'success');
  };

  const handleCopyMissing = () => {
    if (!analysisResult || analysisResult.missingKeywords.length === 0) return;
    const textToCopy = analysisResult.missingKeywords.join(', ');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast('Missing keywords copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoadJobMatchSample = () => {
    setResumeText(SAMPLE_RESUMES.tech);
    setJobDescription(SAMPLE_JOB_DESCRIPTION);
    setScanMode('job_match');
  };

  const handleLoadProfileSample = (type: 'tech' | 'academic') => {
    setResumeText(SAMPLE_RESUMES[type]);
    setScanMode('ats_profile');
    setSelectedAts(type === 'academic' ? 'peopleadmin' : 'workday');
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
          className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        />

        <div className="flex min-h-full items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-4xl bg-white dark:bg-[#0c101c] border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10 space-y-6 my-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-500 via-cyan-400 to-emerald-400 flex items-center justify-center text-white shadow-glow-sm">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <span>ATS Resume Keyword Scanner</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      100% Client-Side Private • Zero Paywall
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Dual-Input Jobscan Matcher &amp; Screening Engine calibrated for Workday, PeopleAdmin, NEOGOV &amp; Greenhouse
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scan Mode Toggle */}
            <div className="flex items-center justify-between bg-slate-100/80 dark:bg-slate-900/80 p-1.5 rounded-xl border border-slate-200 dark:border-white/10">
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setScanMode('job_match');
                    setAnalysisResult(null);
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    scanMode === 'job_match'
                      ? 'bg-gradient-to-r from-brand-600 to-cyan-500 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Job Description 1-to-1 Match (Jobscan Style)</span>
                </button>

                <button
                  onClick={() => {
                    setScanMode('ats_profile');
                    setAnalysisResult(null);
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    scanMode === 'ats_profile'
                      ? 'bg-gradient-to-r from-brand-600 to-cyan-500 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Target ATS Architecture Profile</span>
                </button>
              </div>

              {/* Sample Loader Quick Links */}
              <div className="hidden sm:flex items-center space-x-2 text-[11px] pr-2">
                <span className="text-slate-400">Load Sample:</span>
                {scanMode === 'job_match' ? (
                  <button
                    onClick={handleLoadJobMatchSample}
                    className="text-brand-600 dark:text-brand-400 hover:underline font-semibold"
                  >
                    Tech Engineer vs Job Posting
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleLoadProfileSample('tech')}
                      className="text-brand-600 dark:text-brand-400 hover:underline font-semibold"
                    >
                      Enterprise
                    </button>
                    <span className="text-slate-400">·</span>
                    <button
                      onClick={() => handleLoadProfileSample('academic')}
                      className="text-purple-600 dark:text-purple-400 hover:underline font-semibold"
                    >
                      Academic
                    </button>
                  </>
                )}
                <span className="text-slate-400">·</span>
                <button onClick={handleClear} className="text-slate-500 hover:text-rose-500 font-semibold">
                  Clear
                </button>
              </div>
            </div>

            {/* Target ATS Architecture Selector (Visible in ats_profile mode) */}
            {scanMode === 'ats_profile' && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Select Target Employer ATS Architecture:
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
            )}

            {/* Input Areas: Dual-Pane or Single-Pane */}
            <div className={`grid gap-4 ${scanMode === 'job_match' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              {/* Resume Text Area */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  <span>📄 Your Resume Content:</span>
                  <span className="text-[10px] text-slate-400 lowercase font-mono">
                    {resumeText ? `${resumeText.split(/\s+/).filter(Boolean).length} words` : 'paste text'}
                  </span>
                </div>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  rows={scanMode === 'job_match' ? 7 : 5}
                  placeholder="Paste your resume experience bullet points, skills list, or full resume text here..."
                  className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] p-3 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/40 resize-none leading-relaxed"
                />
              </div>

              {/* Job Description Area (in job_match mode) */}
              {scanMode === 'job_match' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    <span>🎯 Target Job Posting / Description:</span>
                    <span className="text-[10px] text-slate-400 lowercase font-mono">
                      {jobDescription ? `${jobDescription.split(/\s+/).filter(Boolean).length} words` : 'paste job posting'}
                    </span>
                  </div>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={7}
                    placeholder="Paste the target job description or role requirements to match keywords 1-to-1..."
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] p-3 text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 resize-none leading-relaxed"
                  />
                </div>
              )}
            </div>

            {/* Run Analysis CTA */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                <span>Zero server logs • Your resume never leaves your computer</span>
              </div>

              <button
                onClick={handleAnalyze}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 via-cyan-500 to-emerald-500 hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-brand-500/25 flex items-center space-x-2 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {scanMode === 'job_match' ? 'Run 1-to-1 Jobscan Match' : `Run ${currentProfile.name} Audit`}
                </span>
              </button>
            </div>

            {/* Analysis Results View */}
            {analysisResult && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.03] space-y-5"
              >
                {/* Score Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4 gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                      ATS Algorithmic Screening Compatibility
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                      <span>{scanMode === 'job_match' ? 'Job Description Match Score' : `${currentProfile.name} Compatibility`}</span>
                    </h3>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div
                      className={`text-3xl font-black font-mono px-4 py-1.5 rounded-xl border shadow-sm ${
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

                {/* Metrics Breakdown Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 space-y-1 shadow-sm">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Keywords Matched</span>
                    <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>{analysisResult.matchedKeywords.length} terms detected</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 space-y-1 shadow-sm">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Quantified Impact</span>
                    <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                      {analysisResult.hasMetrics ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>Metrics Found (%, $, #)</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          <span>No Numbers Detected</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 space-y-1 shadow-sm">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Section Parsing</span>
                    <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                      {analysisResult.hasStandardSections ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>Standard Headers OK</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          <span>Non-Standard Headers</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hard Skills (if detected in Job Match mode) */}
                {analysisResult.hardSkillsMissing.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center space-x-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        <span>High-Priority Hard Skills Missing from Job Description:</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {analysisResult.hardSkillsMissing.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-rose-500/20 text-rose-800 dark:text-rose-300 border border-rose-500/30"
                        >
                          + {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing Keywords Tags & 1-Click Copy */}
                {analysisResult.missingKeywords.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center space-x-1.5">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span>Recommended Missing Keywords to Add:</span>
                      </span>

                      <button
                        onClick={handleCopyMissing}
                        className="flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 border border-amber-500/30 transition-all cursor-pointer"
                      >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Copied!' : 'Copy All Missing'}</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {analysisResult.missingKeywords.slice(0, 16).map((kw) => (
                        <span
                          key={kw}
                          className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-slate-200/70 dark:bg-white/5 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/10"
                        >
                          + {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detected Keywords Tags */}
                {analysisResult.matchedKeywords.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Successfully Detected Keywords in Your Resume:</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {analysisResult.matchedKeywords.map((kw) => (
                        <span
                          key={kw}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-semibold"
                        >
                          ✓ {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Format Warnings (if any) */}
                {analysisResult.formatWarnings.length > 0 && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-1 text-xs">
                    <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center space-x-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span>ATS Parser Compatibility Notes:</span>
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
                      {analysisResult.formatWarnings.map((w, idx) => (
                        <li key={idx}>{w}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actionable Recommendations List */}
                <div className="p-4 rounded-xl bg-brand-500/10 border border-brand-500/20 space-y-2 text-xs">
                  <span className="font-bold text-brand-700 dark:text-brand-300 flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-brand-500" />
                    <span>Actionable Recommendations to Reach 90%+ Match:</span>
                  </span>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-200 text-[11px] leading-relaxed">
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
