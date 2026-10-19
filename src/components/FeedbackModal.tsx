import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MessageSquare,
  MessageSquarePlus,
  Send,
  Sparkles,
  ExternalLink,
  Mail,
  Copy,
  Trash2,
  CheckCircle2,
  Lightbulb,
  AlertTriangle,
  RefreshCw,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { useToast } from './Toast';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEntityName?: string;
}

type FeedbackType = 'feature' | 'data_update' | 'bug' | 'general';
type PriorityLevel = 'normal' | 'high' | 'urgent';

interface SavedFeedback {
  id: string;
  type: FeedbackType;
  title: string;
  targetEntity?: string;
  description: string;
  emailOrGithub?: string;
  priority: PriorityLevel;
  timestamp: number;
}

const STORAGE_KEY = 'nexus_user_feedback_history';

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  defaultEntityName,
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'history'>('form');
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('feature');
  const [title, setTitle] = useState('');
  const [targetEntity, setTargetEntity] = useState(defaultEntityName || '');
  const [description, setDescription] = useState('');
  const [emailOrGithub, setEmailOrGithub] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('normal');
  const [history, setHistory] = useState<SavedFeedback[]>([]);

  const { showToast } = useToast();

  useEffect(() => {
    if (defaultEntityName) {
      setTargetEntity(defaultEntityName);
      setFeedbackType('data_update');
    }
  }, [defaultEntityName]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load feedback history', e);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const saveToHistory = () => {
    const newItem: SavedFeedback = {
      id: Math.random().toString(36).substring(2, 9),
      type: feedbackType,
      title: title.trim(),
      targetEntity: targetEntity.trim() || undefined,
      description: description.trim(),
      emailOrGithub: emailOrGithub.trim() || undefined,
      priority,
      timestamp: Date.now(),
    };

    const nextHistory = [newItem, ...history];
    setHistory(nextHistory);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextHistory));
    } catch (e) {
      console.error(e);
    }
  };

  const buildMarkdownBody = () => {
    const typeLabel =
      feedbackType === 'feature'
        ? '💡 Feature Request'
        : feedbackType === 'data_update'
        ? '🔄 Data Update / Correction'
        : feedbackType === 'bug'
        ? '🐛 Bug Report'
        : '💬 General Feedback';

    return (
      `### ${typeLabel}: ${title.trim()}\n\n` +
      `**Platform:** [NEXUS Global Intelligence](https://nexus-global.is-a.dev/)\n` +
      (targetEntity.trim() ? `**Target Institution / Employer:** ${targetEntity.trim()}\n` : '') +
      `**Priority:** ${priority.toUpperCase()}\n` +
      (emailOrGithub.trim() ? `**Submitter:** ${emailOrGithub.trim()}\n` : '') +
      `**Date:** ${new Date().toISOString()}\n\n` +
      `---\n\n` +
      `### Description & Details\n` +
      `${description.trim()}\n\n` +
      `---\n` +
      `*Submitted via NEXUS Feedback Dispatcher*`
    );
  };

  const validate = (): boolean => {
    if (!title.trim()) {
      showToast('Please provide a subject or brief title', 'error');
      return false;
    }
    if (!description.trim()) {
      showToast('Please enter your feedback or request details', 'error');
      return false;
    }
    return true;
  };

  // Submit as GitHub Issue
  const handleSubmitGitHub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    saveToHistory();

    const label =
      feedbackType === 'feature'
        ? 'enhancement'
        : feedbackType === 'data_update'
        ? 'data-sync'
        : feedbackType === 'bug'
        ? 'bug'
        : 'feedback';

    const issueTitle = `[${feedbackType.toUpperCase()}] ${title.trim()}`;
    const issueBody = buildMarkdownBody();

    const githubUrl = `https://github.com/shyamsunderprogramer-design/nexus/issues/new?title=${encodeURIComponent(
      issueTitle
    )}&body=${encodeURIComponent(issueBody)}&labels=${encodeURIComponent(label)}`;

    window.open(githubUrl, '_blank');
    showToast('Redirected to GitHub Issues to publish your feedback! ⭐', 'success');
    onClose();
  };

  // Submit via Email
  const handleSubmitEmail = () => {
    if (!validate()) return;

    saveToHistory();

    const subject = `[NEXUS Feedback - ${feedbackType.toUpperCase()}] ${title.trim()}`;
    const body = buildMarkdownBody();

    const mailtoUrl = `mailto:shyamsunder@users.noreply.github.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    showToast('Opened email client with pre-filled feedback template!', 'success');
    onClose();
  };

  // Copy Markdown
  const handleCopyMarkdown = () => {
    if (!validate()) return;

    saveToHistory();
    navigator.clipboard.writeText(buildMarkdownBody());
    showToast('Feedback template copied to clipboard · ⭐ Star NEXUS on GitHub!', 'success');
  };

  const deleteHistoryItem = (id: string) => {
    const next = history.filter((h) => h.id !== id);
    setHistory(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    showToast('Removed from feedback history', 'info');
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Feedback history cleared', 'info');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 26 }}
          className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl glass-card bg-slate-900/95 dark:bg-[#080d18]/95 border border-slate-700/60 dark:border-white/10 shadow-2xl text-slate-100 overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-800/80 dark:border-white/10 flex items-start justify-between gap-4 bg-slate-950/50">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-brand-500/20 to-purple-500/20 border border-brand-500/30 text-brand-400">
                <MessageSquarePlus className="w-6 h-6 text-brand-400" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>Feedback &amp; Feature Requests</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Request new features, submit institutional updates, report issues, or share your thoughts.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Feedback Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sub-Tabs: Form vs History */}
          <div className="flex items-center space-x-2 px-6 py-2.5 border-b border-slate-800/60 dark:border-white/5 bg-slate-950/30">
            <button
              onClick={() => setActiveTab('form')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'form'
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Share Feedback</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'history'
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Your Submissions ({history.length})</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
            {activeTab === 'form' ? (
              <form onSubmit={handleSubmitGitHub} className="space-y-5">
                {/* Type Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono block">
                    What would you like to share?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'feature', label: 'Feature Idea', icon: <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> },
                      { id: 'data_update', label: 'Data Update', icon: <RefreshCw className="w-3.5 h-3.5 text-emerald-400" /> },
                      { id: 'bug', label: 'Bug Report', icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> },
                      { id: 'general', label: 'General / Praise', icon: <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> },
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setFeedbackType(opt.id as FeedbackType)}
                        className={`flex items-center space-x-2 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                          feedbackType === opt.id
                            ? 'bg-brand-500/20 border-brand-500 text-white shadow-sm ring-1 ring-brand-500/50'
                            : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/5'
                        }`}
                      >
                        {opt.icon}
                        <span className="truncate">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 font-mono flex items-center justify-between">
                    <span>Subject / Title *</span>
                    <span className="text-[10px] text-slate-500 font-normal">Brief summary</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={
                      feedbackType === 'feature'
                        ? 'e.g. Add degree discipline filter for Biotechnology'
                        : feedbackType === 'data_update'
                        ? 'e.g. Update tuition rate or job portal link for UC Berkeley'
                        : feedbackType === 'bug'
                        ? 'e.g. Drawer animation stutters on Safari iOS'
                        : 'e.g. Great platform, love the ATS scanner!'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                    required
                  />
                </div>

                {/* Optional Target Entity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 font-mono">
                      Target Campus or Employer <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={targetEntity}
                      onChange={(e) => setTargetEntity(e.target.value)}
                      placeholder="e.g. MIT, Google, Workday"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 font-mono">
                      Your Email or GitHub <span className="text-slate-500 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={emailOrGithub}
                      onChange={(e) => setEmailOrGithub(e.target.value)}
                      placeholder="e.g. yourname@gmail.com or @username"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 font-mono flex items-center justify-between">
                    <span>Detailed Explanation *</span>
                    <span className="text-[10px] text-slate-500 font-normal">Markdown supported</span>
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide details about your request, suggested links, corrections, or ideas..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors resize-y leading-relaxed"
                    required
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 hover:from-brand-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-brand-500/25 transition-all cursor-pointer"
                  >
                    <span>Submit via GitHub Issues (Recommended)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleSubmitEmail}
                      className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Send via Email</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyMarkdown}
                      className="flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5 text-brand-400" />
                      <span>Copy Template</span>
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              /* History Tab */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">
                    {history.length} saved submission{history.length === 1 ? '' : 's'} on this browser
                  </span>
                  {history.length > 0 && (
                    <button
                      onClick={clearHistory}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear History</span>
                    </button>
                  )}
                </div>

                {history.length === 0 ? (
                  <div className="text-center py-12 space-y-2">
                    <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="text-xs text-slate-400">You haven't submitted any feedback from this browser yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 relative group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30 uppercase">
                            {item.type.replace('_', ' ')}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] text-slate-500 font-mono">
                              {new Date(item.timestamp).toLocaleDateString()}
                            </span>
                            <button
                              onClick={() => deleteHistoryItem(item.id)}
                              className="text-slate-500 hover:text-rose-400 p-1 rounded"
                              title="Delete from history"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <h4 className="text-sm font-bold text-white">{item.title}</h4>
                        {item.targetEntity && (
                          <span className="text-[11px] text-slate-400 block font-mono">
                            Target: {item.targetEntity}
                          </span>
                        )}
                        <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
