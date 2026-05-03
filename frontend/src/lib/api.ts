const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

export async function getFilmTimeline(locale: string, era: string = 'all') {
  const res = await fetch(`${API_BASE}/api/v1/home/film-timeline?locale=${locale}&era=${era}`);
  if (!res.ok) throw new Error('failed to fetch film timeline');
  return res.json();
}

export async function getFilmDetail(slug: string, locale: string) {
  const res = await fetch(`${API_BASE}/api/v1/films/${slug}?locale=${locale}`);
  if (!res.ok) throw new Error('failed to fetch film detail');
  return res.json();
}

export async function getCharacterDetail(slug: string, locale: string) {
  const res = await fetch(`${API_BASE}/api/v1/characters/${slug}?locale=${locale}`);
  if (!res.ok) throw new Error('failed to fetch character detail');
  return res.json();
}
