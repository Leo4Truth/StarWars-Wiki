import Link from 'next/link';
import { getFilmDetail, getCharacterDetail } from '@/lib/api';
import { filmPosters } from '@/lib/assets';
import StarWarsBackground from '@/components/ui/StarWarsBackground';

interface FilmDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
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

export default async function FilmDetailPage({ params }: FilmDetailPageProps) {
  const { locale, slug } = await params;
  const data = await getFilmDetail(slug, locale);
  const film = data.film;

  const title = film.title;
  const title_en = film.title_en;
  const synopsis = locale === 'zh-CN' ? film.synopsis_zh : film.synopsis_en;
  const director = locale === 'zh-CN' ? film.director_zh : film.director_en;
  const eraLabel = eraLabels[film.era]?.[locale === 'zh-CN' ? 'zh' : 'en'] || film.era;
  const posterPath = filmPosters[film.slug];

  // Fetch hero characters details
  const heroCharacters = film.hero_characters || [];
  const heroCharactersWithDetails = await Promise.all(
    heroCharacters.slice(0, 5).map(async (hero: { slug: string; name: string }) => {
      try {
        const charData = await getCharacterDetail(hero.slug, locale);
        return {
          ...hero,
          bio: locale === 'zh-CN' ? charData.character.bio_zh : charData.character.bio_en,
        };
      } catch {
        return hero;
      }
    })
  );

  return (
    <div className="min-h-screen bg-starwars-black relative overflow-hidden">
      {/* Animated Star Wars Background */}
      <StarWarsBackground />

      {/* Back button */}
      <div className="relative z-10 pt-6 px-4">
        <Link
          href={`/${locale}/films`}
          className="inline-flex items-center gap-2 text-starwars-gold hover:text-starwars-yellow transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {locale === 'zh-CN' ? '返回电影列表' : 'Back to Films'}
        </Link>
      </div>

      {/* Hero Section with Poster */}
      <div className="relative">
        {/* Background Poster with overlay */}
        <div className="absolute inset-0 h-[500px]">
          {posterPath ? (
            <img
              src={posterPath}
              alt={`${title} poster`}
              className="w-full h-full object-cover opacity-30"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${
              film.era === 'prequel' ? 'from-red-900 via-red-700 to-black' :
              film.era === 'original' ? 'from-blue-900 via-blue-700 to-black' :
              film.era === 'sequel' ? 'from-purple-900 via-purple-700 to-black' :
              'from-emerald-900 via-emerald-700 to-black'
            } opacity-30`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-starwars-black/60 via-starwars-black/80 to-starwars-black" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-8 pb-12">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Poster */}
            <div className="shrink-0 mx-auto lg:mx-0">
              <div className="w-72 rounded-lg overflow-hidden shadow-2xl border border-starwars-gold/30">
                {posterPath ? (
                  <img
                    src={posterPath}
                    alt={`${title} poster`}
                    className="w-full h-auto"
                  />
                ) : (
                  <div className={`w-full h-96 bg-gradient-to-br ${
                    film.era === 'prequel' ? 'from-red-900 via-red-700 to-black' :
                    film.era === 'original' ? 'from-blue-900 via-blue-700 to-black' :
                    film.era === 'sequel' ? 'from-purple-900 via-purple-700 to-black' :
                    'from-emerald-900 via-emerald-700 to-black'
                  }`}>
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-24 h-24 text-starwars-gold/30" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-2z"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Film Info */}
            <div className="flex-1 text-center lg:text-left">
              {/* Era badge */}
              <div className={`inline-block px-4 py-1.5 rounded-full ${eraColors[film.era] || 'bg-starwars-gold'} text-sm font-bold text-white mb-4`}>
                {eraLabel}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-starwars-gold mb-2 tracking-wider"
                  style={{ textShadow: '0 0 20px rgba(255, 215, 0, 0.3)' }}>
                {title}
              </h1>
              {title_en && title_en !== title && (
                <p className="text-xl text-starwars-white/70 mb-6">{title_en}</p>
              )}

              {/* Meta info */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6">
                <div className="flex items-center gap-2 text-starwars-white/80">
                  <svg className="w-5 h-5 text-starwars-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{film.release_date}</span>
                </div>
                <div className="flex items-center gap-2 text-starwars-white/80">
                  <svg className="w-5 h-5 text-starwars-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-mono text-starwars-gold">{film.bby_aby_label}</span>
                </div>
                <div className="flex items-center gap-2 text-starwars-white/80">
                  <svg className="w-5 h-5 text-starwars-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{director}</span>
                </div>
              </div>

              {/* Synopsis */}
              <div className="bg-starwars-blue/30 rounded-lg p-6 border border-starwars-gold/20">
                <h2 className="text-lg font-bold text-starwars-gold mb-3">
                  {locale === 'zh-CN' ? '剧情简介' : 'Synopsis'}
                </h2>
                <p className="text-starwars-white/90 leading-relaxed">
                  {synopsis || film.hover_summary}
                </p>
              </div>

              {/* Source link */}
              {film.source_url && (
                <div className="mt-4">
                  <a
                    href={film.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-starwars-gold/60 hover:text-starwars-gold transition-colors"
                  >
                    {locale === 'zh-CN' ? '来源：维基百科' : 'Source: Wikipedia'}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Characters Section */}
      {heroCharactersWithDetails.length > 0 && (
        <section className="py-12 px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-starwars-gold mb-8 text-center">
              {locale === 'zh-CN' ? '关键角色' : 'Key Characters'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {heroCharactersWithDetails.map((hero, index) => (
                <Link
                  key={hero.slug}
                  href={`/${locale}/characters/${hero.slug}`}
                  className="group bg-gradient-to-b from-starwars-blue/60 to-starwars-black/80 rounded-lg p-4 border border-starwars-gold/20 hover:border-starwars-gold/50 transition-all duration-300"
                >
                  <div className="w-full h-32 bg-gradient-to-br from-starwars-blue/40 to-transparent rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-4xl text-starwars-gold/40 font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-starwars-gold group-hover:text-starwars-yellow transition-colors">
                    {hero.name}
                  </h3>
                  {hero.bio && (
                    <p className="text-sm text-starwars-white/60 line-clamp-2 mt-1">
                      {hero.bio}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom spacing */}
      <div className="h-20" />
    </div>
  );
}