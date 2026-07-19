import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Compass, 
  Network, 
  TrendingUp, 
  Terminal, 
  FileText, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface SidebarProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ activeScreen, onNavigate, isCollapsed, onToggleCollapse }: SidebarProps) {
  
  // Real menu items in Left Navigation
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Clients', icon: Building2 },
    { name: 'Opportunities', icon: Compass },
    { name: 'Knowledge Graph', icon: Network },
    { name: 'Market Signals', icon: TrendingUp },
    { name: 'AI Copilot', icon: Terminal },
    { name: 'Reports', icon: FileText },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <aside 
      className={`bg-[#0B0E14] border-r border-[#1F2937]/35 flex flex-col transition-all duration-300 relative z-30 shrink-0 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className={`p-5 flex items-center justify-between border-b border-[#1F2937]/25 ${isCollapsed ? 'justify-center' : ''}`}>
        {!isCollapsed ? (
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#0A84FF] rounded flex items-center justify-center font-bold text-xs text-white">
                S
              </div>
              <span className="font-display font-bold text-[15px] text-gray-100 tracking-wider">SIG</span>
            </div>
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mt-1">Syndicate Intel Graph</span>
          </div>
        ) : (
          <div className="w-9 h-9 bg-[#0A84FF] rounded-lg flex items-center justify-center font-bold text-sm text-white select-none">
            S
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.name;
          
          return (
            <button
              key={item.name}
              onClick={() => onNavigate(item.name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                isActive 
                  ? 'bg-[#121E33] text-white font-semibold border-l-2 border-[#0A84FF]' 
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#111827]/40 border-l-2 border-transparent'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.name : undefined}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#0A84FF]' : 'text-gray-500'}`} />
              {!isCollapsed && <span className="truncate">{item.name}</span>}
              {!isCollapsed && item.name === 'Opportunities' && (
                <span className="ml-auto w-1.5 h-1.5 bg-[#FF9F0A] rounded-full"></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Branding / System Status */}
      <div className="p-4 border-t border-[#1F2937]/25">
        {!isCollapsed ? (
          <div className="bg-[#111827]/30 border border-[#1F2937]/35 rounded-lg p-3">
            <p className="text-[10px] font-display font-medium text-gray-400">SIG Syndicate Intel</p>
            <p className="text-[9px] text-gray-500 mt-0.5">Build v3.8 • Production Ready</p>
            <div className="flex items-center gap-1.5 mt-2.5 text-[10px] text-[#30D158] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#30D158] animate-pulse"></span>
              <span>Secure Terminal</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="w-2 h-2 rounded-full bg-[#30D158] animate-pulse"></span>
          </div>
        )}
      </div>

      {/* Collapse Toggle Button */}
      <button 
        onClick={onToggleCollapse}
        className="absolute bottom-16 -right-3.5 bg-[#1F2937]/90 border border-[#1F2937]/65 hover:bg-[#1F2937] text-gray-300 hover:text-white p-1 rounded-full cursor-pointer z-40 shadow shadow-black"
      >
        {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>
    </aside>
  );
}
