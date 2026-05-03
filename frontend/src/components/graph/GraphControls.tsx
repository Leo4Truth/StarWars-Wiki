'use client';

import { useState } from 'react';

interface GraphControlsProps {
  locale: string;
  depth: number;
  onDepthChange: (depth: number) => void;
  selectedEntityId: string;
  onEntityIdChange: (id: string) => void;
  onReset: () => void;
}

const entityTypes = [
  { id: 'character', label_zh: '角色', label_en: 'Character' },
  { id: 'film', label_zh: '电影', label_en: 'Film' },
  { id: 'faction', label_zh: '阵营', label_en: 'Faction' },
  { id: 'planet', label_zh: '星球', label_en: 'Planet' },
  { id: 'event', label_zh: '事件', label_en: 'Event' },
];

const eraFilters = [
  { id: 'all', label_zh: '全部', label_en: 'All' },
  { id: 'prequel', label_zh: '前传', label_en: 'Prequel' },
  { id: 'original', label_zh: '正传', label_en: 'Original' },
  { id: 'sequel', label_zh: '后传', label_en: 'Sequel' },
  { id: 'anthology', label_zh: '外传', label_en: 'Anthology' },
];

const nodeTypeColors: Record<string, string> = {
  character: '#ffd700',
  film: '#4ade80',
  faction: '#f472b6',
  planet: '#60a5fa',
  event: '#fb923c',
};

export default function GraphControls({
  locale,
  depth,
  onDepthChange,
  selectedEntityId,
  onEntityIdChange,
  onReset,
}: GraphControlsProps) {
  const [showFilters, setShowFilters] = useState(true);

  return (
    <div className="absolute top-4 left-4 z-10 flex flex-col gap-4">
      {/* Search bar */}
      <div className="bg-starwars-blue/90 backdrop-blur-sm rounded-lg border border-starwars-gold/30 p-3 min-w-64">
        <label className="block text-xs text-starwars-gold/70 mb-1">
          {locale === 'zh-CN' ? '实体ID' : 'Entity ID'}
        </label>
        <input
          type="text"
          value={selectedEntityId}
          onChange={(e) => onEntityIdChange(e.target.value)}
          placeholder={locale === 'zh-CN' ? '例如: char_luke' : 'e.g., char_luke'}
          className="w-full bg-starwars-black/50 border border-starwars-gold/30 rounded px-3 py-1.5 text-sm text-white placeholder:text-starwars-gold/40 focus:outline-none focus:border-starwars-gold/70"
        />
      </div>

      {/* Depth control */}
      <div className="bg-starwars-blue/90 backdrop-blur-sm rounded-lg border border-starwars-gold/30 p-3 min-w-64">
        <label className="block text-xs text-starwars-gold/70 mb-2">
          {locale === 'zh-CN' ? '探索深度' : 'Exploration Depth'}: {depth}
        </label>
        <input
          type="range"
          min="1"
          max="3"
          value={depth}
          onChange={(e) => onDepthChange(parseInt(e.target.value))}
          className="w-full accent-starwars-gold"
        />
        <div className="flex justify-between text-xs text-starwars-gold/50 mt-1">
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </div>
      </div>

      {/* Filter toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="bg-starwars-blue/90 backdrop-blur-sm rounded-lg border border-starwars-gold/30 p-3 text-left transition-colors hover:border-starwars-gold/60"
      >
        <span className="text-sm text-starwars-gold">
          {showFilters ? (locale === 'zh-CN' ? '隐藏筛选' : 'Hide Filters') : (locale === 'zh-CN' ? '显示筛选' : 'Show Filters')}
        </span>
      </button>

      {/* Filters panel */}
      {showFilters && (
        <>
          {/* Legend */}
          <div className="bg-starwars-blue/90 backdrop-blur-sm rounded-lg border border-starwars-gold/30 p-3">
            <h3 className="text-xs text-starwars-gold/70 mb-2 font-semibold">
              {locale === 'zh-CN' ? '图例' : 'Legend'}
            </h3>
            <div className="space-y-1.5">
              {entityTypes.map((type) => (
                <div key={type.id} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: nodeTypeColors[type.id] }}
                  />
                  <span className="text-xs text-white/80">
                    {locale === 'zh-CN' ? type.label_zh : type.label_en}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Era filter */}
          <div className="bg-starwars-blue/90 backdrop-blur-sm rounded-lg border border-starwars-gold/30 p-3">
            <h3 className="text-xs text-starwars-gold/70 mb-2 font-semibold">
              {locale === 'zh-CN' ? '时代筛选' : 'Era Filter'}
            </h3>
            <div className="flex flex-wrap gap-1">
              {eraFilters.map((era) => (
                <button
                  key={era.id}
                  className="px-2 py-1 text-xs rounded border border-starwars-gold/30 text-starwars-gold/70 hover:bg-starwars-gold/10 hover:border-starwars-gold/50 transition-colors"
                >
                  {locale === 'zh-CN' ? era.label_zh : era.label_en}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Reset button */}
      <button
        onClick={onReset}
        className="bg-starwars-blue/90 backdrop-blur-sm rounded-lg border border-starwars-gold/30 p-3 text-left transition-colors hover:border-starwars-gold/60"
      >
        <span className="text-sm text-starwars-gold flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {locale === 'zh-CN' ? '重置视图' : 'Reset View'}
        </span>
      </button>
    </div>
  );
}
