import React, { useState } from 'react';
import { ReportItem } from '../types';
import { REPORTS } from '../data';
import { FileText, Download, CheckCircle2, RotateCw, AlertCircle, FileDown, Sparkles } from 'lucide-react';

export default function Reports() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);
  const [customReportType, setCustomReportType] = useState<'Pitch Book' | 'Client Brief' | 'Relationship Summary' | 'Deal Summary' | 'Meeting Notes'>('Pitch Book');
  const [customClientName, setCustomClientName] = useState('BMW Group');
  const [customReports, setCustomReports] = useState<ReportItem[]>(REPORTS);

  const handleDownload = (report: ReportItem) => {
    setDownloadingId(report.id);
    
    // Simulate generation latency (800ms)
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccessId(report.id);
      
      const link = document.createElement('a');
      link.href = '#';
      
      const fileContent = `SIG - Syndicate Intelligence Graph Report\n\nTitle: ${report.title}\nClient Focus: ${report.clientName}\nDocument Type: ${report.type}\nGeneration Date: ${report.dateGenerated}\nClassification: STICKY SECRET - INVESTMENT BANKING STRATEGIC BRIEF\n\nUnderwriting analytics and predictive models compiled dynamically by SIG machine learning models.`;
      const blob = new Blob([fileContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = `${report.clientName.replace(/\s+/g, '_')}_${report.type.replace(/\s+/g, '_')}.txt`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        setDownloadSuccessId(null);
      }, 2500);
    }, 850);
  };

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newReport: ReportItem = {
      id: `rep-custom-${Date.now()}`,
      type: customReportType,
      title: `${customClientName} Strategic ${customReportType} Briefing`,
      description: `Dynamically compiled briefing on credit metrics, capital restructuring scenarios and precedent comparable deals for ${customClientName}.`,
      clientName: customClientName,
      dateGenerated: new Date().toISOString().split('T')[0],
      fileSize: '3.4 MB'
    };

    setCustomReports(prev => [newReport, ...prev]);
  };

  return (
    <div className="space-y-6 animate-fade-in text-xs">
      {/* Title */}
      <div>
        <h1 className="text-xl font-display font-bold text-gray-100 tracking-tight flex items-center gap-2">
          <FileDown className="w-5 h-5 text-[#0A84FF]" />
          Syndicate Document & Report Engine
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Compile and download corporate pitch books, credit briefs, and relationship dossiers on demand.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Generate Custom Brief Form */}
        <div className="bg-[#111827] border border-[#1F2937]/35 rounded-xl p-5 h-fit space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1F2937]/35">
            <Sparkles className="w-4 h-4 text-[#0A84FF]" />
            <h3 className="text-xs font-display font-bold uppercase tracking-wider text-gray-200">Compile Custom Report</h3>
          </div>

          <form onSubmit={handleCreateReport} className="space-y-4">
            {/* Report Format */}
            <div>
              <label className="text-[10px] text-gray-500 uppercase font-medium">Select Brief Format</label>
              <select
                value={customReportType}
                onChange={(e) => setCustomReportType(e.target.value as any)}
                className="w-full mt-1.5 bg-[#090D16] border border-[#1F2937]/65 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none cursor-pointer"
              >
                <option value="Pitch Book">Pitch Book (Underwriting Models)</option>
                <option value="Client Brief">Client Brief (Refinancing Advice)</option>
                <option value="Relationship Summary">Relationship Summary (Coverage Logs)</option>
                <option value="Deal Summary">Deal Summary (Comparable Transactions)</option>
                <option value="Meeting Notes">Meeting Notes (Corporate Debriefs)</option>
              </select>
            </div>

            {/* Target Client Account */}
            <div>
              <label className="text-[10px] text-gray-500 uppercase font-medium">Target Corporate Account</label>
              <select
                value={customClientName}
                onChange={(e) => setCustomClientName(e.target.value)}
                className="w-full mt-1.5 bg-[#090D16] border border-[#1F2937]/65 rounded-lg px-3 py-2 text-xs text-gray-200 focus:outline-none cursor-pointer"
              >
                <option value="BMW Group">BMW Group</option>
                <option value="Mercedes-Benz Group">Mercedes-Benz Group</option>
                <option value="Volkswagen AG">Volkswagen AG</option>
                <option value="Siemens AG">Siemens AG</option>
                <option value="Airbus SE">Airbus SE</option>
                <option value="SAP SE">SAP SE</option>
                <option value="LVMH Moët Hennessy">LVMH Moët Hennessy</option>
                <option value="Shell plc">Shell plc</option>
                <option value="BP plc">BP plc</option>
                <option value="TotalEnergies SE">TotalEnergies SE</option>
                <option value="Nestlé S.A.">Nestlé S.A.</option>
                <option value="Unilever plc">Unilever plc</option>
              </select>
            </div>

            {/* Disclaimer advisory */}
            <div className="bg-[#090D16]/40 rounded-lg p-3 border border-gray-800 text-[10px] text-gray-500 leading-normal flex gap-2">
              <AlertCircle className="w-4 h-4 text-[#FF9F0A] shrink-0 mt-0.5" />
              <span>Compilation aggregates credit metrics, secondary market spreads and syndicate logs. Restructuring calculations reflect Moody\'s / S&P constraints.</span>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#0A84FF] hover:bg-[#0070E0] text-white rounded-lg font-semibold text-xs transition-colors cursor-pointer"
            >
              Compile & Export Brief
            </button>
          </form>
        </div>

        {/* Right Side: Available Reports Listing */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-[#1F2937]/35">
            <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">Underwriting Dossiers Library</h3>
            <span className="text-[11px] text-gray-500 font-mono">Count: {customReports.length} Briefings Available</span>
          </div>

          <div className="space-y-3.5">
            {customReports.map((report) => {
              const isDownloading = downloadingId === report.id;
              const isSuccess = downloadSuccessId === report.id;

              return (
                <div 
                  key={report.id} 
                  className={`bg-[#111827] border rounded-xl p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                    isSuccess ? 'border-[#30D158]/50 bg-[#30D158]/5' : 'border-[#1F2937]/35'
                  }`}
                >
                  <div className="flex gap-3.5 items-start grow max-w-2xl">
                    <div className="p-2.5 bg-gray-900 border border-gray-800 rounded-lg text-gray-400 shrink-0">
                      <FileText className="w-5 h-5 text-[#0A84FF]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-gray-200 leading-tight">{report.title}</h4>
                        <span className="text-[9px] uppercase tracking-wider font-semibold font-mono bg-gray-800 border border-gray-700/50 px-1.5 py-0.5 rounded text-gray-400">
                          {report.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">{report.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-3 mt-2.5 text-[10px] text-gray-500 font-mono">
                        <span>Account: <strong className="text-gray-300 font-semibold">{report.clientName}</strong></span>
                        <span>• Generated: {report.dateGenerated}</span>
                        <span>• Size: {report.fileSize}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(report)}
                    disabled={isDownloading || isSuccess}
                    className={`px-4 py-2 rounded-lg font-semibold cursor-pointer transition-all shrink-0 flex items-center gap-1.5 min-w-[125px] justify-center ${
                      isSuccess 
                        ? 'bg-[#30D158]/10 text-[#30D158] border border-[#30D158]/35 cursor-default' 
                        : isDownloading 
                          ? 'bg-gray-800 text-gray-500 border border-gray-700 cursor-wait'
                          : 'bg-[#1F2937] hover:bg-[#0A84FF] text-gray-200 hover:text-white border border-[#1F2937]/50 shadow shadow-black'
                    }`}
                  >
                    {isSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Completed</span>
                      </>
                    ) : isDownloading ? (
                      <>
                        <RotateCw className="w-4 h-4 shrink-0 animate-spin" />
                        <span>Compiling...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 shrink-0" />
                        <span>Download</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
