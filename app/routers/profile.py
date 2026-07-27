import logging

from fastapi import APIRouter, Depends, HTTPException

from app.dependencies import get_current_user_id
from app.models.schemas import ProfileRequest, ProfileResponse
from app.services.profile_service import get_profile, upsert_profile

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/profile", tags=["profile"])


@router.get("", response_model=ProfileResponse)
async def read_profile(user_id: str = Depends(get_current_user_id)) -> ProfileResponse:
    try:
        profile = get_profile(user_id)
    except Exception as exc:
        logger.exception("Error fetching profile for user %s", user_id)
        raise HTTPException(status_code=500, detail=f"Could not fetch profile: {exc}") from exc
    if not profile:
        return ProfileResponse()
    return ProfileResponse(**profile)


@router.put("", response_model=ProfileResponse)
async def save_profile(
    payload: ProfileRequest, user_id: str = Depends(get_current_user_id)
) -> ProfileResponse:
    try:
        profile = upsert_profile(
            user_id,
            payload.use_case,
            payload.focus_areas,
            payload.tone,
            payload.voice_style,
        )
    except Exception as exc:
        logger.exception("Error saving profile for user %s", user_id)
        raise HTTPException(status_code=500, detail=f"Could not save profile: {exc}") from exc
    return ProfileResponse(**profile)
