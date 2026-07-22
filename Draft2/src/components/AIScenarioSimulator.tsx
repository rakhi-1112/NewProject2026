/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  TrendingUp,
  ChevronDown,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingDown,
  Briefcase,
  AlertTriangle,
  CheckSquare,
  Info,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ScenarioState {
  scenarioType: string;
  changeInRate: number;
  region: string;
  industry: string;
  timeHorizon: string;
  factors: {
    ecrPolicy: boolean;
    inflationDecrease: boolean;
    [key: string]: boolean;
  };
}

interface ScenarioResult {
  marketImpact: "Positive" | "Negative" | "Neutral";
  confidenceScore: number;
  opportunities: number;
  riskLevel: "Low" | "Medium" | "High";
  timeHorizon: string;
  estimatedRevenueImpact: number;
  reasoning: string[];
  recommendations: {
    title: string;
    priority: "High" | "Medium" | "Low";
    action: string;
  }[];
}

const COLORS = ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

export default function AIScenarioSimulator() {
  const [scenario, setScenario] = useState<ScenarioState>({
    scenarioType: "Interest Rate Change",
    changeInRate: -0.5,
    region: "Europe",
    industry: "Automotive",
    timeHorizon: "6 Months",
    factors: {
      ecrPolicy: true,
      inflationDecrease: true,
    },
  });

  const [simulating, setSimulating] = useState(false);
  const [result, setResult] = useState<ScenarioResult | null>({
    marketImpact: "Positive",
    confidenceScore: 91,
    opportunities: 18,
    riskLevel: "Medium",
    timeHorizon: "6 Months",
    estimatedRevenueImpact: 14.2,
    reasoning: [
      "ECB rate reduction lowers borrowing costs across European markets",
      "High debt maturities in 2025-2027 for automotive sector",
      "Strong ESG push increases green financing activity",
    ],
    recommendations: [
      {
        title: "Schedule meeting with BMW Treasury team",
        priority: "High",
        action: "Discuss refinancing window opportunities",
      },
      {
        title: "Prepare green bond proposal for Siemens",
        priority: "High",
        action: "Capitalize on ESG momentum",
      },
      {
        title: "Engage VW on sustainability linked loan",
        priority: "Medium",
        action: "Position for sustainability initiatives",
      },
      {
        title: "Monitor BASF working capital requirements",
        priority: "Low",
        action: "Track upcoming financing needs",
      },
    ],
  });

  const scenarioImpactData = [
    { month: "Today", revenue: 20, opportunity: 10 },
    { month: "1 Month", revenue: 22, opportunity: 14 },
    { month: "2 Months", revenue: 24, opportunity: 16 },
    { month: "3 Months", revenue: 25, opportunity: 18 },
    { month: "6 Months", revenue: 28, opportunity: 20 },
  ];

  const impactBySectorData = [
    { name: "Automotive", value: 42 },
    { name: "Industrial", value: 25 },
    { name: "Energy", value: 15 },
    { name: "Technology", value: 10 },
    { name: "Other", value: 8 },
  ];

  const scenarioTimelineData = [
    { stage: "Event", time: "Today", status: "completed" },
    { stage: "Market Effect", time: "Week 1", status: "completed" },
    { stage: "Client Impact", time: "Week 2-3", status: "in-progress" },
    { stage: "Booking Yields", time: "Month 2-3", status: "upcoming" },
    { stage: "Deal Realizeable", time: "Month 3-6", status: "upcoming" },
    { stage: "Outcome", time: "Month 6+", status: "upcoming" },
  ];

  const handleSimulate = () => {
    setSimulating(true);
    setTimeout(() => {
      setSimulating(false);
    }, 1500);
  };

  const handleFactorChange = (factor: string) => {
    setScenario({
      ...scenario,
      factors: {
        ...scenario.factors,
        [factor]: !scenario.factors[factor],
      },
    });
  };

  return (
    <div className="flex h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur border-b border-slate-800 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-purple-500" />
              <div>
                <h1 className="text-3xl font-bold text-white">AI Scenario Simulator</h1>
                <p className="text-slate-400 text-sm mt-1">
                  Simulate market scenarios and discover future opportunities with AI
                </p>
              </div>
            </div>
            <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition">
              + New Scenario
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-8 space-y-8">
          {/* Scenario Controls */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Scenario Configuration</h2>
            
            {/* First Row */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Scenario Type
                </label>
                <select
                  value={scenario.scenarioType}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setScenario({ ...scenario, scenarioType: e.target.value })
                  }
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 hover:border-slate-500 cursor-pointer"
                >
                  <option>Interest Rate Change</option>
                  <option>Currency Shock</option>
                  <option>Credit Spread</option>
                  <option>Market Volatility</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Change in Rate
                </label>
                <select
                  value={scenario.changeInRate}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setScenario({ ...scenario, changeInRate: parseFloat(e.target.value) })
                  }
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 hover:border-slate-500 cursor-pointer"
                >
                  <option value={-1}>-1.00 %</option>
                  <option value={-0.75}>-0.75 %</option>
                  <option value={-0.5}>-0.50 %</option>
                  <option value={-0.25}>-0.25 %</option>
                  <option value={0}>0.00 %</option>
                  <option value={0.25}>+0.25 %</option>
                  <option value={0.5}>+0.50 %</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Region
                </label>
                <select
                  value={scenario.region}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setScenario({ ...scenario, region: e.target.value })
                  }
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 hover:border-slate-500 cursor-pointer"
                >
                  <option>Europe</option>
                  <option>Americas</option>
                  <option>APAC</option>
                  <option>UK</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Industry (Optional)
                </label>
                <select
                  value={scenario.industry}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setScenario({ ...scenario, industry: e.target.value })
                  }
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 hover:border-slate-500 cursor-pointer"
                >
                  <option>Automotive</option>
                  <option>Industrial</option>
                  <option>Energy</option>
                  <option>Technology</option>
                  <option>All Industries</option>
                </select>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Time Horizon
                </label>
                <select
                  value={scenario.timeHorizon}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setScenario({ ...scenario, timeHorizon: e.target.value })
                  }
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 hover:border-slate-500 cursor-pointer"
                >
                  <option>1 Month</option>
                  <option>3 Months</option>
                  <option>6 Months</option>
                  <option>12 Months</option>
                </select>
              </div>

              <div className="col-span-3">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Additional Factors (Optional)
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 bg-slate-700/50 px-4 py-2 rounded-lg cursor-pointer hover:bg-slate-700">
                    <input
                      type="checkbox"
                      checked={scenario.factors.ecrPolicy}
                      onChange={() => handleFactorChange("ecrPolicy")}
                      className="w-4 h-4"
                    />
                    <span className="text-slate-300 text-sm">ECB Policy</span>
                  </label>
                  <label className="flex items-center gap-2 bg-slate-700/50 px-4 py-2 rounded-lg cursor-pointer hover:bg-slate-700">
                    <input
                      type="checkbox"
                      checked={scenario.factors.inflationDecrease}
                      onChange={() => handleFactorChange("inflationDecrease")}
                      className="w-4 h-4"
                    />
                    <span className="text-slate-300 text-sm">Inflation Decrease</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Simulate Button */}
            <button
              onClick={handleSimulate}
              disabled={simulating}
              className="w-full bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
            >
              {simulating ? "Simulating..." : "🚀 Simulate Scenario"}
            </button>
          </div>

          {/* Results Section */}
          {result && (
            <>
              {/* Scenario Summary */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-linear-to-br from-slate-800/50 to-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Scenario Summary</h3>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400 text-sm">Market Impact</span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            result.marketImpact === "Positive"
                              ? "bg-green-500/20 text-green-400"
                              : result.marketImpact === "Negative"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {result.marketImpact === "Positive" && "📈"}
                          {result.marketImpact === "Negative" && "📉"}
                          {result.marketImpact === "Neutral" && "➡️"}
                          {" "}
                          {result.marketImpact}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                          Confidence Score
                        </p>
                        <p className="text-3xl font-bold text-white">
                          {result.confidenceScore}%
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="w-24 h-24 mx-auto mb-2">
                          <svg
                            viewBox="0 0 100 100"
                            className="w-full h-full"
                          >
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#334155"
                              strokeWidth="8"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#10B981"
                              strokeWidth="8"
                              strokeDasharray={`${(result.confidenceScore / 100) * 282.7} 282.7`}
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                      <div>
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                          Opportunities
                        </p>
                        <p className="text-2xl font-bold text-white">{result.opportunities}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                          Risk Level
                        </p>
                        <p
                          className={`text-2xl font-bold ${
                            result.riskLevel === "Low"
                              ? "text-green-400"
                              : result.riskLevel === "Medium"
                              ? "text-yellow-400"
                              : "text-red-400"
                          }`}
                        >
                          {result.riskLevel}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-700">
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">
                        Est. Revenue Impact
                      </p>
                      <p className="text-3xl font-bold text-green-400">€{result.estimatedRevenueImpact}M</p>
                    </div>

                    <div className="pt-4 border-t border-slate-700">
                      <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">
                        Time Horizon
                      </p>
                      <p className="text-white font-medium flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-400" />
                        {result.timeHorizon}
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI Reasoning */}
                <div className="bg-linear-to-br from-slate-800/50 to-slate-800/30 border border-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-400" />
                    AI Reasoning Behind Predictions
                  </h3>

                  <div className="space-y-3">
                    {result.reasoning.map((reason, idx) => (
                      <div
                        key={idx}
                        className="flex gap-3 p-3 bg-slate-700/30 rounded-lg border border-slate-600/50"
                      >
                        <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                        <p className="text-slate-300 text-sm">{reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-2 gap-6">
                {/* Scenario Impact Over Time */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Scenario Impact Over Time
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={scenarioImpactData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "1px solid #334155",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "#e2e8f0" }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        name="Revenue Impact (€M)"
                      />
                      <Line
                        type="monotone"
                        dataKey="opportunity"
                        stroke="#10B981"
                        strokeWidth={2}
                        name="Opportunity Count"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Impact by Sector */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Impact by Sector</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={impactBySectorData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name} ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "1px solid #334155",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "#e2e8f0" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Scenario Timeline */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Scenario Timeline</h3>
                <div className="flex items-center justify-between">
                  {scenarioTimelineData.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 ${
                          item.status === "completed"
                            ? "bg-green-500/20 text-green-400"
                            : item.status === "in-progress"
                            ? "bg-blue-500/20 text-blue-400 animate-pulse"
                            : "bg-slate-600 text-slate-400"
                        }`}
                      >
                        {item.status === "completed" && "✓"}
                        {item.status === "in-progress" && "●"}
                        {item.status === "upcoming" && idx + 1}
                      </div>
                      <p className="text-slate-400 text-xs font-medium text-center w-16">
                        {item.stage}
                      </p>
                      <p className="text-slate-500 text-xs mt-1">{item.time}</p>
                      {idx < scenarioTimelineData.length - 1 && (
                        <div className="absolute w-12 h-0.5 bg-slate-600 ml-20 top-6"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Actions */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Recommended Actions</h3>
                <div className="space-y-3">
                  {result.recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:border-slate-500 transition"
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          rec.priority === "High"
                            ? "bg-red-500/20"
                            : rec.priority === "Medium"
                            ? "bg-yellow-500/20"
                            : "bg-green-500/20"
                        }`}
                      >
                        {rec.priority === "High" && (
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                        )}
                        {rec.priority === "Medium" && (
                          <AlertCircle className="w-5 h-5 text-yellow-400" />
                        )}
                        {rec.priority === "Low" && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-white">{rec.title}</h4>
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              rec.priority === "High"
                                ? "bg-red-500/20 text-red-400"
                                : rec.priority === "Medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {rec.priority} Priority
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm">{rec.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
