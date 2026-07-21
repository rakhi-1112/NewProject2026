import React, { useState } from 'react';
import { NextBestActionItem, Banker } from '../types';
import { NEXT_BEST_ACTIONS } from '../data';
import { Star, ShieldAlert, Sparkles, User, Briefcase, DollarSign, Percent, Play, CheckCircle, Mail, Phone, Clock, RotateCcw } from 'lucide-react';

export default function NextBestAction() {
  const [actions, setActions] = useState<NextBestActionItem[]>(NEXT_BEST_ACTIONS);
  const [activeTab, setActiveTab] = useState<'All' | 'High Priority' | 'Completed'>('All');

  const toggleComplete = (id: string) => {
    setActions(prev => prev.map(act => {
      if (act.id === id) {
        return { ...act, completed: !act.completed };
      }
      return act;
    }));
  };

  const handleResetActions = () => {
    setActions(NEXT_BEST_ACTIONS.map(a => ({ ...a, completed: false })));
  };

  // Filter actions based on tab selection
  const filteredActions = actions.filter(act => {
    if (activeTab === 'High Priority') return act.priority >= 5 && !act.completed;
    if (activeTab === 'Completed') return act.completed;
    return true; // All includes both active and completed
  });

  const renderStars = (priority: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            className={`w-3.5 h-3.5 ${
              i < priority ? 'fill-[#FF9F0A] text-[#FF9F0A]' : 'text-gray-700'
            }`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in text-xs">
      {/* View Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-display font-bold text-gray-100 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#0A84FF]" />
            Syndicate Next Best Action Engine
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Predictive engagement workflows designed to preempt competitor banking bids on multi-billion debt maturities.
          </p>
        </div>
        
        {/* Reset tool */}
        <button 
          onClick={handleResetActions}
          className="px-3 py-1.5 bg-[#111827] border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 font-mono"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Workflows</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#1F2937]/35 flex items-center gap-2 pb-px">
        {['All', 'High Priority', 'Completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 text-xs font-semibold tracking-wide transition-all border-b-2 cursor-pointer ${
              activeTab === tab 
                ? 'border-[#0A84FF] text-white' 
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Recommendations Cards List */}
      <div className="space-y-4">
        {filteredActions.map((act) => (
          <div 
            key={act.id} 
            className={`bg-[#111827] border rounded-xl p-5 transition-all ${
              act.completed 
                ? 'border-[#30D158]/30 bg-[#30D158]/5 opacity-70' 
                : 'border-[#1F2937]/35 hover:border-[#1F2937] hover:bg-[#121E33]/10'
            }`}
          >
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              {/* Core advisory */}
              <div className="space-y-3.5 grow">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[10px] font-mono uppercase bg-gray-800 px-2 py-0.5 rounded text-gray-400">
                    {act.companyName} Opportunity
                  </span>
                  {renderStars(act.priority)}
                  {act.completed && (
                    <span className="text-[9px] font-mono px-2 py-0.5 bg-[#30D158]/10 text-[#30D158] border border-[#30D158]/20 rounded font-semibold">
                      WORKFLOW COMPLETED
                    </span>
                  )}
                </div>

                <div>
                  <h3 className={`text-sm font-display font-bold leading-snug ${act.completed ? 'text-gray-400 line-through' : 'text-gray-100'}`}>
                    {act.recommendedAction}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-2.5 leading-relaxed max-w-4xl">{act.description}</p>
                </div>

                <div className="bg-[#090D16]/55 border border-[#1F2937]/45 rounded-lg p-3.5 text-left">
                  <p className="text-[9px] text-gray-500 uppercase font-semibold">Underwriting Business Impact Analysis</p>
                  <p className="text-[11px] text-gray-400 mt-1.5 leading-normal">{act.businessImpact}</p>
                </div>
              </div>

              {/* Stats column & complete action trigger */}
              <div className="lg:w-72 shrink-0 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#1F2937]/25 pt-4 lg:pt-0 lg:pl-5 gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#090D16]/40 p-2 rounded border border-[#1F2937]/15">
                    <p className="text-[9px] text-gray-500 uppercase flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-[#30D158]" />
                      Expected Revenue
                    </p>
                    <p className="text-xs font-bold font-mono text-gray-200 mt-0.5">{act.expectedRevenue}</p>
                  </div>
                  <div className="bg-[#090D16]/40 p-2 rounded border border-[#1F2937]/15">
                    <p className="text-[9px] text-gray-500 uppercase flex items-center gap-1">
                      <Percent className="w-3 h-3 text-[#0A84FF]" />
                      AI Conviction
                    </p>
                    <p className="text-xs font-bold font-mono text-gray-200 mt-0.5">{act.confidence}%</p>
                  </div>
                </div>

                {/* Assigned Bankers cards stack */}
                <div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-wide mb-1.5">Assigned Syndicate Leads</p>
                  <div className="space-y-1.5">
                    {act.assignees.map((banker) => (
                      <div key={banker.id} className="flex items-center justify-between bg-[#090D16]/40 px-2 py-1.5 rounded border border-[#1F2937]/15 text-[10px]">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3 h-3 text-gray-500" />
                          <span className="text-gray-300 font-medium">{banker.name}</span>
                        </div>
                        <span className="text-[9px] text-gray-500 font-mono">({banker.role})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Workflow completion toggle button */}
                <button
                  onClick={() => toggleComplete(act.id)}
                  className={`w-full py-2 rounded-lg font-semibold cursor-pointer transition-all flex items-center justify-center gap-2 ${
                    act.completed
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                      : 'bg-[#0A84FF] hover:bg-[#0070E0] text-white shadow shadow-black'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{act.completed ? 'Reactivate Engagement' : 'Mark Task Completed'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredActions.length === 0 && (
          <div className="p-16 text-center text-gray-500 border border-dashed border-[#1F2937]/50 rounded-xl">
            <CheckCircle className="w-10 h-10 text-gray-600 mb-3 mx-auto" />
            <p className="font-semibold text-gray-400 text-xs">All Actions Completed</p>
            <p className="text-[11px] text-gray-500 mt-1 max-w-xs mx-auto leading-normal">
              No actions currently matching the filter. Reset actions or check the 'Completed' tab to review history.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
