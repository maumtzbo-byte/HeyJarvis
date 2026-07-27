import logging

from fastapi import APIRouter, Depends, HTTPException

from app.dependencies import get_user_id_from_bearer_or_token
from app.models.schemas import (
    MemoriesListResponse,
    MemoryCreateRequest,
    MemoryCreateResponse,
)
from app.services.memory_service import create_memory, list_memories

logger = logging.getLogger(__name__)
router = APIRouter(tags=["memory"])


@router.post("/memory", response_model=MemoryCreateResponse)
async def add_memory(
    payload: MemoryCreateRequest,
    user_id: str = Depends(get_user_id_from_bearer_or_token),
) -> MemoryCreateResponse:
    try:
        memory_id, summary, reminder_at = create_memory(user_id, payload.text)
        return MemoryCreateResponse(id=memory_id, summary=summary, reminder_at=reminder_at)
    except Exception as exc:
        logger.exception("Error creating memory for user %s", user_id)
        raise HTTPException(
            status_code=500, detail=f"Could not save the memory: {exc}"
        ) from exc


@router.get("/memories/{user_id}", response_model=MemoriesListResponse)
async def get_memories(
    user_id: str,  # kept for URL compatibility with existing iOS calls; ignored for auth
    authenticated_user_id: str = Depends(get_user_id_from_bearer_or_token),
) -> MemoriesListResponse:
    try:
        memories = list_memories(authenticated_user_id)
        return MemoriesListResponse(user_id=authenticated_user_id, memories=memories)
    except Exception as exc:
        logger.exception("Error listing memories for user %s", authenticated_user_id)
        raise HTTPException(
            status_code=500, detail=f"Could not fetch memories: {exc}"
        ) from exc
