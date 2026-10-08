import React from 'react';
import { InspectorEntity } from '../types';
import { X, ExternalLink, GraduationCap, Building2, MapPin, Users, Briefcase, Shield, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DetailDrawerProps {
  entity: InspectorEntity | null;
  onClose: () => void;
}

export const DetailDrawer: React.FC<DetailDrawerProps> = ({ entity, onClose }) => {
  if (!entity) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-screen max-w-md sm:max-w-lg bg-white dark:bg-[#0c101c] border-l border-slate-200 dark:border-white/10 p-6 overflow-y-auto space-y-6 shadow-2xl relative transition-colors"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10">
                  {entity.type === 'university' ? (
                    <GraduationCap className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                  ) : (
                    <Building2 className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                  )}
                </div>
                <div>
                  <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300 font-semibold">
                    {entity.type === 'university' ? 'HIGHER EDUCATION' : 'ENTERPRISE EMPLOYER'}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1 line-clamp-1">
                    {entity.data.name}
                  </h2>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* University Profile */}
            {entity.type === 'university' && (
              <div className="space-y-6 text-sm">
                <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-white/5 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Location:</span>
                    <div className="text-slate-900 dark:text-white font-semibold flex items-center space-x-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                      <span>{entity.data.city}, {entity.data.state}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Sector:</span>
                    <div className="text-slate-900 dark:text-white font-semibold mt-0.5">{entity.data.sector || 'University'}</div>
                  </div>

                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Students:</span>
                    <div className="text-slate-900 dark:text-white font-semibold font-mono flex items-center space-x-1 mt-0.5">
                      <Users className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                      <span>{(entity.data.students || 0).toLocaleString()}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Employees:</span>
                    <div className="text-slate-900 dark:text-white font-semibold font-mono flex items-center space-x-1 mt-0.5">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                      <span>{(entity.data.employees || 0).toLocaleString()}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 dark:text-slate-400">STEM Degree Share:</span>
                    <div className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono flex items-center space-x-1 mt-0.5">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>{Math.round((entity.data.stem_share || 0) * 100)}%</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 dark:text-slate-400">H-1B Cap Exempt:</span>
                    <div className="text-brand-600 dark:text-brand-400 font-semibold flex items-center space-x-1 mt-0.5">
                      <Shield className="w-3.5 h-3.5" />
                      <span>{entity.data.h1b_exempt ? 'Yes (Cap-Exempt)' : 'Standard'}</span>
                    </div>
                  </div>

                  {entity.data.nirf_rank ? (
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">NIRF Ranking:</span>
                      <div className="text-amber-600 dark:text-amber-400 font-semibold font-mono flex items-center space-x-1 mt-0.5">
                        <span>#{entity.data.nirf_rank} ({entity.data.nirf_category || 'National'})</span>
                      </div>
                    </div>
                  ) : null}

                  {entity.data.naac_grade ? (
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">NAAC Grade:</span>
                      <div className="text-blue-600 dark:text-blue-400 font-semibold font-mono flex items-center space-x-1 mt-0.5">
                        <span>{entity.data.naac_grade}</span>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Carnegie & Academic Profile
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-200 dark:border-white/5">
                    {entity.data.carnegie || 'Degree-granting accredited higher education institution.'}
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Direct Verified Links
                  </h4>

                  {entity.data.website && (
                    <a
                      href={entity.data.website}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
                    >
                      <span>Official Campus Website</span>
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                    </a>
                  )}

                  {entity.data.jobs_url && (
                    <a
                      href={entity.data.jobs_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-semibold border border-brand-500/20 dark:border-brand-500/30 transition-colors"
                    >
                      <span>Faculty & Staff Careers ({entity.data.jobs_ats || 'HR Portal'})</span>
                      <ExternalLink className="w-4 h-4 text-brand-500 dark:text-brand-400" />
                    </a>
                  )}

                  {entity.data.career_url && (
                    <a
                      href={entity.data.career_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-semibold border border-cyan-500/20 dark:border-cyan-500/30 transition-colors"
                    >
                      <span>Student Career Center</span>
                      <ExternalLink className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Company Profile */}
            {entity.type === 'company' && (
              <div className="space-y-6 text-sm">
                <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-white/5 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Headquarters:</span>
                    <div className="text-slate-900 dark:text-white font-semibold mt-0.5">{entity.data.city || 'Regional'}, {entity.data.state || 'US'}</div>
                  </div>

                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Industry:</span>
                    <div className="text-slate-900 dark:text-white font-semibold mt-0.5">{entity.data.category}</div>
                  </div>

                  <div>
                    <span className="text-slate-500 dark:text-slate-400">SEC Ticker:</span>
                    <div className="text-brand-600 dark:text-brand-400 font-semibold font-mono mt-0.5">{entity.data.ticker || 'Private Entity'}</div>
                  </div>

                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Exchange:</span>
                    <div className="text-slate-900 dark:text-white font-semibold mt-0.5">{entity.data.exchange || 'SEC EDGAR'}</div>
                  </div>

                  {entity.data.cin ? (
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">Corporate CIN:</span>
                      <div className="text-brand-700 dark:text-brand-300 font-mono text-[11px] mt-0.5">{entity.data.cin}</div>
                    </div>
                  ) : null}

                  {entity.data.market_cap_tier ? (
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">Valuation / Tier:</span>
                      <div className="text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">{entity.data.market_cap_tier}</div>
                    </div>
                  ) : null}
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                    Company Description
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-200 dark:border-white/5">
                    {entity.data.description || entity.data.legal_name || 'Enterprise organization listed in the federal and curated employers directory.'}
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Verified Channels
                  </h4>

                  {entity.data.website && (
                    <a
                      href={entity.data.website}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
                    >
                      <span>Official Corporate Website</span>
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                    </a>
                  )}

                  {entity.data.careers_url && (
                    <a
                      href={entity.data.careers_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-semibold border border-brand-500/20 dark:border-brand-500/30 transition-colors"
                    >
                      <span>Verified Careers & Jobs Page</span>
                      <ExternalLink className="w-4 h-4 text-brand-500 dark:text-brand-400" />
                    </a>
                  )}
                </div>
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
