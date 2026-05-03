# Decisions Log

## 2026-05-03 — Static Assets and Placeholder System

### Why programmatic SVG placeholders instead of real images
Star Wars assets are copyright-protected. For MVP, we generate SVG placeholders with Star Wars theming (dark blue/gold color scheme, era badges, BBY/ABY labels). Real assets can be swapped in when licensing is resolved.

### Why store placeholders in frontend/src/components/ui
The AssetPlaceholder.tsx component generates dynamic placeholders with film titles, era badges, faction indicators. It uses Tailwind color scheme (starwars-blue, starwars-gold, etc.) from globals.css.

### Why asset mapping in frontend/src/lib/assets.ts
Centralizes asset path mapping and URL generation. Provides getFilmImageUrl, getCharacterImageUrl helpers that return local paths, with fallback to placeholder generation planned for future.

## 2026-05-03 — Harness Engineering Foundation

### Why Python type annotations are `dict[str, Any]` not `dict`
The FastAPI routes use `-> dict` as return type. In strict mypy mode, bare `dict` without type args is an error. Changed all route return types to `dict[str, Any]` to satisfy `--strict` mypy while maintaining the existing API contract.

### Why ruff I001 import sort error was on main.py
Running `ruff check . --fix` auto-fixes import ordering. The import block in `app/main.py` was not sorted. Ruff fixed it by organizing the two imports.

### Why uv run --with is needed for dev deps
The `pyproject.toml` uses `[project.optional-dependencies]` with `dev` extras. `uv run` does not auto-install dev deps for `pytest` / `ruff` / `mypy` unless explicitly told via `--with` or `--extra-dev`. For CI scripts, use `--with pytest --with httpx ...` to ensure they are available.

### Why ruff line-length is 120
Default ruff line-length is 88 (PEP 8). We set it to 120 to match the existing code style which has lines longer than 88 chars due to Chinese characters in strings doubling the visual width.

### Why `load_csv` returns `list[dict[str, Any]]` not `list[dict[str, str]]`
CSV DictReader yields `dict[str, str]` by default, but mypy strict mode flagged the `dict[str, str]` return type when the data flows through route handlers that need to pass values to JSON serializers. Using `Any` is a pragmatic choice for the CSV-based MVP; when a real DB is added with proper ORM models, this can be tightened.

### Why frontend tests use `require("../lib/api")` not `@/lib/api`
Jest's module resolver does not automatically pick up the Next.js path alias `@/*` when using `require()`. The tests use relative paths to avoid the module resolution issue. This is a known limitation of Jest with Next.js path aliases.

### Why `jest.config.js` uses `nextJest()` factory pattern
Next.js requires its own Jest transformer (SWC-based) for proper TSX compilation. The `createJestConfig = nextJest({ dir: "./" })` pattern is mandatory — Next.js will not work with a plain Jest config.

### Why backend mypy uses `--explicit-package-bases`
Without `--explicit-package-bases`, mypy sees both `seed_loader` and `app.core.seed_loader` as separate module names for the same file. This flag tells mypy to treat the directory structure as explicit package bases, resolving the duplicate module issue.
