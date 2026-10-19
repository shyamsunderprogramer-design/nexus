import React, { useState, useEffect } from 'react';
import { Company } from '../types';
import { api } from '../services/api';
import { Search, ExternalLink, TrendingUp, X, RotateCcw, Copy, Star, Scale } from 'lucide-react';
import { useToast } from './Toast';
import { useWatchlist } from '../context/WatchlistContext';
import { useCompare } from '../context/CompareContext';

interface EnterpriseDirectoryProps {
  onSelectCompany: (c: Company) => void;
}

export const EnterpriseDirectory: React.FC<EnterpriseDirectoryProps> = ({ onSelectCompany }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('ALL');
  const [state, setState] = useState('ALL');
  const [country, setCountry] = useState('ALL');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const { showToast } = useToast();
  const { isBookmarked, toggleBookmark } = useWatchlist();
  const { isInCompare, toggleCompare } = useCompare();

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await api.getCompanies({
        q: search,
        category,
        state,
        country,
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
  }, [search, category, state, country, page]);

  const resetAllFilters = () => {
    setSearch('');
    setCategory('ALL');
    setState('ALL');
    setCountry('ALL');
    setPage(1);
    showToast('All enterprise directory filters cleared', 'info');
  };

  const handleCopy = (e: React.MouseEvent, text: string, name: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    showToast(`Copied ${name} careers URL · ⭐ Star NEXUS on GitHub!`, 'success');
  };

  const hasActiveFilters = search || category !== 'ALL' || country !== 'ALL' || state !== 'ALL';

  return (
    <div className="space-y-6">
      {/* Search & Filter Header Card */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search companies by name, legal entity, ticker, or city..."
              className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
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
              setState('ALL');
              setPage(1);
            }}
            className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-sm text-slate-800 dark:text-slate-300 focus:outline-none focus:border-brand-500 transition-colors"
          >
            <option value="ALL">All Countries (Global)</option>
            <option value="US">🇺🇸 United States (1.7M+ Verified)</option>
            <option value="GB">🇬🇧 United Kingdom (385k+)</option>
            <option value="IN">🇮🇳 India (356k+)</option>
            <option value="CA">🇨🇦 Canada (200k+)</option>
            <option value="DE">🇩🇪 Germany (170k+)</option>
            <option value="IT">🇮🇹 Italy (128k+)</option>
            <option value="NL">🇳🇱 Netherlands (128k+)</option>
            <option value="AU">🇦🇺 Australia (123k+)</option>
            <option value="BR">🇧🇷 Brazil (99k+)</option>
            <option value="FR">🇫🇷 France (96k+)</option>
            <option value="ES">🇪🇸 Spain (27k+)</option>
          </select>

          {(country === 'US' || country === 'ALL') && (
            <select
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setPage(1);
              }}
              className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-sm text-slate-800 dark:text-slate-300 focus:outline-none focus:border-brand-500 transition-colors"
            >
              <option value="ALL">All US States (Nationwide)</option>
              <option value="CA">California (269,046)</option>
              <option value="TX">Texas (132,776)</option>
              <option value="NY">New York (130,249)</option>
              <option value="FL">Florida (119,542)</option>
              <option value="IL">Illinois (75,406)</option>
              <option value="PA">Pennsylvania (61,212)</option>
              <option value="OH">Ohio (55,634)</option>
              <option value="GA">Georgia (55,272)</option>
              <option value="MA">Massachusetts (54,906)</option>
              <option value="NJ">New Jersey (50,064)</option>
              <option value="CO">Colorado (48,093)</option>
              <option value="NC">North Carolina (48,021)</option>
              <option value="VA">Virginia (46,776)</option>
              <option value="WA">Washington (45,576)</option>
              <option value="MI">Michigan (45,322)</option>
              <option value="MN">Minnesota (35,096)</option>
              <option value="AZ">Arizona (34,396)</option>
              <option value="MD">Maryland (32,516)</option>
              <option value="WI">Wisconsin (30,345)</option>
              <option value="MO">Missouri (28,222)</option>
              <option value="IN">Indiana (28,143)</option>
              <option value="TN">Tennessee (26,814)</option>
              <option value="OR">Oregon (26,682)</option>
              <option value="CT">Connecticut (22,375)</option>
              <option value="UT">Utah (18,409)</option>
              <option value="SC">South Carolina (17,160)</option>
              <option value="LA">Louisiana (15,489)</option>
              <option value="NV">Nevada (15,021)</option>
              <option value="AL">Alabama (14,674)</option>
              <option value="DC">Washington D.C. (14,141)</option>
              <option value="OK">Oklahoma (13,179)</option>
              <option value="KS">Kansas (13,077)</option>
              <option value="KY">Kentucky (13,022)</option>
              <option value="IA">Iowa (11,888)</option>
              <option value="NH">New Hampshire (9,815)</option>
              <option value="NE">Nebraska (8,808)</option>
              <option value="AR">Arkansas (8,111)</option>
              <option value="ID">Idaho (7,660)</option>
              <option value="ME">Maine (6,918)</option>
              <option value="NM">New Mexico (6,821)</option>
              <option value="RI">Rhode Island (6,125)</option>
              <option value="MS">Mississippi (5,791)</option>
              <option value="DE">Delaware (5,536)</option>
              <option value="HI">Hawaii (5,345)</option>
              <option value="MT">Montana (4,750)</option>
              <option value="VT">Vermont (4,661)</option>
              <option value="WV">West Virginia (3,747)</option>
              <option value="AK">Alaska (3,445)</option>
              <option value="SD">South Dakota (3,193)</option>
              <option value="ND">North Dakota (2,878)</option>
              <option value="WY">Wyoming (2,831)</option>
            </select>
          )}

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 text-sm text-slate-800 dark:text-slate-300 focus:outline-none focus:border-brand-500 transition-colors"
          >
            <option value="ALL">All Industries (180,000+ Verified)</option>
            <option value="Information Technology">💻 Information Technology (IT) & Software</option>
            <option value="Banking & Financial Services">🏦 Banking & Financial Services (13,000+)</option>
            <option value="Healthcare & Pharmaceuticals">🏥 Healthcare & Pharmaceuticals (13,500+)</option>
            <option value="Education & EdTech">🎓 Education & EdTech (13,300+)</option>
            <option value="Retail & Fashion Apparel">🛍️ Retail, Fashion & Supermarkets (8,200+)</option>
            <option value="Automotive & Manufacturing">🚗 Automotive, EV & Manufacturing (7,300+)</option>
            <option value="Infrastructure & Real Estate">🏗️ Infrastructure & Real Estate (7,200+)</option>
            <option value="Energy & Natural Resources">⚡ Energy, Oil & Natural Resources (5,300+)</option>
            <option value="Media, Gaming & Entertainment">🎮 Media, Gaming & Entertainment (3,100+)</option>
            <option value="Telecommunications">📡 Telecommunications & 5G (2,700+)</option>
            <option value="Logistics & Supply Chain">🚢 Logistics & Supply Chain (2,600+)</option>
            <option value="Other Industries">🌐 Specialized Corporate & Services (43,000+)</option>
          </select>
        </div>

        {/* Active Filters Row & Summary */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-white/5">
          <div className="flex items-center space-x-2">
            <span>Showing verified employers with active portals</span>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="px-2 py-0.5 rounded-full text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
          <span className="font-mono text-brand-600 dark:text-brand-400 font-semibold flex items-center space-x-1.5">
            {loading && <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />}
            <span>{loading ? 'Scanning 3.5M+ Verified Registry...' : `${totalCount.toLocaleString()} Verified Employers`}</span>
          </span>
        </div>
      </div>

      {/* Grid of Company Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="glass-card rounded-xl p-5 h-48 animate-pulse space-y-3">
              <div className="flex justify-between">
                <div className="h-3 w-20 bg-slate-200 dark:bg-white/10 rounded" />
                <div className="h-3 w-16 bg-slate-200 dark:bg-white/10 rounded" />
              </div>
              <div className="h-5 w-3/4 bg-slate-200 dark:bg-white/10 rounded" />
              <div className="h-3 w-1/2 bg-slate-200 dark:bg-white/10 rounded" />
              <div className="flex gap-2 pt-2">
                <div className="h-4 w-16 bg-slate-200 dark:bg-white/10 rounded-full" />
                <div className="h-4 w-24 bg-slate-200 dark:bg-white/10 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : companies.length === 0 ? (
        <div className="text-center py-16 glass-card rounded-2xl p-8 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            No enterprise employers matched your search criteria
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms, changing the industry filter to "All Industries", or switching to "All Countries".
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
          {companies.map((c) => (
            <div
              key={c.oid}
              onClick={() => onSelectCompany(c)}
              className="relative overflow-hidden glass-card rounded-2xl p-5 flex flex-col justify-between space-y-4 cursor-pointer group transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-brand-500/40"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold text-brand-600 dark:text-brand-400 tracking-wider uppercase">
                    {c.state || 'US'} · {c.city || 'HQ'}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.06] border border-slate-200/80 dark:border-white/10 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300">
                      {c.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCompare({ type: 'company', data: c });
                      }}
                      title={isInCompare(c.oid) ? 'Remove from Head-to-Head Compare' : 'Add to Head-to-Head Compare'}
                      className={`p-1 rounded-md transition-colors ${
                        isInCompare(c.oid)
                          ? 'bg-brand-500/20 text-brand-600 dark:text-brand-300 ring-1 ring-brand-500/40'
                          : 'hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-brand-500'
                      }`}
                    >
                      <Scale className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark({ type: 'company', data: c });
                      }}
                      title={isBookmarked(c.oid) ? 'Remove from Watchlist' : 'Save to Watchlist'}
                      className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                    >
                      <Star className={`w-3.5 h-3.5 ${isBookmarked(c.oid) ? 'fill-amber-400 text-amber-400' : 'text-slate-400 hover:text-amber-400'}`} />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors line-clamp-1 tracking-tight">
                  {c.name}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {c.description || c.legal_name || 'Enterprise organization'}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {c.ticker && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-brand-500/10 text-brand-700 dark:text-brand-400 border border-brand-500/25 flex items-center space-x-1 font-semibold">
                      <TrendingUp className="w-3 h-3" />
                      <span>{c.ticker} ({c.exchange || 'SEC'})</span>
                    </span>
                  )}
                  {c.careers_url && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 font-semibold">
                      ✓ Careers Portal
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-white/5 pt-3 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">{c.subcategory || 'Employer'}</span>

                <div className="flex items-center space-x-2">
                  {c.careers_url && (
                    <button
                      onClick={(e) => handleCopy(e, c.careers_url!, c.name)}
                      title="Copy careers URL"
                      className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {c.website && (
                    <a
                      href={c.website}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-medium transition-colors text-[11px]"
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
                      className="px-2.5 py-1 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 text-brand-700 dark:text-brand-300 font-medium transition-colors text-[11px] flex items-center space-x-1 border border-brand-500/20"
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
