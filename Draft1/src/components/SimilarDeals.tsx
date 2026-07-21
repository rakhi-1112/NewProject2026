import React, { useState } from 'react';
import { SimilarDeal } from '../types';
import { SIMILAR_DEALS } from '../data';
import { Search, Filter, ShieldCheck, ChevronRight, X, DollarSign, Award, Calendar, ExternalLink } from 'lucide-react';

export default function SimilarDeals() {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [selectedDeal, setSelectedDeal] = useState<SimilarDeal | null>(null);

  // Filter deals
  const filteredDeals = SIMILAR_DEALS.filter(deal => {
    const matchesSearch = deal.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          deal.bondType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          deal.leadBank.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === 'All' || deal.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  const industries = ['All', ...Array.from(new Set(SIMILAR_DEALS.map(d => d.industry)))];

  return (
    <div className="space-y-6 animate-fade-in text-xs relative">
      {/* View Header */}
      <div>
        <h1 className="text-xl font-display font-bold text-gray-100 tracking-tight flex items-center gap-2">
          <Award className="w-5 h-5 text-[#FF9F0A]" />
          Precedent Capital Markets Transactions
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Historical high-grade European corporate debt underwriting and pricing indexes.
        </p>
      </div>

      {/* Filter bar */}
      <div className="bg-[#111827] border border-[#1F2937]/35 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-gray-500 font-mono">DATABASE TOTAL: {SIMILAR_DEALS.length} COMPLETED TRANSACTIONS</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative flex items-center bg-[#090D16] border border-[#1F2937]/65 rounded-lg px-2.5 py-1.5 text-xs text-gray-400">
            <Search className="w-3.5 h-3.5 text-gray-500 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search issuers, bookrunners..."
              className="bg-transparent text-xs text-gray-200 focus:outline-none placeholder-gray-500 w-44"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Industry filter */}
          <div className="flex items-center bg-[#090D16] border border-[#1F2937]/65 rounded-lg px-2 py-1.5 text-xs text-gray-400">
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

      {/* Main spreadsheet table */}
      <div className="bg-[#111827] border border-[#1F2937]/35 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#1F2937]/45 bg-[#0D131F]/30 text-gray-400 font-medium uppercase text-[10px] tracking-wider">
                <th className="p-4">Issuer Name</th>
                <th className="p-4">Sector</th>
                <th className="p-4 text-right">Deal Amount</th>
                <th className="p-4">Bond Tranche Format</th>
                <th className="p-4 text-center">Maturity</th>
                <th className="p-4 text-center">Coupon</th>
                <th className="p-4">Lead Syndicate Bookrunners</th>
                <th className="p-4 text-center">Year</th>
                <th className="p-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2937]/25">
              {filteredDeals.map((deal) => (
                <tr 
                  key={deal.id} 
                  onClick={() => setSelectedDeal(deal)}
                  className="hover:bg-[#121E33]/30 transition-all cursor-pointer group"
                >
                  {/* Company Name */}
                  <td className="p-4 font-semibold text-gray-200 group-hover:text-[#0A84FF] transition-colors">
                    {deal.companyName}
                  </td>

                  {/* Sector */}
                  <td className="p-4 text-gray-400 font-medium">
                    {deal.industry}
                  </td>

                  {/* Deal Amount */}
                  <td className="p-4 text-right text-gray-100 font-mono font-bold text-[11px]">
                    {deal.dealAmount}
                  </td>

                  {/* Bond type */}
                  <td className="p-4 text-gray-300">
                    <span className="truncate max-w-xs block font-medium">{deal.bondType}</span>
                  </td>

                  {/* Maturity */}
                  <td className="p-4 text-center text-gray-400 font-medium font-mono">
                    {deal.maturity}
                  </td>

                  {/* Coupon */}
                  <td className="p-4 text-center text-gray-100 font-semibold font-mono">
                    {deal.coupon}
                  </td>

                  {/* Lead Bookrunners */}
                  <td className="p-4 text-gray-400 max-w-xs truncate text-[11px]">
                    {deal.leadBank}
                  </td>

                  {/* Year */}
                  <td className="p-4 text-center text-gray-500 font-mono">
                    {deal.year}
                  </td>

                  {/* Details chevron */}
                  <td className="p-4 text-right">
                    <button className="p-1 hover:bg-[#0A84FF]/10 text-gray-400 hover:text-[#0A84FF] rounded transition-colors cursor-pointer">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filteredDeals.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <p className="font-semibold text-gray-400 text-xs">No transactions matched filters</p>
            <p className="text-[11px] text-gray-500 mt-1">Try resetting the search terms or sector selections.</p>
          </div>
        )}
      </div>

      {/* Detail Overlay Card (If clicked) */}
      {selectedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setSelectedDeal(null)}
          />

          {/* Modal Container */}
          <div className="relative bg-[#111827] border border-[#1F2937]/75 rounded-xl shadow-2xl shadow-black/80 max-w-md w-full overflow-hidden animate-fade-in p-5">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#1F2937]/45 mb-4">
              <span className="text-[10px] font-mono uppercase bg-gray-800 px-2 py-0.5 rounded text-gray-400">
                Mandate Ledger Details
              </span>
              <button 
                onClick={() => setSelectedDeal(null)}
                className="p-1 hover:bg-[#1F2937] text-gray-500 hover:text-white rounded cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-display font-extrabold text-white">{selectedDeal.companyName}</h3>
                <p className="text-[11px] text-gray-500 mt-0.5">Precedent Transaction Case {selectedDeal.id}</p>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="bg-[#090D16]/40 p-3 rounded border border-[#1F2937]/20 text-left">
                  <p className="text-[9px] text-gray-500 uppercase">Principal Size</p>
                  <p className="text-sm font-bold text-gray-200 mt-0.5 font-mono">{selectedDeal.dealAmount}</p>
                </div>
                <div className="bg-[#090D16]/40 p-3 rounded border border-[#1F2937]/20 text-left">
                  <p className="text-[9px] text-gray-500 uppercase">Coupon Pricing</p>
                  <p className="text-sm font-bold text-[#30D158] mt-0.5 font-mono">{selectedDeal.coupon}</p>
                </div>
                <div className="bg-[#090D16]/40 p-3 rounded border border-[#1F2937]/20 text-left">
                  <p className="text-[9px] text-gray-500 uppercase">Maturity Term</p>
                  <p className="text-sm font-bold text-gray-200 mt-0.5 font-mono">{selectedDeal.maturity}</p>
                </div>
                <div className="bg-[#090D16]/40 p-3 rounded border border-[#1F2937]/20 text-left">
                  <p className="text-[9px] text-gray-500 uppercase">Launch Year</p>
                  <p className="text-sm font-bold text-gray-200 mt-0.5 font-mono">{selectedDeal.year}</p>
                </div>
              </div>

              <div className="bg-[#090D16]/40 p-3.5 rounded border border-[#1F2937]/20 text-left">
                <p className="text-[9px] text-gray-500 uppercase">Underwriting Format</p>
                <p className="text-xs font-semibold text-gray-200 mt-1">{selectedDeal.bondType}</p>
              </div>

              <div className="bg-[#090D16]/40 p-3.5 rounded border border-[#1F2937]/20 text-left">
                <p className="text-[9px] text-gray-500 uppercase">Lead Underwriting Syndicate</p>
                <p className="text-xs font-semibold text-gray-300 mt-1 leading-normal">{selectedDeal.leadBank}</p>
              </div>

              <div className="bg-[#121E33]/20 border border-[#0A84FF]/25 p-3 rounded-lg flex items-start gap-2.5 text-[10px] text-gray-400 leading-normal">
                <ShieldCheck className="w-4.5 h-4.5 text-[#0A84FF] shrink-0 mt-0.5" />
                <span>Verified against direct IFR capital indexes and Bloomberg Underwriting League Tables.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
