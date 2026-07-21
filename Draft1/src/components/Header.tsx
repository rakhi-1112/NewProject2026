import React, { useState } from 'react';
import { Search, Bell, User, Flame, TrendingUp, TrendingDown, DollarSign, Globe2, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  onOpenCommandPalette: () => void;
  activeScreen: string;
}

export default function Header({ onOpenCommandPalette, activeScreen }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Real investment-banking relevant notifications
  const alerts = [
    {
      id: 1,
      type: 'signal',
      icon: TrendingUp,
      color: 'text-[#30D158]',
      title: 'ECB Easing Cycle Confirmed',
      text: 'Main refinancing rate cut to 3.25% (-25bps) sparks issuance appetite.',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'urgency',
      icon: ShieldAlert,
      color: 'text-[#FF9F0A]',
      title: 'Maturity Alert: BMW Group',
      text: '€1.25B notes outstanding enters 6-month pre-refinancing phase next month.',
      time: '4 hours ago'
    },
    {
      id: 3,
      type: 'deal',
      icon: DollarSign,
      color: 'text-[#0A84FF]',
      title: 'New Mandate Logged',
      text: 'LVMH requested private placement terms for USD expansion.',
      time: '1 day ago'
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090D16]/90 backdrop-blur-md border-b border-[#1F2937]/40 px-6 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Search and Screen Indicator */}
      <div className="flex items-center gap-4 grow">
        <div className="hidden sm:flex items-center gap-1.5 shrink-0 bg-[#1F2937]/35 border border-[#1F2937]/50 px-2.5 py-1 rounded text-xs font-mono text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#30D158] animate-pulse"></span>
          <span>SIG SYSTEM: ONLINE</span>
        </div>
        
        {/* Search Input triggering command palette */}
        <div 
          onClick={onOpenCommandPalette}
          className="relative max-w-md w-full flex items-center bg-[#111827] hover:bg-[#1F2937]/30 border border-[#1F2937]/55 hover:border-gray-700 rounded-lg px-3.5 py-1.5 text-xs text-gray-400 cursor-pointer transition-all grow"
        >
          <Search className="w-4 h-4 text-gray-500 mr-2.5 shrink-0" />
          <span className="grow text-left">Search clients, tickers, deals...</span>
          <span className="text-[10px] text-gray-500 font-mono bg-[#1F2937] px-1.5 py-0.5 rounded border border-gray-700/50 shrink-0">
            ⌘K
          </span>
        </div>
      </div>

      {/* Ticker and Interactive Utility */}
      <div className="flex items-center justify-between md:justify-end gap-6 shrink-0">
        {/* Live Market Ticker */}
        <div className="hidden lg:flex items-center gap-5 text-[11px] font-mono border-r border-[#1F2937]/50 pr-6">
          <div className="flex items-center gap-1">
            <span className="text-gray-500">ECB Refi:</span>
            <span className="text-gray-200 font-semibold">3.25%</span>
            <span className="text-[#FF453A] text-[9px]">-25bp</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-500">DAX:</span>
            <span className="text-[#30D158] font-semibold">18,520</span>
            <span className="text-[#30D158] text-[9px]">+0.42%</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-500">CAC 40:</span>
            <span className="text-[#30D158] font-semibold">7,612</span>
            <span className="text-[#30D158] text-[9px]">+0.15%</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-500">V2X Volatility:</span>
            <span className="text-gray-200 font-semibold">14.8</span>
            <span className="text-gray-400 text-[9px]">(Stable)</span>
          </div>
        </div>

        {/* Notifications and Profile */}
        <div className="flex items-center gap-3.5 relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/55 transition-all relative cursor-pointer"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF453A] rounded-full border border-[#090D16]"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-11 w-80 bg-[#111827] border border-[#1F2937]/75 rounded-lg shadow-xl py-3 z-50 animate-fade-in">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-[#1F2937]/55">
                <span className="text-xs font-semibold text-gray-200">Priority Syndicate Alerts</span>
                <span className="text-[10px] text-[#0A84FF] hover:underline cursor-pointer">Mark all read</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-[#1F2937]/40">
                {alerts.map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="p-3.5 hover:bg-[#1F2937]/20 transition-all cursor-pointer">
                      <div className="flex gap-2.5">
                        <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${item.color}`} />
                        <div>
                          <p className="text-xs font-semibold text-gray-200 leading-tight">{item.title}</p>
                          <p className="text-[11px] text-gray-400 mt-1 leading-normal">{item.text}</p>
                          <p className="text-[9px] text-gray-500 mt-1.5 font-mono">{item.time}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* User Profile */}
          <div className="flex items-center gap-2.5 pl-1.5 border-l border-[#1F2937]/50">
            <div className="w-8 h-8 rounded-full bg-[#1F2937] border border-gray-700/30 flex items-center justify-center text-xs font-semibold text-[#0A84FF] font-mono">
              AM
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-gray-200 leading-tight">Alexandra Meyer</p>
              <p className="text-[10px] text-gray-500 leading-none mt-1">Managing Director, DCM</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
