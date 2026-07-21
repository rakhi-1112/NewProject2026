import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  TrendingUp, 
  ArrowUpRight, 
  Award, 
  Percent, 
  BookOpen, 
  ExternalLink,
  Bot,
  User,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { getCopilotResponse, CopilotQAResponse } from '../data';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  analysis?: CopilotQAResponse;
}

export default function AICopilot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: 'Good afternoon, Alexandra. I am the Syndicate Intelligence Graph Copilot. I continuously parse European credit markets, secondary yield spreads, and sovereign debt disclosures to pinpoint refinancing and capital-raising windows.\n\nHow can I support your coverage advisory workflow today?',
      timestamp: '13:32'
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // 1. Add User Message
    const userMsg: Message = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // 2. Simulate AI delay & typing response
    setTimeout(() => {
      const responseData = getCopilotResponse(text);
      
      const assistantMsg: Message = {
        id: `msg-asst-${Date.now()}`,
        sender: 'assistant',
        text: responseData.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        analysis: responseData
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1200); // 1.2s realistic lag
  };

  const starterPrompts = [
    'Why is BMW ranked #1?',
    'Show similar deals.',
    'Generate pitch summary.',
    'Recommend financing structure.',
    'Who should engage first?'
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-fade-in text-xs">
      {/* View Title */}
      <div className="pb-4 border-b border-[#1F2937]/35 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-display font-bold text-gray-100 tracking-tight flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#0A84FF]" />
            SIG Syndicate AI Copilot
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Real-time corporate capital intelligence conversation desk. Powered by SIG-DCM Neural Models.
          </p>
        </div>
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest bg-gray-800/45 px-2.5 py-1 rounded border border-gray-700/45">
          MODEL: SIG-FLASH-EUROPE-V2
        </span>
      </div>

      {/* Messages Workspace */}
      <div className="flex-1 overflow-y-auto py-5 space-y-6 pr-1">
        {messages.map((msg) => {
          const isAsst = msg.sender === 'assistant';
          return (
            <div 
              key={msg.id} 
              className={`flex gap-4 p-4 rounded-xl border ${
                isAsst 
                  ? 'bg-[#111827]/40 border-[#1F2937]/35' 
                  : 'bg-[#121E33]/25 border-[#0A84FF]/20 self-end'
              }`}
            >
              {/* Avatar Icon */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                isAsst 
                  ? 'bg-[#0A84FF]/10 border-[#0A84FF]/30 text-[#0A84FF]' 
                  : 'bg-[#1F2937] border-gray-700 text-gray-300'
              }`}>
                {isAsst ? <Bot className="w-4.5 h-4.5" /> : <User className="w-4.5 h-4.5" />}
              </div>

              {/* Message Details */}
              <div className="grow space-y-3 max-w-full overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-200">{isAsst ? 'SIG Intelligence Engine' : 'Alexandra Meyer'}</span>
                  <span className="text-[10px] text-gray-500 font-mono">{msg.timestamp}</span>
                </div>

                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </div>

                {/* Structured AI Analysis Outputs (If attached to message) */}
                {msg.analysis && (
                  <div className="space-y-4 pt-4 border-t border-[#1F2937]/35 animate-fade-in">
                    
                    {/* 1. Reasoning Panel */}
                    <div className="bg-[#090D16]/55 border border-[#1F2937]/50 rounded-lg p-3.5">
                      <p className="text-[11px] font-semibold text-white uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                        <Terminal className="w-4 h-4 text-[#0A84FF] shrink-0" />
                        Model Reasoning
                      </p>
                      <p className="text-gray-400 leading-relaxed">{msg.analysis.reasoning}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* 2. Evidence list */}
                      <div className="bg-gray-900/10 border border-gray-800 rounded-lg p-3.5">
                        <p className="text-[11px] font-semibold text-white uppercase tracking-wider flex items-center gap-1.5 mb-3">
                          <CheckCircle2 className="w-4 h-4 text-[#30D158] shrink-0" />
                          Supporting Evidence Metrics
                        </p>
                        <ul className="space-y-2 text-gray-400">
                          {msg.analysis.evidence.map((ev, i) => (
                            <li key={i} className="flex gap-2 items-start leading-normal">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#30D158] mt-1.5 shrink-0"></span>
                              <span>{ev}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 3. Citations & Confidence */}
                      <div className="bg-gray-900/10 border border-gray-800 rounded-lg p-3.5 flex flex-col justify-between gap-4">
                        <div>
                          <p className="text-[11px] font-semibold text-white uppercase tracking-wider flex items-center gap-1.5 mb-3">
                            <BookOpen className="w-4 h-4 text-[#30D5C8] shrink-0" />
                            Source Citations
                          </p>
                          <ul className="space-y-1.5 text-gray-400 font-mono text-[10px]">
                            {msg.analysis.sources.map((src, i) => (
                              <li key={i} className="flex gap-1.5 items-center">
                                <span className="text-[#0A84FF]">[{i+1}]</span>
                                <span>{src}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Confidence bar */}
                        <div className="pt-2 border-t border-gray-800/40">
                          <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono mb-1.5">
                            <span>ALGORITHMIC CONFIDENCE SCORE:</span>
                            <span className="text-[#30D158] font-bold">{msg.analysis.confidence}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#0A84FF] to-[#30D158] rounded-full"
                              style={{ width: `${msg.analysis.confidence}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 4. Action Directives */}
                    <div className="bg-gray-900/20 border border-[#1F2937]/50 rounded-lg p-3.5">
                      <p className="text-[11px] font-semibold text-white uppercase tracking-wider flex items-center gap-1.5 mb-3">
                        <Sparkles className="w-4 h-4 text-[#FF9F0A] shrink-0" />
                        Recommended Next-Best-Actions
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2.5">
                        {msg.analysis.recommendedActions.map((act, i) => (
                          <div key={i} className="flex-1 bg-[#1F2937]/40 p-2.5 rounded-md border border-[#1F2937]/35 flex items-center justify-between gap-2">
                            <span className="text-gray-300 font-medium leading-tight">{act}</span>
                            <button className="p-1 bg-[#0A84FF]/10 text-[#0A84FF] hover:bg-[#0A84FF] hover:text-white rounded transition-colors shrink-0">
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 5. Related Transactions table */}
                    {msg.analysis.relatedDeals && msg.analysis.relatedDeals.length > 0 && (
                      <div className="border border-gray-800 rounded-lg overflow-hidden bg-gray-900/10">
                        <div className="px-3.5 py-2 bg-gray-900/40 border-b border-gray-800 text-[10px] uppercase font-bold text-gray-400">
                          Precedent Precedent Capital Transactions
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-[10px]">
                            <thead>
                              <tr className="bg-[#0D131F]/20 text-gray-500 border-b border-gray-800">
                                <th className="p-2.5">Issuer</th>
                                <th className="p-2.5">Deal Size</th>
                                <th className="p-2.5">Bond Type</th>
                                <th className="p-2.5 text-center">Coupon</th>
                                <th className="p-2.5">Lead Bookrunners</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/40 text-gray-400">
                              {msg.analysis.relatedDeals.map((dl, i) => (
                                <tr key={i} className="hover:bg-gray-800/15">
                                  <td className="p-2.5 font-bold text-gray-200">{dl.companyName}</td>
                                  <td className="p-2.5 font-mono text-gray-300">{dl.dealAmount}</td>
                                  <td className="p-2.5">{dl.bondType}</td>
                                  <td className="p-2.5 text-center font-mono">{dl.coupon}</td>
                                  <td className="p-2.5 text-[9px] truncate max-w-xs">{dl.leadBank}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                  </div>
                )}

              </div>
            </div>
          );
        })}

        {/* Typing Loading Indicator */}
        {isTyping && (
          <div className="flex gap-4 p-4 rounded-xl border bg-[#111827]/40 border-[#1F2937]/35 max-w-xs animate-pulse">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#0A84FF]/10 border border-[#0A84FF]/30 text-[#0A84FF] shrink-0">
              <Bot className="w-4.5 h-4.5" />
            </div>
            <div className="grow space-y-2 py-1.5">
              <p className="text-gray-400 font-bold">SIG Analyst is processing...</p>
              <div className="flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}

        <div ref={scrollRef}></div>
      </div>

      {/* Starter Queries chips */}
      <div className="py-2.5 border-t border-[#1F2937]/25 flex flex-wrap items-center gap-2">
        <span className="text-gray-500 text-[10px] uppercase font-semibold font-mono mr-1.5">Suggested Queries:</span>
        {starterPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(p)}
            className="px-3 py-1.5 rounded-full border border-gray-800 hover:border-[#0A84FF]/50 bg-[#111827] text-gray-400 hover:text-white cursor-pointer transition-all text-[11px]"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Prompt Form Input */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputValue);
        }}
        className="pt-2 flex gap-3 items-center"
      >
        <div className="relative flex-1 flex items-center bg-[#111827] border border-[#1F2937]/55 hover:border-gray-700 rounded-lg px-3.5 py-2.5">
          <Sparkles className="w-4.5 h-4.5 text-[#0A84FF] mr-2.5 shrink-0" />
          <input
            type="text"
            className="w-full bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none"
            placeholder="Type your strategic query (e.g. 'Why is BMW #1?', 'Recommend multi-tranche curves')..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
          />
        </div>
        <button 
          type="submit"
          className="p-3 bg-[#0A84FF] hover:bg-[#0070E0] text-white rounded-lg cursor-pointer transition-colors shrink-0 flex items-center justify-center"
          disabled={isTyping || !inputValue.trim()}
        >
          <Send className="w-4.5 h-4.5" />
        </button>
      </form>
    </div>
  );
}
