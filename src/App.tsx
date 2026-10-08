import React, { useState, useEffect } from 'react';
import { ActiveTab, InspectorEntity, StatsResponse, ThemeColor } from './types';
import { api } from './services/api';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { CampusDirectory } from './components/CampusDirectory';
import { EnterpriseDirectory } from './components/EnterpriseDirectory';
import { TalentBridge } from './components/TalentBridge';
import { DetailDrawer } from './components/DetailDrawer';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<InspectorEntity | null>(null);
  const [isDark, setIsDark] = useState<boolean>(true);
  const [accentColor, setAccentColor] = useState<ThemeColor>('violet');

  const applyThemeColor = (color: ThemeColor) => {
    const root = document.documentElement;
    root.classList.remove('theme-violet', 'theme-cyan', 'theme-emerald', 'theme-amber', 'theme-rose', 'theme-blue');
    root.classList.add(`theme-${color}`);
  };

  useEffect(() => {
    // Theme dark/light initialization
    const storedTheme = localStorage.getItem('nexus_theme');
    const darkMode = storedTheme !== 'light';
    setIsDark(darkMode);
    document.documentElement.classList.toggle('dark', darkMode);

    // Accent color initialization
    const storedColor = (localStorage.getItem('nexus_accent') as ThemeColor) || 'violet';
    setAccentColor(storedColor);
    applyThemeColor(storedColor);

    // Load initial stats
    api.getStats().then((data) => setStats(data));
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem('nexus_theme', nextDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', nextDark);
  };

  const changeAccentColor = (color: ThemeColor) => {
    setAccentColor(color);
    localStorage.setItem('nexus_accent', color);
    applyThemeColor(color);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#070b12] dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        accentColor={accentColor}
        onChangeAccentColor={changeAccentColor}
      />

      <Hero stats={stats} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex-1 w-full">
        {activeTab === 'overview' && <ExecutiveDashboard stats={stats} />}

        {activeTab === 'universities' && (
          <CampusDirectory
            onSelectUniversity={(u) => setSelectedEntity({ type: 'university', data: u })}
          />
        )}

        {activeTab === 'companies' && (
          <EnterpriseDirectory
            onSelectCompany={(c) => setSelectedEntity({ type: 'company', data: c })}
          />
        )}

        {activeTab === 'bridge' && <TalentBridge />}
      </main>

      <DetailDrawer
        entity={selectedEntity}
        onClose={() => setSelectedEntity(null)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-white/5 py-8 text-center text-xs text-slate-600 dark:text-slate-500 bg-slate-100/80 dark:bg-[#06090e] transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-800 dark:text-slate-300">NEXUS</span> — National Employment & eXploration Unified System
          </div>
          <div>
            Developed by <span className="text-slate-900 dark:text-slate-200 font-semibold">Shyam Sunder Daggupati</span> · Open Source (MIT)
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
