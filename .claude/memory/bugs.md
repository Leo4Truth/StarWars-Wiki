# Bug Log

## 2026-05-03 — Frontend: Missing lib/api module

**Symptom**: Page at `/zh-CN` rendered nothing, JS error: `Module not found: Can't resolve '@/lib/api'`

**Root Cause**: `frontend/src/lib/api.ts` did not exist. The home page `src/app/[locale]/page.tsx` imported `getFilmTimeline` from `@/lib/api` which had not been created.

**Fix**: Created `frontend/src/lib/api.ts` with `getFilmTimeline`, `getFilmDetail`, `getCharacterDetail` functions. Also added `@types/react` to devDependencies to resolve the type mismatch.

**Status**: Resolved — fixed in commit `33bd0ca`

---

## 2026-05-03 — Backend: ruff I001 import unsorted

**Symptom**: `ruff check .` reported `I001 Import block is un-sorted or un-formatted` on `app/main.py`

**Root Cause**: Two imports in `app/main.py` were not sorted alphabetically by ruff's isort rules.

**Fix**: Ran `ruff check . --fix` which auto-fixed the import ordering.

**Status**: Resolved

---

## 2026-05-03 — Frontend: `setupFilesAfterFramework` invalid Jest option

**Symptom**: `npm test` printed "Unknown option setupFilesAfterFramework" validation warnings

**Root Cause**: Used incorrect Jest config key name. The correct key is `setupFilesAfterFramework` (singular `Framework`) but Jest expects `setupFilesAfterFramework` which doesn't exist — the correct key is `setupFilesAfterFramework` — actually it's `setupFilesAfterFramework`... need to verify.

**Fix**: Removed the invalid option from `jest.config.js`. The `@testing-library/jest-dom` import is handled by the test files directly via `import "@testing-library/jest-dom"`.

**Status**: Workaround applied — jest setup is handled inline in test files
