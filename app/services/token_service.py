import hashlib
import logging
import secrets
from datetime import datetime, timezone
from typing import List, Optional

from app.db.supabase_client import get_supabase_client

logger = logging.getLogger(__name__)

TOKENS_TABLE = "personal_api_tokens"
TOKEN_PREFIX = "hy_"


def _hash_token(raw_token: str) -> str:
    return hashlib.sha256(raw_token.encode("utf-8")).hexdigest()


def generate_token(user_id: str, label: str = "iOS app") -> dict:
    """Creates a new personal token, returns the row plus the RAW token
    (only ever available here, at creation time). Retries on the
    astronomically unlikely event of a token_hash collision."""
    last_error: Optional[Exception] = None
    for _ in range(3):
        raw_token = TOKEN_PREFIX + secrets.token_urlsafe(32)
        token_hash = _hash_token(raw_token)
        try:
            result = (
                get_supabase_client()
                .table(TOKENS_TABLE)
                .insert(
                    {
                        "user_id": user_id,
                        "label": label,
                        "token_hash": token_hash,
                        "token_prefix": raw_token[:10],
                    }
                )
                .execute()
            )
        except Exception as exc:
            last_error = exc
            if "duplicate" in str(exc).lower() or "unique" in str(exc).lower():
                logger.warning("Token hash collision, retrying generation")
                continue
            raise
        row = result.data[0]
        return {**row, "raw_token": raw_token}
    raise RuntimeError("Could not generate a unique token") from last_error


def resolve_token(raw_token: str) -> Optional[str]:
    """Returns the user_id owning this raw token if it's valid and not
    revoked, else None. Best-effort last_used_at bump on success. Fails
    closed (returns None, i.e. unauthenticated) on any lookup error rather
    than letting a transient Supabase/network issue surface as a 500 on
    every /memory, /query, and /memories request."""
    if not raw_token.startswith(TOKEN_PREFIX):
        return None

    token_hash = _hash_token(raw_token)
    try:
        result = (
            get_supabase_client()
            .table(TOKENS_TABLE)
            .select("id, user_id, revoked_at")
            .eq("token_hash", token_hash)
            .maybe_single()
            .execute()
        )
    except Exception:
        logger.warning("Could not look up personal API token (treating as invalid)")
        return None
    if not result or not result.data or result.data.get("revoked_at"):
        return None

    row = result.data
    try:
        get_supabase_client().table(TOKENS_TABLE).update(
            {"last_used_at": datetime.now(timezone.utc).isoformat()}
        ).eq("id", row["id"]).execute()
    except Exception:
        logger.warning("Could not update last_used_at for token %s", row["id"])
    return row["user_id"]


def list_tokens(user_id: str) -> List[dict]:
    result = (
        get_supabase_client()
        .table(TOKENS_TABLE)
        .select("id, label, token_prefix, created_at, last_used_at, revoked_at")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .execute()
    )
    return result.data


def revoke_token(user_id: str, token_id: str) -> bool:
    """Soft-revokes a token, scoped to user_id so one account can't revoke
    another's token by guessing an id. False if no matching, not-already-
    revoked row was found."""
    result = (
        get_supabase_client()
        .table(TOKENS_TABLE)
        .update({"revoked_at": datetime.now(timezone.utc).isoformat()})
        .eq("id", token_id)
        .eq("user_id", user_id)
        .is_("revoked_at", "null")
        .execute()
    )
    return len(result.data) > 0
