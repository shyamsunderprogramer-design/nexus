import React from 'react';
import { useCompare } from '../../context/CompareContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, X, ArrowRight, Trash2, GraduationCap, Building2 } from 'lucide-react';

export const CompareFloatingTray: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare, setIsCompareOpen } = useCompare();

  if (compareList.length === 0) return null;

  const entityType = compareList[0]?.type;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 80, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-2xl w-[94%] sm:w-auto"
      >
        <div className="glass-card rounded-2xl p-2.5 sm:p-3 shadow-2xl border border-brand-500/40 bg-slate-900/95 dark:bg-[#090d16]/95 backdrop-blur-2xl flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-white">
          {/* Header Badge */}
          <div className="flex items-center space-x-2 px-2.5 py-1 rounded-xl bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-bold whitespace-nowrap self-start sm:self-center">
            <Scale className="w-3.5 h-3.5 text-brand-400" />
            <span>Compare {entityType === 'university' ? 'Campuses' : 'Employers'} ({compareList.length}/3)</span>
          </div>

          {/* Chips list */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full sm:max-w-xs py-1 no-scrollbar">
            {compareList.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-white/10 dark:bg-white/[0.06] border border-white/10 text-xs text-slate-200 font-medium whitespace-nowrap group hover:border-brand-400/40 transition-colors"
              >
                {item.type === 'university' ? (
                  <GraduationCap className="w-3 h-3 text-purple-400 flex-shrink-0" />
                ) : (
                  <Building2 className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                )}
                <span className="max-w-[120px] truncate text-slate-100">{item.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCompare(item.id);
                  }}
                  className="p-0.5 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-500/20 transition-colors"
                  title="Remove from comparison"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-1.5 w-full sm:w-auto justify-end pt-1 sm:pt-0">
            <button
              onClick={clearCompare}
              className="p-1.5 rounded-xl text-slate-400 hover:text-rose-300 hover:bg-rose-500/15 transition-colors text-xs font-semibold"
              title="Clear all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsCompareOpen(true)}
              className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold text-xs shadow-lg shadow-brand-500/25 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Head-to-Head</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
