import React from 'react';
import { Company } from '../../types';
import { ExternalLink } from 'lucide-react';

interface CompanyDrawerContentProps {
  data: Company;
}

export const CompanyDrawerContent: React.FC<CompanyDrawerContentProps> = ({ data }) => {
  return (
    <div className="space-y-6 text-sm">
      <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-white/5 text-xs">
        <div>
          <span className="text-slate-500 dark:text-slate-400">Headquarters:</span>
          <div className="text-slate-900 dark:text-white font-semibold mt-0.5">
            {data.city || 'Regional'}, {data.state || 'US'}
          </div>
        </div>

        <div>
          <span className="text-slate-500 dark:text-slate-400">Industry:</span>
          <div className="text-slate-900 dark:text-white font-semibold mt-0.5">{data.category}</div>
        </div>

        <div>
          <span className="text-slate-500 dark:text-slate-400">SEC Ticker:</span>
          <div className="text-brand-600 dark:text-brand-400 font-semibold font-mono mt-0.5">
            {data.ticker || 'Private Entity'}
          </div>
        </div>

        <div>
          <span className="text-slate-500 dark:text-slate-400">Exchange:</span>
          <div className="text-slate-900 dark:text-white font-semibold mt-0.5">
            {data.exchange || 'SEC EDGAR'}
          </div>
        </div>

        {data.cin && (
          <div>
            <span className="text-slate-500 dark:text-slate-400">Corporate CIN:</span>
            <div className="text-brand-700 dark:text-brand-300 font-mono text-[11px] mt-0.5">{data.cin}</div>
          </div>
        )}

        {data.market_cap_tier && (
          <div>
            <span className="text-slate-500 dark:text-slate-400">Valuation / Tier:</span>
            <div className="text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">{data.market_cap_tier}</div>
          </div>
        )}
      </div>

      <div>
        <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
          Company Description
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-200 dark:border-white/5">
          {data.description || data.legal_name || 'Enterprise organization listed in the federal and curated employers directory.'}
        </p>
      </div>

      <div className="space-y-2.5 pt-2">
        <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Verified Channels
        </h4>

        {data.website && (
          <a
            href={data.website}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            <span>Official Corporate Website</span>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>
        )}

        {data.careers_url && (
          <a
            href={data.careers_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-700 dark:text-brand-300 text-xs font-semibold border border-brand-500/20 dark:border-brand-500/30 transition-colors"
          >
            <span>Verified Careers &amp; Jobs Page</span>
            <ExternalLink className="w-4 h-4 text-brand-500 dark:text-brand-400" />
          </a>
        )}
      </div>
    </div>
  );
};
