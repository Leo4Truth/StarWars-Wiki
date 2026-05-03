# Star Wars Wiki Assets

This directory contains static assets for the Star Wars Wiki site.

## Directory Structure

```
frontend/public/assets/
├── films/                  # Film posters and backdrops
│   ├── episode-i-the-phantom-menace/
│   ├── episode-ii-attack-of-the-clones/
│   ├── episode-iii-revenge-of-the-sith/
│   ├── episode-iv-a-new-hope/
│   ├── episode-v-the-empire-strikes-back/
│   ├── episode-vi-return-of-the-jedi/
│   ├── episode-vii-the-force-awakens/
│   ├── episode-viii-the-last-jedi/
│   ├── episode-ix-the-rise-of-skywalker/
│   └── rogue-one/
├── characters/             # Character portraits
│   ├── luke-skywalker/
│   ├── leia-organa/
│   ├── han-solo/
│   └── ...
└── beyond-films/           # Animation, comics, games artwork
    ├── ahsoka-tano/
    └── ...
```

## Asset Types

- **films/**: `poster.jpg`, `backdrop.jpg`, `thumbnail.jpg`
- **characters/**: `portrait.jpg`
- **beyond-films/**: `artwork.jpg`

## Placeholder Strategy

For MVP, SVG placeholders are generated programmatically by `AssetPlaceholder.tsx`.
Real assets should be added as they are collected with proper licensing.