from fastapi import APIRouter, HTTPException, Query

from app.core.seed_loader import load_csv

router = APIRouter()


@router.get("/home/film-timeline")
def home_film_timeline(locale: str = Query(...), era: str = "all") -> dict:
    items = load_csv("mvp_films.csv")
    if era != "all":
        items = [i for i in items if i["era"] == era]
    items = sorted(items, key=lambda x: float(x["timeline_sort_key"]))
    return {"locale": locale, "items": items}


@router.get("/home/beyond-films")
def home_beyond_films(locale: str = Query(...), type: str = "all") -> dict:
    items = [c for c in load_csv("mvp_characters.csv") if c.get("is_beyond_films_entry") == "1"]
    if type != "all":
        items = [i for i in items if i.get("origin_type") == type]
    return {"locale": locale, "items": items}


@router.get("/films/{slug}")
def film_detail(slug: str, locale: str = Query(...)) -> dict:
    for film in load_csv("mvp_films.csv"):
        if film["slug"] == slug:
            title = film["title_zh"] if locale == "zh-CN" else film["title_en"]
            return {"locale": locale, "film": film, "display_title": title}
    raise HTTPException(status_code=404, detail="film not found")


@router.get("/characters/{slug}")
def character_detail(slug: str, locale: str = Query(...)) -> dict:
    for c in load_csv("mvp_characters.csv"):
        if c["slug"] == slug:
            name = c["name_zh"] if locale == "zh-CN" else c["name_en"]
            return {"locale": locale, "character": c, "display_name": name}
    raise HTTPException(status_code=404, detail="character not found")


@router.get("/graph/subgraph")
def subgraph(entity_id: str, depth: int = 1) -> dict:
    return {
        "entity_id": entity_id,
        "depth": depth,
        "nodes": [{"id": entity_id, "type": "character"}],
        "edges": [],
    }
