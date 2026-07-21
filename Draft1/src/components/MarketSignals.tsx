import React, { useState } from 'react';
import { TrendingUp, Flame, Cpu, Car, Utensils, Plane, Layers, AlertCircle, Percent, Clock, Sparkles, Activity, ShieldCheck, HelpCircle } from 'lucide-react';
import { MARKET_SIGNALS_DASHBOARD } from '../data';

export default function MarketSignals() {
  const [hoveredData, setHoveredData] = useState<string | null>(null);

  const marketCards = [
    {
      title: 'Interest Rates',
      metric: '3.25%',
      badge: 'Easing (-25bps)',
      badgeColor: 'text-[#30D158] bg-[#30D158]/10 border-[#30D158]/20',
      desc: 'ECB adjusted key refinance rate downward. This creates immediate refinancing arbitrage against older 4%+ coupon notes.',
      date: 'Updated 2 hours ago'
    },
    {
      title: 'ECB Policy News',
      metric: 'Data-Dependent',
      badge: 'Stabilizing',
      badgeColor: 'text-[#0A84FF] bg-[#0A84FF]/10 border-[#0A84FF]/20',
      desc: 'Slower inflation figures support continuous rate easing. European investment-grade spreads are tightening by 12bps on average.',
      date: 'Updated 1 day ago'
    },
    {
      title: 'Credit Rating Shift',
      metric: 'Volatile Outlook',
      badge: 'High Vigilance',
      badgeColor: 'text-[#FF9F0A] bg-[#FF9F0A]/10 border-[#FF9F0A]/20',
      desc: 'Automotive and software heavy sectors face credit pressure from S&P due to elevated CapEx. Rating reviews trigger restructuring opportunities.',
      date: 'Updated 3 days ago'
    },
    {
      title: 'Bond Issuance',
      metric: '+18% YoY',
      badge: 'Liquidity Surge',
      badgeColor: 'text-[#30D158] bg-[#30D158]/10 border-[#30D158]/20',
      desc: 'Record secondary bookbuilding. High-grade European corporate orderbooks are averaging 3.6x oversubscription multipliers.',
      date: 'Updated 5 hours ago'
    },
    {
      title: 'IPO Activity',
      metric: 'Quiet Wind',
      badge: 'Selective',
      badgeColor: 'text-gray-400 bg-gray-800/40 border-gray-700/50',
      desc: 'Traditional listings remain selective, but sovereign green infrastructure carve-outs are demonstrating exceptional bid momentum.',
      date: 'Updated 2 days ago'
    },
    {
      title: 'Green Bonds',
      metric: '€124B Issued',
      badge: 'ESG Dominated',
      badgeColor: 'text-[#30D5C8] bg-[#30D5C8]/10 border-[#30D5C8]/20',
      desc: 'Accredited Green and Sustainability-linked tranches secure a "greenium" pricing benefit of 8-12bps relative to vanilla curves.',
      date: 'Updated 1 hour ago'
    }
  ];

  // Custom inline SVG line chart data
  // 5 years bond issuance volume trends (Billions €)
  const linePoints = [
    { year: '2022', vol: 85, x: 40, y: 130 },
    { year: '2023', vol: 92, x: 120, y: 110 },
    { year: '2024', vol: 104, x: 200, y: 80 },
    { year: '2025', vol: 118, x: 280, y: 50 },
    { year: '2026', vol: 132, x: 360, y: 20 }
  ];

  const svgPath = linePoints.map(p => `${p.x},${p.y}`).join(' L ');
  const areaPath = `${linePoints[0].x},160 L ${svgPath} L ${linePoints[linePoints.length - 1].x},160 Z`;

  // Custom SVG bar chart for Volatility (V2X Index)
  const barData = [
    { month: 'Jan', val: 18.2, height: 110, y: 40 },
    { month: 'Feb', val: 16.5, height: 100, y: 50 },
    { month: 'Mar', val: 15.1, height: 90, y: 60 },
    { month: 'Apr', val: 14.8, height: 88, y: 62 },
    { month: 'May', val: 14.2, height: 85, y: 65 },
    { month: 'Jun', val: 14.8, height: 88, y: 62 }
  ];

  // Industry opportunity scores
  const industryScores = MARKET_SIGNALS_DASHBOARD.industryHeatmap;

  // Match sector to icons
  const getSectorIcon = (sector: string) => {
    switch(sector) {
      case 'Automotive': return Car;
      case 'Energy & Utilities': return Flame;
      case 'Technology': return Cpu;
      case 'Consumer Goods': return Utensils;
      case 'Aerospace': return Plane;
      default: return Layers;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in text-xs">
      {/* Title */}
      <div>
        <h1 className="text-xl font-display font-bold text-gray-100 tracking-tight flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#30D5C8]" />
          Market Signals & Industry Heatmap
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Aggregated capital flow indicators, central bank policies, and ESG taxonomy issuance drivers.
        </p>
      </div>

      {/* Six Market Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {marketCards.map((c, i) => (
          <div key={i} className="bg-[#111827] border border-[#1F2937]/35 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-display font-bold uppercase tracking-wider text-gray-500">{c.title}</span>
                <span className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded border ${c.badgeColor}`}>
                  {c.badge}
                </span>
              </div>
              <p className="text-xl font-bold font-display text-gray-100 mt-2.5">{c.metric}</p>
              <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">{c.desc}</p>
            </div>
            <div className="mt-4 pt-2.5 border-t border-[#1F2937]/25 flex items-center gap-1.5 text-[10px] text-gray-500 font-mono">
              <Clock className="w-3.5 h-3.5 text-gray-600 shrink-0" />
              <span>{c.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts + Industry Heatmap Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Opportunity by Industry Heatmap */}
        <div className="bg-[#111827] border border-[#1F2937]/35 rounded-xl p-5">
          <div className="flex items-center justify-between pb-4 border-b border-[#1F2937]/35 mb-4">
            <div>
              <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">Opportunity Index Heatmap</h3>
              <p className="text-[10px] text-gray-500 mt-0.5">Weighted potential by industry sectors</p>
            </div>
            <span className="text-[10px] text-[#0A84FF] font-mono bg-[#0A84FF]/10 px-2.5 py-1 rounded border border-[#0A84FF]/20 font-bold uppercase tracking-wider">
              SIG AI RATED
            </span>
          </div>

          <div className="space-y-3">
            {industryScores.map((ind, i) => {
              const Icon = getSectorIcon(ind.sector);
              
              // Map score to color
              let scoreColor = 'text-[#30D158]';
              let heatBg = 'bg-[#30D158]/10 border-[#30D158]/35';
              let heatColor = 'bg-[#30D158]';
              
              if (ind.score < 80) {
                scoreColor = 'text-[#FF9F0A]';
                heatBg = 'bg-[#FF9F0A]/10 border-[#FF9F0A]/35';
                heatColor = 'bg-[#FF9F0A]';
              }
              if (ind.score < 70) {
                scoreColor = 'text-[#FF453A]';
                heatBg = 'bg-[#FF453A]/10 border-[#FF453A]/35';
                heatColor = 'bg-[#FF453A]';
              }

              return (
                <div 
                  key={i} 
                  className="flex items-center justify-between p-3.5 bg-[#090D16]/40 border border-gray-800 rounded-lg hover:border-[#1F2937] hover:bg-[#121E33]/10 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 w-1/3">
                    <span className="p-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 shrink-0">
                      <Icon className="w-4 h-4 text-gray-300" />
                    </span>
                    <div>
                      <p className="font-semibold text-gray-200 text-xs leading-none">{ind.sector}</p>
                      <p className="text-[10px] text-gray-500 mt-1 font-mono">{ind.pipelineCount} Pending deals</p>
                    </div>
                  </div>

                  <div className="w-1/3 px-4">
                    <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono mb-1.5">
                      <span>Opportunity Score:</span>
                      <span className={`${scoreColor} font-bold`}>{ind.score}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                      <div className={`h-full ${heatColor}`} style={{ width: `${ind.score}%` }}></div>
                    </div>
                  </div>

                  <div className="text-right w-1/4">
                    <p className="text-[10px] text-gray-500 uppercase">Est. Total Pool</p>
                    <p className="text-xs font-bold text-gray-200 mt-0.5 font-mono">{ind.potentialVolume}</p>
                    <span className={`inline-block text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded border ${heatBg} mt-1`}>
                      {ind.alert}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom SVG Charts panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Chart 1: Bond Issuance Trend */}
          <div className="bg-[#111827] border border-[#1F2937]/35 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">Bond Issuance Trend</h3>
              <p className="text-[10px] text-gray-500 mt-0.5">High-grade Euro issuances (Billions €)</p>
            </div>

            {/* Custom SVG Line graph */}
            <div className="my-4 h-44 relative flex items-center justify-center">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 400 180">
                {/* Grid guidelines */}
                <line x1="30" y1="160" x2="380" y2="160" stroke="#1F2937" strokeWidth="1" />
                <line x1="30" y1="110" x2="380" y2="110" stroke="#1F2937" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="30" y1="60" x2="380" y2="60" stroke="#1F2937" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="30" y1="10" x2="380" y2="10" stroke="#1F2937" strokeWidth="1" />

                {/* Y-axis labels */}
                <text x="12" y="163" fill="#475569" className="text-[9px] font-mono">50B</text>
                <text x="12" y="113" fill="#475569" className="text-[9px] font-mono">100B</text>
                <text x="12" y="63" fill="#475569" className="text-[9px] font-mono">120B</text>
                <text x="12" y="13" fill="#475569" className="text-[9px] font-mono">150B</text>

                {/* Area Gradient fill */}
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0A84FF" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0A84FF" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d={`M ${areaPath}`} fill="url(#chartGrad)" />

                {/* Line Path */}
                <path d={`M ${svgPath}`} fill="none" stroke="#0A84FF" strokeWidth="2.5" />

                {/* Plot points */}
                {linePoints.map((p, i) => (
                  <g 
                    key={i} 
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredData(`Vol: €${p.vol}B in ${p.year}`)}
                    onMouseLeave={() => setHoveredData(null)}
                  >
                    <circle cx={p.x} cy={p.y} r="4" fill="#0A84FF" stroke="#111827" strokeWidth="1.5" />
                    <text x={p.x} y="176" fill="#64748B" className="text-[9px] font-mono" textAnchor="middle">{p.year}</text>
                  </g>
                ))}
              </svg>

              {/* Live hover tooltip */}
              {hoveredData && (
                <div className="absolute top-2 right-2 bg-gray-900 border border-gray-800 text-[10px] px-2 py-1 rounded font-mono text-white animate-fade-in">
                  {hoveredData}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-[10px] text-gray-500 pt-2 border-t border-[#1F2937]/25 font-mono">
              <span>SOURCE: SIG REVENUE TRACKER</span>
              <span className="text-[#30D158] font-bold">+18.4% OVER ALL WINDOWS</span>
            </div>
          </div>

          {/* Chart 2: Volatility V2X index */}
          <div className="bg-[#111827] border border-[#1F2937]/35 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">V2X Market Volatility</h3>
              <p className="text-[10px] text-gray-500 mt-0.5">Euro Stoxx 50 Volatility index</p>
            </div>

            {/* Custom SVG Bar chart */}
            <div className="my-4 h-44 relative flex items-center justify-center">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 180">
                {/* Gridlines */}
                <line x1="20" y1="150" x2="190" y2="150" stroke="#1F2937" strokeWidth="1" />
                <line x1="20" y1="100" x2="190" y2="100" stroke="#1F2937" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="20" y1="50" x2="190" y2="50" stroke="#1F2937" strokeWidth="1" strokeDasharray="3,3" />

                {/* Y-axis labels */}
                <text x="2" y="153" fill="#475569" className="text-[8px] font-mono">10</text>
                <text x="2" y="103" fill="#475569" className="text-[8px] font-mono">15</text>
                <text x="2" y="53" fill="#475569" className="text-[8px] font-mono">20</text>

                {/* Bars */}
                {barData.map((b, i) => {
                  const xPos = 25 + i * 27;
                  const barH = 150 - b.y;
                  return (
                    <g key={i} className="group">
                      <rect
                        x={xPos}
                        y={b.y}
                        width="14"
                        height={barH}
                        rx="2.5"
                        fill="#30D5C8"
                        fillOpacity="0.7"
                        className="hover:fill-opacity-100 transition-all cursor-pointer"
                      />
                      <text x={xPos + 7} y="162" fill="#64748B" className="text-[8px] font-mono" textAnchor="middle">{b.month}</text>
                      <text x={xPos + 7} y={b.y - 4} fill="#F3F4F6" className="text-[8px] font-mono font-semibold opacity-0 group-hover:opacity-100 transition-all" textAnchor="middle">
                        {b.val}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="flex justify-between items-center text-[10px] text-gray-500 pt-2 border-t border-[#1F2937]/25 font-mono">
              <span>SEVERITY: STABLE (LOW RISK)</span>
              <span className="text-[#30D5C8] font-bold">14.8 INDEX CURRENT</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
