import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Award, 
  DollarSign, 
  ShieldCheck, 
  User, 
  Briefcase, 
  Calendar, 
  Sparkles, 
  ArrowLeft, 
  ChevronRight, 
  Phone, 
  Mail, 
  TrendingUp, 
  ArrowDownRight, 
  Activity, 
  Download, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { Company, Deal, TimelineEvent, ClientRelationship, Banker } from '../types';

interface Client360Props {
  company: Company;
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export default function Client360({ company, onBack, onNavigate }: Client360Props) {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Relationships' | 'Timeline' | 'Deals' | 'Documents' | 'Signals' | 'AI Analysis'>('Overview');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const tabs: Array<'Overview' | 'Relationships' | 'Timeline' | 'Deals' | 'Documents' | 'Signals' | 'AI Analysis'> = [
    'Overview', 'Relationships', 'Timeline', 'Deals', 'Documents', 'Signals', 'AI Analysis'
  ];

  // Animate mock file download
  const handleDownload = (docName: string) => {
    setDownloadSuccess(docName);
    const link = document.createElement('a');
    link.href = '#';
    link.setAttribute('download', docName);
    
    // Create a mock text file download to keep it fully offline functional
    const fileContent = `SIG - Syndicate Intelligence Graph Report\n\nClient Name: ${company.name}\nReport Type: ${docName}\nGeneration Date: 2026-07-17\nClassification: STICKY CONFIDENTIAL - INVESTMENT BANKING USE ONLY\n\nAll analytical models and estimates are generated via SIG Machine Intelligence algorithms.`;
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${company.name.replace(/\s+/g, '_')}_${docName.replace(/\s+/g, '_')}.txt`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadSuccess(null);
    }, 2500);
  };

  // Large circular SVG gauge calculations
  const radius = 50;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (company.dealReadinessScore / 100) * circumference;

  return (
    <div className="space-y-6 animate-fade-in text-xs">
      {/* Back button and core metadata */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onBack}
          className="p-2 bg-[#111827] border border-[#1F2937]/50 text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Client Dossier</span>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-display font-bold text-white">{company.name}</h2>
            <span className="text-[10px] text-gray-400 bg-gray-800 px-2 py-0.5 rounded font-mono border border-gray-700/50">{company.ticker}</span>
          </div>
        </div>
      </div>

      {/* Corporate Dashboard Header Block */}
      <div className="bg-[#111827] border border-[#1F2937]/35 rounded-xl p-5 grid grid-cols-2 md:grid-cols-6 gap-4">
        <div>
          <p className="text-[10px] text-gray-500 uppercase font-medium">Industry</p>
          <p className="text-gray-200 font-semibold mt-1 flex items-center gap-1.5 text-xs">
            <Building2 className="w-3.5 h-3.5 text-[#0A84FF] shrink-0" />
            {company.industry}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 uppercase font-medium">Jurisdiction</p>
          <p className="text-gray-200 font-semibold mt-1 flex items-center gap-1.5 text-xs">
            <MapPin className="w-3.5 h-3.5 text-[#30D5C8] shrink-0" />
            {company.country}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 uppercase font-medium">Market Capitalization</p>
          <p className="text-gray-200 font-mono font-bold mt-1 text-xs">
            {company.marketCap}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 uppercase font-medium">Credit Rating</p>
          <p className="text-[#30D158] font-mono font-bold mt-1 text-xs flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#30D158] shrink-0" />
            {company.creditRating}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 uppercase font-medium">Rel. Strength</p>
          <p className="text-gray-200 font-semibold mt-1 text-xs flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${company.relationshipStatus === 'Strong' ? 'bg-[#30D158]' : company.relationshipStatus === 'Neutral' ? 'bg-[#FF9F0A]' : 'bg-[#FF453A]'}`}></span>
            {company.relationshipStatus}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 uppercase font-medium">Revenue Opportunity</p>
          <p className="text-white font-mono font-bold mt-1 text-xs text-right">
            {company.revenueOpportunity}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#1F2937]/35 flex items-center gap-1.5 overflow-x-auto pb-px">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs font-semibold tracking-wide transition-all duration-150 border-b-2 cursor-pointer ${
              activeTab === tab 
                ? 'border-[#0A84FF] text-white' 
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="bg-[#111827] border border-[#1F2937]/35 rounded-xl p-5 min-h-[350px]">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left circular dial column */}
            <div className="bg-[#111827]/40 border border-[#1F2937]/45 rounded-xl p-5 flex flex-col items-center justify-center text-center">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-4">Capital Readiness Model</h4>
              
              <div className="relative flex items-center justify-center">
                <svg className="w-36 h-36 transform -rotate-90">
                  <circle
                    className="text-[#1F2937]/75"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius + 20}
                    cy={radius + 20}
                  />
                  <circle
                    className="text-[#0A84FF] transition-all duration-1000"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius + 20}
                    cy={radius + 20}
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-display font-extrabold text-white">{company.dealReadinessScore}%</span>
                  <span className="text-[9px] text-gray-400 uppercase tracking-wider mt-0.5">Readiness Score</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 w-full pt-4 border-t border-[#1F2937]/20">
                <div className="text-center">
                  <p className="text-[10px] text-gray-500 uppercase">AI Conviction</p>
                  <p className="text-sm font-bold text-gray-200 mt-0.5">{company.confidenceScore}%</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-500 uppercase">Rel. Score</p>
                  <p className="text-sm font-bold text-[#30D158] mt-0.5">{company.relationshipScore}/100</p>
                </div>
              </div>
            </div>

            {/* Mid strategic summary */}
            <div className="space-y-4 lg:col-span-2">
              <div className="bg-[#090D16]/50 border border-[#1F2937]/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Sparkles className="w-4 h-4 text-[#0A84FF]" />
                  <span>SIG Artificial Intelligence Proposal</span>
                </div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-medium">Recommended Transaction Type</p>
                    <p className="text-gray-100 font-bold text-xs mt-1">{company.recommendedProduct}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-medium">Target Issuance Window</p>
                    <p className="text-gray-100 font-bold text-xs mt-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      {company.expectedTimeline}
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 mt-3.5 leading-relaxed bg-[#111827]/40 p-3 rounded border border-gray-800">
                  <strong className="text-gray-200">Advisory Rationale:</strong> {company.aiAnalysis.rationale}
                </p>
              </div>

              {/* Cover Banker details cards */}
              <div>
                <h4 className="text-[10px] font-display font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                  Assigned Syndicate Accounts Coverage
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {company.bankers.map((bk, i) => (
                    <div key={bk.id} className="bg-[#111827]/40 border border-[#1F2937]/50 rounded-lg p-3">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wide leading-none">{bk.role} Director</p>
                      <p className="text-xs font-semibold text-gray-200 mt-1">{bk.name}</p>
                      <div className="mt-2 space-y-1.5 text-[10px] text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-gray-600 shrink-0" />
                          <span className="truncate">{bk.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-gray-600 shrink-0" />
                          <span>{bk.phone}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RELATIONSHIPS TAB */}
        {activeTab === 'Relationships' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#1F2937]/35">
              <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">Client Decision Makers</h3>
              <span className="text-[11px] text-gray-500 font-mono">Consolidated Relationship Index: {company.relationshipScore}/100</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {company.relationships.map((rel, idx) => (
                <div key={idx} className="bg-[#090D16]/40 border border-[#1F2937]/50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-gray-200">{rel.name}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">{rel.role}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                      rel.strength === 'Strong' ? 'text-[#30D158] bg-[#30D158]/10' : 'text-[#FF9F0A] bg-[#FF9F0A]/10'
                    }`}>
                      {rel.strength} Connection
                    </span>
                  </div>
                  <div className="mt-3 text-[11px] text-gray-400 leading-relaxed bg-[#111827]/40 p-2.5 rounded border border-gray-800">
                    <strong className="text-gray-300">Coverage Logs:</strong> {rel.notes}
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[10px] text-gray-500">
                    <span>Last touchpoint: {rel.lastContact}</span>
                    <span className="text-[#0A84FF] hover:underline cursor-pointer">Log Call Minutes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TIMELINE TAB */}
        {activeTab === 'Timeline' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-[#1F2937]/35">
              <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">Vertical Capital Markets Timeline</h3>
              <p className="text-[10px] text-gray-500 font-mono">Chronological Client Signals & Structural Events</p>
            </div>

            {/* Vertical timeline line */}
            <div className="relative pl-6 border-l-2 border-[#1F2937]/75 space-y-6 ml-2 py-2">
              {company.timeline.map((evt) => {
                // Determine bullet design based on type
                let bulletBg = 'bg-[#1F2937] border-gray-600';
                let iconColor = 'text-gray-400';
                
                if (evt.type === 'Recommendation') {
                  bulletBg = 'bg-[#0A84FF]/20 border-[#0A84FF]';
                  iconColor = 'text-[#0A84FF]';
                } else if (evt.type === 'Bond' || evt.type === 'Loan') {
                  bulletBg = 'bg-[#30D158]/20 border-[#30D158]';
                  iconColor = 'text-[#30D158]';
                } else if (evt.type === 'Acquisition') {
                  bulletBg = 'bg-[#30D5C8]/20 border-[#30D5C8]';
                  iconColor = 'text-[#30D5C8]';
                } else if (evt.type === 'Rating') {
                  bulletBg = 'bg-[#FF9F0A]/20 border-[#FF9F0A]';
                  iconColor = 'text-[#FF9F0A]';
                }

                return (
                  <div key={evt.id} className="relative group animate-fade-in">
                    {/* Circle element */}
                    <span className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 ${bulletBg} z-10 transition-all group-hover:scale-110 flex items-center justify-center`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${iconColor} bg-current`}></span>
                    </span>

                    {/* Timeline card details */}
                    <div className="bg-[#090D16]/40 hover:bg-[#121E33]/15 border border-[#1F2937]/65 rounded-lg p-3.5 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                        <span className="text-[10px] font-mono text-gray-500">{evt.date}</span>
                        <span className={`text-[10px] uppercase font-mono tracking-wider font-semibold ${iconColor}`}>
                          {evt.type}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-gray-200 mt-1.5 leading-snug group-hover:text-[#0A84FF] transition-colors">
                        {evt.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 mt-1 leading-normal">{evt.description}</p>
                      
                      {evt.impactScore && (
                        <div className="mt-2 pt-2 border-t border-[#1F2937]/15 flex items-center justify-between text-[10px] text-gray-500 font-mono">
                          <span>Market Impact Evaluation:</span>
                          <span className={`font-semibold uppercase ${
                            evt.impactScore === 'High' ? 'text-[#FF453A]' : evt.impactScore === 'Medium' ? 'text-[#FF9F0A]' : 'text-[#30D158]'
                          }`}>{evt.impactScore}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* DEALS TAB */}
        {activeTab === 'Deals' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#1F2937]/35">
              <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">Historical Transactions Record</h3>
              <span className="text-[10px] text-gray-500 font-mono">Verified Underwriting History</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {company.deals.map((deal) => (
                <div key={deal.id} className="bg-[#090D16]/40 border border-[#1F2937]/50 rounded-lg p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-gray-500">{deal.date}</span>
                      <span className="px-2 py-0.5 bg-gray-800 border border-gray-700/50 rounded font-mono text-[9px] uppercase font-bold text-gray-400">
                        {deal.type}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-200 mt-2 leading-tight">{deal.productName}</h4>
                    <p className="text-[11px] text-gray-400 mt-1.5 font-medium">Underwriting Role: {deal.role}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#1F2937]/25 flex items-center justify-between text-xs">
                    <div>
                      <p className="text-[9px] text-gray-500 uppercase">Principal Amount</p>
                      <p className="text-sm font-bold text-gray-200 font-mono mt-0.5">{deal.amount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-gray-500 uppercase">Underwriting Fee</p>
                      <p className="text-sm font-bold text-[#30D158] font-mono mt-0.5">{deal.expectedFee || '€0.0M'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === 'Documents' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#1F2937]/35">
              <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">Syndication Materials & Drafts</h3>
              <p className="text-[10px] text-gray-500 font-mono">Confidential PDF/Excel Client Downloads</p>
            </div>

            {downloadSuccess && (
              <div className="bg-[#30D158]/10 border border-[#30D158]/30 rounded p-3 text-[#30D158] font-medium text-[11px] flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Successfully generated and downloaded: <strong>{downloadSuccess}</strong></span>
              </div>
            )}

            <div className="divide-y divide-[#1F2937]/35 border border-[#1F2937]/45 rounded-lg overflow-hidden bg-[#090D16]/30">
              {[
                { name: 'Green Underwriting Pitchbook.pdf', desc: 'Comprehensive yield projections, green pricing frameworks, and target pricing models.', size: '4.8 MB', date: '2026-07-16' },
                { name: 'Corporate Credit Structuring Model.xlsx', desc: 'Refinancing cashflow schedules, leverage ratio targets, and rating agency models.', size: '12.4 MB', date: '2026-07-12' },
                { name: 'Consolidated Relationship Brief.docx', desc: 'Summary of executive coverage contacts, call records, and executive team bios.', size: '1.2 MB', date: '2026-06-30' }
              ].map((doc, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-[#121E33]/15 transition-all">
                  <div className="flex gap-3 items-start max-w-xl">
                    <FileText className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-gray-200">{doc.name}</p>
                      <p className="text-[11px] text-gray-400 mt-1 leading-normal">{doc.desc}</p>
                      <p className="text-[9px] text-gray-500 font-mono mt-1">Generated: {doc.date} • {doc.size}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDownload(doc.name)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1F2937] hover:bg-[#0A84FF] text-gray-300 hover:text-white rounded-md cursor-pointer transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SIGNALS TAB */}
        {activeTab === 'Signals' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#1F2937]/35">
              <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">Capital Market Signals & Alerts</h3>
              <p className="text-[10px] text-gray-500 font-mono">Continuous Threat & Opportunity Parsing</p>
            </div>

            <div className="space-y-3">
              {company.signals.map((sig) => (
                <div key={sig.id} className="bg-[#090D16]/40 border border-[#1F2937]/50 rounded-lg p-3.5 flex items-start gap-3">
                  <span className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                    sig.impact === 'High' ? 'bg-[#FF453A]/10 text-[#FF453A]' : 'bg-[#FF9F0A]/10 text-[#FF9F0A]'
                  }`}>
                    <AlertCircle className="w-4 h-4" />
                  </span>

                  <div className="grow">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-gray-200">{sig.title}</h4>
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                        sig.sentiment === 'Bullish' ? 'text-[#30D158] border-[#30D158]/20 bg-[#30D158]/5' : 'text-[#FF453A] border-[#FF453A]/20 bg-[#FF453A]/5'
                      }`}>
                        {sig.sentiment} Signal
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1.5 leading-normal">{sig.description}</p>
                    <p className="text-[9px] text-gray-500 mt-2 font-mono">Identified Date: {sig.date} • Severity: {sig.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI ANALYSIS TAB */}
        {activeTab === 'AI Analysis' && (
          <div className="space-y-4 font-sans text-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-[#1F2937]/35">
              <Sparkles className="w-4.5 h-4.5 text-[#0A84FF] shrink-0" />
              <h3 className="text-xs font-display font-bold uppercase tracking-wider text-gray-200">AI Syndicate Analysis</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-[#090D16]/50 border border-[#1F2937]/65 rounded-lg p-4">
                <p className="text-xs font-semibold text-gray-200">Predictive Rationale Summary</p>
                <p className="text-[11px] text-gray-400 mt-2.5 leading-relaxed">
                  {company.aiAnalysis.rationale}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Supporting evidence */}
                <div className="bg-[#111827]/30 border border-[#1F2937]/45 rounded-lg p-4">
                  <p className="text-xs font-semibold text-gray-200">Supporting Evidence Metrics</p>
                  <ul className="mt-2.5 space-y-2 text-[11px] text-gray-400">
                    {company.aiAnalysis.supportingEvidence.map((ev, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#30D158] shrink-0 mt-0.5" />
                        <span>{ev}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sources & factors */}
                <div className="bg-[#111827]/30 border border-[#1F2937]/45 rounded-lg p-4">
                  <p className="text-xs font-semibold text-gray-200">Model Source Citations</p>
                  <ul className="mt-2.5 space-y-2 text-[11px] text-gray-400">
                    {company.aiAnalysis.sources.map((sc, i) => (
                      <li key={i} className="flex gap-2 items-start font-mono text-[10px]">
                        <span className="text-[#0A84FF] select-none font-bold">[{i+1}]</span>
                        <span>{sc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Next best action redirect box */}
              <div className="bg-[#121E33]/20 border border-[#0A84FF]/30 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-gray-200">Recommended Next Step</p>
                  <p className="text-[11px] text-gray-400 mt-1 leading-normal">{company.aiAnalysis.recommendedNextStep}</p>
                </div>
                <button 
                  onClick={() => onNavigate('Opportunities')}
                  className="px-4 py-2 bg-[#0A84FF] hover:bg-[#0070E0] text-white rounded-md cursor-pointer text-xs font-semibold transition-all shrink-0 flex items-center gap-1"
                >
                  <span>Go to Next Best Action</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
