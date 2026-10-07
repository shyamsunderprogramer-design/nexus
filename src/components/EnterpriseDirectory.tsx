import React, { useState, useEffect } from 'react';
import { Company } from '../types';
import { api } from '../services/api';
import { Search, ExternalLink, Building2, TrendingUp } from 'lucide-react';

interface EnterpriseDirectoryProps {
  onSelectCompany: (c: Company) => void;
}

export const EnterpriseDirectory: React.FC<EnterpriseDirectoryProps> = ({ onSelectCompany }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [state, setState] = useState('ALL');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await api.getCompanies({
        q: search,
        category,
        state,
        page,
        limit: 24,
      });
      setCompanies(res.data);
      setTotalPages(res.totalPages);
      setTotalCount(res.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [search, category, state, page]);

  return (
    <div className="space-y-6">
      {/* Search & Filter Header Card */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search companies by name, legal entity, ticker, or city..."
              className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Industries</option>
            <option value="Logistics & Transport">Logistics & Transport</option>
            <option value="Healthcare Providers">Healthcare Providers</option>
            <option value="IT">IT & Tech (Form D)</option>
            <option value="Mechanical & Manufacturing">Mechanical & Manufacturing</option>
            <option value="MedTech & Pharma">MedTech & Pharma</option>
          </select>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
          <span>Showing verified enterprise employers with active websites and career portals</span>
          <span className="font-mono text-cyan-400 font-semibold">
            {totalCount.toLocaleString()} Verified Employers
          </span>
        </div>
      </div>

      {/* Grid of Company Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="glass-card rounded-xl p-5 h-48 animate-pulse bg-slate-900/40" />
          ))}
        </div>
      ) : companies.length === 0 ? (
        <div className="text-center py-16 text-slate-500 glass-card rounded-2xl">
          No employers matched your search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((c) => (
            <div
              key={c.oid}
              onClick={() => onSelectCompany(c)}
              className="glass-card rounded-xl p-5 flex flex-col justify-between space-y-4 cursor-pointer group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-cyan-400 tracking-wider uppercase">
                    {c.state || 'US'} · {c.city || 'HQ'}
                  </span>
                  <span className="text-xs font-mono text-slate-500">{c.category}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {c.name}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                  {c.description || c.legal_name || 'Enterprise organization'}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {c.ticker && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{c.ticker} ({c.exchange || 'SEC'})</span>
                    </span>
                  )}
                  {c.careers_url && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Verified Careers Portal
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t border-white/5 pt-3 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">{c.subcategory || 'Employer'}</span>

                <div className="flex items-center space-x-2">
                  {c.website && (
                    <a
                      href={c.website}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-medium transition-colors text-[11px]"
                    >
                      Website
                    </a>
                  )}
                  {c.careers_url && (
                    <a
                      href={c.careers_url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-1 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 font-medium transition-colors text-[11px] flex items-center space-x-1"
                    >
                      <span>Careers</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      <div className="flex items-center justify-between pt-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 rounded-xl glass-card text-xs font-semibold text-slate-300 hover:text-white disabled:opacity-40"
        >
          Previous
        </button>
        <span className="text-xs font-mono text-slate-400">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="px-4 py-2 rounded-xl glass-card text-xs font-semibold text-slate-300 hover:text-white disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};
