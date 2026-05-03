from __future__ import annotations

from app.core.seed_loader import load_csv


def test_load_films():
    items = load_csv("mvp_films.csv")
    assert len(items) > 0


def test_films_have_required_fields():
    required = ["canonical_id", "slug", "title_en", "title_zh", "release_date", "era", "timeline_sort_key"]
    items = load_csv("mvp_films.csv")
    for item in items:
        for field in required:
            assert field in item, f"missing field {field} in {item['slug']}"


def test_films_slug_unique():
    items = load_csv("mvp_films.csv")
    slugs = [item["slug"] for item in items]
    assert len(slugs) == len(set(slugs)), "duplicate film slugs"


def test_films_timeline_sort_key_numeric():
    items = load_csv("mvp_films.csv")
    for item in items:
        float(item["timeline_sort_key"])


def test_films_sorted_by_timeline_sort_key():
    items = load_csv("mvp_films.csv")
    sorted_items = sorted(items, key=lambda x: float(x["timeline_sort_key"]))
    keys = [float(item["timeline_sort_key"]) for item in items]
    sorted_keys = [float(item["timeline_sort_key"]) for item in sorted_items]
    assert keys == sorted_keys


def test_films_valid_era():
    valid_eras = {"prequel", "original", "sequel", "anthology"}
    items = load_csv("mvp_films.csv")
    for item in items:
        assert item["era"] in valid_eras, f"unknown era {item['era']} in {item['slug']}"


def test_films_locale_bilingual():
    items = load_csv("mvp_films.csv")
    for item in items:
        assert item["title_zh"]
        assert item["title_en"]
        assert item["title_zh"] != item["title_en"]


def test_load_characters():
    items = load_csv("mvp_characters.csv")
    assert len(items) > 0


def test_characters_have_required_fields():
    required = ["canonical_id", "slug", "name_en", "name_zh", "first_appearance", "origin_type"]
    items = load_csv("mvp_characters.csv")
    for item in items:
        for field in required:
            assert field in item, f"missing field {field} in {item['slug']}"


def test_characters_slug_unique():
    items = load_csv("mvp_characters.csv")
    slugs = [item["slug"] for item in items]
    assert len(slugs) == len(set(slugs)), "duplicate character slugs"


def test_characters_valid_origin_type():
    valid_types = {"film", "animation", "novel", "comic", "game"}
    items = load_csv("mvp_characters.csv")
    for item in items:
        assert item["origin_type"] in valid_types, f"unknown origin_type {item['origin_type']} in {item['slug']}"


def test_characters_locale_bilingual():
    items = load_csv("mvp_characters.csv")
    for item in items:
        assert item["name_zh"]
        assert item["name_en"]
        assert item["name_zh"] != item["name_en"]


def test_beyond_films_filter():
    items = [c for c in load_csv("mvp_characters.csv") if c.get("is_beyond_films_entry") == "1"]
    for item in items:
        assert item["origin_type"] != "film"
