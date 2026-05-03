import { getFilmTimeline, getBeyondFilms } from '@/lib/api';
import FilmTimelineRail from '@/components/film/FilmTimelineRail';
import BeyondFilmsCarousel from '@/components/film/BeyondFilmsCarousel';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  // Fetch data in parallel
  const [timelineData, beyondData] = await Promise.all([
    getFilmTimeline(locale),
    getBeyondFilms(locale),
  ]);

  return (
    <div className="min-h-screen bg-starwars-black">
      {/* Hero Section */}
      <div className="relative py-16 px-4 bg-gradient-to-b from-starwars-blue/30 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-starwars-gold mb-4 tracking-wider">
            探索银河系的历史
          </h1>
          <p className="text-xl text-starwars-white/70 max-w-2xl mx-auto">
            {locale === 'zh-CN'
              ? '从古老的共和国到反抗军的胜利，踏上史诗般的星际旅程'
              : 'From the ancient Republic to the triumph of the Rebellion, embark on an epic journey through the galaxy'}
          </p>
        </div>

        {/* Decorative stars */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Film Timeline Section */}
      <section className="py-12 bg-gradient-to-b from-transparent via-starwars-blue/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-starwars-gold mb-2">
              {locale === 'zh-CN' ? '电影时间线' : 'Film Timeline'}
            </h2>
            <p className="text-starwars-white/60">
              {locale === 'zh-CN'
                ? '按编年顺序探索星战电影宇宙'
                : 'Explore the Star Wars film universe in chronological order'}
            </p>
          </div>

          <FilmTimelineRail items={timelineData.items} locale={locale} />
        </div>
      </section>

      {/* Beyond Films Section */}
      <section className="py-12 bg-gradient-to-b from-transparent to-starwars-blue/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-starwars-gold mb-2">
              {locale === 'zh-CN' ? '电影之外的银河故事' : 'Stories Beyond the Films'}
            </h2>
            <p className="text-starwars-white/60">
              {locale === 'zh-CN'
                ? '探索动画、小说、漫画和游戏中的精彩角色和故事'
                : 'Discover fascinating characters and stories from animation, novels, comics, and games'}
            </p>
          </div>

          <BeyondFilmsCarousel items={beyondData.items} locale={locale} />
        </div>
      </section>
    </div>
  );
}