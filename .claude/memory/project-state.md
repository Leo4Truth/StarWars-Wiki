# Project State

## What's Implemented

### Backend (FastAPI + uv)
- `app/main.py` — FastAPI app with v1 router at `/api/v1`
- `app/api/v1/routes.py` — 5 API endpoints (film timeline, beyond films, film detail, character detail, graph subgraph)
- `app/core/seed_loader.py` — CSV data loader for MVP films and characters
- `backend/data/` — MVP seed CSVs (mvp_films.csv, mvp_characters.csv)
- **No database yet** — MVP uses CSV files only; PostgreSQL/Neo4j/Redis planned per Technical Design

### Frontend (Next.js 16 + TypeScript)
- `src/app/[locale]/page.tsx` — Home page with film timeline (SSR)
- `src/app/[locale]/films/[slug]/page.tsx` — Film detail page
- `src/app/page.tsx` — Redirects `/` to `/zh-CN`
- `src/lib/api.ts` — API client (getFilmTimeline, getFilmDetail, getCharacterDetail)
- `src/lib/assets.ts` — Asset mapping and URL helpers
- `src/components/ui/AssetPlaceholder.tsx` — SVG placeholder generator component
- `frontend/public/assets/` — Directory structure for films, characters, beyond-films
- `jest.config.js`, `jest.setup.js` — Jest test infrastructure
- **No i18n library yet** — locale routing exists but UI strings are hardcoded

### Tests
- `backend/tests/test_routes.py` — 11 API endpoint tests (httpx + ASGI transport)
- `backend/tests/test_seed_loader.py` — 13 CSV integrity tests
- `backend/tests/test_contract.py` — 7 OpenAPI contract validation tests
- `frontend/src/__tests__/api.test.ts` — 4 API client unit tests (Jest + mocked fetch)
- **Total: 35 tests, all passing**

### Lint & Typecheck
- Backend: ruff (linting) + mypy (strict type checking)
- Frontend: `next lint` + `tsc --noEmit`

### CI
- `.github/workflows/ci.yml` — runs lint + typecheck + tests for both backend and frontend on push/PR to main

## What's Planned / Stub

- **Graph endpoint** — returns empty stub, no real relationship data
- **Knowledge graph page** — planned in PRD, not yet implemented
- **Character detail page** — page file doesn't exist yet
- **Database layer** — PostgreSQL + Neo4j + Redis from Technical Design not connected
- **i18n** — `next-intl` or similar not yet set up, UI strings hardcoded
- **E2E tests** — only unit/integration tests exist
- **Conventional commits enforcement** — not enforced by CI yet
- **Release Drafter** — auto-changelog not set up
- **Real assets** — film posters, character portraits not collected (copyright issues); SVG placeholders used for MVP

## API Contract

- **OpenAPI spec**: `docs/mvp/openapi-mvp.yaml` — frozen MVP contract
- All API responses include `locale` in body (not HTTP header)
- `locale` enum: `zh-CN` | `en-US`
- `era` enum: `prequel` | `original` | `sequel` | `anthology` | `all`
- `timeline_sort_key` is the SSOT ordering field (float, sorted ascending)

## Dependencies

### Backend
```
fastapi>=0.115.0
uvicorn[standard]>=0.30.0
pydantic>=2.8.0
pytest>=8.0.0          # dev
pytest-asyncio>=0.24.0 # dev
httpx>=0.28.0          # dev
ruff>=0.9.0            # dev
mypy>=1.14.0           # dev
pyyaml>=6.0.0          # dev
```

### Frontend
```
next: ^16.2.4
react: ^19.2.5
react-dom: ^19.2.5
jest: ^29.7.0          # dev
@testing-library/react: ^16.3.2  # dev
@testing-library/jest-dom: ^6.9.1 # dev
jest-environment-jsdom: ^29.7.0   # dev
```
