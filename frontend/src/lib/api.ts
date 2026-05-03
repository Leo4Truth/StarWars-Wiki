const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

// Types matching the API contract
export interface HeroCharacter {
  slug: string;
  name: string;
}

export interface FilmItem {
  canonical_id: string;
  slug: string;
  title: string;
  title_en: string;
  release_date: string;
  era: string;
  bby_aby_label: string;
  bby_aby_numeric: number;
  timeline_sort_key: number;
  synopsis_zh: string;
  synopsis_en: string;
  hero_characters: HeroCharacter[];
  hover_summary: string;
}

export interface FilmTimelineResponse {
  locale: string;
  items: FilmItem[];
}

export interface BeyondFilmEntry {
  canonical_id: string;
  slug: string;
  name: string;
  name_en: string;
  origin_type: string;
  origin_work_title: string;
  bby_aby_label: string;
  movie_linkage: string | null;
  movie_linkage_label: string | null;
  bio_summary: string;
  detail_url: string;
}

export interface BeyondFilmsResponse {
  locale: string;
  items: BeyondFilmEntry[];
}

export async function getFilmTimeline(locale: string, era: string = 'all'): Promise<FilmTimelineResponse> {
  const res = await fetch(`${API_BASE}/api/v1/home/film-timeline?locale=${locale}&era=${era}`);
  if (!res.ok) throw new Error('failed to fetch film timeline');
  return res.json();
}

export async function getBeyondFilms(locale: string, type: string = 'all'): Promise<BeyondFilmsResponse> {
  const res = await fetch(`${API_BASE}/api/v1/home/beyond-films?locale=${locale}&type=${type}`);
  if (!res.ok) throw new Error('failed to fetch beyond films');
  return res.json();
}

export async function getFilmDetail(slug: string, locale: string) {
  const res = await fetch(`${API_BASE}/api/v1/films/${slug}?locale=${locale}`);
  if (!res.ok) throw new Error('failed to fetch film detail');
  return res.json();
}

export interface CharacterListItem {
  canonical_id: string;
  slug: string;
  name: string;
  name_en: string;
  faction_zh: string;
  first_appearance: string;
  first_appearance_label: string;
  bby_aby_label: string;
}

export interface CharactersResponse {
  locale: string;
  items: CharacterListItem[];
  total: number;
  limit: number;
  offset: number;
}

export async function getCharacters(locale: string, faction?: string, era?: string, limit: number = 20, offset: number = 0): Promise<CharactersResponse> {
  let url = `${API_BASE}/api/v1/characters?locale=${locale}&limit=${limit}&offset=${offset}`;
  if (faction) url += `&faction=${faction}`;
  if (era) url += `&era=${era}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('failed to fetch characters');
  return res.json();
}

export async function getCharacterDetail(slug: string, locale: string) {
  const res = await fetch(`${API_BASE}/api/v1/characters/${slug}?locale=${locale}`);
  if (!res.ok) throw new Error('failed to fetch character detail');
  return res.json();
}