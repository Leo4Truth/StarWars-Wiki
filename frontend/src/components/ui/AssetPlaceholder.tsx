import React from 'react';

interface FilmPlaceholderProps {
  title: string;
  titleEn?: string;
  era: string;
  bbyAbyLabel: string;
  className?: string;
}

export function FilmPlaceholder({ title, titleEn, era, bbyAbyLabel, className = '' }: FilmPlaceholderProps) {
  const eraColors: Record<string, string> = {
    prequel: '#8B4513',    // Brown for prequel era
    original: '#DAA520',   // Gold for original era
    sequel: '#4169E1',     // Royal blue for sequel era
    anthology: '#9370DB',  // Medium purple for anthology
  };

  const eraColor = eraColors[era] || '#DAA520';

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`} style={{ background: 'linear-gradient(135deg, #0D0D1A 0%, #1A1A2E 100%)' }}>
      {/* Star field effect */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.5,
            }}
          />
        ))}
      </div>

      {/* Era badge */}
      <div
        className="absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider"
        style={{ backgroundColor: eraColor, color: '#0D0D1A' }}
      >
        {era}
      </div>

      {/* BBY/ABY label */}
      <div className="absolute top-3 right-3 px-2 py-1 rounded text-xs font-mono" style={{ backgroundColor: 'rgba(218, 165, 32, 0.2)', color: '#DAA520' }}>
        {bbyAbyLabel}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
        {/* Star Wars logo placeholder */}
        <div className="mb-4 text-2xl font-bold tracking-widest" style={{ color: '#DAA520', textShadow: '0 0 10px rgba(218, 165, 32, 0.5)' }}>
          STAR WARS
        </div>

        {/* Film title */}
        <div className="mb-2 text-xl font-bold" style={{ color: '#FFFFFF' }}>
          {title}
        </div>
        {titleEn && (
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {titleEn}
          </div>
        )}

        {/* Decorative line */}
        <div className="mt-4 w-16 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #DAA520, transparent)' }} />
      </div>
    </div>
  );
}

interface CharacterPlaceholderProps {
  name: string;
  nameEn?: string;
  faction?: string;
  className?: string;
}

export function CharacterPlaceholder({ name, nameEn, faction, className = '' }: CharacterPlaceholderProps) {
  const factionColors: Record<string, string> = {
    jedi: '#4169E1',
    sith: '#8B0000',
    rebel: '#228B22',
    empire: '#800020',
    resistance: '#FF6347',
    firstorder: '#363636',
    bountyhunter: '#DAA520',
    other: '#9370DB',
  };

  const factionColor = faction ? (factionColors[faction] || factionColors.other) : factionColors.other;

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`} style={{ background: 'linear-gradient(135deg, #0D0D1A 0%, #1A1A2E 100%)' }}>
      {/* Avatar placeholder circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold"
          style={{ backgroundColor: 'rgba(218, 165, 32, 0.1)', border: '3px solid rgba(218, 165, 32, 0.3)' }}
        >
          ?
        </div>
      </div>

      {/* Faction badge */}
      {faction && (
        <div
          className="absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider"
          style={{ backgroundColor: factionColor, color: '#FFFFFF' }}
        >
          {faction}
        </div>
      )}

      {/* Content overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))' }}>
        <div className="text-lg font-bold" style={{ color: '#FFFFFF' }}>
          {name}
        </div>
        {nameEn && (
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {nameEn}
          </div>
        )}
      </div>
    </div>
  );
}

interface BeyondFilmPlaceholderProps {
  name: string;
  nameEn?: string;
  originType: string;
  className?: string;
}

export function BeyondFilmPlaceholder({ name, nameEn, originType, className = '' }: BeyondFilmPlaceholderProps) {
  const typeColors: Record<string, string> = {
    animation: '#FF69B4',
    novel: '#9370DB',
    comic: '#FF6347',
    game: '#20B2AA',
  };

  const typeColor = typeColors[originType] || typeColors.other;

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`} style={{ background: 'linear-gradient(135deg, #0D0D1A 0%, #1A1A2E 100%)' }}>
      {/* Star field effect */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.5,
            }}
          />
        ))}
      </div>

      {/* Type badge */}
      <div
        className="absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider"
        style={{ backgroundColor: typeColor, color: '#FFFFFF' }}
      >
        {originType}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-center">
        <div className="mb-2 text-xl font-bold" style={{ color: '#FFFFFF' }}>
          {name}
        </div>
        {nameEn && (
          <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {nameEn}
          </div>
        )}

        {/* Decorative line */}
        <div className="mt-3 w-12 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #DAA520, transparent)' }} />
      </div>
    </div>
  );
}

export default { FilmPlaceholder, CharacterPlaceholder, BeyondFilmPlaceholder };