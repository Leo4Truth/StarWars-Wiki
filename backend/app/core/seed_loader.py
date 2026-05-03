from __future__ import annotations

import csv
from pathlib import Path
from typing import Any

BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "data"


def load_csv(filename: str) -> list[dict[str, Any]]:
    path = DATA_DIR / filename
    with path.open("r", encoding="utf-8") as f:
        return list(csv.DictReader(f))
