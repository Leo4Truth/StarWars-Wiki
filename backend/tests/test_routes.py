from __future__ import annotations

import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app

pytest_plugins = ["pytest_asyncio"]


@pytest.fixture
def anyio_backend():
    return "asyncio"


@pytest.mark.anyio
async def test_healthz():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/healthz")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


@pytest.mark.anyio
async def test_film_timeline_all_zh():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/home/film-timeline", params={"locale": "zh-CN"})
    assert response.status_code == 200
    data = response.json()
    assert data["locale"] == "zh-CN"
    items = data["items"]
    assert len(items) > 0
    slugs = [item["slug"] for item in items]
    assert len(slugs) == len(set(slugs)), "duplicate slugs found"
    sorted_keys = [float(item["timeline_sort_key"]) for item in items]
    assert sorted_keys == sorted(sorted_keys), "items not sorted by timeline_sort_key"


@pytest.mark.anyio
async def test_film_timeline_era_filter():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        all_resp = await ac.get("/api/v1/home/film-timeline", params={"locale": "zh-CN", "era": "all"})
        prequel_resp = await ac.get("/api/v1/home/film-timeline", params={"locale": "zh-CN", "era": "prequel"})
    all_items = all_resp.json()["items"]
    prequel_items = prequel_resp.json()["items"]
    assert len(prequel_items) < len(all_items)
    for item in prequel_items:
        assert item["era"] == "prequel"


@pytest.mark.anyio
async def test_film_timeline_locale_switch():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        zh_resp = await ac.get("/api/v1/home/film-timeline", params={"locale": "zh-CN"})
        en_resp = await ac.get("/api/v1/home/film-timeline", params={"locale": "en-US"})
    zh_items = zh_resp.json()["items"]
    en_items = en_resp.json()["items"]
    assert [item["slug"] for item in zh_items] == [item["slug"] for item in en_items]
    assert zh_items[0]["title_zh"]
    assert en_items[0]["title_en"]


@pytest.mark.anyio
async def test_film_detail_zh():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/films/episode-i-the-phantom-menace", params={"locale": "zh-CN"})
    assert response.status_code == 200
    data = response.json()
    assert data["locale"] == "zh-CN"
    film = data["film"]
    assert film["slug"] == "episode-i-the-phantom-menace"
    assert film["title_zh"] in data["display_title"]


@pytest.mark.anyio
async def test_film_detail_en():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/films/episode-i-the-phantom-menace", params={"locale": "en-US"})
    assert response.status_code == 200
    data = response.json()
    assert data["locale"] == "en-US"
    film = data["film"]
    assert film["title_en"] in data["display_title"]


@pytest.mark.anyio
async def test_film_detail_not_found():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/films/nonexistent-slug", params={"locale": "zh-CN"})
    assert response.status_code == 404


@pytest.mark.anyio
async def test_character_detail_zh():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/characters/luke-skywalker", params={"locale": "zh-CN"})
    assert response.status_code == 200
    data = response.json()
    assert data["locale"] == "zh-CN"
    character = data["character"]
    assert character["slug"] == "luke-skywalker"
    assert character["name_zh"] in data["display_name"]


@pytest.mark.anyio
async def test_character_detail_en():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/characters/luke-skywalker", params={"locale": "en-US"})
    assert response.status_code == 200
    data = response.json()
    assert data["locale"] == "en-US"
    assert data["character"]["name_en"] in data["display_name"]


@pytest.mark.anyio
async def test_character_detail_not_found():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/characters/nonexistent", params={"locale": "zh-CN"})
    assert response.status_code == 404


@pytest.mark.anyio
async def test_graph_subgraph():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/graph/subgraph", params={"entity_id": "char_luke", "depth": 1})
    assert response.status_code == 200
    data = response.json()
    assert data["entity_id"] == "char_luke"
    assert data["depth"] == 1
    assert "nodes" in data
    assert "edges" in data


@pytest.mark.anyio
async def test_film_assets():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/assets/films/film_ep4")
    assert response.status_code == 200
    data = response.json()
    assert data["canonical_id"] == "film_ep4"
    assert data["poster_url"] is not None
    assert data["backdrop_url"] is not None
    assert data["thumbnail_url"] is not None


@pytest.mark.anyio
async def test_film_assets_not_found():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/assets/films/nonexistent")
    assert response.status_code == 404


@pytest.mark.anyio
async def test_character_assets():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/assets/characters/char_luke")
    assert response.status_code == 200
    data = response.json()
    assert data["canonical_id"] == "char_luke"
    assert data["portrait_url"] is not None
    assert data["action_shot_url"] is not None
    assert data["symbol_url"] is not None


@pytest.mark.anyio
async def test_character_assets_not_found():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/assets/characters/nonexistent")
    assert response.status_code == 404


@pytest.mark.anyio
async def test_beyond_film_assets():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/assets/beyond-films/char_ahsoka")
    assert response.status_code == 200
    data = response.json()
    assert data["canonical_id"] == "char_ahsoka"
    assert data["poster_url"] is not None
    assert data["artwork_url"] is not None


@pytest.mark.anyio
async def test_beyond_film_assets_not_found():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/assets/beyond-films/nonexistent")
    assert response.status_code == 404


@pytest.mark.anyio
async def test_film_timeline_includes_assets():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/home/film-timeline", params={"locale": "zh-CN"})
    assert response.status_code == 200
    data = response.json()
    for item in data["items"]:
        assert "poster_url" in item
        assert "backdrop_url" in item
        assert "thumbnail_url" in item


@pytest.mark.anyio
async def test_beyond_films_includes_assets():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/home/beyond-films", params={"locale": "zh-CN"})
    assert response.status_code == 200
    data = response.json()
    for item in data["items"]:
        assert "poster_url" in item
        assert "artwork_url" in item
