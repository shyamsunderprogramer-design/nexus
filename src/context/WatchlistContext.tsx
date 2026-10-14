import React, { createContext, useContext, useState, useEffect } from 'react';
import { InspectorEntity, University, Company } from '../types';
import { useToast } from '../components/Toast';

export interface WatchlistItem {
  id: string;
  type: 'university' | 'company';
  name: string;
  category: string;
  location: string;
  country: string;
  url: string;
  ats?: string;
  savedAt: number;
  data: University | Company;
}

interface WatchlistContextType {
  watchlist: WatchlistItem[];
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (entity: InspectorEntity) => void;
  removeBookmark: (id: string) => void;
  clearWatchlist: () => void;
  exportToCSV: () => void;
  copyAllLinks: () => void;
  isWatchlistOpen: boolean;
  setIsWatchlistOpen: (open: boolean) => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

const STORAGE_KEY = 'nexus_user_watchlist';

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    } catch (e) {
      console.error('Failed to save watchlist to localStorage', e);
    }
  }, [watchlist]);

  const isBookmarked = (id: string) => {
    return watchlist.some((item) => item.id === id);
  };

  const toggleBookmark = (entity: InspectorEntity) => {
    const id = entity.type === 'university' ? entity.data.id : entity.data.oid;
    const exists = isBookmarked(id);

    if (exists) {
      setWatchlist((prev) => prev.filter((item) => item.id !== id));
      showToast(`Removed "${entity.data.name}" from your Watchlist`, 'info');
    } else {
      let newItem: WatchlistItem;
      if (entity.type === 'university') {
        const u = entity.data;
        newItem = {
          id: u.id,
          type: 'university',
          name: u.name,
          category: u.carnegie || u.sector || 'Higher Education',
          location: `${u.city ? u.city + ', ' : ''}${u.state}`,
          country: u.country,
          url: u.jobs_url || u.career_url || u.website || '',
          ats: u.jobs_ats,
          savedAt: Date.now(),
          data: u,
        };
      } else {
        const c = entity.data;
        newItem = {
          id: c.oid,
          type: 'company',
          name: c.name,
          category: c.category || c.subcategory || 'Enterprise',
          location: `${c.city ? c.city + ', ' : ''}${c.state || 'US'}`,
          country: c.country || 'US',
          url: c.careers_url || c.website || '',
          ats: c.careers_url?.toLowerCase().includes('myworkdayjobs') ? 'Workday' : undefined,
          savedAt: Date.now(),
          data: c,
        };
      }

      setWatchlist((prev) => [newItem, ...prev]);
      showToast(`⭐ Saved "${entity.data.name}" to your Watchlist!`, 'success');
    }
  };

  const removeBookmark = (id: string) => {
    const item = watchlist.find((i) => i.id === id);
    setWatchlist((prev) => prev.filter((i) => i.id !== id));
    if (item) {
      showToast(`Removed "${item.name}" from Watchlist`, 'info');
    }
  };

  const clearWatchlist = () => {
    if (watchlist.length === 0) return;
    setWatchlist([]);
    showToast('Cleared your Watchlist', 'info');
  };

  const exportToCSV = () => {
    if (watchlist.length === 0) {
      showToast('No saved items to export', 'info');
      return;
    }

    const headers = ['Name', 'Type', 'Category / Sector', 'Location', 'Country', 'ATS / System', 'Career Portal URL', 'Date Saved'];
    const rows = watchlist.map((item) => [
      `"${item.name.replace(/"/g, '""')}"`,
      item.type === 'university' ? 'Higher Education' : 'Enterprise Employer',
      `"${item.category.replace(/"/g, '""')}"`,
      `"${item.location.replace(/"/g, '""')}"`,
      item.country,
      item.ats || 'Direct Portal',
      `"${item.url}"`,
      new Date(item.savedAt).toLocaleDateString(),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `NEXUS-Target-Watchlist-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Exported ${watchlist.length} saved targets to CSV!`, 'success');
  };

  const copyAllLinks = () => {
    const urls = watchlist
      .filter((i) => Boolean(i.url))
      .map((i) => `${i.name} (${i.location}) - ${i.url}`)
      .join('\n');

    if (!urls) {
      showToast('No URLs available to copy', 'info');
      return;
    }

    navigator.clipboard.writeText(urls);
    showToast(`Copied ${watchlist.length} target career links to clipboard!`, 'success');
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        isBookmarked,
        toggleBookmark,
        removeBookmark,
        clearWatchlist,
        exportToCSV,
        copyAllLinks,
        isWatchlistOpen,
        setIsWatchlistOpen,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};
