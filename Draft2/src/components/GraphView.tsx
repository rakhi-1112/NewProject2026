/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { 
  Network, 
  Search, 
  Info, 
  Settings, 
  RefreshCw, 
  HelpCircle,
  TrendingUp,
  SlidersHorizontal,
  Route
} from "lucide-react";
import { GraphNode, GraphLink } from "../types";
import { GRAPH_NODES, GRAPH_LINKS } from "../data";

export default function GraphView() {
  const [activeTypeFilter, setActiveTypeFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  // Path Analysis State
  const [sourceNodeId, setSourceNodeId] = useState<string>("");
  const [targetNodeId, setTargetNodeId] = useState<string>("");
  const [computedPath, setComputedPath] = useState<string[]>([]);

  // Apply filters
  const filteredNodes = useMemo(() => {
    return GRAPH_NODES.filter(node => {
      // Type Filter
      if (activeTypeFilter !== "ALL" && node.type !== activeTypeFilter.toLowerCase()) return false;
      
      // Search query
      if (searchQuery.trim() !== "") {
        if (!node.label.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      }
      return true;
    });
  }, [activeTypeFilter, searchQuery]);

  // Generate deterministic coordinates on SVG canvas
  const positionedNodes = useMemo(() => {
    const width = 650;
    const height = 400;
    const nodeCount = filteredNodes.length;

    return filteredNodes.map((node, index) => {
      // Categorical coordinates layout
      let x = 100;
      let y = 100;
      
      if (node.type === "issuer") {
        // Issuers in a central ring
        const angle = (2 * Math.PI * index) / 5;
        x = width / 2 + 100 * Math.cos(angle);
        y = height / 2 + 80 * Math.sin(angle);
      } else if (node.type === "banker") {
        // Bankers along the left
        x = 100;
        y = 50 + (index * 70);
      } else if (node.type === "investor") {
        // Investors along the right
        x = width - 100;
        y = 80 + (index * 80);
      } else if (node.type === "deal") {
        // Deals below center
        x = width / 2 - 50 + (index * 60);
        y = height - 80;
      } else {
        // Peer, Sector, Event scattered on outer layers
        const angle = (2 * Math.PI * index) / (nodeCount || 1);
        x = width / 2 + 180 * Math.cos(angle);
        y = height / 2 + 140 * Math.sin(angle);
      }

      // Keep inside boundaries
      x = Math.max(40, Math.min(width - 40, x));
      y = Math.max(40, Math.min(height - 40, y));

      return {
        ...node,
        x,
        y
      };
    });
  }, [filteredNodes]);

  // Map links to positioned coordinates
  const linkLines = useMemo(() => {
    return GRAPH_LINKS.map(link => {
      const sourceId = typeof link.source === "string" ? link.source : (link.source as any).id;
      const targetId = typeof link.target === "string" ? link.target : (link.target as any).id;

      const sourceNode = positionedNodes.find(n => n.id === sourceId);
      const targetNode = positionedNodes.find(n => n.id === targetId);

      if (sourceNode && targetNode) {
        // Check if this link lies within our computed relationship path
        let isPathHighlight = false;
        if (computedPath.length > 0) {
          for (let i = 0; i < computedPath.length - 1; i++) {
            if ((computedPath[i] === sourceId && computedPath[i+1] === targetId) ||
                (computedPath[i] === targetId && computedPath[i+1] === sourceId)) {
              isPathHighlight = true;
              break;
            }
          }
        }

        return {
          id: `${sourceId}-${targetId}`,
          x1: sourceNode.x,
          y1: sourceNode.y,
          x2: targetNode.x,
          y2: targetNode.y,
          label: link.label,
          isHighlight: isPathHighlight
        };
      }
      return null;
    }).filter(Boolean);
  }, [positionedNodes, computedPath]);

  // Click on a node
  const handleNodeClick = (node: GraphNode) => {
    setSelectedNodeId(node.id);
  };

  const selectedNode = useMemo(() => {
    return GRAPH_NODES.find(n => n.id === selectedNodeId) || null;
  }, [selectedNodeId]);

  // Simple path analysis simulator (BF Search for short relationship paths)
  const handleRunPathAnalysis = () => {
    if (!sourceNodeId || !targetNodeId) {
      alert("Select source and target nodes to calculate relationship path.");
      return;
    }

    if (sourceNodeId === targetNodeId) {
      setComputedPath([sourceNodeId]);
      return;
    }

    // Build standard adjacency representation
    const adj: { [key: string]: string[] } = {};
    GRAPH_NODES.forEach(n => adj[n.id] = []);
    
    GRAPH_LINKS.forEach(l => {
      const s = typeof l.source === "string" ? l.source : (l.source as any).id;
      const t = typeof l.target === "string" ? l.target : (l.target as any).id;
      if (adj[s] && adj[t]) {
        adj[s].push(t);
        adj[t].push(s);
      }
    });

    // Run simple BFS queue
    const queue: string[][] = [[sourceNodeId]];
    const visited = new Set<string>([sourceNodeId]);

    while (queue.length > 0) {
      const path = queue.shift()!;
      const curr = path[path.length - 1];

      if (curr === targetNodeId) {
        setComputedPath(path);
        return;
      }

      for (const neighbor of (adj[curr] || [])) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      }
    }

    alert("No connected relationship path found between the selected entities.");
    setComputedPath([]);
  };

  const handleClearPath = () => {
    setSourceNodeId("");
    setTargetNodeId("");
    setComputedPath([]);
  };

  return (
    <div className="space-y-6" id="graph-view-root">
      {/* Search and Filters bar */}
      <div className="border border-slate-800 bg-slate-950 p-4 rounded flex flex-col md:flex-row justify-between items-center gap-4" id="graph-filters-bar">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 font-semibold uppercase">
            <SlidersHorizontal className="h-4 w-4 text-sky-400" /> Filter Nodes:
          </div>
          <div className="flex bg-slate-900 rounded p-0.5 border border-slate-800" id="graph-type-filter-group">
            {["ALL", "ISSUER", "BANKER", "DEAL", "INVESTOR", "PEER"].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTypeFilter(tab)}
                className={`px-2.5 py-1 text-[10px] font-mono font-medium rounded transition cursor-pointer ${
                  activeTypeFilter === tab ? "bg-sky-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full md:w-64" id="graph-search">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search network nodes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded pl-8 pr-3 py-2 text-xs font-mono text-slate-200 placeholder-slate-500 outline-none focus:border-sky-500 transition"
          />
        </div>
      </div>

      {/* Main Workspace split */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4" id="graph-workspace">
        {/* Left Control Panel: Path Analysis & Controls */}
        <div className="space-y-4 lg:col-span-1" id="graph-controls-panel">
          {/* Path Analysis Widget */}
          <div className="border border-slate-800 bg-slate-950 p-4 rounded space-y-4" id="path-analysis-widget">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-sky-400 uppercase border-b border-slate-900 pb-2">
              <Route className="h-4 w-4" /> Relationship Path Analysis
            </div>
            
            <div className="space-y-3 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-[9px] uppercase text-slate-500 font-bold block">Source Entity</label>
                <select 
                  value={sourceNodeId}
                  onChange={(e) => setSourceNodeId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 outline-none"
                >
                  <option value="">Select entity...</option>
                  {GRAPH_NODES.map(n => (
                    <option key={n.id} value={n.id}>{n.label} ({n.type})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase text-slate-500 font-bold block">Target Destination</label>
                <select 
                  value={targetNodeId}
                  onChange={(e) => setTargetNodeId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 outline-none"
                >
                  <option value="">Select entity...</option>
                  {GRAPH_NODES.map(n => (
                    <option key={n.id} value={n.id}>{n.label} ({n.type})</option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex gap-1.5">
                <button 
                  onClick={handleRunPathAnalysis}
                  className="flex-1 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded transition cursor-pointer text-center"
                >
                  RUN SHORTEST PATH
                </button>
                <button 
                  onClick={handleClearPath}
                  className="py-1.5 px-3.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 text-xs rounded transition cursor-pointer"
                >
                  CLEAR
                </button>
              </div>

              {computedPath.length > 0 && (
                <div className="space-y-2 p-2 bg-slate-900/60 border border-slate-900 rounded mt-3">
                  <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-wider block">Shortest Relationship Identified</span>
                  <div className="space-y-1 font-sans text-slate-300 text-[11px]">
                    {computedPath.map((nodeId, idx) => {
                      const matchedNode = GRAPH_NODES.find(n => n.id === nodeId);
                      return (
                        <div key={nodeId} className="flex items-center gap-1.5">
                          <span className="font-mono text-slate-500 text-[9px] font-bold">#{idx+1}</span>
                          <span className="font-semibold text-white">{matchedNode?.label}</span>
                          <span className="text-[9px] font-mono text-slate-500">({matchedNode?.type})</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Node details / inspector */}
          <div className="border border-slate-800 bg-slate-950 p-4 rounded h-[230px]" id="graph-node-inspector">
            <span className="text-xs font-mono text-slate-400 font-bold uppercase block mb-3 border-b border-slate-900 pb-2">Node Diagnostics</span>
            {selectedNode ? (
              <div className="font-mono text-xs space-y-3" id="diagnostics-box">
                <div>
                  <span className="text-[9px] uppercase text-sky-400 block">{selectedNode.type} Node</span>
                  <h4 className="text-sm font-bold text-white font-sans mt-0.5">{selectedNode.label}</h4>
                </div>
                <p className="text-slate-400 font-sans text-xs leading-relaxed">
                  Active diagnostic link within European corporate origination pipeline. Clicking peer networks shows adjacent swap premium and matching underwritings.
                </p>
                <div className="text-[9px] text-slate-500 pt-1.5">
                  ID: {selectedNode.id}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-3 h-full pb-8">
                <Network className="h-6 w-6 text-slate-700 mb-2" />
                <p className="text-[11px] text-slate-500 font-sans">
                  Click on any node in the canvas network workspace to display connection diagnostic telemetry logs.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Canvas: Large SVG Interactive Graph Workspace */}
        <div className="border border-slate-800 bg-slate-950 p-4 rounded lg:col-span-3 flex flex-col h-[520px]" id="large-network-panel">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-mono text-slate-400 font-semibold tracking-wide uppercase">Interactive Network schematic ({filteredNodes.length} visible entities)</span>
            <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block"></span> Issuer</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Banker</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block"></span> Deal</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span> Investor</span>
            </div>
          </div>

          <div className="flex-1 border border-slate-900 bg-slate-950/80 rounded relative overflow-hidden" id="large-canvas-box">
            <svg className="w-full h-full" id="large-graph-svg">
              <defs>
                <marker id="large-arrow" viewBox="0 0 10 10" refX="16" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e293b" />
                </marker>
                <marker id="highlight-arrow" viewBox="0 0 10 10" refX="16" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#0284c7" />
                </marker>
              </defs>

              {/* Link lines */}
              {linkLines.map(line => (
                <g key={line!.id} className="opacity-80">
                  <line 
                    x1={line!.x1} 
                    y1={line!.y1} 
                    x2={line!.x2} 
                    y2={line!.y2} 
                    stroke={line!.isHighlight ? "#0284c7" : "#1e293b"} 
                    strokeWidth={line!.isHighlight ? "3.5" : "1.5"} 
                    strokeDasharray={line!.isHighlight ? "none" : "3 3"}
                    markerEnd={line!.isHighlight ? "url(#highlight-arrow)" : "url(#large-arrow)"}
                  />
                  <text 
                    x={(line!.x1 + line!.x2) / 2} 
                    y={(line!.y1 + line!.y2) / 2 - 5}
                    fill={line!.isHighlight ? "#38bdf8" : "#475569"}
                    fontSize={7}
                    textAnchor="middle"
                    className="font-mono font-semibold"
                  >
                    {line!.label}
                  </text>
                </g>
              ))}

              {/* Node circles */}
              {positionedNodes.map(node => {
                const isSelected = selectedNodeId === node.id;
                const isPathNode = computedPath.includes(node.id);
                
                let color = "fill-slate-800 stroke-slate-700";
                if (node.type === "issuer") color = "fill-sky-950 stroke-sky-400 stroke-2";
                else if (node.type === "banker") color = "fill-emerald-950 stroke-emerald-500";
                else if (node.type === "deal") color = "fill-indigo-950 stroke-indigo-500";
                else if (node.type === "investor") color = "fill-amber-950 stroke-amber-500";
                else if (node.type === "peer") color = "fill-purple-950 stroke-purple-500";
                else if (node.type === "event") color = "fill-teal-950 stroke-teal-500";

                return (
                  <g 
                    key={node.id} 
                    onClick={() => handleNodeClick(node)}
                    className="cursor-pointer group"
                  >
                    <circle 
                      cx={node.x} 
                      cy={node.y} 
                      r={node.type === "issuer" ? 22 : 14} 
                      className={`${color} ${
                        isSelected ? "stroke-white stroke-2 scale-105" : 
                        isPathNode ? "stroke-emerald-400 stroke-2 shadow-lg" : ""
                      } transition-transform duration-200`} 
                    />
                    
                    <text 
                      x={node.x} 
                      y={node.y + 3} 
                      fill="#f8fafc" 
                      fontSize={node.type === "issuer" ? 9 : 7}
                      textAnchor="middle" 
                      className="font-mono font-bold select-none pointer-events-none"
                    >
                      {node.label.slice(0, 2).toUpperCase()}
                    </text>

                    {/* Node Label Text */}
                    <text 
                      x={node.x} 
                      y={node.y + 24} 
                      fill={isSelected ? "#f8fafc" : isPathNode ? "#34d399" : "#94a3b8"} 
                      fontSize={8} 
                      textAnchor="middle" 
                      className={`font-mono select-none pointer-events-none ${isSelected || isPathNode ? "font-bold" : ""}`}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
