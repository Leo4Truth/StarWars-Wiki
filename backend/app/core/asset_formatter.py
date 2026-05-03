from __future__ import annotations

from typing import Any

from app.core.seed_loader import load_csv


def get_film_assets(film_canonical_id: str) -> dict[str, Any]:
    """Get all asset URLs for a film by canonical ID."""
    for asset in load_csv("film_assets.csv"):
        if asset["film_canonical_id"] == film_canonical_id:
            return {
                "poster_url": asset.get("poster_url"),
                "backdrop_url": asset.get("backdrop_url"),
                "thumbnail_url": asset.get("thumbnail_url"),
                "logo_url": asset.get("logo_url") or None,
                "gallery_urls": _parse_gallery_urls(asset.get("gallery_urls")),
            }
    return {
        "poster_url": None,
        "backdrop_url": None,
        "thumbnail_url": None,
        "logo_url": None,
        "gallery_urls": [],
    }


def get_character_assets(char_canonical_id: str) -> dict[str, Any]:
    """Get all asset URLs for a character by canonical ID."""
    for asset in load_csv("character_assets.csv"):
        if asset["char_canonical_id"] == char_canonical_id:
            return {
                "portrait_url": asset.get("portrait_url"),
                "action_shot_url": asset.get("action_shot_url"),
                "symbol_url": asset.get("symbol_url"),
            }
    return {
        "portrait_url": None,
        "action_shot_url": None,
        "symbol_url": None,
    }


def get_beyond_film_assets(canonical_id: str) -> dict[str, Any]:
    """Get all asset URLs for a beyond-film entry by canonical ID."""
    for asset in load_csv("beyond_film_assets.csv"):
        if asset["entry_canonical_id"] == canonical_id:
            return {
                "poster_url": asset.get("poster_url"),
                "artwork_url": asset.get("artwork_url"),
            }
    return {
        "poster_url": None,
        "artwork_url": None,
    }


def _parse_gallery_urls(gallery_str: str | None) -> list[str]:
    """Parse pipe-separated gallery URLs into a list."""
    if not gallery_str:
        return []
    return [url.strip() for url in gallery_str.split("|") if url.strip()]