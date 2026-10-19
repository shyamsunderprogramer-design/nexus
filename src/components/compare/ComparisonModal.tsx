import React from 'react';
import { useCompare } from '../../context/CompareContext';
import { University, Company } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Scale,
  Download,
  Copy,
  ExternalLink,
  Users,
  Shield,
  Zap,
  GraduationCap,
  Building2,
  CheckCircle2,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { useToast } from '../Toast';

export const ComparisonModal: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare, isCompareOpen, setIsCompareOpen } = useCompare();
  const { showToast } = useToast();

  if (!isCompareOpen) return null;

  const isUniversity = compareList[0]?.type === 'university';
  const universities = compareList.map((c) => c.data as University);
  const companies = compareList.map((c) => c.data as Company);

  // Copy textual summary to clipboard
  const handleCopySummary = () => {
    let summaryText = `=== NEXUS HEAD-TO-HEAD INTELLIGENCE COMPARISON ===\nGenerated from https://nexus-global.is-a.dev/\n\n`;

    if (isUniversity) {
      universities.forEach((u, idx) => {
        summaryText += `[${idx + 1}] ${u.name} (${u.city ? u.city + ', ' : ''}${u.state || ''}, ${u.country})\n`;
        summaryText += `  • Control: ${u.control || 'N/A'} | Classification: ${u.carnegie || u.sector || 'N/A'}\n`;
        summaryText += `  • Students: ${u.students ? u.students.toLocaleString() : 'N/A'} | Employees: ${u.employees ? u.employees.toLocaleString() : 'N/A'}\n`;
        summaryText += `  • STEM Share: ${Math.round((u.stem_share || 0) * 100)}% (${u.stem_degrees?.toLocaleString() || 0} degrees)\n`;
        summaryText += `  • Tuition (In-State): ${u.tuition_in ? '$' + u.tuition_in.toLocaleString() : 'N/A'} | Out-of-State: ${u.tuition_out ? '$' + u.tuition_out.toLocaleString() : 'N/A'}\n`;
        summaryText += `  • H-1B Cap Exempt: ${u.h1b_exempt ? 'YES (Exempt from lottery)' : 'No'}\n`;
        summaryText += `  • ATS Hiring System: ${u.jobs_ats || 'Standard'}\n`;
        summaryText += `  • Direct Job Portal: ${u.jobs_url || 'N/A'}\n\n`;
      });
    } else {
      companies.forEach((c, idx) => {
        summaryText += `[${idx + 1}] ${c.name} (${c.city ? c.city + ', ' : ''}${c.state})\n`;
        summaryText += `  • Category: ${c.category || 'N/A'}\n`;
        summaryText += `  • Ticker: ${c.ticker ? `${c.ticker} (${c.exchange || 'Public'})` : 'Private / Unlisted'}\n`;
        summaryText += `  • Careers Portal: ${c.careers_url || 'N/A'}\n\n`;
      });
    }

    navigator.clipboard.writeText(summaryText);
    showToast('Comparison summary copied to clipboard · ⭐ Star NEXUS on GitHub!', 'success');
  };

  // Export CSV
  const handleExportCSV = () => {
    let csv = '';
    if (isUniversity) {
      csv = 'Metric,' + universities.map((u) => `"${u.name}"`).join(',') + '\n';
      csv += 'Location,' + universities.map((u) => `"${u.city || ''}, ${u.state || ''}"`).join(',') + '\n';
      csv += 'Control,' + universities.map((u) => `"${u.control || ''}"`).join(',') + '\n';
      csv += 'Classification,' + universities.map((u) => `"${u.carnegie || u.sector || ''}"`).join(',') + '\n';
      csv += 'Students,' + universities.map((u) => u.students || 0).join(',') + '\n';
      csv += 'STEM Share %,' + universities.map((u) => Math.round((u.stem_share || 0) * 100)).join(',') + '\n';
      csv += 'STEM Degrees Annual,' + universities.map((u) => u.stem_degrees || 0).join(',') + '\n';
      csv += 'Tuition In-State ($),' + universities.map((u) => u.tuition_in || 0).join(',') + '\n';
      csv += 'Tuition Out-of-State ($),' + universities.map((u) => u.tuition_out || 0).join(',') + '\n';
      csv += 'App Fee UG ($),' + universities.map((u) => u.app_fee_ug || 0).join(',') + '\n';
      csv += 'H-1B Cap Exempt,' + universities.map((u) => (u.h1b_exempt ? 'Yes' : 'No')).join(',') + '\n';
      csv += 'ATS Hiring System,' + universities.map((u) => `"${u.jobs_ats || ''}"`).join(',') + '\n';
      csv += 'Job Portal URL,' + universities.map((u) => `"${u.jobs_url || ''}"`).join(',') + '\n';
    } else {
      csv = 'Metric,' + companies.map((c) => `"${c.name}"`).join(',') + '\n';
      csv += 'Category,' + companies.map((c) => `"${c.category || ''}"`).join(',') + '\n';
      csv += 'Location,' + companies.map((c) => `"${c.city || ''}, ${c.state || ''}"`).join(',') + '\n';
      csv += 'Ticker,' + companies.map((c) => `"${c.ticker || ''}"`).join(',') + '\n';
      csv += 'Careers URL,' + companies.map((c) => `"${c.careers_url || ''}"`).join(',') + '\n';
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `nexus_comparison_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported comparison to CSV', 'success');
  };

  // Find leader for STEM share
  const maxStem = Math.max(...universities.map((u) => u.stem_share || 0));
  const maxStudents = Math.max(...universities.map((u) => u.students || 0));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 26 }}
          className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-3xl glass-card bg-slate-900/95 dark:bg-[#080d18]/95 border border-slate-700/60 dark:border-white/10 shadow-2xl text-slate-100 overflow-hidden"
        >
          {/* Modal Header */}
          <div className="p-4 sm:p-6 border-b border-slate-800/80 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950/50">
            <div className="space-y-1">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-brand-500/20 border border-brand-500/30 text-brand-400">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <span>NEXUS Head-to-Head Matrix</span>
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30">
                      {compareList.length} Entities
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Side-by-side comparative analytics, financial rates, research tiers, and direct employment portals.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 self-end sm:self-center">
              <button
                onClick={handleCopySummary}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-white/10 hover:border-brand-500/40 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-sm"
                title="Copy comparison summary text"
              >
                <Copy className="w-3.5 h-3.5 text-brand-400" />
                <span className="hidden sm:inline">Copy Text</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-white/10 hover:border-emerald-500/40 bg-white/5 hover:bg-emerald-500/10 text-xs font-semibold text-slate-300 hover:text-emerald-300 transition-all shadow-sm"
                title="Export comparison to CSV spreadsheet"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={clearCompare}
                className="px-3 py-1.5 rounded-xl border border-rose-500/30 hover:border-rose-500/50 bg-rose-500/10 hover:bg-rose-500/20 text-xs font-semibold text-rose-300 transition-all shadow-sm"
              >
                Clear All
              </button>

              <button
                onClick={() => setIsCompareOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Comparison Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body / Table View */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
            {compareList.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Scale className="w-10 h-10 text-slate-500 mx-auto" />
                <h3 className="text-base font-bold text-white">No items selected for comparison</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Click the ⚖️ Compare icon on any campus or enterprise card in the directory to add up to 3 entities side-by-side.
                </p>
              </div>
            ) : isUniversity ? (
              /* University Comparison Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {universities.map((u) => {
                  const stemPct = Math.round((u.stem_share || 0) * 100);
                  const isTopStem = u.stem_share === maxStem && maxStem > 0;
                  const isTopSize = u.students === maxStudents && maxStudents > 0;

                  return (
                    <div
                      key={u.id}
                      className="rounded-2xl border border-slate-700/70 dark:border-white/10 bg-slate-950/60 p-5 flex flex-col justify-between space-y-5 relative group"
                    >
                      {/* Card Header */}
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[10px] font-mono font-bold text-brand-400 tracking-wider uppercase">
                            {u.country} · {u.state} · {u.city || 'Campus'}
                          </span>
                          <button
                            onClick={() => removeFromCompare(u.id)}
                            className="p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Remove from comparison"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div>
                          <h3 className="text-lg font-black text-white tracking-tight line-clamp-2">
                            {u.name}
                          </h3>
                          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                            {u.carnegie || u.sector || 'Higher Education'}
                          </p>
                        </div>

                        {/* Top Advantages / Highlights */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {isTopStem && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              🏆 Highest STEM ({stemPct}%)
                            </span>
                          )}
                          {isTopSize && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                              🌐 Largest Enrollment
                            </span>
                          )}
                          {u.h1b_exempt && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                              🛡️ H-1B Cap Exempt
                            </span>
                          )}
                          {u.carnegie?.includes('R1') && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              ⭐ Carnegie R1
                            </span>
                          )}
                          {u.nirf_rank ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              NIRF #{u.nirf_rank}
                            </span>
                          ) : null}
                        </div>
                      </div>

                      {/* Metrics Comparison Section */}
                      <div className="space-y-3 border-t border-white/5 pt-3 text-xs">
                        {/* Students */}
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-slate-500" />
                            Enrollment:
                          </span>
                          <span className="font-mono font-bold text-slate-100">
                            {u.students ? u.students.toLocaleString() : 'N/A'}
                          </span>
                        </div>

                        {/* STEM Share meter */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 flex items-center gap-1.5">
                              <Zap className="w-3.5 h-3.5 text-amber-400" />
                              STEM Degree Share:
                            </span>
                            <span className="font-mono font-bold text-emerald-400">
                              {stemPct}% ({u.stem_degrees?.toLocaleString() || 0}/yr)
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500"
                              style={{ width: `${Math.min(stemPct, 100)}%` }}
                            />
                          </div>
                        </div>

                        {/* Control & Locale */}
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Control / Locale:</span>
                          <span className="font-medium text-slate-200">
                            {u.control || 'Public'} · {u.locale || 'Urban'}
                          </span>
                        </div>

                        {/* Tuition & Application Fees */}
                        <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 space-y-1.5">
                          <div className="flex items-center justify-between text-slate-300 font-semibold text-[11px]">
                            <span>In-State Tuition:</span>
                            <span className="font-mono text-emerald-300">
                              {u.tuition_in ? `$${u.tuition_in.toLocaleString()}/yr` : 'Data N/A'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-slate-300 font-semibold text-[11px]">
                            <span>Out-of-State:</span>
                            <span className="font-mono text-amber-300">
                              {u.tuition_out ? `$${u.tuition_out.toLocaleString()}/yr` : 'Data N/A'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-slate-400 text-[10px]">
                            <span>UG App Fee:</span>
                            <span className="font-mono">
                              {u.app_fee_ug !== undefined ? (u.app_fee_ug === 0 ? '✨ Free' : `$${u.app_fee_ug}`) : 'N/A'}
                            </span>
                          </div>
                        </div>

                        {/* Degree Levels */}
                        {u.degree_levels && u.degree_levels.length > 0 && (
                          <div className="space-y-1">
                            <span className="text-[11px] text-slate-400 block font-medium">Degrees Offered:</span>
                            <div className="flex flex-wrap gap-1">
                              {u.degree_levels.map((lvl) => (
                                <span
                                  key={lvl}
                                  className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-white/10 text-slate-200 border border-white/10"
                                >
                                  {lvl}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* ATS & Hiring System */}
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Hiring ATS System:</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                            {u.jobs_ats || 'Workday / Standard'}
                          </span>
                        </div>
                      </div>

                      {/* Direct Verified Action Links */}
                      <div className="border-t border-white/5 pt-3 grid grid-cols-2 gap-2">
                        {u.jobs_url ? (
                          <a
                            href={u.jobs_url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center space-x-1 px-3 py-1.5 rounded-xl bg-brand-500/20 hover:bg-brand-500/30 text-brand-300 border border-brand-500/40 font-semibold text-xs transition-colors"
                          >
                            <span>HR Jobs</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <button disabled className="px-3 py-1.5 rounded-xl bg-white/5 text-slate-500 text-xs">
                            No Job Link
                          </button>
                        )}

                        {u.career_url ? (
                          <a
                            href={u.career_url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center space-x-1 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-semibold text-xs transition-colors"
                          >
                            <span>Career Hub</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : u.website ? (
                          <a
                            href={u.website}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center space-x-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 font-semibold text-xs transition-colors"
                          >
                            <span>Website</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Enterprise Employer Comparison Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {companies.map((c) => (
                  <div
                    key={c.oid}
                    className="rounded-2xl border border-slate-700/70 dark:border-white/10 bg-slate-950/60 p-5 flex flex-col justify-between space-y-4 relative group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider uppercase">
                          {c.state} · {c.city || 'Headquarters'}
                        </span>
                        <button
                          onClick={() => removeFromCompare(c.oid)}
                          className="p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <h3 className="text-lg font-black text-white tracking-tight line-clamp-1">
                          {c.name}
                        </h3>
                        <span className="inline-block px-2 py-0.5 rounded-full bg-white/10 text-slate-300 text-[10px] font-mono mt-1">
                          {c.category}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                        {c.description || c.legal_name || 'Verified registered corporate employer.'}
                      </p>

                      <div className="space-y-2 border-t border-white/5 pt-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Stock Ticker:</span>
                          <span className="font-mono font-bold text-emerald-400">
                            {c.ticker ? `${c.ticker} (${c.exchange || 'Public'})` : 'Private / Unlisted'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Organization Type:</span>
                          <span className="font-mono text-slate-200">
                            {c.org_type || 'Corporation'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-3 grid grid-cols-2 gap-2">
                      {c.careers_url ? (
                        <a
                          href={c.careers_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center space-x-1 px-3 py-1.5 rounded-xl bg-brand-500/20 hover:bg-brand-500/30 text-brand-300 border border-brand-500/40 font-semibold text-xs transition-colors"
                        >
                          <span>Careers Portal</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <button disabled className="px-3 py-1.5 rounded-xl bg-white/5 text-slate-500 text-xs">
                          Portal N/A
                        </button>
                      )}

                      {c.website && (
                        <a
                          href={c.website}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center space-x-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 font-semibold text-xs transition-colors"
                        >
                          <span>Website</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
