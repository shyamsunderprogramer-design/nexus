import { StatsResponse, University, Company, StateBridgeData } from '../types';

declare global {
  interface Window {
    NEXUS_DATA?: {
      stats: StatsResponse;
      bridge: Record<string, StateBridgeData>;
      universities: University[];
      companies: Company[];
    };
  }
}

const getBaseUrl = (): string => {
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? base : `${base}/`;
};

let cachedStats: StatsResponse | null = null;
let cachedUniversities: University[] | null = null;
let cachedCompanies: Company[] | null = null;
let cachedBridge: Record<string, StateBridgeData> | null = null;

export const api = {
  async getStats(): Promise<StatsResponse> {
    if (cachedStats) return cachedStats;
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        cachedStats = await res.json();
        return cachedStats!;
      }
    } catch {}
    if (window.NEXUS_DATA?.stats) {
      cachedStats = window.NEXUS_DATA.stats;
      return cachedStats;
    }
    const base = getBaseUrl();
    const res = await fetch(`${base}data/stats.json`);
    cachedStats = await res.json();
    return cachedStats!;
  },

  async getUniversities(params: {
    q?: string;
    country?: string;
    state?: string;
    stem?: boolean;
    h1b?: boolean;
    r1?: boolean;
    ats?: string;
    page?: number;
    limit?: number;
  }): Promise<{ total: number; page: number; totalPages: number; data: University[] }> {
    const query = new URLSearchParams();
    if (params.q) query.set('q', params.q);
    if (params.country && params.country !== 'ALL') query.set('country', params.country);
    if (params.state && params.state !== 'ALL') query.set('state', params.state);
    if (params.stem) query.set('stem', 'true');
    if (params.h1b) query.set('h1b', 'true');
    if (params.r1) query.set('r1', 'true');
    if (params.ats) query.set('ats', params.ats);
    if (params.page) query.set('page', String(params.page));
    if (params.limit) query.set('limit', String(params.limit));

    try {
      const res = await fetch(`/api/universities?${query.toString()}`);
      if (res.ok) return await res.json();
    } catch {}

    // Fallback: Client-side filtration
    if (!cachedUniversities) {
      if (window.NEXUS_DATA?.universities?.length) {
        cachedUniversities = window.NEXUS_DATA.universities;
      } else {
        const base = getBaseUrl();
        const res = await fetch(`${base}data/universities.json`);
        cachedUniversities = await res.json();
      }
    }

    let filtered = cachedUniversities || [];
    if (params.country && params.country !== 'ALL') {
      filtered = filtered.filter(u => u.country === params.country);
    }
    if (params.state && params.state !== 'ALL') {
      filtered = filtered.filter(u => u.state === params.state);
    }
    if (params.stem) {
      filtered = filtered.filter(u => u.stem_share && u.stem_share >= 0.20);
    }
    if (params.h1b) {
      filtered = filtered.filter(u => u.h1b_exempt);
    }
    if (params.r1) {
      filtered = filtered.filter(u => (u.carnegie || '').includes('Very High'));
    }
    if (params.ats) {
      filtered = filtered.filter(u => (u.jobs_ats || '').toLowerCase() === params.ats?.toLowerCase());
    }
    if (params.q) {
      const q = params.q.toLowerCase();
      filtered = filtered.filter(u => 
        (u.name || '').toLowerCase().includes(q) ||
        (u.city || '').toLowerCase().includes(q) ||
        (u.state || '').toLowerCase().includes(q)
      );
    }

    const page = params.page || 1;
    const limit = params.limit || 24;
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const data = filtered.slice((page - 1) * limit, page * limit);

    return { total, page, totalPages, data };
  },

  async getCompanies(params: {
    q?: string;
    category?: string;
    state?: string;
    country?: string;
    page?: number;
    limit?: number;
  }): Promise<{ total: number; page: number; totalPages: number; data: Company[] }> {
    const query = new URLSearchParams();
    if (params.q) query.set('q', params.q);
    if (params.category && params.category !== 'ALL') query.set('category', params.category);
    if (params.state && params.state !== 'ALL') query.set('state', params.state);
    if (params.country && params.country !== 'ALL') query.set('country', params.country);
    if (params.page) query.set('page', String(params.page));
    if (params.limit) query.set('limit', String(params.limit));

    try {
      const res = await fetch(`/api/companies?${query.toString()}`);
      if (res.ok) return await res.json();
    } catch {}

    // Fallback: Client-side filtration
    if (!cachedCompanies) {
      if (window.NEXUS_DATA?.companies?.length) {
        cachedCompanies = window.NEXUS_DATA.companies;
      } else {
        const base = getBaseUrl();
        const res = await fetch(`${base}data/companies_featured.json`);
        cachedCompanies = await res.json();
      }
    }

    let filtered = cachedCompanies || [];
    if (params.country && params.country !== 'ALL') {
      if (params.country === 'IN') {
        filtered = filtered.filter(c => c.country === 'IN');
      } else if (params.country === 'US') {
        filtered = filtered.filter(c => !c.country || c.country === 'US');
      } else if (params.country === 'CA') {
        filtered = filtered.filter(c => c.country === 'CA');
      }
    }
    if (params.category && params.category !== 'ALL') {
      filtered = filtered.filter(c => c.category === params.category);
    }
    if (params.state && params.state !== 'ALL') {
      filtered = filtered.filter(c => c.state === params.state);
    }
    if (params.q) {
      const q = params.q.toLowerCase();
      filtered = filtered.filter(c => 
        (c.name || '').toLowerCase().includes(q) ||
        (c.legal_name || '').toLowerCase().includes(q) ||
        (c.ticker || '').toLowerCase().includes(q)
      );
    }

    const page = params.page || 1;
    const limit = params.limit || 24;
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const data = filtered.slice((page - 1) * limit, page * limit);

    return { total, page, totalPages, data };
  },

  async getBridge(state: string): Promise<StateBridgeData | null> {
    try {
      const res = await fetch(`/api/bridge/${state}`);
      if (res.ok) return await res.json();
    } catch {}

    if (!cachedBridge) {
      if (window.NEXUS_DATA?.bridge) {
        cachedBridge = window.NEXUS_DATA.bridge;
      } else {
        const base = getBaseUrl();
        const res = await fetch(`${base}data/state_bridge.json`);
        cachedBridge = await res.json();
      }
    }
    return (cachedBridge && cachedBridge[state]) || null;
  }
};
