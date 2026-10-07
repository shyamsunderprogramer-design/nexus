import React from 'react';
import { ActiveTab } from '../types';
import { Sparkles, GraduationCap, Building2, Zap, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  isDark,
  onToggleTheme,
}) => {
  const tabs: Array<{ id: ActiveTab; label: string; icon: React.ReactNode }> = [
    { id: 'overview', label: 'Executive Intel', icon: <Sparkles className="w-4 h-4 text-brand-400" /> },
    { id: 'universities', label: 'Campus Network', icon: <GraduationCap className="w-4 h-4 text-purple-400" /> },
    { id: 'companies', label: 'Enterprise Index', icon: <Building2 className="w-4 h-4 text-cyan-400" /> },
    { id: 'bridge', label: 'Talent Bridge', icon: <Zap className="w-4 h-4 text-emerald-400" /> },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#070b12]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onTabChange('overview')}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-cyan-400 p-0.5 shadow-glow-sm flex items-center justify-center">
              <div className="w-full h-full bg-[#0a0e17] rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  NEXUS
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
                  ENTERPRISE v3.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                National Employment & eXploration Unified System
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-900/60 p-1 rounded-xl border border-white/5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-600/30 text-white border border-brand-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Controls & Theme Switcher */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>79,571 Verified Portals</span>
            </div>

            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors border border-white/5"
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Tabs */}
      <div className="md:hidden flex overflow-x-auto px-4 py-2 border-t border-white/5 bg-slate-900/40 space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-brand-600/30 text-white border border-brand-500/30'
                : 'text-slate-400'
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
