'use client';

import Link from 'next/link';
import { getCharacterPortrait } from '@/lib/assets';
import type { CharacterListItem } from '@/lib/api';

interface CharacterCardProps {
  character: CharacterListItem;
  locale: string;
}

export default function CharacterCard({ character, locale }: CharacterCardProps) {
  const portraitPath = getCharacterPortrait(character.slug);

  return (
    <Link href={`/${locale}/characters/${character.slug}`}>
      <div className="relative bg-gradient-to-b from-starwars-blue/80 to-starwars-black/90 rounded-lg overflow-hidden border border-starwars-gold/20 shadow-lg transition-all duration-300 hover:border-starwars-gold/50 hover:shadow-starwars-gold/20 hover:scale-105 group">
        {/* Portrait */}
        <div className="aspect-square relative overflow-hidden bg-starwars-blue/50">
          {portraitPath ? (
            <img
              src={portraitPath}
              alt={character.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-starwars-blue to-starwars-black">
              <svg className="w-16 h-16 text-starwars-gold/30" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-starwars-gold mb-1 truncate">{character.name}</h3>
          {character.name_en && (
            <p className="text-sm text-starwars-white/60 mb-2 truncate">{character.name_en}</p>
          )}

          {/* Faction badge */}
          {character.faction_zh && (
            <div className="mb-2">
              <span className="inline-block px-2 py-0.5 rounded-full bg-starwars-blue/60 border border-starwars-gold/30 text-starwars-white/80 text-xs">
                {character.faction_zh.split('|')[0]}
              </span>
            </div>
          )}

          {/* First appearance */}
          {character.first_appearance_label && (
            <p className="text-xs text-starwars-white/50">
              {locale === 'zh-CN' ? '首次登场: ' : 'First: '}
              {character.first_appearance_label}
            </p>
          )}
        </div>

        {/* Hover effect border glow */}
        <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-starwars-gold/30 transition-all duration-300 pointer-events-none" />
      </div>
    </Link>
  );
}