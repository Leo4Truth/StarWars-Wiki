import { Suspense } from 'react';
import { getFilmTimeline } from '@/lib/api';
import FilmsClient from '@/components/film/FilmsClient';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import StarWarsBackground from '@/components/ui/StarWarsBackground';

interface FilmsPageProps {
  params: Promise<{ locale: string }>;
}

async function FilmsContent({ locale }: { locale: string }) {
  const timelineData = await getFilmTimeline(locale);
  return <FilmsClient items={timelineData.items} locale={locale} />;
}

export default async function FilmsPage({ params }: FilmsPageProps) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-starwars-black relative overflow-hidden">
      {/* Animated Star Wars Background */}
      <StarWarsBackground />

      {/* Page Header */}
      <div className="relative py-16 px-4 bg-gradient-to-b from-starwars-blue/40 via-starwars-black/80 to-transparent">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-starwars-gold mb-4 tracking-wider drop-shadow-lg"
              style={{ textShadow: '0 0 30px rgba(255, 215, 0, 0.5)' }}>
            {locale === 'zh-CN' ? '电影' : 'Films'}
          </h1>
          <p className="text-lg text-starwars-white/70 max-w-2xl mx-auto">
            {locale === 'zh-CN'
              ? '从古老的前传到史诗般的后传，探索星球大战电影宇宙的完整历程'
              : 'From the ancient prequels to the epic sequels, explore the complete journey of the Star Wars film universe'}
          </p>

          {/* Decorative elements */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-starwars-gold/50" />
            <svg className="w-8 h-8 text-starwars-gold/60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-starwars-gold/50" />
          </div>
        </div>
      </div>

      {/* Films Grid Section */}
      <section className="py-12 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<LoadingSkeleton type="timeline" locale={locale} />}>
            <FilmsContent locale={locale} />
          </Suspense>
        </div>
      </section>

      {/* Bottom decorative gradient */}
      <div className="h-32 bg-gradient-to-t from-starwars-blue/20 to-transparent" />
    </div>
  );
}