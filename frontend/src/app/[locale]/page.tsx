import Link from 'next/link';
import { getFilmTimeline } from '@/lib/api';

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const data = await getFilmTimeline(locale);

  return (
    <main style={{ padding: 24 }}>
      <h1>StarWars Wiki ({locale})</h1>
      <h2>按时间线探索星战电影</h2>
      <ul>
        {data.items.map((film: any) => (
          <li key={film.canonical_id}>
            <Link href={`/${locale}/films/${film.slug}`}>{locale === 'zh-CN' ? film.title_zh : film.title_en}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
