import logging
from typing import Optional

from fastapi import Header, HTTPException, status

from app.config import settings
from app.db.supabase_client import get_supabase_client

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


async def get_current_user_id(authorization: Optional[str] = Header(default=None)) -> str:
    """Verifies a Supabase Auth session (Authorization: Bearer <access_token>)
    and returns the authenticated user's id. Used for endpoints tied to a
    real account, like reading/saving onboarding preferences."""
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing bearer token. Send 'Authorization: Bearer <access_token>'.",
        )
    token = authorization.split(" ", 1)[1].strip()
    try:
        result = get_supabase_client().auth.get_user(token)
    except Exception as exc:
        logger.warning("Rejected request with an invalid session token")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired session"
        ) from exc
    if not result or not result.user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired session"
        )
    return result.user.id
