import logging

from fastapi import APIRouter, Depends, HTTPException

from app.dependencies import verify_api_key
from app.models.schemas import QueryRequest, QueryResponse
from app.services.claude_service import generate_answer
from app.services.memory_service import search_memories

logger = logging.getLogger(__name__)
router = APIRouter(tags=["query"], dependencies=[Depends(verify_api_key)])


@router.post("/query", response_model=QueryResponse)
async def query_memories(payload: QueryRequest) -> QueryResponse:
    try:
        memories = search_memories(payload.user_id, payload.question)
        context = [memory["summary"] for memory in memories]
        answer = generate_answer(payload.question, context)
        return QueryResponse(
            response=answer,
            memories_used=[memory["id"] for memory in memories],
        )
    except Exception as exc:
        logger.exception("Error answering the query for user %s", payload.user_id)
        raise HTTPException(
            status_code=500, detail=f"Could not process the question: {exc}"
        ) from exc
