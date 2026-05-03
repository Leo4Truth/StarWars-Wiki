# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Star Wars Wiki — a bilingual (zh-CN / en-US) wiki site for the Star Wars franchise. MVP stage with FastAPI backend and Next.js 16 frontend.

## Backend (FastAPI + uv)

```bash
cd backend
uv sync --dev            # install all deps including dev
uv run uvicorn app.main:app --reload --port 8000   # dev server
uv run --with pytest --with httpx --with pytest-asyncio pytest tests/ -v  # run tests
uv run --with ruff ruff check .   # lint
uv run --with mypy mypy app/ --explicit-package-bases  # type check
```

- **Entry point**: `backend/app/main.py` — FastAPI app with v1 router at `/api/v1`
- **Routes**: `backend/app/api/v1/routes.py` — all API endpoints
- **Seed data**: `backend/data/mvp_films.csv` and `backend/data/mvp_characters.csv` loaded via `backend/app/core/seed_loader.py`
- **Python version**: 3.13+

## Frontend (Next.js + TypeScript)

```bash
cd frontend
npm install
npm run dev          # dev server (port 3000)
npm run build        # production build
npm run lint         # ESLint
npm test             # Jest tests
```

- **Routing**: App Router with locale segment — `src/app/[locale]/...`
- **Path alias**: `@/*` maps to `src/*`
- **Home page**: `src/app/[locale]/page.tsx` — fetches film timeline via `getFilmTimeline()`
- **API client**: `src/lib/api.ts` — `getFilmTimeline`, `getFilmDetail`, `getCharacterDetail`

## Architecture Notes

- Backend loads seed data from CSV files — no database connection yet. Planned stack: PostgreSQL + Neo4j + Redis per `docs/Technical-Design.md`.
- `timeline_sort_key` is the canonical ordering field (float) for film timeline sorting.
- All API responses include `locale` in the response body.
- `era` filter values: `prequel`, `original`, `sequel`, `anthology`, `all`.
- `locale` enum: `zh-CN`, `en-US`.

## CI/CD Validation Protocol

**Every code change must pass CI checks locally before committing.** The GitHub Actions workflow runs the same commands, so validating locally catches failures before they reach CI.

### Pre-commit Checklist

Run these commands **before every commit** (excluding trivial changes like docs/comments):

#### Backend
```bash
cd backend
uv run --with ruff ruff check .                          # lint
uv run --with mypy mypy app/ --explicit-package-bases   # type check
uv run --with pytest --with httpx --with pytest-asyncio pytest tests/ -v  # tests
```

#### Frontend
```bash
cd frontend
npm run lint                                             # ESLint
npx tsc --noEmit                                        # TypeScript (must pass)
npm test                                                # Jest tests
```

#### Commit & Push
```bash
git add <changed files>
git commit -m "$(cat <<'EOF'
<conventional commit message>
EOF
)"
git push
```

### Why validate locally first

- GitHub Actions cannot be run locally in full, but the commands are identical
- CI feedback loop is slow (~2-5 min per run); local checks are instant
- Catching failures locally prevents noisy CI red builds on the shared branch
- Some errors (mypy module resolution, TypeScript deprecations) are environment-specific — local validation surfaces them

### CI Pipeline Structure

The `.github/workflows/ci.yml` runs:

| Stage | Backend | Frontend |
|-------|---------|----------|
| Install | `uv sync --dev` | `npm ci` |
| Lint | `ruff check .` | `npm run lint` |
| Type check | `mypy app/ --explicit-package-bases` | `tsc --noEmit` |
| Tests | `pytest tests/ -v` | `npm test` |

If any stage fails, the pipeline stops. All stages must green before merging to main.

## Agent Change Protocol

When making a change, follow this sequence:

1. **Test-first**: Write a failing test that captures the expected behavior
2. **Run full test suite**: All tests must pass before committing
3. **Lint clean**: `ruff check .` and `npm run lint` pass
4. **Type check clean**: `mypy app/ --explicit-package-bases` and `npx tsc --noEmit` pass
5. **Update memory files**: Log the decision in `.claude/memory/decisions.md`, update `.claude/memory/project-state.md`
6. **Update docs**: If behavior changed, update relevant docs
7. **Conventional commits**: Use `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`

## Key Files

- [PRD](docs/PRD.md) — product requirements
- [Technical Design](docs/Technical-Design.md) — full tech stack and architecture
- [MVP Data Dictionary](docs/mvp/MVP-Data-Dictionary-v1.md) — planned data models
- [OpenAPI Contract](docs/mvp/openapi-mvp.yaml) — frozen API spec

## Memory Files

- `.claude/memory/decisions.md` — architectural decisions and rationale
- `.claude/memory/bugs.md` — known bugs and workarounds
- `.claude/memory/project-state.md` — current implementation state snapshot

## Current API Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/home/film-timeline?locale=&era=` | Film timeline sorted by `timeline_sort_key` |
| GET | `/api/v1/home/beyond-films?locale=&type=` | Non-film character entries |
| GET | `/api/v1/films/{slug}?locale=` | Film detail |
| GET | `/api/v1/characters/{slug}?locale=` | Character detail |
| GET | `/api/v1/graph/subgraph?entity_id=&depth=` | Knowledge graph subgraph (stub) |
| GET | `/healthz` | Health check |
