'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { FilmItem } from '@/lib/api';
import { filmPosters } from '@/lib/assets';

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
  prequel: 'bg-red-600',
  original: 'bg-blue-600',
  sequel: 'bg-purple-600',
  anthology: 'bg-emerald-600',
};

// Star Wars movie poster URLs - using imported filmPosters from @/lib/assets
// Fallback gradients are used when local poster is not available

export default function FilmCard({ film, locale }: FilmCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const title = locale === 'zh-CN' ? film.title : film.title_en;
  const synopsis = locale === 'zh-CN' ? film.synopsis_zh : film.synopsis_en;
  const eraLabel = eraLabels[film.era]?.[locale === 'zh-CN' ? 'zh' : 'en'] || film.era;

  const posterUrl = filmPosters[film.slug] || null;

  return (
    <Link href={`/${locale}/films/${film.slug}`}>
      <div
        className="relative w-64 shrink-0 transition-all duration-300 cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
      >
        {/* Card */}
        <div className="relative bg-gradient-to-b from-starwars-blue/90 to-starwars-black/90 rounded-lg overflow-hidden border border-starwars-gold/30 shadow-2xl group-hover:border-starwars-gold/60 group-hover:shadow-starwars-gold/20 transition-all duration-300">
          {/* Poster Image */}
          <div className="h-80 relative overflow-hidden">
            {posterUrl && !imageError ? (
              <img
                src={posterUrl}
                alt={`${title} poster`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={() => setImageError(true)}
              />
            ) : (
              /* Fallback gradient poster */
              <div className={`w-full h-full bg-gradient-to-br ${
                film.era === 'prequel' ? 'from-red-900 via-red-700 to-black' :
                film.era === 'original' ? 'from-blue-900 via-blue-700 to-black' :
                film.era === 'sequel' ? 'from-purple-900 via-purple-700 to-black' :
                'from-emerald-900 via-emerald-700 to-black'
              }`}>
                {/* Decorative stars */}
                <div className="absolute inset-0 opacity-40">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>
                {/* Film icon */}
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

            {/* Title at bottom of poster */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl font-bold text-starwars-gold drop-shadow-lg">{title}</h3>
              <p className="text-sm text-starwars-white/80 mt-1">{film.release_date}</p>
            </div>

            {/* Timeline label */}
            <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/60 text-xs text-starwars-gold font-mono">
              {film.bby_aby_label}
            </div>
          </div>

          {/* Info section */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-starwars-gray">{film.release_date}</span>
              <span className="text-starwars-gold/80 text-xs font-mono">{film.bby_aby_label}</span>
            </div>

            {/* Synopsis on hover */}
            <div className={`overflow-hidden transition-all duration-300 ${isHovered ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="text-sm text-starwars-white/70 line-clamp-3 leading-relaxed">
                {synopsis || film.hover_summary}
              </p>

              {/* Hero characters */}
              {film.hero_characters && film.hero_characters.length > 0 && (
                <div className="mt-3 pt-3 border-t border-starwars-gold/20">
                  <p className="text-xs text-starwars-gold/60 mb-2 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    {locale === 'zh-CN' ? '关键角色' : 'Key Characters'}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {film.hero_characters.slice(0, 3).map((char) => (
                      <span key={char.slug} className="text-xs bg-starwars-blue/50 px-2 py-1 rounded text-starwars-white/90 border border-starwars-gold/20">
                        {char.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* View more CTA */}
              <div className="mt-3 flex items-center gap-1 text-starwars-gold text-sm">
                {locale === 'zh-CN' ? '查看详情' : 'View Details'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Hover glow effect */}
          <div className={`absolute inset-0 rounded-lg transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}
               style={{ boxShadow: 'inset 0 0 30px rgba(255, 215, 0, 0.3)' }} />
        </div>
      </div>
    </Link>
  );
}