import logging
from typing import Optional

from fastapi import Header, HTTPException, status

from app.config import settings

logger = logging.getLogger(__name__)


async def verify_api_key(x_api_key: Optional[str] = Header(default=None)) -> None:
    """Simple header-based auth for the MVP. If APP_API_KEY isn't set in the
    environment, no authentication is required (handy for local dev)."""
    if not settings.app_api_key:
        return
    if x_api_key != settings.app_api_key:
        logger.warning("Request rejected: missing or invalid X-API-Key")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API key. Send the X-API-Key header.",
        )
