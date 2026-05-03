'use client';

import { useState } from 'react';
import FilmCard from './FilmCard';
import type { FilmItem } from '@/lib/api';

interface FilmTimelineRailProps {
  items: FilmItem[];
  locale: string;
}

const eraFilters = [
  { key: 'all', label: '全部' },
  { key: 'prequel', label: '前传' },
  { key: 'original', label: '正传' },
  { key: 'sequel', label: '后传' },
  { key: 'anthology', label: '外传' },
];

const eraColors: Record<string, string> = {
  prequel: 'bg-era-prequel',
  original: 'bg-era-original',
  sequel: 'bg-era-sequel',
  anthology: 'bg-era-anthology',
};

export default function FilmTimelineRail({ items, locale }: FilmTimelineRailProps) {
  const [activeEra, setActiveEra] = useState('all');

  const filteredItems = activeEra === 'all'
    ? items
    : items.filter(item => item.era === activeEra);

  return (
    <section className="w-full">
      {/* Era Filter Tabs */}
      <div className="flex items-center justify-center mb-8 space-x-2">
        {eraFilters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveEra(filter.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeEra === filter.key
                ? `${eraColors[filter.key] || 'bg-starwars-gold'} text-starwars-black shadow-lg`
                : 'bg-starwars-blue/50 text-starwars-white/80 hover:text-starwars-gold border border-starwars-gold/20'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Timeline Rail */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-starwars-gold/20 via-starwars-gold/50 to-starwars-gold/20 transform -translate-y-1/2" />

        {/* Film cards */}
        <div className="flex overflow-x-auto pb-8 pt-4 px-4 space-x-6 scrollbar-hide snap-x snap-mandatory">
          {filteredItems.map((film) => (
            <div key={film.canonical_id} className="snap-center shrink-0">
              <FilmCard film={film} locale={locale} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}