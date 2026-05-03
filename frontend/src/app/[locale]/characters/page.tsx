import { getCharacters } from '@/lib/api';
import CharacterCard from '@/components/character/CharacterCard';

interface CharactersPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CharactersPage({ params }: CharactersPageProps) {
  const { locale } = await params;
  const data = await getCharacters(locale, undefined, undefined, 50);

  return (
    <div className="min-h-screen bg-starwars-black relative overflow-hidden">
      {/* Header Section */}
      <div className="relative py-16 px-4 bg-gradient-to-b from-starwars-blue/40 via-starwars-black/80 to-transparent">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-starwars-gold mb-4 tracking-wider drop-shadow-lg"
              style={{ textShadow: '0 0 30px rgba(255, 215, 0, 0.5)' }}>
            {locale === 'zh-CN' ? '人物' : 'Characters'}
          </h1>
          <p className="text-xl text-starwars-white/80 max-w-2xl mx-auto">
            {locale === 'zh-CN'
              ? '探索星球大战宇宙中的传奇角色'
              : 'Explore legendary characters from the Star Wars universe'}
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-starwars-gold/50" />
            <svg className="w-6 h-6 text-starwars-gold/60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-starwars-gold/50" />
          </div>
        </div>
      </div>

      {/* Characters Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats bar */}
          <div className="flex items-center justify-between mb-8 text-starwars-white/60">
            <span>{locale === 'zh-CN' ? '共' : 'Total'} {data.total} {locale === 'zh-CN' ? '个人物' : 'characters'}</span>
          </div>

          {data.items.length === 0 ? (
            <div className="text-center py-20 text-starwars-white/60">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p>{locale === 'zh-CN' ? '暂无人物数据' : 'No characters found'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {data.items.map((character) => (
                <CharacterCard key={character.canonical_id} character={character} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}