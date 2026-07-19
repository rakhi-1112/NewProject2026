import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Building2, LayoutDashboard, Network, Terminal, FileText, AlertCircle, TrendingUp } from 'lucide-react';
import { Company } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  companies: Company[];
  onSelectCompany: (companyId: string) => void;
  onNavigate: (screen: string) => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  companies,
  onSelectCompany,
  onNavigate,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const items = [
    // Navigation items
    { id: 'nav-dash', name: 'Go to Executive Dashboard', category: 'Navigation', icon: LayoutDashboard, action: () => onNavigate('Dashboard') },
    { id: 'nav-graph', name: 'Go to Knowledge Graph', category: 'Navigation', icon: Network, action: () => onNavigate('Knowledge Graph') },
    { id: 'nav-copilot', name: 'Go to AI Copilot Chat', category: 'Navigation', icon: Terminal, action: () => onNavigate('AI Copilot') },
    { id: 'nav-signals', name: 'Go to Market Signals', category: 'Navigation', icon: TrendingUp, action: () => onNavigate('Market Signals') },
    { id: 'nav-reports', name: 'Go to Reports Generator', category: 'Navigation', icon: FileText, action: () => onNavigate('Reports') },
    // Company items
    ...companies.map(c => ({
      id: `company-${c.id}`,
      name: `${c.name} (${c.ticker}) - ${c.industry}`,
      category: 'Clients',
      icon: Building2,
      action: () => onSelectCompany(c.id)
    }))
  ].filter(item => item.name.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % items.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + items.length) % items.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (items[selectedIndex]) {
          items[selectedIndex].action();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, items, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Palette Box */}
      <div 
        ref={containerRef}
        className="relative w-full max-w-2xl bg-[#111827] border border-[#1F2937]/70 rounded-xl shadow-2xl shadow-black/80 overflow-hidden animate-fade-in"
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#1F2937]/55">
          <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent text-gray-100 placeholder-gray-500 text-sm focus:outline-none"
            placeholder="Type a company name (BMW, SAP...), a navigation page, or command..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <span className="text-[10px] text-gray-500 font-mono bg-[#1F2937] px-1.5 py-0.5 rounded border border-gray-700/50 mr-2 shrink-0">
            ESC
          </span>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-300 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[350px] overflow-y-auto py-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <AlertCircle className="w-8 h-8 text-gray-600 mb-2" />
              <p className="text-gray-400 text-sm font-medium">No results found for "{query}"</p>
              <p className="text-gray-500 text-xs mt-1">Try searching for 'BMW', 'Dashboard', or 'Signals'</p>
            </div>
          ) : (
            <div>
              {/* Group items by category */}
              {['Navigation', 'Clients'].map(cat => {
                const catItems = items.filter(item => item.category === cat);
                if (catItems.length === 0) return null;

                return (
                  <div key={cat}>
                    <div className="px-4 py-1 text-[10px] uppercase tracking-wider text-gray-500 font-semibold font-display bg-[#0D131F]/40">
                      {cat}
                    </div>
                    {catItems.map((item) => {
                      // Find actual index in filtered flat array
                      const flatIndex = items.findIndex(i => i.id === item.id);
                      const isSelected = flatIndex === selectedIndex;
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.id}
                          className={`flex items-center px-4 py-2.5 cursor-pointer transition-all ${
                            isSelected 
                              ? 'bg-[#1F2E4D] text-white border-l-2 border-[#0A84FF]' 
                              : 'text-gray-300 hover:bg-[#111827]/60 hover:text-white border-l-2 border-transparent'
                          }`}
                          onClick={() => {
                            item.action();
                            onClose();
                          }}
                        >
                          <Icon className={`w-4 h-4 mr-3 shrink-0 ${isSelected ? 'text-[#0A84FF]' : 'text-gray-500'}`} />
                          <span className="text-xs font-medium grow">{item.name}</span>
                          {isSelected && (
                            <span className="text-[10px] text-[#0A84FF] font-mono bg-[#0A84FF]/10 px-1.5 py-0.5 rounded uppercase tracking-wider font-semibold">
                              EXECUTE
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-[#1F2937]/55 bg-[#0D131F]/30 text-[10px] text-gray-500 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>SIG Syndicate Terminal</span>
        </div>
      </div>
    </div>
  );
}
