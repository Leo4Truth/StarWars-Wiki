'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { FilmItem } from '@/lib/api';

interface FilmCardProps {
  film: FilmItem;
  locale: string;
}

const eraLabels: Record<string, { zh: string; en: string }> = {
  prequel: { zh: '前传', en: 'Prequel' },
  original: { zh: '正传', en: 'Original' },
  sequel: { zh: '后传', en: 'Sequel' },
  anthology: { zh: '外传', en: 'Anthology' },
};

const eraColors: Record<string, string> = {
  prequel: 'bg-era-prequel',
  original: 'bg-era-original',
  sequel: 'bg-era-sequel',
  anthology: 'bg-era-anthology',
};

export default function FilmCard({ film, locale }: FilmCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const title = locale === 'zh-CN' ? film.title : film.title_en;
  const synopsis = locale === 'zh-CN' ? film.synopsis_zh : film.synopsis_en;
  const eraLabel = eraLabels[film.era]?.[locale === 'zh-CN' ? 'zh' : 'en'] || film.era;

  return (
    <Link href={`/${locale}/films/${film.slug}`}>
      <div
        className="relative w-64 shrink-0 transition-all duration-300 transform"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
      >
        {/* Card */}
        <div className="relative bg-gradient-to-b from-starwars-blue/90 to-starwars-black/90 rounded-lg overflow-hidden border border-starwars-gold/30 shadow-xl">
          {/* Poster placeholder with gradient */}
          <div className="h-80 bg-gradient-to-b from-starwars-blue to-starwars-black relative overflow-hidden">
            {/* Decorative stars */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>

            {/* Era badge */}
            <div className={`absolute top-3 left-3 px-2 py-1 rounded ${eraColors[film.era] || 'bg-starwars-gold'} text-xs font-bold text-starwars-black`}>
              {eraLabel}
            </div>

            {/* Title at bottom of poster */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-starwars-black to-transparent">
              <h3 className="text-lg font-bold text-starwars-gold">{title}</h3>
            </div>
          </div>

          {/* Info section */}
          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-starwars-gray">{film.release_date}</span>
              <span className="text-starwars-gold/80 text-xs">{film.bby_aby_label}</span>
            </div>

            {/* Synopsis on hover */}
            <div className={`overflow-hidden transition-all duration-300 ${isHovered ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="text-xs text-starwars-white/70 line-clamp-3">
                {synopsis || film.hover_summary}
              </p>

              {/* Hero characters */}
              {film.hero_characters && film.hero_characters.length > 0 && (
                <div className="mt-2 pt-2 border-t border-starwars-gold/20">
                  <p className="text-xs text-starwars-gold/60 mb-1">Key Characters:</p>
                  <div className="flex flex-wrap gap-1">
                    {film.hero_characters.slice(0, 3).map((char) => (
                      <span key={char.slug} className="text-xs bg-starwars-blue/50 px-2 py-0.5 rounded text-starwars-white/80">
                        {char.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Hover glow effect */}
          {isHovered && (
            <div className="absolute inset-0 border-2 border-starwars-gold/50 rounded-lg pointer-events-none" />
          )}
        </div>
      </div>
    </Link>
  );
}