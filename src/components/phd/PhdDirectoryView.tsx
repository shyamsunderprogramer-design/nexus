import React, { useState, useEffect } from 'react';
import { University } from '../../types';
import { api } from '../../services/api';
import {
  Microscope,
  Search,
  ExternalLink,
  Users,
  Star,
} from 'lucide-react';
import { useWatchlist } from '../../context/WatchlistContext';

interface PhdDirectoryViewProps {
  onSelectUniversity: (u: University) => void;
}

const DISCIPLINE_FILTERS = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'cs', label: 'Computer & AI', match: 'computer' },
  { id: 'eng', label: 'Engineering & Tech', match: 'engineering' },
  { id: 'bio', label: 'Biomedical & Life Sciences', match: 'biological' },
  { id: 'phys', label: 'Physics & Chem', match: 'physical' },
  { id: 'biz', label: 'Business & DBA', match: 'business' },
  { id: 'math', label: 'Math & Stats', match: 'mathematics' },
  { id: 'soc', label: 'Economics & Social Sciences', match: 'social' },
  { id: 'health', label: 'Health & Clinical', match: 'health' },
];

export const PhdDirectoryView: React.FC<PhdDirectoryViewProps> = ({ onSelectUniversity }) => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState('all');
  const [onlyR1, setOnlyR1] = useState(false);
  const [onlyDBA, setOnlyDBA] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const { isBookmarked, toggleBookmark } = useWatchlist();

  const fetchDoctoralUniversities = async () => {
    setLoading(true);
    try {
      const res = await api.getUniversities({
        q: search,
        phdDba: true,
        dba: onlyDBA ? true : undefined,
        r1: onlyR1 ? true : undefined,
        page,
        limit: 24,
      });

      let results = res.data;
      if (selectedDiscipline !== 'all') {
        const target = DISCIPLINE_FILTERS.find((d) => d.id === selectedDiscipline)?.match || '';
        results = results.filter((u) =>
          (u.programs || []).some((p) => p.toLowerCase().includes(target))
        );
      }

      setUniversities(results);
      setTotalPages(res.totalPages);
      setTotalCount(res.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctoralUniversities();
  }, [search, selectedDiscipline, onlyR1, onlyDBA, page]);

  return (
    <div className="space-y-6">
      {/* Search & Discipline Filter Bar */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 space-y-4">
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
              placeholder="Search doctoral universities by name, state, research field, or Carnegie tier..."
              className="w-full bg-white dark:bg-slate-900/80 border border-slate-300 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ×
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setOnlyR1(!onlyR1);
                setPage(1);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap ${
                onlyR1
                  ? 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/40 ring-1 ring-purple-500/30'
                  : 'border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              🏛️ R1 High-Research Only
            </button>

            <button
              onClick={() => {
                setOnlyDBA(!onlyDBA);
                setPage(1);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap ${
                onlyDBA
                  ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40 ring-1 ring-amber-500/30'
                  : 'border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              💼 DBA Programs (13)
            </button>
          </div>
        </div>

        {/* Discipline Pills Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-white/5">
          <span className="text-xs text-slate-500 font-semibold">Research Fields:</span>
          {DISCIPLINE_FILTERS.map((disc) => (
            <button
              key={disc.id}
              onClick={() => {
                setSelectedDiscipline(disc.id);
                setPage(1);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                selectedDiscipline === disc.id
                  ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                  : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              {disc.label}
            </button>
          ))}

          <span className="ml-auto text-xs font-mono text-brand-600 dark:text-brand-400 font-bold">
            {totalCount.toLocaleString()} doctoral campuses found
          </span>
        </div>
      </div>

      {/* Grid of Doctoral Universities */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass-card rounded-2xl p-5 space-y-3 animate-pulse">
              <div className="h-4 w-1/3 bg-slate-200 dark:bg-white/10 rounded" />
              <div className="h-5 w-3/4 bg-slate-200 dark:bg-white/10 rounded" />
              <div className="h-3 w-1/2 bg-slate-200 dark:bg-white/10 rounded" />
            </div>
          ))}
        </div>
      ) : universities.length === 0 ? (
        <div className="text-center py-16 glass-card rounded-2xl p-8 space-y-3">
          <Microscope className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No matching doctoral institutions found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try switching research disciplines or clearing active filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {universities.map((u) => {
            const hasDba = (u.degree_levels || []).includes('DBA');
            const hasPhd = (u.degree_levels || []).includes('PhD');
            const isR1 = (u.carnegie || '').includes('Very High');

            return (
              <div
                key={u.id}
                onClick={() => onSelectUniversity(u)}
                className="relative overflow-hidden glass-card rounded-2xl p-5 flex flex-col justify-between space-y-4 cursor-pointer group transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-brand-500/40"
              >
                <div>
                  {/* Top Meta & Watchlist */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400 tracking-wider uppercase">
                      {u.state} · {u.city}
                    </span>

                    <div className="flex items-center space-x-1.5">
                      {isR1 && (
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold">
                          R1 VERY HIGH
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark({ type: 'university', data: u });
                        }}
                        title={isBookmarked(u.id) ? 'Remove from Watchlist' : 'Save to Watchlist'}
                        className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            isBookmarked(u.id)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-400 hover:text-amber-400'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Institution Name */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors line-clamp-1 tracking-tight">
                    {u.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {u.carnegie || u.sector || 'Doctoral Research University'}
                  </p>

                  {/* Funding & Degree Level Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 font-semibold">
                      💰 Fully Funded (RA/TA)
                    </span>

                    {hasPhd && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/25 font-semibold">
                        🔬 PhD Conferred
                      </span>
                    )}

                    {hasDba && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40 font-extrabold ring-1 ring-amber-500/30">
                        💼 DBA Conferred
                      </span>
                    )}

                    {u.app_fee_grad !== undefined && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 font-semibold">
                        {u.app_fee_grad === 0 ? '✨ Free Grad App' : `$${u.app_fee_grad} Grad Fee`}
                      </span>
                    )}
                  </div>

                  {/* Top Conferred Disciplines */}
                  {u.programs && u.programs.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-white/5">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold mb-1">
                        Key Doctoral Disciplines:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {u.programs.slice(0, 3).map((p, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="border-t border-slate-200 dark:border-white/5 pt-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1.5 font-mono text-slate-600 dark:text-slate-400">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span>{u.students ? u.students.toLocaleString() : 'N/A'} students</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {u.apply_url && (
                      <a
                        href={u.apply_url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-brand-500/10 hover:bg-brand-500/20 text-brand-700 dark:text-brand-300 border border-brand-500/20 flex items-center space-x-1 transition-colors"
                      >
                        <span>Admissions Portal</span>
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/5">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            ← Previous Page
          </button>

          <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            Next Page →
          </button>
        </div>
      )}
    </div>
  );
};
