// Character portrait paths mapping
export const characterPortraits: Record<string, string> = {
  'luke-skywalker': '/assets/characters/luke-skywalker/portrait.jpg',
  'princess-leia': '/assets/characters/princess-leia/portrait.jpg',
  'han-solo': '/assets/characters/han-solo/portrait.jpg',
  'darth-vader': '/assets/characters/darth-vader/portrait.jpg',
  'obi-wan-kenobi': '/assets/characters/obi-wan-kenobi/portrait.jpg',
};

export function getCharacterPortrait(slug: string): string | null {
  return characterPortraits[slug] || null;
}

// Film poster paths mapping (for reference)
export const filmPosters: Record<string, string> = {
  'phantom-menace': '/assets/films/phantom-menace/poster.jpg',
  'attack-clones': '/assets/films/attack-clones/poster.jpg',
  'revenge-sith': '/assets/films/revenge-sith/poster.jpg',
  'new-hope': '/assets/films/new-hope/poster.jpg',
  'empire-strikes': '/assets/films/empire-strikes/poster.jpg',
  'return-jedi': '/assets/films/return-jedi/poster.jpg',
  'force-awakens': '/assets/films/force-awakens/poster.jpg',
  'last-jedi': '/assets/films/last-jedi/poster.jpg',
  'rise-skywalker': '/assets/films/rise-skywalker/poster.jpg',
  'rogue-one': '/assets/films/rogue-one/poster.jpg',
  'solo': '/assets/films/solo/poster.jpg',
};