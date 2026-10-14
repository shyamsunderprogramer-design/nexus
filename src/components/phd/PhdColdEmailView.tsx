import React, { useState } from 'react';
import { Send, FileCheck, Copy } from 'lucide-react';
import { useToast } from '../Toast';

export const PhdColdEmailView: React.FC = () => {
  const [candidateName, setCandidateName] = useState('');
  const [candidateDegree, setCandidateDegree] = useState('B.S. in Computer Science');
  const [professorName, setProfessorName] = useState('Dr. Smith');
  const [targetUni, setTargetUni] = useState('University of California, Berkeley');
  const [paperTitle, setPaperTitle] = useState('Scalable Transformers for Distributed Training');
  const [researchArea, setResearchArea] = useState('Autonomous Agent Orchestration and Large Model Systems');

  const { showToast } = useToast();

  const generatedColdEmail = `Subject: Prospective Ph.D. Applicant (Fall 2027) — Research Inquiry on ${researchArea}

Dear Professor ${professorName.replace(/^Dr\.\s*|^Prof\.\s*/i, '')},

I hope this email finds you well. My name is ${candidateName || '[Your Name]'}, and I am graduating with a ${candidateDegree} from [Your Current Institution]. I am planning to apply to the Ph.D. program in [Department Name] at ${targetUni} for Fall 2027.

I have been following your lab’s recent work with great admiration, particularly your paper "${paperTitle}." In that work, your approach to addressing [Key Contribution / Problem] closely aligns with my own research goals in ${researchArea}. In my prior research, I have worked on [Brief 1-sentence description of your research experience or project], which resulted in [Metric, Pre-print, or Key Finding].

I am writing to inquire if you anticipate taking on new Ph.D. students in your research group for the upcoming academic cycle. If you have 10–15 minutes in the coming weeks, I would welcome the opportunity to briefly speak with you about potential alignment with your lab's ongoing initiatives.

I have attached my CV and transcript for your reference. Thank you very much for your time and consideration.

Sincerely,

${candidateName || '[Your Name]'}
[Your Email / Phone]
[Link to your GitHub / Personal Academic Website]`;

  const copyColdEmail = () => {
    navigator.clipboard.writeText(generatedColdEmail);
    showToast('Copied personalized PI Cold Email draft to clipboard!', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30 text-xs font-semibold mb-2">
            <Send className="w-3.5 h-3.5" />
            <span>FACULTY OUTREACH COLD-EMAIL SYNTHESIS</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            PI &amp; Advisor Cold Email Generator
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Generate high-converting, professional introductory inquiries to prospective professors and research group leaders.
          </p>
        </div>

        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Full Name:</label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="w-full bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Current Degree:</label>
            <input
              type="text"
              value={candidateDegree}
              onChange={(e) => setCandidateDegree(e.target.value)}
              placeholder="e.g. B.S. in Electrical & Computer Engineering"
              className="w-full bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Target Professor's Name:</label>
            <input
              type="text"
              value={professorName}
              onChange={(e) => setProfessorName(e.target.value)}
              placeholder="e.g. Dr. John Doe"
              className="w-full bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Target University:</label>
            <input
              type="text"
              value={targetUni}
              onChange={(e) => setTargetUni(e.target.value)}
              placeholder="e.g. Stanford University"
              className="w-full bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Professor's Recent Paper or Research Project:</label>
            <input
              type="text"
              value={paperTitle}
              onChange={(e) => setPaperTitle(e.target.value)}
              placeholder="e.g. Efficient Retrieval-Augmented Generation for Graph Structures"
              className="w-full bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Your Specific Research Area / Interest:</label>
            <input
              type="text"
              value={researchArea}
              onChange={(e) => setResearchArea(e.target.value)}
              placeholder="e.g. Distributed Consensus in Multi-Agent Swarm Architectures"
              className="w-full bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        {/* Live Generated Preview Card */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center space-x-1.5">
              <FileCheck className="w-3.5 h-3.5 text-brand-500" />
              <span>Personalized Email Draft</span>
            </span>

            <button
              onClick={copyColdEmail}
              className="px-3 py-1.5 rounded-xl bg-brand-500 text-white text-xs font-semibold hover:bg-brand-600 transition-colors inline-flex items-center space-x-1.5 shadow-sm cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Email to Clipboard</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs leading-relaxed whitespace-pre-wrap overflow-x-auto border border-slate-800 shadow-inner">
            {generatedColdEmail}
          </pre>
        </div>
      </div>
    </div>
  );
};
