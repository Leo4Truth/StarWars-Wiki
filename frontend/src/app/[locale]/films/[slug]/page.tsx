export default async function FilmPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const res = await fetch(`http://localhost:8000/api/v1/films/${slug}?locale=${locale}`, { cache: 'no-store' });
  const data = await res.json();
  return (
    <main style={{ padding: 24 }}>
      <h1>{data.display_title}</h1>
      <pre>{JSON.stringify(data.film, null, 2)}</pre>
    </main>
  );
}
