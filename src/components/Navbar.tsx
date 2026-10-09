import React, { useState } from 'react';
import { ActiveTab, ThemeColor } from '../types';
import { Sparkles, GraduationCap, Building2, Zap, Sun, Moon, Palette, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  accentColor: ThemeColor;
  onChangeAccentColor: (color: ThemeColor) => void;
  onOpenCommandPalette?: () => void;
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
}) => {
  const [showPaletteMenu, setShowPaletteMenu] = useState(false);

  const tabs: Array<{ id: ActiveTab; label: string; icon: React.ReactNode }> = [
    { id: 'overview', label: 'Executive Intel', icon: <Sparkles className="w-4 h-4 text-brand-400" /> },
    { id: 'universities', label: 'Campus Network', icon: <GraduationCap className="w-4 h-4 text-purple-400" /> },
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
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                National Employment & eXploration Unified System
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs with Sliding Layout Animation */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-100/90 dark:bg-slate-900/70 p-1 rounded-xl border border-slate-200/80 dark:border-white/[0.08] relative">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`relative flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors z-10 ${
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

          {/* Controls: Quick Search, Theme & Color Palette Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
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

            <div className="hidden xl:flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>79,600+ Portals</span>
            </div>

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

      {/* Mobile Navigation Tabs */}
      <div className="md:hidden flex overflow-x-auto px-4 py-2 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/40 space-x-2">
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
