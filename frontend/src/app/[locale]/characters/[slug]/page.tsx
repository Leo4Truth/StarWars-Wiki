import { getCharacterDetail } from '@/lib/api';
import { getCharacterPortrait } from '@/lib/assets';
import Link from 'next/link';

interface CharacterDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function CharacterDetailPage({ params }: CharacterDetailPageProps) {
  const { locale, slug } = await params;
  const data = await getCharacterDetail(slug, locale);
  const character = data.character;
  const portraitPath = getCharacterPortrait(slug);

  return (
    <div className="min-h-screen bg-starwars-black relative overflow-hidden">
      <div className="relative pt-8 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href={'/' + locale + '/characters'} className="inline-flex items-center gap-2 text-starwars-gold hover:text-starwars-yellow transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {locale === 'zh-CN' ? '返回人物列表' : 'Back to Characters'}
          </Link>
        </div>
      </div>
      <main className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="lg:w-1/3">
              <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-starwars-gold/30 bg-starwars-blue/50">
                {portraitPath ? (
                  <img src={portraitPath} alt={character.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-starwars-blue to-starwars-black">
                    <svg className="w-24 h-24 text-starwars-gold/30" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div className="lg:w-2/3">
              <h1 className="text-4xl md:text-5xl font-bold text-starwars-gold mb-2 tracking-wider">{character.name}</h1>
              {character.name_en && <p className="text-xl text-starwars-white/70 mb-6">{character.name_en}</p>}
              {(character.aliases_zh?.length > 0 || character.aliases_en?.length > 0) && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-starwars-white/50 mb-2 uppercase tracking-wider">
                    {locale === 'zh-CN' ? '别名' : 'Aliases'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(locale === 'zh-CN' ? character.aliases_zh : character.aliases_en)?.map((alias, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-starwars-blue/50 border border-starwars-gold/30 text-starwars-white/80 text-sm">{alias}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {character.species_zh && (
                  <div className="bg-starwars-blue/30 rounded-lg p-4 border border-starwars-gold/20">
                    <span className="text-xs text-starwars-white/50 uppercase tracking-wider block mb-1">{locale === 'zh-CN' ? '种族' : 'Species'}</span>
                    <span className="text-starwars-white font-medium">{locale === 'zh-CN' ? character.species_zh : character.species_en}</span>
                  </div>
                )}
                {character.faction_zh && (
                  <div className="bg-starwars-blue/30 rounded-lg p-4 border border-starwars-gold/20">
                    <span className="text-xs text-starwars-white/50 uppercase tracking-wider block mb-1">{locale === 'zh-CN' ? '阵营' : 'Faction'}</span>
                    <span className="text-starwars-white font-medium">{locale === 'zh-CN' ? character.faction_zh : character.faction_en}</span>
                  </div>
                )}
                {character.first_appearance_label && (
                  <div className="bg-starwars-blue/30 rounded-lg p-4 border border-starwars-gold/20">
                    <span className="text-xs text-starwars-white/50 uppercase tracking-wider block mb-1">{locale === 'zh-CN' ? '首次登场' : 'First Appearance'}</span>
                    <span className="text-starwars-white font-medium">{character.first_appearance_label}</span>
                  </div>
                )}
                {character.bby_aby_label && (
                  <div className="bg-starwars-blue/30 rounded-lg p-4 border border-starwars-gold/20">
                    <span className="text-xs text-starwars-white/50 uppercase tracking-wider block mb-1">{locale === 'zh-CN' ? '出生时间' : 'Birth'}</span>
                    <span className="text-starwars-white font-medium">{character.bby_aby_label}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-starwars-blue/20 rounded-lg p-6 border border-starwars-gold/20 mb-8">
            <h2 className="text-2xl font-bold text-starwars-gold mb-4">{locale === 'zh-CN' ? '人物简介' : 'Biography'}</h2>
            <p className="text-starwars-white/90 leading-relaxed text-lg">{locale === 'zh-CN' ? character.bio_zh : character.bio_en}</p>
          </div>
          {character.source_url && (
            <div className="text-center">
              <a href={character.source_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-starwars-gold/70 hover:text-starwars-gold transition-colors text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {locale === 'zh-CN' ? '查看来源' : 'View Source'}
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}