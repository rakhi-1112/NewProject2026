/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { COMPANIES } from './data';
import { Company } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CommandPalette from './components/CommandPalette';
import Dashboard from './components/Dashboard';
import Client360 from './components/Client360';
import KnowledgeGraph from './components/KnowledgeGraph';
import AICopilot from './components/AICopilot';
import MarketSignals from './components/MarketSignals';
import SimilarDeals from './components/SimilarDeals';
import NextBestAction from './components/NextBestAction';
import Reports from './components/Reports';
import SettingsPanel from './components/Settings';
import { Building2, Search, Compass, ChevronRight, Award } from 'lucide-react';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<string>('Dashboard');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [opportunitySubTab, setOpportunitySubTab] = useState<'Actions' | 'Deals'>('Actions');

  // Listen for Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setActiveScreen('Clients');
  };

  const handleNavigate = (screen: string) => {
    setActiveScreen(screen);
    // If going away from Clients, reset company preselection
    if (screen !== 'Clients') {
      setSelectedCompanyId(null);
    }
  };

  // Find preselected company details
  const selectedCompany = COMPANIES.find(c => c.id === selectedCompanyId);

  return (
    <div className="flex h-screen bg-[#090D16] text-gray-200 overflow-hidden font-sans">
      
      {/* 1. Left Sidebar Navigation */}
      <Sidebar 
        activeScreen={activeScreen} 
        onNavigate={handleNavigate}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main workspace container */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* 2. Top Navigation & Status Ticker */}
        <Header 
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          activeScreen={activeScreen}
        />

        {/* 3. Screen View Renderer */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#090D16]/40">
          
          {activeScreen === 'Dashboard' && (
            <Dashboard 
              companies={COMPANIES}
              onSelectCompany={handleSelectCompany}
              onNavigate={handleNavigate}
            />
          )}

          {activeScreen === 'Clients' && (
            selectedCompany ? (
              <Client360 
                company={selectedCompany}
                onBack={() => setSelectedCompanyId(null)}
                onNavigate={handleNavigate}
              />
            ) : (
              /* Fallback clients roster grid if no preselection */
              <div className="space-y-6 animate-fade-in text-xs">
                <div>
                  <h1 className="text-xl font-display font-bold text-gray-100 tracking-tight flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#0A84FF]" />
                    Strategic Coverage Accounts
                  </h1>
                  <p className="text-xs text-gray-400 mt-1">
                    Select a client corporate dossier below to view capital readiness models and pricing pipelines.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {COMPANIES.map((c) => (
                    <div 
                      key={c.id}
                      onClick={() => handleSelectCompany(c.id)}
                      className="bg-[#111827] border border-[#1F2937]/35 hover:border-[#1F2937] rounded-xl p-4.5 cursor-pointer hover:bg-[#121E33]/15 transition-all flex flex-col justify-between h-44"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-gray-500 uppercase">{c.ticker}</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-semibold ${
                            c.relationshipStatus === 'Strong' ? 'text-[#30D158] bg-[#30D158]/10' : 'text-[#FF9F0A] bg-[#FF9F0A]/10'
                          }`}>
                            {c.relationshipStatus} Connection
                          </span>
                        </div>
                        <h3 className="text-xs font-display font-bold text-white mt-2 leading-snug">{c.name}</h3>
                        <p className="text-gray-500 mt-1">{c.industry} • {c.country}</p>
                      </div>

                      <div className="pt-3.5 border-t border-[#1F2937]/25 flex items-center justify-between text-[11px]">
                        <div>
                          <p className="text-[9px] text-gray-500 uppercase">Readiness Score</p>
                          <p className="font-bold text-gray-100 font-mono mt-0.5">{c.dealReadinessScore}%</p>
                        </div>
                        <span className="text-[#0A84FF] hover:underline flex items-center gap-0.5">
                          <span>Dossier</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}

          {activeScreen === 'Opportunities' && (
            <div className="space-y-6">
              {/* Twin tab switcher inside Opportunities */}
              <div className="flex items-center justify-between border-b border-[#1F2937]/25 pb-2">
                <div className="flex items-center gap-3">
                  <Compass className="w-5 h-5 text-[#0A84FF] shrink-0" />
                  <h2 className="text-sm font-display font-bold text-white">Underwriting Opportunities Workspace</h2>
                </div>

                <div className="flex bg-[#111827] border border-[#1F2937]/65 rounded-lg p-1 text-[11px] font-medium">
                  <button
                    onClick={() => setOpportunitySubTab('Actions')}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      opportunitySubTab === 'Actions' 
                        ? 'bg-[#0A84FF] text-white font-semibold' 
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    AI Next Best Actions
                  </button>
                  <button
                    onClick={() => setOpportunitySubTab('Deals')}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      opportunitySubTab === 'Deals' 
                        ? 'bg-[#0A84FF] text-white font-semibold' 
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    Precedent Similar Deals
                  </button>
                </div>
              </div>

              {opportunitySubTab === 'Actions' ? <NextBestAction /> : <SimilarDeals />}
            </div>
          )}

          {activeScreen === 'Knowledge Graph' && (
            <KnowledgeGraph onSelectCompany={handleSelectCompany} />
          )}

          {activeScreen === 'Market Signals' && <MarketSignals />}

          {activeScreen === 'AI Copilot' && <AICopilot />}

          {activeScreen === 'Reports' && <Reports />}

          {activeScreen === 'Settings' && <SettingsPanel />}

        </main>
      </div>

      {/* 4. Global Command Palette overlay */}
      <CommandPalette 
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        companies={COMPANIES}
        onSelectCompany={handleSelectCompany}
        onNavigate={handleNavigate}
      />

    </div>
  );
}

