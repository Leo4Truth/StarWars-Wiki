'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { FilmItem } from '@/lib/api';
import { filmPosters } from '@/lib/assets';

interface FilmsClientProps {
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

export default function FilmsClient({ items, locale }: FilmsClientProps) {
  const [activeEra, setActiveEra] = useState('all');

  const filteredItems = activeEra === 'all'
    ? items
    : items.filter(item => item.era === activeEra);

  return (
    <div className="w-full">
      {/* Era Filter Tabs */}
      <div className="flex items-center justify-center mb-10 flex-wrap gap-3">
        {eraFilters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveEra(filter.key)}
            className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeEra === filter.key
                ? `${eraColors[filter.key]} text-white shadow-lg shadow-starwars-gold/20 scale-105`
                : 'bg-starwars-blue/40 text-starwars-white/80 hover:text-starwars-gold border border-starwars-gold/30 hover:border-starwars-gold/60 hover:scale-105'
            }`}
          >
            {locale === 'zh-CN' ? filter.label : filter.labelEn}
          </button>
        ))}
      </div>

      {/* Films Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((film) => {
          const title = locale === 'zh-CN' ? film.title : film.title_en;
          const synopsis = locale === 'zh-CN' ? film.synopsis_zh : film.synopsis_en;
          const eraLabel = locale === 'zh-CN'
            ? eraFilters.find(f => f.key === film.era)?.label || film.era
            : eraFilters.find(f => f.key === film.era)?.labelEn || film.era;
          const posterPath = filmPosters[film.slug];

          return (
            <Link key={film.canonical_id} href={`/${locale}/films/${film.slug}`}>
              <div className="group relative bg-gradient-to-b from-starwars-blue/90 to-starwars-black/90 rounded-lg overflow-hidden border border-starwars-gold/30 shadow-2xl hover:border-starwars-gold/60 hover:shadow-starwars-gold/20 transition-all duration-300 h-full flex flex-col">
                {/* Poster Image */}
                <div className="h-80 relative overflow-hidden shrink-0">
                  {posterPath ? (
                    <img
                      src={posterPath}
                      alt={`${title} poster`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${
                      film.era === 'prequel' ? 'from-red-900 via-red-700 to-black' :
                      film.era === 'original' ? 'from-blue-900 via-blue-700 to-black' :
                      film.era === 'sequel' ? 'from-purple-900 via-purple-700 to-black' :
                      'from-emerald-900 via-emerald-700 to-black'
                    }`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-20 h-20 text-starwars-gold/30" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-2z"/>
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                  {/* Era badge */}
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full ${eraColors[film.era] || 'bg-starwars-gold'} text-xs font-bold text-white shadow-lg`}>
                    {eraLabel}
                  </div>

                  {/* Timeline label */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/60 text-xs text-starwars-gold font-mono">
                    {film.bby_aby_label}
                  </div>

                  {/* Title at bottom of poster */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-starwars-gold drop-shadow-lg">{title}</h3>
                    <p className="text-sm text-starwars-white/80 mt-1">{film.release_date}</p>
                  </div>
                </div>

                {/* Info section */}
                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-starwars-gray">{film.release_date}</span>
                    <span className="text-starwars-gold/80 text-xs font-mono">{film.bby_aby_label}</span>
                  </div>
                  <p className="text-sm text-starwars-white/70 line-clamp-2 leading-relaxed flex-grow">
                    {synopsis || film.hover_summary}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-starwars-gold text-sm">
                    {locale === 'zh-CN' ? '查看详情' : 'View Details'}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredItems.length === 0 && (
        <div className="text-center py-20">
          <svg className="w-16 h-16 mx-auto text-starwars-gold/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-2z"/>
          </svg>
          <p className="text-starwars-white/60">
            {locale === 'zh-CN' ? '暂无该时代的电影' : 'No films found for this era'}
          </p>
        </div>
      )}
    </div>
  );
}