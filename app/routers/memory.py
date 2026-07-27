import logging

from fastapi import APIRouter, Depends, HTTPException

from app.dependencies import verify_api_key
from app.models.schemas import (
    MemoriesListResponse,
    MemoryCreateRequest,
    MemoryCreateResponse,
)
from app.services.memory_service import create_memory, list_memories

logger = logging.getLogger(__name__)
router = APIRouter(tags=["memory"], dependencies=[Depends(verify_api_key)])


@router.post("/memory", response_model=MemoryCreateResponse)
async def add_memory(payload: MemoryCreateRequest) -> MemoryCreateResponse:
    try:
        memory_id, summary, reminder_at = create_memory(payload.user_id, payload.text)
        return MemoryCreateResponse(id=memory_id, summary=summary, reminder_at=reminder_at)
    except Exception as exc:
        logger.exception("Error creating memory for user %s", payload.user_id)
        raise HTTPException(
            status_code=500, detail=f"Could not save the memory: {exc}"
        ) from exc


@router.get("/memories/{user_id}", response_model=MemoriesListResponse)
async def get_memories(user_id: str) -> MemoriesListResponse:
    try:
        memories = list_memories(user_id)
        return MemoriesListResponse(user_id=user_id, memories=memories)
    except Exception as exc:
        logger.exception("Error listing memories for user %s", user_id)
        raise HTTPException(
            status_code=500, detail=f"Could not fetch memories: {exc}"
        ) from exc
