import React, { useState, useRef, useEffect } from 'react';
import { Network, Search, Filter, ZoomIn, ZoomOut, RefreshCw, X, ShieldAlert, Sparkles, User, Briefcase, HelpCircle, Activity } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  type: 'Company' | 'Executive' | 'Banker' | 'Product' | 'Rating' | 'Investor';
  x: number;
  y: number;
  details: {
    title: string;
    description: string;
    metrics?: Record<string, string>;
  };
}

interface Edge {
  source: string;
  target: string;
  label: string;
}

interface KnowledgeGraphProps {
  onSelectCompany: (companyId: string) => void;
}

export default function KnowledgeGraph({ onSelectCompany }: KnowledgeGraphProps) {
  // Set up predefined node positions mapping relationships centering around BMW Group
  const initialNodes: Node[] = [
    { id: 'bmw', label: 'BMW Group', type: 'Company', x: 300, y: 220, details: { title: 'BMW Group (BMW GY)', description: 'German multinational manufacturer of luxury vehicles and motorcycles.', metrics: { 'Market Cap': '€64.8B', 'Credit Rating': 'A2 / A (Stable)', 'Readiness Score': '88%' } } },
    { id: 'walter', label: 'Dr. Walter Schmit', type: 'Executive', x: 120, y: 150, details: { title: 'Dr. Walter Schmit (Group Treasurer)', description: 'Key corporate decision maker. Highly receptive to green finance.', metrics: { 'Relationship Strength': 'Strong (92%)', 'Last Contact': '2026-07-02' } } },
    { id: 'oliver', label: 'Oliver Zipse', type: 'Executive', x: 150, y: 280, details: { title: 'Oliver Zipse (CEO)', description: 'Focus remains on EV JV battery expansion in Eastern Europe.', metrics: { 'Relationship Strength': 'Average (72%)', 'Last Contact': '2026-05-14' } } },
    { id: 'marcus', label: 'Marcus Vance', type: 'Banker', x: 480, y: 140, details: { title: 'Marcus Vance (Coverage Director)', description: 'Manages core BMW coverage relationship. Leads client strategy.', metrics: { 'Role': 'Senior Coverage Banker', 'Email': 'm.vance@sig.banking.com' } } },
    { id: 'elizabeth', label: 'Elizabeth Sterling', type: 'Banker', x: 500, y: 240, details: { title: 'Elizabeth Sterling (DCM Head)', description: 'Manages debt capital markets issuance structures and syndication briefings.', metrics: { 'Role': 'Senior DCM Lead', 'Email': 'e.sterling@sig.banking.com' } } },
    { id: 'sarah', label: 'Sarah Jenkins', type: 'Banker', x: 420, y: 340, details: { title: 'Sarah Jenkins (Syndication Lead)', description: 'Reviews institutional market orderbooks and pricing curves.', metrics: { 'Role': 'Syndication Director', 'Email': 's.jenkins@sig.banking.com' } } },
    { id: 'green_bond', label: '€1.25B Green Bond', type: 'Product', x: 300, y: 400, details: { title: 'Green Bond (Senior Unsecured)', description: 'Underwriting target product. Promotes battery factory green alignment.', metrics: { 'Target Amount': '€1.25B', 'Estimated Underwriting Fee': '€4.5M', 'Est. Coupon': '3.25%' } } },
    { id: 'moodys', label: "Moody's Rating", type: 'Rating', x: 160, y: 400, details: { title: "Moody's Investors Service", description: 'Maintains A2 rating with stable outlook.', metrics: { 'Current Rating': 'A2', 'Last Action': 'Outlook Confirmed' } } },
    { id: 'london_esg', label: 'London ESG Trust', type: 'Investor', x: 520, y: 440, details: { title: 'London ESG Sustainable Fund', description: 'Major European green asset manager. Frequently anchors BMW orderbooks.', metrics: { 'AUM Earmarked': '€2.5B', 'Investment Mandate': 'Green Taxonomy Aligned' } } }
  ];

  const initialEdges: Edge[] = [
    { source: 'walter', target: 'bmw', label: 'Treasurer of' },
    { source: 'oliver', target: 'bmw', label: 'CEO of' },
    { source: 'marcus', target: 'bmw', label: 'Covers account' },
    { source: 'elizabeth', target: 'bmw', label: 'Advises Debt' },
    { source: 'sarah', target: 'bmw', label: 'Syndicates' },
    { source: 'bmw', target: 'green_bond', label: 'Recommends Issuing' },
    { source: 'walter', target: 'marcus', label: 'Frequent contact' },
    { source: 'bmw', target: 'moodys', label: 'Rated by' },
    { source: 'london_esg', target: 'green_bond', label: 'Targets anchor' }
  ];

  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges] = useState<Edge[]>(initialEdges);
  
  // Interaction states
  const [selectedNode, setSelectedNode] = useState<Node | null>(initialNodes[0]); // Default to BMW
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDraggingNode, setIsDraggingNode] = useState<string | null>(null);
  const [isPanningCanvas, setIsPanningCanvas] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([
    'Company', 'Executive', 'Banker', 'Product', 'Rating', 'Investor'
  ]);

  const canvasRef = useRef<SVGSVGElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // Pan canvas tracking
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current || (e.target as HTMLElement).tagName === 'g') {
      setIsPanningCanvas(true);
      dragStartPos.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isPanningCanvas) {
      setPan({
        x: e.clientX - dragStartPos.current.x,
        y: e.clientY - dragStartPos.current.y
      });
    } else if (isDraggingNode) {
      const svg = canvasRef.current;
      if (!svg) return;
      
      const rect = svg.getBoundingClientRect();
      const rawX = e.clientX - rect.left;
      const rawY = e.clientY - rect.top;

      // Adjust for zoom and pan coordinates
      const adjustedX = (rawX - pan.x) / zoom;
      const adjustedY = (rawY - pan.y) / zoom;

      setNodes(prev => prev.map(n => {
        if (n.id === isDraggingNode) {
          return { ...n, x: adjustedX, y: adjustedY };
        }
        return n;
      }));
    }
  };

  const handleCanvasMouseUp = () => {
    setIsPanningCanvas(false);
    setIsDraggingNode(null);
  };

  // Node specific drag startup
  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setIsDraggingNode(nodeId);
  };

  const handleNodeClick = (e: React.MouseEvent, node: Node) => {
    e.stopPropagation();
    setSelectedNode(node);

    // Compute neighboring nodes
    const neighbors = [node.id];
    edges.forEach(edge => {
      if (edge.source === node.id) neighbors.push(edge.target);
      if (edge.target === node.id) neighbors.push(edge.source);
    });
    setHighlightedNodes(neighbors);
  };

  const clearSelection = () => {
    setSelectedNode(null);
    setHighlightedNodes([]);
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => {
      if (direction === 'in') return Math.min(prev + 0.15, 2.0);
      return Math.max(prev - 0.15, 0.5);
    });
  };

  const resetGraph = () => {
    setNodes(initialNodes);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedNode(initialNodes[0]);
    setHighlightedNodes([]);
  };

  // Toggle node type filter
  const toggleFilter = (type: string) => {
    setActiveFilters(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      }
      return [...prev, type];
    });
  };

  // Search filter
  const searchedNodes = nodes.filter(n => 
    n.label.toLowerCase().includes(searchTerm.toLowerCase()) && 
    activeFilters.includes(n.type)
  );

  return (
    <div className="space-y-6 animate-fade-in text-xs">
      {/* Title */}
      <div>
        <h1 className="text-xl font-display font-bold text-gray-100 tracking-tight flex items-center gap-2">
          <Network className="w-5 h-5 text-[#0A84FF]" />
          Syndicate Intelligence Knowledge Graph
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Interactive map of corporate treasurers, coverage bankers, institutional buy-side anchors, and pending mandates.
        </p>
      </div>

      {/* Control Strip */}
      <div className="bg-[#111827] border border-[#1F2937]/35 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Type Toggle Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {['Company', 'Executive', 'Banker', 'Product', 'Rating', 'Investor'].map(type => {
            const isActive = activeFilters.includes(type);
            let activeColor = 'border-[#0A84FF] text-white bg-[#0A84FF]/10';
            if (!isActive) activeColor = 'border-gray-800 text-gray-500 hover:text-gray-300';

            return (
              <button
                key={type}
                onClick={() => toggleFilter(type)}
                className={`px-3 py-1.5 rounded-lg border text-[11px] font-medium tracking-wide transition-all cursor-pointer ${activeColor}`}
              >
                {type}
              </button>
            );
          })}
        </div>

        {/* Search & Tool Buttons */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center bg-[#090D16] border border-[#1F2937]/65 rounded-lg px-2.5 py-1.5 text-xs text-gray-400 grow md:grow-0">
            <Search className="w-3.5 h-3.5 text-gray-500 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search graph nodes..."
              className="bg-transparent text-xs text-gray-200 focus:outline-none placeholder-gray-500 w-36"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center bg-[#090D16] border border-[#1F2937]/65 rounded-lg p-1">
            <button 
              onClick={() => handleZoom('in')}
              className="p-1.5 hover:bg-[#1F2937] text-gray-400 hover:text-white rounded cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleZoom('out')}
              className="p-1.5 hover:bg-[#1F2937] text-gray-400 hover:text-white rounded cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button 
              onClick={resetGraph}
              className="p-1.5 hover:bg-[#1F2937] text-gray-400 hover:text-white rounded cursor-pointer"
              title="Reset Zoom & Coordinates"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Graph Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Interactive canvas */}
        <div className="lg:col-span-3 bg-[#0B0E14] border border-[#1F2937]/40 rounded-xl h-[480px] overflow-hidden relative select-none">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:16px_16px] opacity-35"></div>

          <svg
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing relative"
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
          >
            {/* SVG contents scaled by Zoom & Pan */}
            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              
              {/* Edges/Lines layer */}
              {edges.map((edge, i) => {
                const sourceNode = nodes.find(n => n.id === edge.source);
                const targetNode = nodes.find(n => n.id === edge.target);

                if (!sourceNode || !targetNode) return null;

                // Check if nodes are visible under current layer filters
                const isSourceVisible = activeFilters.includes(sourceNode.type);
                const isTargetVisible = activeFilters.includes(targetNode.type);
                if (!isSourceVisible || !isTargetVisible) return null;

                const isEdgeHighlighted = highlightedNodes.length > 0 && 
                  highlightedNodes.includes(edge.source) && 
                  highlightedNodes.includes(edge.target);

                return (
                  <g key={`edge-${i}`} className="transition-all duration-300">
                    <line
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={isEdgeHighlighted ? '#0A84FF' : '#1F2937'}
                      strokeWidth={isEdgeHighlighted ? 2.5 : 1.2}
                      strokeDasharray={sourceNode.type === 'Product' || targetNode.type === 'Product' ? '5,5' : 'none'}
                    />
                    {/* Tiny edge labels */}
                    <text
                      x={(sourceNode.x + targetNode.x) / 2}
                      y={(sourceNode.y + targetNode.y) / 2 - 4}
                      fill={isEdgeHighlighted ? '#94A3B8' : '#475569'}
                      className="text-[9px] font-mono select-none pointer-events-none text-center"
                      textAnchor="middle"
                    >
                      {edge.label}
                    </text>
                  </g>
                );
              })}

              {/* Nodes layer */}
              {nodes.map((node) => {
                const isNodeVisible = activeFilters.includes(node.type);
                if (!isNodeVisible) return null;

                const isSelected = selectedNode?.id === node.id;
                const isDimmed = highlightedNodes.length > 0 && !highlightedNodes.includes(node.id);
                
                // Color formatting depending on Node Type
                let fillClass = 'fill-[#111827] stroke-[#1F2937]';
                let textClass = 'fill-gray-300';
                
                if (node.type === 'Company') {
                  fillClass = isSelected ? 'fill-[#0A84FF]/20 stroke-[#0A84FF]' : 'fill-[#0A84FF]/10 stroke-[#0A84FF]/70';
                  textClass = 'fill-[#0A84FF] font-semibold';
                } else if (node.type === 'Executive') {
                  fillClass = isSelected ? 'fill-[#FF9F0A]/20 stroke-[#FF9F0A]' : 'fill-[#FF9F0A]/10 stroke-[#FF9F0A]/70';
                  textClass = 'fill-[#FF9F0A]';
                } else if (node.type === 'Banker') {
                  fillClass = isSelected ? 'fill-[#30D5C8]/20 stroke-[#30D5C8]' : 'fill-[#30D5C8]/10 stroke-[#30D5C8]/70';
                  textClass = 'fill-[#30D5C8]';
                } else if (node.type === 'Product') {
                  fillClass = isSelected ? 'fill-[#30D158]/20 stroke-[#30D158]' : 'fill-[#30D158]/10 stroke-[#30D158]/70';
                  textClass = 'fill-[#30D158]';
                } else if (node.type === 'Rating') {
                  fillClass = isSelected ? 'fill-[#FF453A]/20 stroke-[#FF453A]' : 'fill-[#FF453A]/10 stroke-[#FF453A]/70';
                  textClass = 'fill-[#FF453A]';
                }

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    className={`cursor-pointer transition-opacity duration-300 ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
                    onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                    onClick={(e) => handleNodeClick(e, node)}
                  >
                    <rect
                      width={125}
                      height={32}
                      x={-62.5}
                      y={-16}
                      rx={6}
                      className={`${fillClass} stroke-[1.5] transition-colors`}
                    />
                    <text
                      textAnchor="middle"
                      y={4}
                      className={`text-[10px] select-none font-display ${textClass}`}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}

            </g>
          </svg>

          {/* Canvas HUD overlays */}
          <div className="absolute bottom-4 left-4 flex flex-col gap-1 text-[10px] font-mono text-gray-500 bg-[#090D16]/80 px-2.5 py-2 rounded-lg border border-[#1F2937]/50 backdrop-blur-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded bg-[#0A84FF]"></span>
              <span>Client Nodes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded bg-[#30D5C8]"></span>
              <span>Syndicate Bankers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded bg-[#30D158]"></span>
              <span>Products/Mandates</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 pt-1 border-t border-gray-800">
              <span>Zoom Scale: {Math.round(zoom * 100)}%</span>
            </div>
          </div>

          <div className="absolute top-4 right-4 bg-[#090D16]/80 text-[10px] text-gray-400 border border-[#1F2937]/50 rounded-lg px-2 py-1.5 backdrop-blur-xs">
            <span>💡 Drag nodes to manually organize</span>
          </div>
        </div>

        {/* Detail Panel Drawer on Right side */}
        <div className="bg-[#111827] border border-[#1F2937]/35 rounded-xl p-4 flex flex-col h-[480px]">
          {selectedNode ? (
            <div className="flex flex-col h-full animate-fade-in justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#1F2937]/35">
                  <span className="text-[10px] font-mono uppercase bg-[#1F2937] px-2 py-0.5 rounded text-gray-400">
                    {selectedNode.type} Node Info
                  </span>
                  <button 
                    onClick={clearSelection}
                    className="p-1 hover:bg-[#1F2937] text-gray-500 hover:text-white rounded cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4">
                  <h3 className="text-xs font-display font-extrabold text-white">{selectedNode.details.title}</h3>
                  <p className="text-[11px] text-gray-400 mt-2.5 leading-relaxed">{selectedNode.details.description}</p>
                </div>

                {selectedNode.details.metrics && (
                  <div className="mt-5 space-y-3 pt-4 border-t border-[#1F2937]/25">
                    {Object.entries(selectedNode.details.metrics).map(([key, val]) => (
                      <div key={key} className="flex justify-between items-center bg-[#090D16]/40 p-2 rounded border border-[#1F2937]/20">
                        <span className="text-gray-500 text-[10px] uppercase font-medium">{key}</span>
                        <span className="text-gray-200 font-semibold font-mono text-[11px]">{val}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action redirect button */}
              <div className="mt-auto pt-3 border-t border-[#1F2937]/25">
                {selectedNode.type === 'Company' ? (
                  <button
                    onClick={() => {
                      onSelectCompany(selectedNode.id);
                    }}
                    className="w-full py-2 bg-[#0A84FF] hover:bg-[#0070E0] text-white rounded-md text-center font-semibold cursor-pointer"
                  >
                    Enter Client 360 Dossier
                  </button>
                ) : (
                  <div className="bg-[#1F2937]/20 rounded-lg p-2.5 flex gap-2 border border-[#1F2937]/45 text-[10px] text-gray-500 leading-normal">
                    <Sparkles className="w-4.5 h-4.5 text-[#0A84FF] shrink-0 mt-0.5" />
                    <span>SIG continuous semantic mapping links coverage rosters with institutional flows automatically.</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 text-gray-500">
              <Network className="w-10 h-10 text-gray-700 mb-3" />
              <p className="font-semibold text-gray-400 text-xs">No Node Selected</p>
              <p className="text-[11px] text-gray-500 mt-1 max-w-xs leading-normal">
                Click any node on the Intelligence Graph to review treasury assignments, rating metrics, or anchor investments.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
