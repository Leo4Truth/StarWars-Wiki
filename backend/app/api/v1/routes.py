from __future__ import annotations

from typing import Any

from fastapi import APIRouter, HTTPException, Query

from app.core.seed_loader import load_csv
from app.core.formatters import format_bby_aby_label, build_hover_summary

router = APIRouter()


def _get_character_by_slug(slug: str) -> dict[str, Any] | None:
    """Find a character by slug."""
    for c in load_csv("mvp_characters.csv"):
        if c["slug"] == slug:
            return c
    return None


def _build_hero_characters(hero_slugs: str | None, locale: str) -> list[dict[str, str]]:
    """Build hero characters array from comma-separated slugs."""
    if not hero_slugs:
        return []
    slugs = [s.strip() for s in hero_slugs.split(",")]
    result = []
    for slug in slugs:
        char = _get_character_by_slug(slug)
        if char:
            name = char["name_zh"] if locale == "zh-CN" else char["name_en"]
            result.append({"slug": slug, "name": name})
    return result


def _format_film_item(film: dict[str, Any], locale: str) -> dict[str, Any]:
    """Format a film item for film-timeline response."""
    bby_aby_numeric = int(float(film.get("bby_aby_numeric", 0)))
    title = film["title_zh"] if locale == "zh-CN" else film["title_en"]
    hover_summary = film.get("hover_summary") or build_hover_summary(film)

    return {
        "canonical_id": film["canonical_id"],
        "slug": film["slug"],
        "title": title,
        "title_en": film.get("title_en"),
        "release_date": film.get("release_date"),
        "era": film.get("era"),
        "bby_aby_label": format_bby_aby_label(bby_aby_numeric),
        "bby_aby_numeric": bby_aby_numeric,
        "timeline_sort_key": float(film.get("timeline_sort_key", 0)),
        "synopsis_zh": film.get("synopsis_zh"),
        "synopsis_en": film.get("synopsis_en"),
        "director_zh": film.get("director_zh"),
        "director_en": film.get("director_en"),
        "hero_characters": _build_hero_characters(film.get("hero_characters"), locale),
        "hover_summary": hover_summary,
    }


@router.get("/home/film-timeline")
def home_film_timeline(locale: str = Query(...), era: str = "all") -> dict[str, Any]:
    items = load_csv("mvp_films.csv")
    if era != "all":
        items = [i for i in items if i["era"] == era]
    items = sorted(items, key=lambda x: float(x["timeline_sort_key"]))
    formatted_items = [_format_film_item(f, locale) for f in items]
    return {"locale": locale, "items": formatted_items}


def _get_origin_work_title(char: dict[str, Any], locale: str) -> str:
    """Get the origin work title for a character."""
    origin_type = char.get("origin_type", "")
    first_app = char.get("first_appearance", "")

    if origin_type == "film" or first_app.startswith("film_"):
        for film in load_csv("mvp_films.csv"):
            if film["canonical_id"] == first_app:
                return film["title_zh"] if locale == "zh-CN" else film["title_en"]
        return ""

    origin_type_labels = {
        "animation": "动画",
        "novel": "小说",
        "comic": "漫画",
        "game": "游戏",
    }

    if origin_type in origin_type_labels:
        label = origin_type_labels[origin_type]
        if locale == "zh-CN":
            return f"星球大战{label}"
        else:
            return f"Star Wars {origin_type.title()}"

    return origin_type


@router.get("/home/beyond-films")
def home_beyond_films(locale: str = Query(...), type: str = "all") -> dict[str, Any]:
    items = [c for c in load_csv("mvp_characters.csv") if c.get("is_beyond_films_entry") == "1"]
    if type != "all":
        items = [i for i in items if i.get("origin_type") == type]

    formatted_items = []
    for char in items:
        bby_aby_birth = char.get("bby_aby_birth", "")
        bby_aby_numeric = int(float(bby_aby_birth)) if bby_aby_birth else 0
        name = char["name_zh"] if locale == "zh-CN" else char["name_en"]
        movie_linkage = char.get("movie_linkage", "")
        movie_linkage_label = char.get("movie_linkage_label", "")
        bio_summary = char.get("bio_zh") if locale == "zh-CN" else char.get("bio_en")
        detail_url = char.get("detail_url", f"/{locale}/characters/{char['slug']}")
        origin_work_title = _get_origin_work_title(char, locale)

        formatted_items.append({
            "canonical_id": char["canonical_id"],
            "slug": char["slug"],
            "name": name,
            "name_en": char.get("name_en"),
            "origin_type": char.get("origin_type"),
            "origin_work_title": origin_work_title,
            "bby_aby_label": format_bby_aby_label(bby_aby_numeric),
            "bby_aby_numeric": bby_aby_numeric,
            "movie_linkage": movie_linkage,
            "movie_linkage_label": movie_linkage_label,
            "bio_summary": bio_summary,
            "detail_url": detail_url,
        })

    return {"locale": locale, "items": formatted_items}


@router.get("/films/{slug}")
def film_detail(slug: str, locale: str = Query(...)) -> dict[str, Any]:
    for film in load_csv("mvp_films.csv"):
        if film["slug"] == slug:
            title = film["title_zh"] if locale == "zh-CN" else film["title_en"]
            bby_aby_numeric = int(float(film.get("bby_aby_numeric", 0)))

            return {
                "locale": locale,
                "film": {
                    "canonical_id": film["canonical_id"],
                    "slug": film["slug"],
                    "title": title,
                    "title_en": film.get("title_en"),
                    "release_date": film.get("release_date"),
                    "era": film.get("era"),
                    "bby_aby_label": format_bby_aby_label(bby_aby_numeric),
                    "bby_aby_numeric": bby_aby_numeric,
                    "timeline_sort_key": float(film.get("timeline_sort_key", 0)),
                    "synopsis_zh": film.get("synopsis_zh"),
                    "synopsis_en": film.get("synopsis_en"),
                    "director_zh": film.get("director_zh"),
                    "director_en": film.get("director_en"),
                    "source_url": film.get("source_url"),
                },
                "display_title": title,
            }
    raise HTTPException(status_code=404, detail="film not found")


def _get_film_title(film_canonical_id: str | None, locale: str) -> str:
    """Get film title by canonical ID."""
    if not film_canonical_id:
        return ""
    for film in load_csv("mvp_films.csv"):
        if film["canonical_id"] == film_canonical_id:
            return film["title_zh"] if locale == "zh-CN" else film["title_en"]
    return ""


@router.get("/characters")
def character_list(
    locale: str = Query(...),
    faction: str | None = None,
    era: str | None = None,
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
) -> dict[str, Any]:
    characters = load_csv("mvp_characters.csv")

    if faction:
        characters = [c for c in characters if c.get("faction_en", "").lower() == faction.lower()]

    if era:
        era_film_map = {
            "prequel": ["film_ep1", "film_ep2", "film_ep3"],
            "original": ["film_ep4", "film_ep5", "film_ep6"],
            "sequel": ["film_ep7", "film_ep8", "film_ep9"],
            "anthology": ["film_rogue_one"],
        }
        era_films = era_film_map.get(era, [])
        if era_films:
            characters = [c for c in characters if c.get("first_appearance", "") in era_films]

    total = len(characters)
    paginated = characters[offset:offset + limit]

    items = []
    for char in paginated:
        name = char["name_zh"] if locale == "zh-CN" else char["name_en"]
        bby_aby_birth = char.get("bby_aby_birth", "")
        bby_aby_numeric = int(float(bby_aby_birth)) if bby_aby_birth else 0
        first_app = char.get("first_appearance", "")
        first_app_label = _get_film_title(first_app, locale)

        items.append({
            "canonical_id": char["canonical_id"],
            "slug": char["slug"],
            "name": name,
            "name_en": char.get("name_en"),
            "faction_zh": char.get("faction_zh"),
            "first_appearance": first_app,
            "first_appearance_label": first_app_label,
            "bby_aby_label": format_bby_aby_label(bby_aby_numeric),
        })

    return {
        "locale": locale,
        "items": items,
        "total": total,
        "limit": limit,
        "offset": offset,
    }


@router.get("/characters/{slug}")
def character_detail(slug: str, locale: str = Query(...)) -> dict[str, Any]:
    for c in load_csv("mvp_characters.csv"):
        if c["slug"] == slug:
            name = c["name_zh"] if locale == "zh-CN" else c["name_en"]
            bby_aby_birth = c.get("bby_aby_birth", "")
            bby_aby_numeric = int(float(bby_aby_birth)) if bby_aby_birth else 0
            first_app = c.get("first_appearance", "")
            first_app_label = _get_film_title(first_app, locale)

            return {
                "locale": locale,
                "character": {
                    "canonical_id": c["canonical_id"],
                    "slug": c["slug"],
                    "name": name,
                    "name_en": c.get("name_en"),
                    "aliases_zh": c.get("aliases_zh", "").split("|") if c.get("aliases_zh") else [],
                    "aliases_en": c.get("aliases_en", "").split("|") if c.get("aliases_en") else [],
                    "species_zh": c.get("species_zh"),
                    "species_en": c.get("species_en"),
                    "faction_zh": c.get("faction_zh"),
                    "faction_en": c.get("faction_en"),
                    "first_appearance": first_app,
                    "first_appearance_label": first_app_label,
                    "bby_aby_birth": bby_aby_numeric,
                    "bby_aby_label": format_bby_aby_label(bby_aby_numeric),
                    "is_beyond_films_entry": c.get("is_beyond_films_entry") == "1",
                    "origin_type": c.get("origin_type"),
                    "bio_zh": c.get("bio_zh"),
                    "bio_en": c.get("bio_en"),
                    "source_url": c.get("source_url"),
                },
                "display_name": name,
            }
    raise HTTPException(status_code=404, detail="character not found")


# Faction definitions for graph relationships
FACTIONS: dict[str, dict[str, str]] = {
    "银河帝国": {
        "id": "faction_empire",
        "type": "faction",
        "label_zh": "银河帝国",
        "label_en": "Galactic Empire",
    },
    "义军同盟": {
        "id": "faction_rebel",
        "type": "faction",
        "label_zh": "义军同盟",
        "label_en": "Rebel Alliance",
    },
    "抵抗组织": {
        "id": "faction_resistance",
        "type": "faction",
        "label_zh": "抵抗组织",
        "label_en": "Resistance",
    },
    "第一军团": {
        "id": "faction_first_order",
        "type": "faction",
        "label_zh": "第一军团",
        "label_en": "First Order",
    },
    "绝地武士团": {
        "id": "faction_jedi",
        "type": "faction",
        "label_zh": "绝地武士团",
        "label_en": "Jedi Order",
    },
    "西斯": {
        "id": "faction_sith",
        "type": "faction",
        "label_zh": "西斯",
        "label_en": "Sith",
    },
    "独立星系联邦": {
        "id": "faction_cis",
        "type": "faction",
        "label_zh": "独立星系联邦",
        "label_en": "Confederacy of Independent Systems",
    },
}


def _add_graph_node(
    nodes: list[dict[str, Any]],
    seen_nodes: set[str],
    canonical_id: str,
    node_type: str,
    label_zh: str = "",
    label_en: str = "",
) -> None:
    """Add a node to the graph if not already present."""
    if canonical_id in seen_nodes:
        return
    seen_nodes.add(canonical_id)
    nodes.append({
        "id": canonical_id,
        "type": node_type,
        "label_zh": label_zh,
        "label_en": label_en,
    })


def _add_graph_edge(
    edges: list[dict[str, Any]],
    seen_edges: set[str],
    source: str,
    target: str,
    edge_type: str,
    label_zh: str = "",
    label_en: str = "",
) -> None:
    """Add an edge to the graph if not already present."""
    edge_key = f"{source}-{target}-{edge_type}"
    if edge_key in seen_edges:
        return
    seen_edges.add(edge_key)
    edges.append({
        "source": source,
        "target": target,
        "type": edge_type,
        "label_zh": label_zh,
        "label_en": label_en,
    })


@router.get("/graph/subgraph")
def subgraph(entity_id: str, depth: int = 1, locale: str = Query(default="en-US")) -> dict[str, Any]:
    """Get subgraph centered on an entity with specified depth."""
    nodes: list[dict[str, Any]] = []
    edges: list[dict[str, Any]] = []
    seen_nodes: set[str] = set()
    seen_edges: set[str] = set()

    films = {f["canonical_id"]: f for f in load_csv("mvp_films.csv")}
    characters = {c["canonical_id"]: c for c in load_csv("mvp_characters.csv")}

    def explore_entity(eid: str, current_depth: int) -> None:
        if current_depth > depth:
            return

        # Determine entity type and add it
        if eid in characters:
            _add_graph_node(
                nodes, seen_nodes, eid, "character",
                characters[eid]["name_zh"], characters[eid]["name_en"]
            )
            char = characters[eid]

            # Character -> Film (appears_in via first_appearance)
            first_app = char.get("first_appearance", "")
            if first_app and first_app in films:
                _add_graph_node(
                    nodes, seen_nodes, first_app, "film",
                    films[first_app]["title_zh"], films[first_app]["title_en"]
                )
                first_title_zh = films[first_app]["title_zh"]
                first_title_en = films[first_app]["title_en"]
                if locale == "zh-CN":
                    edge_label = f"首次登场：{first_title_zh}"
                else:
                    edge_label = f"First appears in: {first_title_en}"
                _add_graph_edge(
                    edges, seen_edges, eid, first_app, "appears_in",
                    edge_label, f"First appears in: {first_title_en}"
                )
                if current_depth < depth:
                    explore_entity(first_app, current_depth + 1)

            # Character -> Faction (belongs_to)
            faction_zh = char.get("faction_zh", "")
            if faction_zh and faction_zh in FACTIONS:
                faction_data = FACTIONS[faction_zh]
                _add_graph_node(
                    nodes, seen_nodes, faction_data["id"], "faction",
                    faction_data["label_zh"], faction_data["label_en"]
                )
                if locale == "zh-CN":
                    edge_label = f"所属阵营：{faction_zh}"
                else:
                    edge_label = f"Belongs to: {faction_data['label_en']}"
                _add_graph_edge(
                    edges, seen_edges, eid, faction_data["id"], "belongs_to",
                    edge_label, f"Belongs to: {faction_data['label_en']}"
                )

            # Hero characters in films - link characters in same film
            for film_canonical_id, film in films.items():
                hero_chars = film.get("hero_characters", "")
                if eid in hero_chars.split(","):
                    for other_char_slug in hero_chars.split(","):
                        other_char_slug = other_char_slug.strip()
                        if other_char_slug and other_char_slug in characters and other_char_slug != eid:
                            _add_graph_node(
                                nodes, seen_nodes, other_char_slug, "character",
                                characters[other_char_slug]["name_zh"],
                                characters[other_char_slug]["name_en"]
                            )
                            _add_graph_edge(
                                edges, seen_edges, eid, other_char_slug, "co_appears_in",
                                "共同登场", "Co-appears in film"
                            )

        elif eid in films:
            _add_graph_node(
                nodes, seen_nodes, eid, "film",
                films[eid]["title_zh"], films[eid]["title_en"]
            )
            film = films[eid]

            # Film -> Characters (appears_in via hero_characters)
            hero_chars = film.get("hero_characters", "")
            for char_slug in hero_chars.split(","):
                char_slug = char_slug.strip()
                if char_slug and char_slug in characters:
                    _add_graph_node(
                        nodes, seen_nodes, char_slug, "character",
                        characters[char_slug]["name_zh"], characters[char_slug]["name_en"]
                    )
                    film_title_zh = film["title_zh"]
                    film_title_en = film["title_en"]
                    if locale == "zh-CN":
                        edge_label = f"登场于：{film_title_zh}"
                    else:
                        edge_label = f"Appears in: {film_title_en}"
                    _add_graph_edge(
                        edges, seen_edges, char_slug, eid, "appears_in",
                        edge_label, f"Appears in: {film_title_en}"
                    )
                    if current_depth < depth:
                        explore_entity(char_slug, current_depth + 1)

    # Build relationships for all characters and films
    for char_canonical_id in characters:
        explore_entity(char_canonical_id, 1)

    return {
        "entity_id": entity_id,
        "depth": depth,
        "locale": locale,
        "nodes": nodes,
        "edges": edges,
    }
