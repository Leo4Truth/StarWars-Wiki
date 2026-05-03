import { Suspense } from 'react';
import { getFilmTimeline, getBeyondFilms } from '@/lib/api';
import FilmTimelineRail from '@/components/film/FilmTimelineRail';
import BeyondFilmsCarousel from '@/components/film/BeyondFilmsCarousel';
import StarWarsBackground from '@/components/ui/StarWarsBackground';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

async function FilmTimelineSection({ locale }: { locale: string }) {
  const timelineData = await getFilmTimeline(locale);
  return <FilmTimelineRail items={timelineData.items} locale={locale} />;
}

async function BeyondFilmsSection({ locale }: { locale: string }) {
  const beyondData = await getBeyondFilms(locale);
  return <BeyondFilmsCarousel items={beyondData.items} locale={locale} />;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-starwars-black relative overflow-hidden">
      {/* Animated Star Wars Background */}
      <StarWarsBackground />

      {/* Hero Section */}
      <div className="relative py-20 px-4 bg-gradient-to-b from-starwars-blue/40 via-starwars-black/80 to-transparent">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-starwars-gold mb-6 tracking-wider drop-shadow-lg"
              style={{ textShadow: '0 0 30px rgba(255, 215, 0, 0.5)' }}>
            {locale === 'zh-CN' ? '探索银河系的历史' : 'Explore the Galaxy\'s History'}
          </h1>
          <p className="text-xl md:text-2xl text-starwars-white/80 max-w-2xl mx-auto leading-relaxed">
            {locale === 'zh-CN'
              ? '从古老的共和国到反抗军的胜利，踏上史诗般的星际旅程'
              : 'From the ancient Republic to the triumph of the Rebellion, embark on an epic journey through the galaxy'}
          </p>

          {/* Decorative elements */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-starwars-gold/50" />
            <svg className="w-8 h-8 text-starwars-gold/60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-starwars-gold/50" />
          </div>
        </div>
      </div>

      {/* Film Timeline Section */}
      <section className="py-16 bg-gradient-to-b from-transparent via-starwars-blue/10 to-transparent relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-starwars-gold mb-3 tracking-wider">
              {locale === 'zh-CN' ? '电影时间线' : 'Film Timeline'}
            </h2>
            <p className="text-starwars-white/60 max-w-xl mx-auto">
              {locale === 'zh-CN'
                ? '按编年顺序探索星战电影宇宙'
                : 'Explore the Star Wars film universe in chronological order'}
            </p>
          </div>

          <Suspense fallback={<LoadingSkeleton type="timeline" locale={locale} />}>
            <FilmTimelineSection locale={locale} />
          </Suspense>
        </div>
      </section>

      {/* Beyond Films Section */}
      <section className="py-16 bg-gradient-to-b from-transparent to-starwars-blue/20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-starwars-gold mb-3 tracking-wider">
              {locale === 'zh-CN' ? '电影之外的银河故事' : 'Stories Beyond the Films'}
            </h2>
            <p className="text-starwars-white/60 max-w-xl mx-auto">
              {locale === 'zh-CN'
                ? '探索动画、小说、漫画和游戏中的精彩角色和故事'
                : 'Discover fascinating characters and stories from animation, novels, comics, and games'}
            </p>
          </div>

          <Suspense fallback={<LoadingSkeleton type="beyond" locale={locale} />}>
            <BeyondFilmsSection locale={locale} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}