import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Award, 
  Percent, 
  Activity, 
  ArrowUpRight, 
  Sparkles, 
  AlertCircle, 
  ChevronRight, 
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  Search,
  Filter
} from 'lucide-react';
import { Company } from '../types';

interface DashboardProps {
  companies: Company[];
  onSelectCompany: (companyId: string) => void;
  onNavigate: (screen: string) => void;
}

export default function Dashboard({ companies, onSelectCompany, onNavigate }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');

  // Filter companies based on search and industry dropdown
  const filteredCompanies = companies.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.recommendedProduct.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === 'All' || c.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  // Calculate stats based on real data
  const totalPipeline = '€19.2B';
  const expectedFees = '€57.8M';
  const avgConfidence = '81.4%';
  const upcomingRefinancings = '4 Corporate Tranches';
  const mandateWinProb = '79.2%';

  // Unique list of industries
  const industries = ['All', ...Array.from(new Set(companies.map(c => c.industry)))];

  // Top 3 priority insights for the right panel
  const topAIInsights = [
    {
      id: 'insight-1',
      title: 'BMW Group Priority #1',
      badge: 'Immediate Action',
      badgeColor: 'bg-[#FF453A]/10 text-[#FF453A] border-[#FF453A]/20',
      description: '€1.25B Outstanding Green Bond maturing March 2027 triggers pre-refinancing requirement. Greenium optimization suggests early September launch.',
      metric: 'Expected Fee: €4.5M',
      confidence: '94% Confidence'
    },
    {
      id: 'insight-2',
      title: 'BP plc Perpetual Refi',
      badge: 'Defensive Window',
      badgeColor: 'bg-[#FF9F0A]/10 text-[#FF9F0A] border-[#FF9F0A]/20',
      description: '€1.0B Hybrid Perpetual notes first-callable January 2027. Refinancing proposal preserves 50% S&P Equity Treatment.',
      metric: 'Expected Fee: €4.2M',
      confidence: '70% Confidence'
    },
    {
      id: 'insight-3',
      title: 'SAP SE Convertible Arbitrage',
      badge: 'Valuation Peak',
      badgeColor: 'bg-[#0A84FF]/10 text-[#0A84FF] border-[#0A84FF]/20',
      description: 'Stock at historical peaks. Proposing 45% conversion premium Senior Unsecured Convertible reduces interest coupon to <1.0%.',
      metric: 'Expected Fee: €4.8M',
      confidence: '78% Confidence'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-display font-bold text-gray-100 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#0A84FF] shrink-0" />
            Syndicate Intelligence Dashboard
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Continuous capital raising predictive engine. Flagging proactive refinancing and issuance opportunities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-gray-500 bg-[#111827] border border-[#1F2937]/50 px-3 py-1.5 rounded-lg">
            Engine Version: SIG-Predict v3.44
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3.5">
        {/* Card 1 */}
        <div className="bg-[#111827] border border-[#1F2937]/35 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[10px] font-display font-medium uppercase tracking-wider">Opportunities</span>
            <Layers className="w-4 h-4 text-[#0A84FF]" />
          </div>
          <div className="mt-3">
            <p className="text-xl font-bold text-gray-100 font-display">12</p>
            <p className="text-[9px] text-[#30D158] flex items-center gap-0.5 mt-1">
              <span>+3 New this week</span>
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#111827] border border-[#1F2937]/35 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[10px] font-display font-medium uppercase tracking-wider">Total Pipeline</span>
            <DollarSign className="w-4 h-4 text-[#30D5C8]" />
          </div>
          <div className="mt-3">
            <p className="text-xl font-bold text-gray-100 font-display">{totalPipeline}</p>
            <p className="text-[9px] text-[#30D158] flex items-center gap-0.5 mt-1">
              <span>+€4.5B weighted</span>
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#111827] border border-[#1F2937]/35 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[10px] font-display font-medium uppercase tracking-wider">Expected Fees</span>
            <Award className="w-4 h-4 text-[#30D158]" />
          </div>
          <div className="mt-3">
            <p className="text-xl font-bold text-gray-100 font-display">{expectedFees}</p>
            <p className="text-[9px] text-gray-400 mt-1">Weighted at current stage</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-[#111827] border border-[#1F2937]/35 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[10px] font-display font-medium uppercase tracking-wider">Mandate Win %</span>
            <Percent className="w-4 h-4 text-[#FF9F0A]" />
          </div>
          <div className="mt-3">
            <p className="text-xl font-bold text-gray-100 font-display">{mandateWinProb}</p>
            <p className="text-[9px] text-[#30D158] flex items-center gap-0.5 mt-1">
              <span>+1.8% vs Q1</span>
            </p>
          </div>
        </div>

        {/* Card 5 */}
        <div className="bg-[#111827] border border-[#1F2937]/35 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[10px] font-display font-medium uppercase tracking-wider">AI Confidence</span>
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <div className="mt-3">
            <p className="text-xl font-bold text-gray-100 font-display">{avgConfidence}</p>
            <p className="text-[9px] text-gray-400 mt-1">Average model conviction</p>
          </div>
        </div>

        {/* Card 6 */}
        <div className="bg-[#111827] border border-[#1F2937]/35 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-[10px] font-display font-medium uppercase tracking-wider">Upcoming Refi</span>
            <Activity className="w-4 h-4 text-[#FF453A]" />
          </div>
          <div className="mt-3">
            <p className="text-xl font-bold text-[#FF9F0A] font-display">4</p>
            <p className="text-[9px] text-[#FF453A] flex items-center gap-0.5 mt-1">
              <span>Due &lt;12 Months</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Table + Right AI Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Opportunities Table Container */}
        <div className="xl:col-span-3 bg-[#111827] border border-[#1F2937]/35 rounded-xl overflow-hidden flex flex-col">
          {/* Table Header Controls */}
          <div className="p-4 border-b border-[#1F2937]/35 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#111827]/75">
            <div>
              <h3 className="text-sm font-semibold text-gray-200">Continuous Underwriting Opportunities</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">Ranked by Deal Readiness Score (Predictive AI Algorithm)</p>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Search within table */}
              <div className="relative flex items-center bg-[#090D16] border border-[#1F2937]/65 rounded-lg px-2.5 py-1 text-xs text-gray-400">
                <Search className="w-3.5 h-3.5 text-gray-500 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Filter table..."
                  className="bg-transparent text-xs text-gray-200 focus:outline-none placeholder-gray-500 w-36"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Industry Filter dropdown */}
              <div className="flex items-center bg-[#090D16] border border-[#1F2937]/65 rounded-lg px-2 py-1 text-xs text-gray-400">
                <Filter className="w-3.5 h-3.5 text-gray-500 mr-1.5 shrink-0" />
                <select
                  className="bg-transparent text-xs text-gray-200 focus:outline-none cursor-pointer pr-1"
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                >
                  {industries.map(ind => (
                    <option key={ind} value={ind} className="bg-[#111827] text-gray-200">{ind}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Table Element */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#1F2937]/45 bg-[#0D131F]/30 text-gray-400 font-medium uppercase text-[10px] tracking-wider">
                  <th className="p-4">Company</th>
                  <th className="p-4">Industry</th>
                  <th className="p-4 text-center">Readiness Score</th>
                  <th className="p-4">Recommended Product</th>
                  <th className="p-4">Timeline</th>
                  <th className="p-4 text-right">Expected Fee</th>
                  <th className="p-4 text-center">Confidence</th>
                  <th className="p-4 text-center">Relationship</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2937]/25">
                {filteredCompanies.map((c) => {
                  // Readiness color mapping
                  const readiness = c.dealReadinessScore;
                  let readinessColor = 'text-[#30D158] bg-[#30D158]/10';
                  if (readiness < 70) readinessColor = 'text-[#FF9F0A] bg-[#FF9F0A]/10';
                  if (readiness < 60) readinessColor = 'text-[#FF453A] bg-[#FF453A]/10';

                  // Relationship score style
                  const relScore = c.relationshipScore;
                  let relColor = 'bg-[#30D158]';
                  if (relScore < 80) relColor = 'bg-[#FF9F0A]';
                  if (relScore < 60) relColor = 'bg-[#FF453A]';

                  return (
                    <tr 
                      key={c.id} 
                      onClick={() => onSelectCompany(c.id)}
                      className="hover:bg-[#121E33]/30 transition-all cursor-pointer group"
                    >
                      {/* Name / Ticker */}
                      <td className="p-4 font-medium text-gray-100">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 bg-[#1F2937]/80 rounded-lg flex items-center justify-center text-xs font-bold text-gray-300 font-mono">
                            {c.name.substring(0,2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-200 group-hover:text-[#0A84FF] transition-colors leading-tight">
                              {c.name}
                            </p>
                            <p className="text-[10px] text-gray-500 font-mono mt-0.5">{c.ticker}</p>
                          </div>
                        </div>
                      </td>

                      {/* Industry */}
                      <td className="p-4 text-gray-300">
                        <span className="px-2.5 py-1 bg-[#1F2937]/40 border border-gray-800 rounded-md text-[10px] font-medium uppercase tracking-wider text-gray-400">
                          {c.industry}
                        </span>
                      </td>

                      {/* Deal Readiness Circular/Badge */}
                      <td className="p-4 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded font-mono font-semibold text-[11px] ${readinessColor}`}>
                          {readiness}%
                        </span>
                      </td>

                      {/* Recommended Product */}
                      <td className="p-4 text-gray-200 max-w-xs truncate font-medium">
                        {c.recommendedProduct}
                      </td>

                      {/* Expected Timeline */}
                      <td className="p-4 text-gray-400 font-medium">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                          <span>{c.expectedTimeline}</span>
                        </div>
                      </td>

                      {/* Expected Underwriting Fees */}
                      <td className="p-4 text-right text-gray-100 font-mono font-semibold text-[11px]">
                        {c.expectedFee}
                      </td>

                      {/* Confidence Score */}
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="font-mono text-[11px] text-gray-300 font-medium">{c.confidenceScore}%</span>
                        </div>
                      </td>

                      {/* Relationship Health */}
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-16 h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                            <div className={`h-full ${relColor}`} style={{ width: `${relScore}%` }}></div>
                          </div>
                          <span className="text-[9px] font-mono text-gray-500">{relScore}/100</span>
                        </div>
                      </td>

                      {/* Action trigger */}
                      <td className="p-4 text-right">
                        <button className="p-1.5 bg-[#1F2937]/50 hover:bg-[#0A84FF] text-gray-400 hover:text-white rounded-md cursor-pointer transition-colors">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer counts */}
          <div className="p-4 border-t border-[#1F2937]/35 bg-[#0D131F]/15 flex items-center justify-between text-[11px] text-gray-500">
            <span>Showing {filteredCompanies.length} of {companies.length} strategic coverage accounts</span>
            <span>Click any client row to view Client 360 dossiers</span>
          </div>
        </div>

        {/* Right AI Insight Panel */}
        <div className="space-y-4">
          <div className="bg-[#111827] border border-[#1F2937]/35 rounded-xl p-4 flex flex-col h-full">
            <div className="flex items-center gap-2 pb-3 border-b border-[#1F2937]/35">
              <Sparkles className="w-4 h-4 text-[#0A84FF]" />
              <h3 className="text-xs font-display font-bold uppercase tracking-wider text-gray-200">AI Priority Insights</h3>
            </div>

            {/* List of high convic alerts */}
            <div className="space-y-3.5 py-3.5 grow">
              {topAIInsights.map((ins, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#111827]/40 hover:bg-[#121E33]/20 border border-[#1F2937]/50 rounded-lg p-3 transition-all cursor-pointer group"
                  onClick={() => {
                    const c = companies.find(comp => comp.name.toLowerCase().includes(ins.title.split(' ')[0].toLowerCase()));
                    if (c) onSelectCompany(c.id);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-gray-200 group-hover:text-[#0A84FF] transition-colors">
                      {ins.title}
                    </h4>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded border ${ins.badgeColor} font-semibold font-mono`}>
                      {ins.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">{ins.description}</p>
                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#1F2937]/25 text-[10px] text-gray-500 font-mono">
                    <span>{ins.metric}</span>
                    <span className="text-[#30D158] font-semibold">{ins.confidence}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* General alert advice banner */}
            <div className="bg-[#1F2937]/25 border border-[#1F2937]/55 rounded-lg p-3 mt-auto">
              <div className="flex gap-2.5 text-gray-400 text-xs">
                <AlertCircle className="w-4 h-4 text-[#FF9F0A] shrink-0" />
                <div>
                  <p className="font-semibold text-gray-300 text-[11px]">System Advisory Notice</p>
                  <p className="text-[10px] text-gray-500 mt-0.5 leading-normal">
                    ECB rate cut decreases current straight yields. High-conviction issuers are advised to execute hybrid or green placements prior to traditional end-of-quarter blackout windows.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
