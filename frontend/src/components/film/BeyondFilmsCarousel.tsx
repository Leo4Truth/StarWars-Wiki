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

// Placeholder images for different origin types
const originTypeImages: Record<string, string> = {
  animation: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop',
  novel: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop',
  comic: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
  game: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=300&h=200&fit=crop',
};

export default function BeyondFilmsCarousel({ items, locale }: BeyondFilmsCarouselProps) {
  if (!items || items.length === 0) {
    return (
      <section className="w-full py-12 text-center">
        <p className="text-starwars-gray">
          {locale === 'zh-CN' ? '暂无数据' : 'No data available'}
        </p>
      </section>
    );
  }

  return (
    <section className="w-full">
      {/* Carousel */}
      <div className="flex overflow-x-auto pb-6 pt-2 px-4 space-x-6 scrollbar-hide snap-x snap-mandatory scroll-smooth">
        {items.map((item, index) => {
          const name = locale === 'zh-CN' ? item.name : item.name_en;
          const typeLabel = originTypeLabels[item.origin_type]?.[locale === 'zh-CN' ? 'zh' : 'en'] || item.origin_type;
          const typeColor = originTypeColors[item.origin_type] || 'bg-starwars-gold';
          const imageUrl = originTypeImages[item.origin_type] || originTypeImages.novel;

          return (
            <Link
              key={item.canonical_id}
              href={`/${locale}/characters/${item.slug}`}
              className="block snap-center shrink-0 w-72 group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="bg-gradient-to-b from-starwars-blue/80 to-starwars-black/90 rounded-lg overflow-hidden border border-starwars-gold/20 hover:border-starwars-gold/50 transition-all duration-300 hover:shadow-xl hover:shadow-starwars-gold/10 hover:-translate-y-1">
                {/* Header with image */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-starwars-black/90 to-transparent" />

                  {/* Type badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold text-white ${typeColor} shadow-lg flex items-center gap-1`}>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        {item.origin_type === 'animation' && <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>}
                        {item.origin_type === 'novel' && <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>}
                        {item.origin_type === 'comic' && <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>}
                        {item.origin_type === 'game' && <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>}
                      </svg>
                      {typeLabel}
                    </span>
                  </div>

                  {/* BBY/ABY label */}
                  {item.bby_aby_label && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/60 text-xs text-starwars-gold font-mono">
                      {item.bby_aby_label}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <h3 className="text-lg font-bold text-starwars-gold group-hover:text-white transition-colors leading-tight">
                    {name}
                  </h3>

                  {/* Origin work */}
                  {item.origin_work_title && (
                    <div className="text-sm flex items-start gap-2">
                      <svg className="w-4 h-4 text-starwars-gray shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span className="text-starwars-white/60">
                        <span className="text-starwars-gray text-xs">{locale === 'zh-CN' ? '来源' : 'Origin'}:</span>{' '}
                        {item.origin_work_title}
                      </span>
                    </div>
                  )}

                  {/* Movie linkage */}
                  {item.movie_linkage && item.movie_linkage_label && (
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-starwars-gold" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span className="text-starwars-white/80">{item.movie_linkage_label}</span>
                    </div>
                  )}

                  {/* Bio summary */}
                  <p className="text-xs text-starwars-white/60 line-clamp-2 leading-relaxed">
                    {item.bio_summary}
                  </p>
                </div>

                {/* Footer */}
                <div className="px-4 pb-4 flex items-center justify-between">
                  <span className="text-starwars-gold/50 group-hover:text-starwars-gold text-sm transition-colors flex items-center gap-1">
                    {locale === 'zh-CN' ? '查看详情' : 'View Details'}
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-t from-starwars-gold/10 to-transparent" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Navigation hint */}
      <div className="flex items-center justify-center mt-4 gap-2 text-xs text-starwars-gray">
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        <span>{locale === 'zh-CN' ? '左右滑动浏览更多' : 'Scroll left/right for more'}</span>
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </section>
  );
}