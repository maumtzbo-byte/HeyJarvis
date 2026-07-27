import logging
from typing import Optional

from fastapi import Header, HTTPException, status

from app.db.supabase_client import get_supabase_client
from app.services.token_service import resolve_token

logger = logging.getLogger(__name__)


async def _resolve_bearer_user_id(authorization: Optional[str]) -> Optional[str]:
    if not authorization or not authorization.lower().startswith("bearer "):
        return None
    token = authorization.split(" ", 1)[1].strip()
    try:
        result = get_supabase_client().auth.get_user(token)
    except Exception:
        logger.warning("Rejected request with an invalid session token")
        return None
    if not result or not result.user:
        return None
    return result.user.id


async def get_current_user_id(authorization: Optional[str] = Header(default=None)) -> str:
    """Verifies a Supabase Auth session (Authorization: Bearer <access_token>)
    and returns the authenticated user's id. Used for account-management
    endpoints that only ever get called from the signed-in web dashboard,
    like reading/saving onboarding preferences or managing personal API
    tokens (which can't accept a personal token themselves — bootstrapping
    problem)."""
    user_id = await _resolve_bearer_user_id(authorization)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired session"
        )
    return user_id


async def get_user_id_from_bearer_or_token(
    authorization: Optional[str] = Header(default=None),
    x_api_key: Optional[str] = Header(default=None),
) -> str:
    """Auth for endpoints reachable from both the web dashboard and the iOS
    app / Siri Shortcuts: accepts EITHER a Supabase session (Authorization:
    Bearer <access_token>) OR a personal API token (X-API-Key: hy_..., the
    same header iOS already sends). Always derives user_id server-side from
    whichever credential is valid; a client-supplied user_id is never
    trusted. Bearer is tried first when both are present."""
    user_id = await _resolve_bearer_user_id(authorization)
    if user_id:
        return user_id
    if x_api_key:
        user_id = resolve_token(x_api_key)
        if user_id:
            return user_id
        logger.warning("Rejected request with an invalid or revoked personal API token")
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Send 'Authorization: Bearer <token>' or 'X-API-Key: <personal token>'.",
    )
