import React, { useState, useEffect, useRef } from 'react';
import { University, Company, InspectorEntity } from '../types';
import { api } from '../services/api';
import { Search, GraduationCap, Building2, X, Command, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEntity: (entity: InspectorEntity) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectEntity,
}) => {
  const [query, setQuery] = useState('');
  const [universities, setUniversities] = useState<University[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setUniversities([]);
      setCompanies([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setUniversities([]);
      setCompanies([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const [uRes, cRes] = await Promise.all([
          api.getUniversities({ q: query, limit: 5 }),
          api.getCompanies({ q: query, limit: 5 }),
        ]);
        setUniversities(uRes.data);
        setCompanies(cRes.data);
        setSelectedIndex(0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  const allResults: InspectorEntity[] = [
    ...universities.map((u) => ({ type: 'university' as const, data: u })),
    ...companies.map((c) => ({ type: 'company' as const, data: c })),
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (allResults.length === 0 ? 0 : (prev + 1) % allResults.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (allResults.length === 0 ? 0 : (prev - 1 + allResults.length) % allResults.length));
    } else if (e.key === 'Enter' && allResults[selectedIndex]) {
      e.preventDefault();
      onSelectEntity(allResults[selectedIndex]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-start justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -16 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#0c101c] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
          onKeyDown={handleKeyDown}
        >
          {/* Header & Input */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-white/10">
            <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search across 6,299 universities & 5,296 companies..."
              className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
            <div className="flex items-center space-x-2 ml-2">
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-100 dark:bg-white/10 text-slate-500">
                ESC
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-2 space-y-3">
            {loading ? (
              <div className="p-8 text-center text-xs text-slate-500 animate-pulse">
                Searching intelligence graph...
              </div>
            ) : !query.trim() ? (
              <div className="p-8 text-center space-y-2">
                <Command className="w-8 h-8 mx-auto text-brand-500/40" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Instant Omni-Search Command Palette
                </p>
                <p className="text-[11px] text-slate-400 max-w-md mx-auto">
                  Type any university name (e.g. Stanford, IIT Bombay), corporate entity (e.g. Google, TCS, Flipkart), or city.
                </p>
              </div>
            ) : allResults.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                No institutions or employers matching "{query}".
              </div>
            ) : (
              <>
                {universities.length > 0 && (
                  <div>
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Higher Education ({universities.length})
                    </div>
                    {universities.map((u, i) => {
                      const isSelected = selectedIndex === i;
                      return (
                        <div
                          key={`u-${u.id}`}
                          onClick={() => {
                            onSelectEntity({ type: 'university', data: u });
                            onClose();
                          }}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-xs transition-colors ${
                            isSelected
                              ? 'bg-brand-500/10 text-brand-700 dark:text-brand-300 font-semibold'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5 truncate">
                            <GraduationCap className="w-4 h-4 text-brand-500 shrink-0" />
                            <span className="truncate">{u.name}</span>
                            <span className="text-[10px] text-slate-400 shrink-0">
                              {u.city}, {u.state} · {u.country || 'US'}
                            </span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 opacity-60" />
                        </div>
                      );
                    })}
                  </div>
                )}

                {companies.length > 0 && (
                  <div>
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Enterprise Employers ({companies.length})
                    </div>
                    {companies.map((c, i) => {
                      const itemIndex = universities.length + i;
                      const isSelected = selectedIndex === itemIndex;
                      return (
                        <div
                          key={`c-${c.oid}`}
                          onClick={() => {
                            onSelectEntity({ type: 'company', data: c });
                            onClose();
                          }}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-xs transition-colors ${
                            isSelected
                              ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-semibold'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5 truncate">
                            <Building2 className="w-4 h-4 text-cyan-500 shrink-0" />
                            <span className="truncate">{c.name}</span>
                            <span className="text-[10px] text-slate-400 shrink-0">
                              {c.category} · {c.state || c.country || 'Global'}
                            </span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 opacity-60" />
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer Navigation Hints */}
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500">
            <span>Navigation: <kbd className="font-mono bg-white dark:bg-white/10 px-1 py-0.5 rounded border border-slate-200 dark:border-white/10">↑</kbd> <kbd className="font-mono bg-white dark:bg-white/10 px-1 py-0.5 rounded border border-slate-200 dark:border-white/10">↓</kbd> Navigate · <kbd className="font-mono bg-white dark:bg-white/10 px-1 py-0.5 rounded border border-slate-200 dark:border-white/10">↵</kbd> Select</span>
            <span className="font-mono text-[10px] text-brand-600 dark:text-brand-400 font-semibold">NEXUS Command</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
