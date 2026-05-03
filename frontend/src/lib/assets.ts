/**
 * Asset mapping and URL helpers for Star Wars Wiki
 *
 * Maps canonical IDs to local asset paths.
 * Falls back to placeholder generation if asset is missing.
 */

export interface FilmAssetPaths {
  poster: string;
  backdrop: string;
  thumbnail: string;
}

export interface CharacterAssetPaths {
  portrait: string;
}

export interface BeyondFilmAssetPaths {
  artwork: string;
}

// Film slugs from the MVP data
export const FILM_SLUGS = [
  'episode-i-the-phantom-menace',
  'episode-ii-attack-of-the-clones',
  'episode-iii-revenge-of-the-sith',
  'episode-iv-a-new-hope',
  'episode-v-the-empire-strikes-back',
  'episode-vi-return-of-the-jedi',
  'episode-vii-the-force-awakens',
  'episode-viii-the-last-jedi',
  'episode-ix-the-rise-of-skywalker',
  'rogue-one',
] as const;

// Character slugs from MVP data
export const CHARACTER_SLUGS = [
  'luke-skywalker',
  'leia-organa',
  'han-solo',
  'darth-vader',
  'yoda',
  'obi-wan-kenobi',
  'anakin-skywalker',
  'padme-amidala',
  'chewbacca',
  'lando-calrissian',
  'boba-fett',
  'jabba-the-hutt',
  'c-3po',
  'r2-d2',
  'mace-windu',
  'count-dooku',
  'general-grievous',
  'darth-maul',
  'qui-gon-jinn',
  'emperor-palpatine',
  'kylo-ren',
  'finn',
  'rey',
  'poe-damaron',
  'general-hux',
  'captain-phasma',
  'ahsoka-tano',
  'maul',
  'jango-fett',
] as const;

// Beyond-film slugs
export const BEYOND_FILM_SLUGS = [
  'ahsoka-tano',
  'mara-jade',
  'revan',
  'doctor-aphra',
] as const;

/**
 * Get local asset path for a film
 */
export function getFilmAssetPath(slug: string, type: 'poster' | 'backdrop' | 'thumbnail'): string {
  return `/assets/films/${slug}/${type}.jpg`;
}

/**
 * Get local asset path for a character
 */
export function getCharacterAssetPath(slug: string): string {
  return `/assets/characters/${slug}/portrait.jpg`;
}

/**
 * Get local asset path for a beyond-film entry
 */
export function getBeyondFilmAssetPath(slug: string): string {
  return `/assets/beyond-films/${slug}/artwork.jpg`;
}

/**
 * Get the best available image URL for a film
 * Falls back to placeholder data if no local asset
 */
export function getFilmImageUrl(
  slug: string,
  type: 'poster' | 'backdrop' | 'thumbnail' = 'poster'
): string {
  const localPath = getFilmAssetPath(slug, type);
  return localPath;
}

/**
 * Get the best available image URL for a character
 */
export function getCharacterImageUrl(slug: string): string {
  const localPath = getCharacterAssetPath(slug);
  return localPath;
}

/**
 * Get the best available image URL for a beyond-film entry
 */
export function getBeyondFilmImageUrl(slug: string): string {
  const localPath = getBeyondFilmAssetPath(slug);
  return localPath;
}

// Era mapping for placeholder styling
export const ERA_DISPLAY: Record<string, { label: string; labelEn: string }> = {
  prequel: { label: '前传', labelEn: 'Prequel Era' },
  original: { label: '正传', labelEn: 'Original Era' },
  sequel: { label: '后传', labelEn: 'Sequel Era' },
  anthology: { label: '外传', labelEn: 'Anthology' },
};

// BBY/ABY labels for films
export const BBY_ABY_LABELS: Record<string, string> = {
  'episode-i-the-phantom-menace': '32 BBY',
  'episode-ii-attack-of-the-clones': '22 BBY',
  'episode-iii-revenge-of-the-sith': '19 BBY',
  'episode-iv-a-new-hope': '0 BBY',
  'episode-v-the-empire-strikes-back': '3 ABY',
  'episode-vi-return-of-the-jedi': '4 ABY',
  'episode-vii-the-force-awakens': '34 ABY',
  'episode-viii-the-last-jedi': '34 ABY',
  'episode-ix-the-rise-of-skywalker': '35 ABY',
  'rogue-one': '0 BBY',
};