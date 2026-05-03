'use client';

import Link from 'next/link';

interface GraphNode {
  id: string;
  type: string;
  label_zh: string;
  label_en: string;
}

interface GraphDetailPopupProps {
  node: GraphNode | null;
  locale: string;
  onClose: () => void;
}

const nodeTypeLabels: Record<string, { zh: string; en: string }> = {
  character: { zh: '角色', en: 'Character' },
  film: { zh: '电影', en: 'Film' },
  faction: { zh: '阵营', en: 'Faction' },
  planet: { zh: '星球', en: 'Planet' },
  event: { zh: '事件', en: 'Event' },
};

const nodeTypeColors: Record<string, string> = {
  character: '#ffd700',
  film: '#4ade80',
  faction: '#f472b6',
  planet: '#60a5fa',
  event: '#fb923c',
};

export default function GraphDetailPopup({ node, locale, onClose }: GraphDetailPopupProps) {
  if (!node) return null;

  const typeLabel = nodeTypeLabels[node.type]?.[locale === 'zh-CN' ? 'zh' : 'en'] || node.type;
  const typeColor = nodeTypeColors[node.type] || '#888';

  // Determine the detail URL based on entity type
  const getDetailUrl = () => {
    if (node.type === 'character') {
      return `/${locale}/characters/${node.id}`;
    } else if (node.type === 'film') {
      return `/${locale}/films/${node.id}`;
    }
    return null;
  };

  const detailUrl = getDetailUrl();

  return (
    <div className="absolute bottom-4 left-4 z-20 w-72">
      <div className="bg-starwars-blue/95 backdrop-blur-md rounded-lg border border-starwars-gold/40 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative p-4 border-b border-starwars-gold/20">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-starwars-black/50 text-starwars-gold/70 hover:text-starwars-gold hover:bg-starwars-black/70 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Type badge */}
          <div
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium mb-2"
            style={{ backgroundColor: `${typeColor}20`, color: typeColor }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: typeColor }}
            />
            {typeLabel}
          </div>

          {/* Name */}
          <h3 className="text-lg font-bold text-starwars-gold pr-8">
            {locale === 'zh-CN' ? node.label_zh : node.label_en}
          </h3>

          {/* ID */}
          <p className="text-xs text-starwars-gold/50 font-mono mt-1">
            {node.id}
          </p>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          {/* Description based on type */}
          {node.type === 'character' && (
            <p className="text-sm text-white/70">
              {locale === 'zh-CN'
                ? '星球大战中的重要角色，与其他角色和电影有着复杂的关联。'
                : 'An important character in the Star Wars universe, connected to other characters and films.'}
            </p>
          )}

          {node.type === 'film' && (
            <p className="text-sm text-white/70">
              {locale === 'zh-CN'
                ? '星球大战电影系列中的重要作品。'
                : 'An important film in the Star Wars saga.'}
            </p>
          )}

          {node.type === 'faction' && (
            <p className="text-sm text-white/70">
              {locale === 'zh-CN'
                ? '星球大战宇宙中的重要阵营或组织。'
                : 'An important faction or organization in the Star Wars universe.'}
            </p>
          )}

          {/* View Detail link */}
          {detailUrl && (
            <Link
              href={detailUrl}
              className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-starwars-gold/20 hover:bg-starwars-gold/30 border border-starwars-gold/40 rounded-lg text-starwars-gold text-sm font-medium transition-colors"
            >
              {locale === 'zh-CN' ? '查看详情' : 'View Details'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div
            className="absolute top-0 right-0 w-8 h-8 transform translate-x-4 translate-y-4 rotate-45"
            style={{ backgroundColor: `${typeColor}20` }}
          />
        </div>
      </div>
    </div>
  );
}
