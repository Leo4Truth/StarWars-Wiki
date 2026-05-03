'use client';

import { useState, useEffect, useCallback } from 'react';
import GraphCanvas from '@/components/graph/GraphCanvas';
import GraphControls from '@/components/graph/GraphControls';
import GraphDetailPopup from '@/components/graph/GraphDetailPopup';

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

interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

interface GraphPageProps {
  params: Promise<{ locale: string }>;
}

export default function GraphPage({ params }: GraphPageProps) {
  const [locale, setLocale] = useState<string>('en-US');
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], edges: [] });
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [depth, setDepth] = useState<number>(2);
  const [entityId, setEntityId] = useState<string>('char_luke');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Unwrap params
  useEffect(() => {
    params.then((p) => setLocale(p.locale));
  }, [params]);

  // Fetch graph data
  const fetchGraphData = useCallback(async () => {
    if (!entityId.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';
      const response = await fetch(
        `${apiBase}/api/v1/graph/subgraph?entity_id=${encodeURIComponent(entityId)}&depth=${depth}&locale=${locale}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch graph data');
      }

      const data = await response.json();
      setGraphData({
        nodes: data.nodes || [],
        edges: data.edges || [],
      });
    } catch (err) {
      console.error('Error fetching graph:', err);
      setError(locale === 'zh-CN' ? '获取图谱数据失败' : 'Failed to fetch graph data');
      setGraphData({ nodes: [], edges: [] });
    } finally {
      setIsLoading(false);
    }
  }, [entityId, depth, locale]);

  // Fetch on mount and when parameters change
  useEffect(() => {
    fetchGraphData();
  }, [fetchGraphData]);

  // Handle node selection
  const handleNodeSelect = useCallback((node: GraphNode | null) => {
    setSelectedNode(node);
    setSelectedNodeId(node?.id || null);
  }, []);

  // Handle entity ID change
  const handleEntityIdChange = useCallback((id: string) => {
    setEntityId(id);
  }, []);

  // Handle depth change
  const handleDepthChange = useCallback((newDepth: number) => {
    setDepth(newDepth);
  }, []);

  // Handle reset
  const handleReset = useCallback(() => {
    setSelectedNode(null);
    setSelectedNodeId(null);
    setDepth(2);
    setEntityId('char_luke');
  }, []);

  const pageTitle = locale === 'zh-CN' ? '知识图谱' : 'Knowledge Graph';

  return (
    <div className="relative w-full h-[calc(100vh-140px)] min-h-[600px]">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-starwars-black/90 to-transparent pt-4 pb-8 px-4">
        <h1 className="text-3xl font-bold text-starwars-gold text-center">
          {pageTitle}
        </h1>
        <p className="text-center text-starwars-gold/60 text-sm mt-2">
          {locale === 'zh-CN'
            ? '探索星球大战宇宙中角色、电影和阵营之间的关系'
            : 'Explore relationships between characters, films, and factions in the Star Wars universe'}
        </p>
      </div>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-starwars-black/50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-starwars-gold/30 border-t-starwars-gold rounded-full animate-spin" />
            <p className="text-starwars-gold">{locale === 'zh-CN' ? '加载中...' : 'Loading...'}</p>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 z-30 bg-red-900/80 border border-red-500/50 rounded-lg px-4 py-2">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      {/* Graph canvas */}
      <div className="absolute inset-0 pt-24">
        <GraphCanvas
          nodes={graphData.nodes}
          edges={graphData.edges}
          locale={locale}
          onNodeSelect={handleNodeSelect}
          selectedNodeId={selectedNodeId}
        />
      </div>

      {/* Controls */}
      <GraphControls
        locale={locale}
        depth={depth}
        onDepthChange={handleDepthChange}
        selectedEntityId={entityId}
        onEntityIdChange={handleEntityIdChange}
        onReset={handleReset}
      />

      {/* Detail popup */}
      <GraphDetailPopup
        node={selectedNode}
        locale={locale}
        onClose={() => setSelectedNode(null)}
      />

      {/* Instructions */}
      <div className="absolute bottom-4 right-4 z-10 text-xs text-starwars-gold/40 max-w-xs text-right">
        <p>{locale === 'zh-CN' ? '点击节点查看详情' : 'Click node to view details'}</p>
        <p>{locale === 'zh-CN' ? '双击适应画面' : 'Double-click to fit view'}</p>
        <p>{locale === 'zh-CN' ? '拖拽移动节点' : 'Drag to move nodes'}</p>
        <p>{locale === 'zh-CN' ? '滚轮缩放' : 'Scroll to zoom'}</p>
      </div>
    </div>
  );
}
