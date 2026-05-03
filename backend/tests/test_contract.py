from __future__ import annotations

from pathlib import Path

import pytest
import yaml
from httpx import ASGITransport, AsyncClient

from app.main import app

SPEC_PATH = Path(__file__).resolve().parents[2] / "docs" / "mvp" / "openapi-mvp.yaml"


@pytest.fixture
def spec():
    with open(SPEC_PATH) as f:
        return yaml.safe_load(f)


@pytest.mark.anyio
async def test_film_timeline_response_shape(spec):
    """Validate film timeline response structure against OpenAPI spec."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/home/film-timeline", params={"locale": "zh-CN"})
    assert response.status_code == 200
    data = response.json()
    assert "locale" in data
    assert data["locale"] == "zh-CN"
    assert "items" in data
    assert isinstance(data["items"], list)
    for item in data["items"]:
        assert "slug" in item
        assert "era" in item
        assert "timeline_sort_key" in item


@pytest.mark.anyio
async def test_film_timeline_items_sorted(spec):
    """Validate items are sorted by timeline_sort_key."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/home/film-timeline", params={"locale": "zh-CN"})
    data = response.json()
    items = data["items"]
    keys = [float(item["timeline_sort_key"]) for item in items]
    assert keys == sorted(keys)


@pytest.mark.anyio
async def test_film_timeline_era_filter(spec):
    """Validate era filter works per spec."""
    eras = ["prequel", "original", "sequel", "anthology"]
    for era in eras:
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
            response = await ac.get(
                "/api/v1/home/film-timeline", params={"locale": "zh-CN", "era": era}
            )
        assert response.status_code == 200
        for item in response.json()["items"]:
            assert item["era"] == era


@pytest.mark.anyio
async def test_film_detail_response_shape(spec):
    """Validate film detail response per OpenAPI spec."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get(
            "/api/v1/films/episode-i-the-phantom-menace", params={"locale": "zh-CN"}
        )
    assert response.status_code == 200
    data = response.json()
    assert data["locale"] == "zh-CN"
    assert "film" in data
    film = data["film"]
    assert film["slug"] == "episode-i-the-phantom-menace"
    assert "title_zh" in film
    assert "title_en" in film
    assert "display_title" in data


@pytest.mark.anyio
async def test_character_detail_response_shape(spec):
    """Validate character detail response per OpenAPI spec."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/characters/luke-skywalker", params={"locale": "zh-CN"})
    assert response.status_code == 200
    data = response.json()
    assert data["locale"] == "zh-CN"
    assert "character" in data
    char = data["character"]
    assert char["slug"] == "luke-skywalker"
    assert "name_zh" in char
    assert "name_en" in char
    assert "display_name" in data


@pytest.mark.anyio
async def test_graph_subgraph_response_shape(spec):
    """Validate graph subgraph response per OpenAPI spec."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/graph/subgraph", params={"entity_id": "char_luke", "depth": 1})
    assert response.status_code == 200
    data = response.json()
    assert "entity_id" in data
    assert "nodes" in data
    assert "edges" in data


@pytest.mark.anyio
async def test_locale_enum_en_us(spec):
    """Validate en-US locale works."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/home/film-timeline", params={"locale": "en-US"})
    assert response.status_code == 200
    assert response.json()["locale"] == "en-US"
