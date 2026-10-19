import React, { useState } from 'react';
import { ActiveTab, ThemeColor } from '../types';
import { Sparkles, GraduationCap, Building2, Zap, Sun, Moon, Palette, Search, Star, Smartphone, FileText, Microscope, RefreshCw, Scale, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWatchlist } from '../context/WatchlistContext';
import { useCompare } from '../context/CompareContext';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  accentColor: ThemeColor;
  onChangeAccentColor: (color: ThemeColor) => void;
  onOpenCommandPalette?: () => void;
  onStartTour?: () => void;
  onOpenAtsMatcher?: () => void;
  onOpenSyncAgent?: () => void;
  onOpenVisaRoadmap?: () => void;
}

const PALETTES: Array<{ id: ThemeColor; name: string; hex: string; ring: string }> = [
  { id: 'violet', name: 'Electric Violet', hex: '#8b5cf6', ring: 'ring-violet-500' },
  { id: 'cyan', name: 'Cyber Cyan', hex: '#06b6d4', ring: 'ring-cyan-500' },
  { id: 'emerald', name: 'Emerald Mint', hex: '#10b981', ring: 'ring-emerald-500' },
  { id: 'amber', name: 'Sunset Amber', hex: '#f59e0b', ring: 'ring-amber-500' },
  { id: 'rose', name: 'Crimson Rose', hex: '#f43f5e', ring: 'ring-rose-500' },
  { id: 'blue', name: 'Ocean Blue', hex: '#3b82f6', ring: 'ring-blue-500' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  isDark,
  onToggleTheme,
  accentColor,
  onChangeAccentColor,
  onOpenCommandPalette,
  onStartTour,
  onOpenAtsMatcher,
  onOpenSyncAgent,
  onOpenVisaRoadmap,
}) => {
  const [showPaletteMenu, setShowPaletteMenu] = useState(false);
  const { watchlist, setIsWatchlistOpen } = useWatchlist();
  const { compareList, setIsCompareOpen } = useCompare();
  const { canInstall, triggerInstall } = usePWAInstall();

  const tabs: Array<{ id: ActiveTab; label: string; icon: React.ReactNode }> = [
    { id: 'overview', label: 'Executive Intel', icon: <Sparkles className="w-4 h-4 text-brand-400" /> },
    { id: 'universities', label: 'Campus Network', icon: <GraduationCap className="w-4 h-4 text-purple-400" /> },
    { id: 'phd', label: 'PhD Admissions', icon: <Microscope className="w-4 h-4 text-amber-400" /> },
    { id: 'companies', label: 'Enterprise Index', icon: <Building2 className="w-4 h-4 text-cyan-400" /> },
    { id: 'bridge', label: 'Talent Bridge', icon: <Zap className="w-4 h-4 text-emerald-400" /> },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200/80 dark:border-white/[0.08] bg-white/85 dark:bg-[#070b12]/85 backdrop-blur-2xl transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Identity */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onTabChange('overview')}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-500 via-cyan-400 to-emerald-400 p-[1.5px] shadow-glow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-white dark:bg-[#090d16] rounded-[10px] flex items-center justify-center shadow-inner">
                <Zap className="w-5 h-5 text-brand-500 group-hover:rotate-6 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  NEXUS
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/30">
                  GLOBAL v3.5
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden 2xl:block">
                National Employment & eXploration Unified System
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs with Sliding Layout Animation */}
          <div className="hidden lg:flex items-center space-x-1 bg-slate-100/90 dark:bg-slate-900/70 p-1 rounded-xl border border-slate-200/80 dark:border-white/[0.08] relative">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`relative flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors z-10 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      className="absolute inset-0 bg-gradient-to-r from-brand-600 to-brand-500 rounded-lg shadow-sm border border-brand-400/30 -z-10"
                    />
                  )}
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Row 1 Controls: Search, Theme & Color Palette Switcher */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Omni-Search Trigger Button (Cmd+K) */}
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl border border-slate-200/90 dark:border-white/10 bg-slate-100/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:border-brand-500/50 hover:text-slate-900 dark:hover:text-slate-200 transition-all text-xs group shadow-sm"
                aria-label="Open global search (Command+K)"
              >
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-500 transition-colors" />
                <span className="hidden sm:inline font-medium">Search...</span>
                <kbd className="hidden sm:inline-block font-mono text-[10px] font-bold bg-white dark:bg-white/10 px-1.5 py-0.5 rounded shadow-inner border border-slate-200/80 dark:border-white/10 text-slate-500 dark:text-slate-400 group-hover:text-brand-500">
                  ⌘K
                </kbd>
              </button>
            )}

            {/* Accent Palette Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowPaletteMenu(!showPaletteMenu)}
                className="p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center space-x-1.5"
                title="Change accent color theme"
                aria-label="Change color palette"
              >
                <Palette className="w-4 h-4 text-brand-500" />
                <span
                  className="w-2.5 h-2.5 rounded-full ring-2 ring-white/20"
                  style={{ backgroundColor: PALETTES.find(p => p.id === accentColor)?.hex || '#8b5cf6' }}
                />
              </button>

              {showPaletteMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xl p-2 z-50 space-y-1">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-2 py-1">
                    Theme Palette
                  </div>
                  {PALETTES.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onChangeAccentColor(p.id);
                        setShowPaletteMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        accentColor === p.id
                          ? 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white font-bold'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: p.hex }} />
                        <span>{p.name}</span>
                      </div>
                      {accentColor === p.id && <span className="text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              title={isDark ? "Switch to Daylight Mode" : "Switch to Dark Mode"}
              aria-label="Toggle dark/light theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: Secondary Cockpit Utility & Quick Actions Strip */}
      <div className="border-t border-slate-200/70 dark:border-white/[0.06] bg-slate-50/80 dark:bg-slate-950/40 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto no-scrollbar gap-2 sm:gap-4">
          {/* Left Telemetry: Live Portals & Sync Agent */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-semibold whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>3.51M+ Portals</span>
            </div>

            {onOpenSyncAgent && (
              <button
                onClick={onOpenSyncAgent}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-xl border border-emerald-500/40 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-800 dark:text-emerald-300 transition-all text-xs font-bold group shadow-sm hover:shadow-emerald-500/15 cursor-pointer whitespace-nowrap"
                title="⚡ Open Autonomous Live Data Sync Agent"
                aria-label="Sync Live Data"
              >
                <RefreshCw className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover:rotate-180 transition-transform duration-500" />
                <span>Sync Live Intel</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
              </button>
            )}
          </div>

          {/* Right Action Tools: Watchlist, Auto-Tour, ATS Scanner, Install App, Star */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Head-to-Head Compare */}
            <button
              onClick={() => setIsCompareOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-xl border border-brand-500/30 bg-brand-500/10 hover:bg-brand-500/20 text-brand-700 dark:text-brand-300 transition-all text-xs font-semibold group shadow-sm cursor-pointer whitespace-nowrap"
              title="Open Head-to-Head Comparison Matrix"
              aria-label="Open Comparison Matrix"
            >
              <Scale className="w-3.5 h-3.5 text-brand-500 group-hover:rotate-6 transition-transform" />
              <span>Compare</span>
              {compareList.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-brand-500 text-white dark:text-slate-950">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Target Watchlist */}
            <button
              onClick={() => setIsWatchlistOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 transition-all text-xs font-semibold group shadow-sm cursor-pointer whitespace-nowrap"
              title="View Target Watchlist & Bookmarks"
              aria-label="Open Target Watchlist"
            >
              <Star className={`w-3.5 h-3.5 text-amber-500 ${watchlist.length > 0 ? 'fill-amber-400' : ''}`} />
              <span>Watchlist</span>
              {watchlist.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold bg-amber-500 text-white dark:text-slate-950">
                  {watchlist.length}
                </span>
              )}
            </button>

            {/* Visa & Career Roadmap */}
            {onOpenVisaRoadmap && (
              <button
                onClick={onOpenVisaRoadmap}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-xl border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 dark:text-blue-300 transition-all text-xs font-semibold group shadow-sm cursor-pointer whitespace-nowrap"
                title="Open International Student Visa, OPT & H-1B Cap-Exempt Roadmap"
                aria-label="Open Visa Roadmap"
              >
                <Compass className="w-3.5 h-3.5 text-blue-500 group-hover:rotate-45 transition-transform duration-300" />
                <span>Visa Roadmap</span>
              </button>
            )}

            {/* Auto-Tour */}
            {onStartTour && (
              <button
                onClick={onStartTour}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-xl border border-brand-500/30 bg-brand-500/10 hover:bg-brand-500/20 text-brand-700 dark:text-brand-300 transition-all text-xs font-semibold group shadow-sm cursor-pointer whitespace-nowrap"
                title="Start Guided Interactive Auto-Tour"
                aria-label="Start Auto-Tour"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-500 group-hover:rotate-12 transition-transform" />
                <span>Auto-Tour</span>
              </button>
            )}

            {/* ATS Resume Scanner */}
            {onOpenAtsMatcher && (
              <button
                onClick={onOpenAtsMatcher}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 transition-all text-xs font-semibold group shadow-sm cursor-pointer whitespace-nowrap"
                title="Open ATS Resume Keyword Scanner"
                aria-label="Open ATS Scanner"
              >
                <FileText className="w-3.5 h-3.5 text-purple-500" />
                <span>ATS Scanner</span>
              </button>
            )}

            {/* Install App */}
            {canInstall && (
              <button
                onClick={triggerInstall}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 transition-all text-xs font-semibold group shadow-sm cursor-pointer animate-pulse whitespace-nowrap"
                title="Install NEXUS as Native App on Desktop or Mobile"
                aria-label="Install App"
              >
                <Smartphone className="w-3.5 h-3.5 text-cyan-500" />
                <span>Install App</span>
              </button>
            )}

            {/* GitHub Star Repository CTA */}
            <a
              href="https://github.com/shyamsunderprogramer-design/nexus"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-slate-900 dark:text-slate-100 hover:border-amber-500/70 transition-all text-xs font-bold group shadow-sm hover:shadow-amber-500/15 cursor-pointer whitespace-nowrap"
              title="⭐ Star NEXUS on GitHub"
              aria-label="Star NEXUS on GitHub"
            >
              <svg className="w-3.5 h-3.5 text-slate-800 dark:text-slate-200 group-hover:text-amber-500 transition-colors flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>Star</span>
              <span className="flex items-center text-amber-500 group-hover:scale-110 transition-transform">
                <Star className="w-3 h-3 fill-amber-500" />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Tabs */}
      <div className="lg:hidden flex overflow-x-auto px-4 py-2 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/40 space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-brand-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
