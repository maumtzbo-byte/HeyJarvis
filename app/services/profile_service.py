import logging
from typing import List, Optional

from app.db.supabase_client import get_supabase_client

logger = logging.getLogger(__name__)

PROFILES_TABLE = "profiles"


def get_profile(user_id: str) -> Optional[dict]:
    response = (
        get_supabase_client()
        .table(PROFILES_TABLE)
        .select("*")
        .eq("user_id", user_id)
        .maybe_single()
        .execute()
    )
    return response.data if response else None


def upsert_profile(
    user_id: str,
    full_name: str,
    pronouns: Optional[str],
    use_case: str,
    focus_areas: List[str],
    tone: str,
    voice_style: str,
) -> dict:
    payload = {
        "user_id": user_id,
        "full_name": full_name,
        "pronouns": pronouns,
        "use_case": use_case,
        "focus_areas": focus_areas,
        "tone": tone,
        "voice_style": voice_style,
        "onboarding_completed": True,
    }
    response = (
        get_supabase_client()
        .table(PROFILES_TABLE)
        .upsert(payload, on_conflict="user_id")
        .execute()
    )
    logger.info("Profile saved for user %s", user_id)
    return response.data[0]
