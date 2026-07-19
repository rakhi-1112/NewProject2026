import React from 'react';
import { Settings, ShieldCheck, Database, Server, Key, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function SettingsPanel() {
  return (
    <div className="space-y-6 animate-fade-in text-xs max-w-4xl">
      {/* Title */}
      <div>
        <h1 className="text-xl font-display font-bold text-gray-100 tracking-tight flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-400" />
          SIG System Configuration
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Review syndicate terminal variables, cloud container environments, and analytical model configurations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Environment Profile */}
        <div className="bg-[#111827] border border-[#1F2937]/35 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1F2937]/35">
            <Server className="w-4 h-4 text-[#0A84FF]" />
            <h3 className="text-xs font-display font-bold uppercase tracking-wider text-gray-200">Terminal Environment</h3>
          </div>

          <div className="space-y-3.5">
            <div className="flex justify-between items-center bg-[#090D16]/40 p-2.5 rounded border border-[#1F2937]/15">
              <span className="text-gray-500 uppercase font-medium text-[9px]">Ingress Host Port</span>
              <span className="text-gray-200 font-mono font-semibold">3000 (Routed)</span>
            </div>
            <div className="flex justify-between items-center bg-[#090D16]/40 p-2.5 rounded border border-[#1F2937]/15">
              <span className="text-gray-500 uppercase font-medium text-[9px]">Runtime Container</span>
              <span className="text-gray-200 font-mono font-semibold">Cloud Run (Linux Sandbox)</span>
            </div>
            <div className="flex justify-between items-center bg-[#090D16]/40 p-2.5 rounded border border-[#1F2937]/15">
              <span className="text-gray-500 uppercase font-medium text-[9px]">HMR Status</span>
              <span className="text-[#FF453A] font-mono font-bold">DISABLED (Agent Control)</span>
            </div>
            <div className="flex justify-between items-center bg-[#090D16]/40 p-2.5 rounded border border-[#1F2937]/15">
              <span className="text-gray-500 uppercase font-medium text-[9px]">Primary Database</span>
              <span className="text-[#30D158] font-mono font-bold flex items-center gap-1">
                <Database className="w-3.5 h-3.5" />
                Local JSON Schema Engine
              </span>
            </div>
          </div>
        </div>

        {/* Credentials & Key Security Info */}
        <div className="bg-[#111827] border border-[#1F2937]/35 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1F2937]/35">
            <Key className="w-4 h-4 text-[#FF9F0A]" />
            <h3 className="text-xs font-display font-bold uppercase tracking-wider text-gray-200">API Key Security Protocols</h3>
          </div>

          <div className="bg-[#090D16]/55 border border-[#1F2937]/50 rounded-lg p-3.5 text-left text-[11px] text-gray-400 leading-relaxed">
            <p className="font-semibold text-gray-300">Environment Credentials</p>
            <p className="mt-1">
              API secrets are managed securely by the platform control layer. All sensitive keys are stored inside user environment configurations, completely hidden from the front-end browser terminal, adhering to strict enterprise compliance guidelines.
            </p>
            <p className="mt-3">
              To inject custom variables, document them inside <code className="text-gray-200 font-mono bg-gray-800 px-1 py-0.5 rounded border border-gray-700/50">.env.example</code>. The workspace will automatically prompt the user to input coordinates securely.
            </p>
          </div>

          <div className="bg-[#30D158]/10 border border-[#30D158]/30 rounded p-3 text-[#30D158] font-medium text-[11px] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Enterprise Security Status: <strong>COMPLIANT</strong></span>
          </div>
        </div>

      </div>
    </div>
  );
}
