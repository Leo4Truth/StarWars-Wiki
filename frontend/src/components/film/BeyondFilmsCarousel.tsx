'use client';

import Link from 'next/link';
import type { BeyondFilmEntry } from '@/lib/api';

interface BeyondFilmsCarouselProps {
  items: BeyondFilmEntry[];
  locale: string;
}

const originTypeColors: Record<string, string> = {
  animation: 'bg-purple-500',
  novel: 'bg-blue-500',
  comic: 'bg-green-500',
  game: 'bg-orange-500',
};

const originTypeLabels: Record<string, { zh: string; en: string }> = {
  animation: { zh: '动画', en: 'Animation' },
  novel: { zh: '小说', en: 'Novel' },
  comic: { zh: '漫画', en: 'Comic' },
  game: { zh: '游戏', en: 'Game' },
};

export default function BeyondFilmsCarousel({ items, locale }: BeyondFilmsCarouselProps) {
  return (
    <section className="w-full">
      {/* Carousel */}
      <div className="flex overflow-x-auto pb-6 pt-2 px-4 space-x-6 scrollbar-hide snap-x snap-mandatory">
        {items.map((item) => {
          const name = locale === 'zh-CN' ? item.name : item.name_en;
          const typeLabel = originTypeLabels[item.origin_type]?.[locale === 'zh-CN' ? 'zh' : 'en'] || item.origin_type;
          const typeColor = originTypeColors[item.origin_type] || 'bg-starwars-gold';

          return (
            <Link
              key={item.canonical_id}
              href={item.detail_url}
              className="block snap-center shrink-0 w-72 group"
            >
              <div className="bg-gradient-to-b from-starwars-blue/80 to-starwars-black/90 rounded-lg overflow-hidden border border-starwars-gold/20 hover:border-starwars-gold/50 transition-all duration-300">
                {/* Header with type badge */}
                <div className="p-4 bg-starwars-black/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold text-white ${typeColor}`}>
                      {typeLabel}
                    </span>
                    {item.bby_aby_label && (
                      <span className="text-xs text-starwars-gray">{item.bby_aby_label}</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-starwars-gold group-hover:text-white transition-colors">
                    {name}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  {/* Origin work */}
                  {item.origin_work_title && (
                    <div className="text-sm">
                      <span className="text-starwars-gray text-xs">Origin: </span>
                      <span className="text-starwars-white/80">{item.origin_work_title}</span>
                    </div>
                  )}

                  {/* Movie linkage */}
                  {item.movie_linkage && item.movie_linkage_label && (
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-starwars-gold">⚔️</span>
                      <span className="text-starwars-white/80">{item.movie_linkage_label}</span>
                    </div>
                  )}

                  {/* Bio summary */}
                  <p className="text-xs text-starwars-white/60 line-clamp-3">
                    {item.bio_summary}
                  </p>
                </div>

                {/* Footer arrow */}
                <div className="px-4 pb-3 text-center">
                  <span className="text-starwars-gold/50 group-hover:text-starwars-gold text-sm transition-colors">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}