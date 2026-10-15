import React from 'react';
import { InspectorEntity } from '../types';
import { X, ExternalLink, GraduationCap, Building2, Copy, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from './Toast';
import { useWatchlist } from '../context/WatchlistContext';
import { UniversityDrawerContent } from './drawer/UniversityDrawerContent';
import { CompanyDrawerContent } from './drawer/CompanyDrawerContent';

interface DetailDrawerProps {
  entity: InspectorEntity | null;
  onClose: () => void;
}

export const DetailDrawer: React.FC<DetailDrawerProps> = ({ entity, onClose }) => {
  const { showToast } = useToast();
  const { isBookmarked, toggleBookmark } = useWatchlist();

  if (!entity) return null;

  const handleCopyLink = () => {
    let url = '';
    if (entity.type === 'university') {
      url = entity.data.jobs_url || entity.data.website || '';
    } else {
      url = entity.data.careers_url || entity.data.website || '';
    }
    if (url) {
      navigator.clipboard.writeText(url);
      showToast('Copied portal link to clipboard!', 'success');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity"
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

              <div className="flex items-center space-x-1">
                <button
                  onClick={() => toggleBookmark(entity)}
                  title={isBookmarked(entity.type === 'university' ? entity.data.id : entity.data.oid) ? 'Remove from Watchlist' : 'Save to Watchlist'}
                  className="p-2 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                  aria-label="Toggle Watchlist bookmark"
                >
                  <Star
                    className={`w-4 h-4 ${
                      isBookmarked(entity.type === 'university' ? entity.data.id : entity.data.oid)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-400 hover:text-amber-400'
                    }`}
                  />
                </button>
                <button
                  onClick={handleCopyLink}
                  title="Copy link to clipboard"
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                  aria-label="Copy portal link"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Switcher */}
            {entity.type === 'university' ? (
              <UniversityDrawerContent data={entity.data} />
            ) : (
              <CompanyDrawerContent data={entity.data} />
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
