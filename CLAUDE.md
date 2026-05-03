# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Star Wars Wiki — a bilingual (zh-CN / en-US) wiki site for the Star Wars franchise. MVP stage with FastAPI backend and Next.js frontend.

## Backend (FastAPI + uv)

```bash
cd backend
uv run uvicorn app.main:app --reload --port 8000   # dev server
```

- **Entry point**: `backend/app/main.py` — FastAPI app with v1 router at `/api/v1`
- **Routes**: `backend/app/api/v1/routes.py` — all API endpoints
- **Seed data**: `backend/data/mvp_films.csv` and `backend/data/mvp_characters.csv` loaded via `backend/app/core/seed_loader.py`
- **Current API routes**:
  - `GET /api/v1/home/film-timeline?locale=&era=` — film timeline (sorted by `timeline_sort_key`)
  - `GET /api/v1/home/beyond-films?locale=&type=` — non-film character entries
  - `GET /api/v1/films/{slug}?locale=` — film detail
  - `GET /api/v1/characters/{slug}?locale=` — character detail
  - `GET /api/v1/graph/subgraph?entity_id=&depth=` — knowledge graph subgraph (stub, returns empty)
- **Python version**: 3.13+

## Frontend (Next.js + TypeScript)

```bash
cd frontend
npm install
npm run dev          # dev server
npm run build        # production build
```

- **Routing**: App Router with locale segment — `src/app/[locale]/...`
- **Path alias**: `@/*` maps to `src/*`
- **Home page**: `src/app/[locale]/page.tsx` — fetches film timeline via `getFilmTimeline()`
- **Film detail**: `src/app/[locale]/films/[slug]/page.tsx`
- **i18n**: Routes prefixed with `/{locale}` (e.g., `/zh-CN/films/...`, `/en-US/films/...`)

## Architecture Notes

- Backend currently loads seed data from CSV files — no database connection yet. The planned stack is PostgreSQL + Neo4j + Redis per the PRD.
- Frontend has no `lib/api.ts` yet; `getFilmTimeline()` is likely imported from a path that doesn't exist — the API fetching layer is still being built out.
- API responses include `locale` in the response body for content adaptation.

## Key Docs

- [PRD](docs/PRD.md) — product requirements
- [Technical Design](docs/Technical-Design.md) — full tech stack and architecture (PostgreSQL + Neo4j + Redis planned)
- [MVP Data Dictionary](docs/mvp/MVP-Data-Dictionary-v1.md) — planned data models
