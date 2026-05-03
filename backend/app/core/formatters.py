from __future__ import annotations

from typing import Any


def format_bby_aby_label(numeric: int) -> str:
    """Format BBY/ABY numeric value as human-readable label.

    Args:
        numeric: The BBY/ABY value (negative = BBY, positive = ABY, 0 = 0 BBY)

    Returns:
        Formatted string like "32 BBY", "5 ABY", or "0 BBY"
    """
    if numeric < 0:
        return f"{abs(numeric)} BBY"
    elif numeric > 0:
        return f"{numeric} ABY"
    else:
        return "0 BBY"


def build_hover_summary(film: dict[str, Any]) -> str:
    """Build a hover summary for a film from its data.

    Args:
        film: Film data dictionary

    Returns:
        A 50-100 character narrative description for card hover
    """
    if film.get("hover_summary"):
        return film["hover_summary"]

    title_zh = film.get("title_zh", "")
    director_zh = film.get("director_zh", "")
    era = film.get("era", "")

    era_map = {
        "prequel": "前传三部曲",
        "original": "正传三部曲",
        "sequel": "后传三部曲",
        "anthology": "外传",
    }
    era_label = era_map.get(era, era)

    summary = f"{title_zh}由{director_zh}执导，{era_label}开山之作"
    if len(summary) > 100:
        summary = summary[:97] + "..."
    return summary
