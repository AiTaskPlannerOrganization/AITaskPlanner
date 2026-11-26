"""Application configuration loaded from environment variables."""

import os
from dataclasses import dataclass

from dotenv import load_dotenv

load_dotenv()


def _parse_port(raw_port: str | None, default: int = 3000) -> int:
    if not raw_port:
        return default
    try:
        port = int(raw_port)
    except ValueError as exc:
        raise ValueError(f"Invalid PORT value: {raw_port!r}") from exc
    if not 1 <= port <= 65535:
        raise ValueError(f"PORT must be between 1 and 65535, got {port}")
    return port


def _parse_cors_origins(raw_origins: str | None) -> list[str]:
    if not raw_origins:
        return ["http://localhost:5173"]
    return [origin.strip() for origin in raw_origins.split(",") if origin.strip()]


@dataclass(frozen=True)
class Settings:
    """Immutable runtime settings for the FastAPI application."""

    service_name: str = "ai-task-planner-backend"
    environment: str = os.getenv("ENVIRONMENT", "development")
    host: str = os.getenv("HOST", "127.0.0.1")
    port: int = _parse_port(os.getenv("PORT"))
    cors_origins: tuple[str, ...] = tuple(
        _parse_cors_origins(os.getenv("CORS_ORIGINS"))
    )


settings = Settings()
