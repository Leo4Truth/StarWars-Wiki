'use client';

import { useEffect, useRef, useCallback } from 'react';
import cytoscape, { type Core } from 'cytoscape';

interface GraphNode {
  id: string;
  type: string;
  label_zh: string;
  label_en: string;
}

interface GraphEdge {
  source: string;
  target: string;
  type: string;
  label_zh: string;
  label_en: string;
}

interface GraphCanvasProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  locale: string;
  onNodeSelect: (node: GraphNode | null) => void;
  selectedNodeId: string | null;
}

const nodeColors: Record<string, string> = {
  character: '#ffd700',
  film: '#4ade80',
  faction: '#f472b6',
  planet: '#60a5fa',
  event: '#fb923c',
};

const nodeShapes: Record<string, string> = {
  character: 'ellipse',
  film: 'rectangle',
  faction: 'diamond',
  planet: 'round-rectangle',
  event: 'triangle',
};

export default function GraphCanvas({
  nodes,
  edges,
  locale,
  onNodeSelect,
  selectedNodeId,
}: GraphCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cyRef = useRef<Core | null>(null);

  const initCytoscape = useCallback(() => {
    if (!containerRef.current || nodes.length === 0) return;

    // Destroy existing instance
    if (cyRef.current) {
      cyRef.current.destroy();
    }

    const elements: cytoscape.ElementDefinition[] = [];

    // Add nodes
    nodes.forEach((node) => {
      elements.push({
        data: {
          id: node.id,
          label: locale === 'zh-CN' ? node.label_zh : node.label_en,
          type: node.type,
        },
        group: 'nodes',
      });
    });

    // Add edges
    edges.forEach((edge, index) => {
      elements.push({
        data: {
          id: `edge-${index}`,
          source: edge.source,
          target: edge.target,
          label: locale === 'zh-CN' ? edge.label_zh : edge.label_en,
          edgeType: edge.type,
        },
        group: 'edges',
      });
    });

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      style: [
        {
          selector: 'node',
          style: {
            label: 'data(label)',
            'background-color': (ele) => nodeColors[ele.data('type')] || '#888',
            shape: 'ellipse',
            width: 60,
            height: 60,
            'font-size': '12px',
            color: '#f0f0f0',
            'text-wrap': 'ellipsis',
            'text-max-width': '80px',
            'text-valign': 'bottom',
            'text-margin-y': 8,
            'border-width': 2,
            'border-color': '#fff',
            'border-opacity': 0.3,
          },
        },
        {
          selector: 'node:selected',
          style: {
            'border-width': 4,
            'border-color': '#ffd700',
            'border-opacity': 1,
          },
        },
        {
          selector: 'edge',
          style: {
            width: 2,
            'line-color': '#ffd700',
            'target-arrow-color': '#ffd700',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            opacity: 0.6,
            'font-size': '10px',
            color: '#ffd700',
            'text-rotation': 'autorotate',
            'text-background-color': '#0a0a0f',
            'text-background-opacity': 0.8,
            'text-background-padding': '3px',
          },
        },
        {
          selector: 'edge:selected',
          style: {
            'line-color': '#ff6b6b',
            'target-arrow-color': '#ff6b6b',
            opacity: 1,
            width: 3,
          },
        },
      ],
      layout: {
        name: 'cose',
        animate: true,
        animationDuration: 1000,
        nodeRepulsion: () => 8000,
        idealEdgeLength: () => 120,
        gravity: 0.25,
        numIter: 1000,
      },
      minZoom: 0.3,
      maxZoom: 3,
      wheelSensitivity: 0.3,
    });

    // Update shapes after initialization based on node type
    cy.nodes().forEach((node) => {
      const nodeType = node.data('type') as string;
      const shape = nodeShapes[nodeType] || 'ellipse';
      node.style('shape', shape as cytoscape.Css.NodeShape);
    });

    // Event handlers
    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      onNodeSelect(node.data());
    });

    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        onNodeSelect(null);
      }
    });

    // Double click to fit
    cy.on('dblclick', () => {
      cy.fit(undefined, 50);
    });

    cyRef.current = cy;
  }, [nodes, edges, locale, onNodeSelect]);

  // Initialize Cytoscape
  useEffect(() => {
    initCytoscape();

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
        cyRef.current = null;
      }
    };
  }, [initCytoscape]);

  // Update selected node highlight
  useEffect(() => {
    if (!cyRef.current) return;

    cyRef.current.nodes().unselect();
    if (selectedNodeId) {
      cyRef.current.$(`#${selectedNodeId}`).select();
    }
  }, [selectedNodeId]);

  // Handle zoom controls
  const handleZoomIn = () => {
    if (cyRef.current) {
      cyRef.current.zoom(cyRef.current.zoom() * 1.3);
    }
  };

  const handleZoomOut = () => {
    if (cyRef.current) {
      cyRef.current.zoom(cyRef.current.zoom() / 1.3);
    }
  };

  const handleFit = () => {
    if (cyRef.current) {
      cyRef.current.fit(undefined, 50);
    }
  };

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ backgroundColor: '#0a0a0f' }}
      />

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 bg-starwars-blue/80 hover:bg-starwars-blue text-starwars-gold rounded-lg border border-starwars-gold/30 transition-colors flex items-center justify-center"
          title={locale === 'zh-CN' ? '放大' : 'Zoom In'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
          </svg>
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 bg-starwars-blue/80 hover:bg-starwars-blue text-starwars-gold rounded-lg border border-starwars-gold/30 transition-colors flex items-center justify-center"
          title={locale === 'zh-CN' ? '缩小' : 'Zoom Out'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
          </svg>
        </button>
        <button
          onClick={handleFit}
          className="w-10 h-10 bg-starwars-blue/80 hover:bg-starwars-blue text-starwars-gold rounded-lg border border-starwars-gold/30 transition-colors flex items-center justify-center"
          title={locale === 'zh-CN' ? '适应画面' : 'Fit View'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>

      {/* Empty state */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-starwars-gold/60">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <p className="text-lg">{locale === 'zh-CN' ? '加载中...' : 'Loading...'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
