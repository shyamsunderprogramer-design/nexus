import React, { useState, useEffect } from 'react';
import { University } from '../types';
import { api } from '../services/api';
import { Search, ExternalLink, Users, Shield, Cpu, X, RotateCcw, Copy } from 'lucide-react';
import { useToast } from './Toast';

interface CampusDirectoryProps {
  onSelectUniversity: (u: University) => void;
}

export const CampusDirectory: React.FC<CampusDirectoryProps> = ({ onSelectUniversity }) => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('ALL');
  const [state, setState] = useState('ALL');
  const [chips, setChips] = useState({ stem: false, h1b: false, r1: false, workday: false });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const { showToast } = useToast();

  const fetchUniversities = async () => {
    setLoading(true);
    try {
      const res = await api.getUniversities({
        q: search,
        country,
        state,
        stem: chips.stem,
        h1b: chips.h1b,
        r1: chips.r1,
        ats: chips.workday ? 'workday' : undefined,
        page,
        limit: 24,
      });
      setUniversities(res.data);
      setTotalPages(res.totalPages);
      setTotalCount(res.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, [search, country, state, chips, page]);

  const toggleChip = (key: keyof typeof chips) => {
    setChips((prev) => ({ ...prev, [key]: !prev[key] }));
    setPage(1);
  };

  const resetAllFilters = () => {
    setSearch('');
    setCountry('ALL');
    setState('ALL');
    setChips({ stem: false, h1b: false, r1: false, workday: false });
    setPage(1);
    showToast('All campus directory filters cleared', 'info');
  };

  const handleCopy = (e: React.MouseEvent, text: string, name: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    showToast(`Copied ${name} portal URL`, 'success');
  };

  const hasActiveFilters = search || country !== 'ALL' || chips.stem || chips.h1b || chips.r1 || chips.workday;

  return (
    <div className="space-y-6">
      {/* Search & Filter Header Card */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search universities by name, city, state, or Carnegie / NIRF class..."
              className="w-full bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setPage(1);
            }}
            className="bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:border-brand-500 transition-colors"
          >
            <option value="ALL">All Countries (Global)</option>
            <option value="US">🇺🇸 United States (6,035)</option>
            <option value="CA">🇨🇦 Canada (209)</option>
            <option value="IN">🇮🇳 India (55+ Premier HEIs)</option>
          </select>
        </div>

        {/* Filter Chips Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-white/5">
          <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Quick Filters:</span>
          
          <button
            onClick={() => toggleChip('stem')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors flex items-center space-x-1.5 ${
              chips.stem
                ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40'
                : 'border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <Cpu className="w-3 h-3 text-emerald-500" />
            <span>STEM Heavy (&gt;20%)</span>
          </button>

          <button
            onClick={() => toggleChip('h1b')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors flex items-center space-x-1.5 ${
              chips.h1b
                ? 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/40'
                : 'border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <Shield className="w-3 h-3 text-purple-500" />
            <span>H-1B Cap Exempt</span>
          </button>

          <button
            onClick={() => toggleChip('r1')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors flex items-center space-x-1.5 ${
              chips.r1
                ? 'bg-brand-500/20 text-brand-700 dark:text-brand-300 border-brand-500/40'
                : 'border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <span>Carnegie R1 / NIRF</span>
          </button>

          <button
            onClick={() => toggleChip('workday')}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors flex items-center space-x-1.5 ${
              chips.workday
                ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/40'
                : 'border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            <span>Workday ATS</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="px-2.5 py-1 rounded-full text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors flex items-center space-x-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear Filters</span>
            </button>
          )}

          <span className="ml-auto text-xs font-mono text-brand-600 dark:text-brand-400 font-bold">
            {totalCount.toLocaleString()} institutions found
          </span>
        </div>
      </div>

      {/* Grid of University Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="glass-card rounded-xl p-5 h-48 animate-pulse space-y-3">
              <div className="flex justify-between">
                <div className="h-3 w-20 bg-slate-200 dark:bg-white/10 rounded" />
                <div className="h-3 w-8 bg-slate-200 dark:bg-white/10 rounded" />
              </div>
              <div className="h-5 w-3/4 bg-slate-200 dark:bg-white/10 rounded" />
              <div className="h-3 w-1/2 bg-slate-200 dark:bg-white/10 rounded" />
              <div className="flex gap-2 pt-2">
                <div className="h-4 w-16 bg-slate-200 dark:bg-white/10 rounded-full" />
                <div className="h-4 w-20 bg-slate-200 dark:bg-white/10 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : universities.length === 0 ? (
        <div className="text-center py-16 glass-card rounded-2xl p-8 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No matching higher-education institutions found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keywords, switching to "All Countries", or disabling active filter chips.
          </p>
          <button
            onClick={resetAllFilters}
            className="mt-2 px-4 py-2 rounded-xl bg-brand-500 text-white text-xs font-semibold hover:bg-brand-600 transition-colors inline-flex items-center space-x-1.5 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {universities.map((u) => {
            const stemPct = u.stem_share ? Math.round(u.stem_share * 100) : 0;
            return (
              <div
                key={u.id}
                onClick={() => onSelectUniversity(u)}
                className="relative overflow-hidden glass-card rounded-2xl p-5 flex flex-col justify-between space-y-4 cursor-pointer group transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-brand-500/40"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold text-brand-600 dark:text-brand-400 tracking-wider uppercase">
                      {u.state} · {u.city || u.country}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300">
                      {u.country}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors line-clamp-1 tracking-tight">
                    {u.name}
                  </h3>
                  
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {u.carnegie || u.sector || 'Higher Education'}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {stemPct > 15 && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 font-semibold">
                        ⚡ {stemPct}% STEM
                      </span>
                    )}
                    {u.nirf_rank ? (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-semibold">
                        NIRF #{u.nirf_rank}
                      </span>
                    ) : null}
                    {u.naac_grade ? (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/30 font-semibold">
                        NAAC {u.naac_grade}
                      </span>
                    ) : null}
                    {u.h1b_exempt && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/25 font-semibold">
                        🛡️ H-1B EXEMPT
                      </span>
                    )}
                    {u.jobs_ats && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/25 font-semibold">
                        {u.jobs_ats} ATS
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-t border-slate-200 dark:border-white/5 pt-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1.5 font-mono text-slate-600 dark:text-slate-400">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span>{u.students ? u.students.toLocaleString() : 'N/A'} students</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {u.jobs_url && (
                      <button
                        onClick={(e) => handleCopy(e, u.jobs_url!, u.name)}
                        title="Copy careers URL"
                        className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {u.jobs_url && (
                      <a
                        href={u.jobs_url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-2.5 py-1 rounded-lg bg-brand-500/15 hover:bg-brand-500/25 text-brand-700 dark:text-brand-300 border border-brand-500/30 font-semibold transition-colors text-[11px] flex items-center space-x-1"
                      >
                        <span>Jobs</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {u.career_url && (
                      <a
                        href={u.career_url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 font-semibold transition-colors text-[11px] flex items-center space-x-1"
                      >
                        <span>Career</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Bar */}
      <div className="flex items-center justify-between pt-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 rounded-xl glass-card text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 transition-colors"
        >
          Previous
        </button>
        <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="px-4 py-2 rounded-xl glass-card text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white disabled:opacity-40 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};
