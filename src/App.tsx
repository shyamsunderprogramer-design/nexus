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
import { CommandPalette } from './components/CommandPalette';
import { InteractiveTour } from './components/InteractiveTour';
import { ToastProvider } from './components/Toast';
import { WatchlistProvider } from './context/WatchlistContext';
import { WatchlistModal } from './components/WatchlistModal';
import { AtsMatcherModal } from './components/AtsMatcherModal';
import { PhdAdmissionsHub } from './components/PhdAdmissionsHub';
import { SyncAgentModal } from './components/SyncAgentModal';
import { CompareProvider } from './context/CompareContext';
import { CompareFloatingTray } from './components/compare/CompareFloatingTray';
import { ComparisonModal } from './components/compare/ComparisonModal';
import { VisaRoadmapModal } from './components/visa/VisaRoadmapModal';
import { FeedbackModal } from './components/FeedbackModal';
import { MessageSquare } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<InspectorEntity | null>(null);
  const [isDark, setIsDark] = useState<boolean>(true);
  const [accentColor, setAccentColor] = useState<ThemeColor>('violet');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTourActive, setIsTourActive] = useState(false);
  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isVisaModalOpen, setIsVisaModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [h1bFilterActive, setH1bFilterActive] = useState(false);

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

    // Global Cmd+K / Ctrl+K keyboard shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
    <ToastProvider>
      <WatchlistProvider>
        <CompareProvider>
          <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#070b12] dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
            <Navbar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              isDark={isDark}
              onToggleTheme={toggleTheme}
              accentColor={accentColor}
              onChangeAccentColor={changeAccentColor}
              onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
              onStartTour={() => setIsTourActive(true)}
              onOpenAtsMatcher={() => setIsAtsModalOpen(true)}
              onOpenSyncAgent={() => setIsSyncModalOpen(true)}
              onOpenVisaRoadmap={() => setIsVisaModalOpen(true)}
              onOpenFeedback={() => setIsFeedbackModalOpen(true)}
            />

            <Hero
              stats={stats}
              onSelectTab={setActiveTab}
              onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
              onStartTour={() => setIsTourActive(true)}
              onOpenSyncAgent={() => setIsSyncModalOpen(true)}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex-1 w-full">
              {activeTab === 'overview' && <ExecutiveDashboard stats={stats} />}

              {activeTab === 'universities' && (
                <CampusDirectory
                  onSelectUniversity={(u) => setSelectedEntity({ type: 'university', data: u })}
                  initialH1bFilter={h1bFilterActive}
                />
              )}

              {activeTab === 'phd' && (
                <PhdAdmissionsHub
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

            <CommandPalette
              isOpen={isCommandPaletteOpen}
              onClose={() => setIsCommandPaletteOpen(false)}
              onSelectEntity={setSelectedEntity}
            />

            <WatchlistModal
              onSelectEntity={setSelectedEntity}
              onExploreCampuses={() => setActiveTab('universities')}
              onExploreEmployers={() => setActiveTab('companies')}
            />

            <AtsMatcherModal
              isOpen={isAtsModalOpen}
              onClose={() => setIsAtsModalOpen(false)}
            />

            <SyncAgentModal
              isOpen={isSyncModalOpen}
              onClose={() => setIsSyncModalOpen(false)}
              onSyncComplete={(count) => {
                api.getStats().then((data) => setStats(data));
              }}
            />

            <VisaRoadmapModal
              isOpen={isVisaModalOpen}
              onClose={() => setIsVisaModalOpen(false)}
              onExploreCapExempt={() => {
                setH1bFilterActive(true);
                setActiveTab('universities');
              }}
            />

            <ComparisonModal />
            <CompareFloatingTray />

            <FeedbackModal
              isOpen={isFeedbackModalOpen}
              onClose={() => setIsFeedbackModalOpen(false)}
            />

            {/* Discreet Floating Feedback Launcher */}
            <button
              onClick={() => setIsFeedbackModalOpen(true)}
              className="fixed bottom-6 right-6 z-30 flex items-center space-x-1.5 px-3 py-2 rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 dark:border-white/10 text-white text-xs font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer backdrop-blur-xl group"
              title="Share feedback, suggest new features, or report data corrections"
              aria-label="Submit Feedback"
            >
              <MessageSquare className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Feedback</span>
            </button>

            <InteractiveTour
              isOpen={isTourActive}
              onClose={() => setIsTourActive(false)}
              onTabChange={setActiveTab}
              onSelectEntity={setSelectedEntity}
              onToggleCommandPalette={setIsCommandPaletteOpen}
            />

            {/* Footer */}
            <footer className="border-t border-slate-200 dark:border-white/5 py-8 text-center text-xs text-slate-600 dark:text-slate-500 bg-slate-100/80 dark:bg-[#06090e] transition-colors">
              <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-300">NEXUS</span> — National Employment & eXploration Unified System
                </div>
                <div className="flex items-center space-x-2">
                  <span>Developed by <span className="text-slate-900 dark:text-slate-200 font-semibold">Shyam Sunder</span> · Open Source (MIT)</span>
                  <span className="text-slate-400">·</span>
                  <button
                    onClick={() => setIsFeedbackModalOpen(true)}
                    className="hover:text-rose-500 underline transition-colors cursor-pointer"
                  >
                    Feedback &amp; Ideas
                  </button>
                  <span className="text-slate-400">·</span>
                  <button
                    onClick={() => setIsCommandPaletteOpen(true)}
                    className="hover:text-brand-500 underline transition-colors cursor-pointer"
                  >
                    Press ⌘K for Quick Search
                  </button>
                </div>
              </div>
            </footer>
          </div>
        </CompareProvider>
      </WatchlistProvider>
    </ToastProvider>
  );
};

export default App;
