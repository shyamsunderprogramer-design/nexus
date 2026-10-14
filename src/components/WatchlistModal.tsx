import React, { useState } from 'react';
import { useWatchlist, WatchlistItem } from '../context/WatchlistContext';
import { InspectorEntity } from '../types';
import {
  X,
  Star,
  ExternalLink,
  GraduationCap,
  Building2,
  Download,
  Copy,
  Trash2,
  Bookmark,
  MapPin,
  Cpu,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WatchlistModalProps {
  onSelectEntity: (entity: InspectorEntity) => void;
  onExploreCampuses: () => void;
  onExploreEmployers: () => void;
}

export const WatchlistModal: React.FC<WatchlistModalProps> = ({
  onSelectEntity,
  onExploreCampuses,
  onExploreEmployers,
}) => {
  const {
    watchlist,
    isWatchlistOpen,
    setIsWatchlistOpen,
    removeBookmark,
    clearWatchlist,
    exportToCSV,
    copyAllLinks,
  } = useWatchlist();

  const [activeFilter, setActiveFilter] = useState<'all' | 'university' | 'company'>('all');

  if (!isWatchlistOpen) return null;

  const filteredItems = watchlist.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  const universitiesCount = watchlist.filter((i) => i.type === 'university').length;
  const companiesCount = watchlist.filter((i) => i.type === 'company').length;

  const handleInspect = (item: WatchlistItem) => {
    if (item.type === 'university') {
      onSelectEntity({ type: 'university', data: item.data as any });
    } else {
      onSelectEntity({ type: 'company', data: item.data as any });
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
          onClick={() => setIsWatchlistOpen(false)}
          className="absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
        />

        {/* Slide-over panel */}
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-screen max-w-md sm:max-w-xl bg-white dark:bg-[#0a0e1a] border-l border-slate-200 dark:border-white/10 p-6 flex flex-col shadow-2xl relative transition-colors"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Target Watchlist
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                      {watchlist.length} Saved
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Curated target institutions &amp; verified employer career portals
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsWatchlistOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions Bar */}
            {watchlist.length > 0 && (
              <div className="py-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-white/5">
                {/* Filter Tabs */}
                <div className="flex items-center space-x-1 bg-slate-100 dark:bg-white/5 p-1 rounded-xl text-xs font-semibold">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      activeFilter === 'all'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    All ({watchlist.length})
                  </button>
                  <button
                    onClick={() => setActiveFilter('university')}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      activeFilter === 'university'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Schools ({universitiesCount})
                  </button>
                  <button
                    onClick={() => setActiveFilter('company')}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      activeFilter === 'company'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Employers ({companiesCount})
                  </button>
                </div>

                {/* Bulk Action Buttons */}
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={exportToCSV}
                    title="Export targets to CSV spreadsheet"
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center space-x-1 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV</span>
                  </button>

                  <button
                    onClick={copyAllLinks}
                    title="Copy all career URLs to clipboard"
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 text-xs font-semibold flex items-center space-x-1 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy All</span>
                  </button>

                  <button
                    onClick={clearWatchlist}
                    title="Clear entire watchlist"
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Watchlist Items Scrollable Area */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {watchlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                  <div className="h-16 w-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                    <Bookmark className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Your Target Watchlist is Empty
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                      Click the star icon ⭐ on any higher-ed campus or employer card to curate your personal application list.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-2 w-full max-w-xs">
                    <button
                      onClick={() => {
                        setIsWatchlistOpen(false);
                        onExploreCampuses();
                      }}
                      className="flex-1 px-3 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-700 dark:text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>Browse Campuses</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsWatchlistOpen(false);
                        onExploreEmployers();
                      }}
                      className="flex-1 px-3 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                    >
                      <Building2 className="w-4 h-4" />
                      <span>Browse Employers</span>
                    </button>
                  </div>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No {activeFilter === 'university' ? 'universities' : 'employers'} in your watchlist.
                </div>
              ) : (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleInspect(item)}
                    className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.03] hover:border-amber-500/40 hover:bg-amber-500/[0.02] transition-all cursor-pointer group flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 border ${
                            item.type === 'university'
                              ? 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30'
                              : 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border-cyan-500/30'
                          }`}
                        >
                          {item.type === 'university' ? (
                            <GraduationCap className="w-4 h-4" />
                          ) : (
                            <Building2 className="w-4 h-4" />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center space-x-1.5 mb-0.5">
                            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                              {item.type === 'university' ? 'Campus' : 'Employer'} · {item.location}
                            </span>
                            {item.ats && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 font-semibold">
                                {item.ats}
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                            {item.name}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                            {item.category}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeBookmark(item.id);
                        }}
                        title="Remove from Watchlist"
                        className="p-1 rounded-lg text-amber-500 hover:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                      >
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      </button>
                    </div>

                    {/* Bottom actions */}
                    <div className="border-t border-slate-200/60 dark:border-white/5 pt-2 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-slate-400 font-mono">
                        Saved {new Date(item.savedAt).toLocaleDateString()}
                      </span>

                      <div className="flex items-center space-x-2">
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-semibold text-[11px] flex items-center space-x-1 transition-colors"
                          >
                            <span>Open Career Portal</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {watchlist.length > 0 && (
              <div className="border-t border-slate-200 dark:border-white/10 pt-3 text-center text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>Stored locally in your browser</span>
                <button
                  onClick={exportToCSV}
                  className="text-brand-600 dark:text-brand-400 hover:underline font-semibold"
                >
                  Download .CSV Spreadsheet
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
