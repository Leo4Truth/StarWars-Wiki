'use client';

import { useState, useRef, useEffect } from 'react';
import FilmCard from './FilmCard';
import type { FilmItem } from '@/lib/api';

interface FilmTimelineRailProps {
  items: FilmItem[];
  locale: string;
}

const eraFilters = [
  { key: 'all', label: '全部', labelEn: 'All' },
  { key: 'prequel', label: '前传', labelEn: 'Prequel' },
  { key: 'original', label: '正传', labelEn: 'Original' },
  { key: 'sequel', label: '后传', labelEn: 'Sequel' },
  { key: 'anthology', label: '外传', labelEn: 'Anthology' },
];

const eraColors: Record<string, string> = {
  all: 'bg-gradient-to-r from-starwars-gold via-starwars-yellow to-starwars-gold',
  prequel: 'bg-red-600',
  original: 'bg-blue-600',
  sequel: 'bg-purple-600',
  anthology: 'bg-emerald-600',
};

export default function FilmTimelineRail({ items, locale }: FilmTimelineRailProps) {
  const [activeEra, setActiveEra] = useState('all');
  const [isAnimating, setIsAnimating] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);

  const filteredItems = activeEra === 'all'
    ? items
    : items.filter(item => item.era === activeEra);

  const handleEraChange = (era: string) => {
    if (era === activeEra) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveEra(era);
      setIsAnimating(false);
    }, 200);
  };

  // Auto-scroll to center on era change
  useEffect(() => {
    if (railRef.current && filteredItems.length > 0) {
      const container = railRef.current;
      const cardWidth = 256 + 24; // card width + gap
      const targetScroll = (filteredItems.length * cardWidth) / 2 - container.clientWidth / 2;
      container.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  }, [activeEra, filteredItems.length]);

  return (
    <section className="w-full">
      {/* Era Filter Tabs */}
      <div className="flex items-center justify-center mb-8 space-x-3">
        {eraFilters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => handleEraChange(filter.key)}
            className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeEra === filter.key
                ? `${eraColors[filter.key]} text-white shadow-lg shadow-starwars-gold/20 scale-105`
                : 'bg-starwars-blue/40 text-starwars-white/80 hover:text-starwars-gold border border-starwars-gold/30 hover:border-starwars-gold/60 hover:scale-105'
            }`}
          >
            {locale === 'zh-CN' ? filter.label : filter.labelEn}
            {activeEra === filter.key && (
              <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-starwars-gold" />
            )}
          </button>
        ))}
      </div>

      {/* Timeline Rail */}
      <div className="relative">
        {/* Animated timeline line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-starwars-gold/60 to-transparent animate-[pulse_2s_ease-in-out_infinite]" />
          <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-starwars-gold/20 via-starwars-gold to-starwars-gold/20" />
        </div>

        {/* Era indicator dots on timeline */}
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex items-center justify-center space-x-4 pointer-events-none">
          {[...Array(Math.min(filteredItems.length, 12))].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-starwars-gold/40 animate-[twinkle_2s_ease-in-out_infinite]"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* Film cards */}
        <div
          ref={railRef}
          className={`flex overflow-x-auto pb-8 pt-6 px-4 space-x-6 scrollbar-hide snap-x snap-mandatory scroll-smooth transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
        >
          {filteredItems.map((film, index) => (
            <div
              key={film.canonical_id}
              className="snap-center shrink-0"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <FilmCard film={film} locale={locale} />
            </div>
          ))}
        </div>

        {/* Fade edges for scroll indication */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-starwars-black to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-starwars-black to-transparent pointer-events-none" />
      </div>

      {/* Timeline legend */}
      <div className="flex items-center justify-center mt-4 gap-6 text-xs text-starwars-gray">
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-red-600 rounded" />
          <span>{locale === 'zh-CN' ? '前传' : 'Prequel'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-blue-600 rounded" />
          <span>{locale === 'zh-CN' ? '正传' : 'Original'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-purple-600 rounded" />
          <span>{locale === 'zh-CN' ? '后传' : 'Sequel'}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-emerald-600 rounded" />
          <span>{locale === 'zh-CN' ? '外传' : 'Anthology'}</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}