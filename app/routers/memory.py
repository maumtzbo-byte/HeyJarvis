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
        memory_id, summary = create_memory(payload.user_id, payload.text)
        return MemoryCreateResponse(id=memory_id, summary=summary)
    except Exception as exc:
        logger.exception("Error creando recuerdo para el usuario %s", payload.user_id)
        raise HTTPException(
            status_code=500, detail=f"No se pudo guardar el recuerdo: {exc}"
        ) from exc


@router.get("/memories/{user_id}", response_model=MemoriesListResponse)
async def get_memories(user_id: str) -> MemoriesListResponse:
    try:
        memories = list_memories(user_id)
        return MemoriesListResponse(user_id=user_id, memories=memories)
    except Exception as exc:
        logger.exception("Error listando recuerdos del usuario %s", user_id)
        raise HTTPException(
            status_code=500, detail=f"No se pudieron obtener los recuerdos: {exc}"
        ) from exc
