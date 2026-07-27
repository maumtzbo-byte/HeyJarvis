import logging

from fastapi import APIRouter, Depends, HTTPException

from app.dependencies import get_user_id_from_bearer_or_token
from app.models.schemas import MemoryUsedItem, QueryRequest, QueryResponse
from app.services.claude_service import generate_answer
from app.services.memory_service import search_memories
from app.services.profile_service import get_profile

logger = logging.getLogger(__name__)
router = APIRouter(tags=["query"])


@router.post("/query", response_model=QueryResponse)
async def query_memories(
    payload: QueryRequest,
    user_id: str = Depends(get_user_id_from_bearer_or_token),
) -> QueryResponse:
    try:
        memories = search_memories(user_id, payload.question)
        context = [memory["summary"] for memory in memories]

        tone = voice_style = full_name = pronouns = None
        try:
            profile = get_profile(user_id)
            if profile:
                tone = profile.get("tone")
                voice_style = profile.get("voice_style")
                full_name = profile.get("full_name")
                pronouns = profile.get("pronouns")
        except Exception:
            logger.info(
                "No onboarding preferences for user %s, answering with a neutral tone",
                user_id,
            )

        answer = generate_answer(
            payload.question,
            context,
            tone=tone,
            voice_style=voice_style,
            full_name=full_name,
            pronouns=pronouns,
        )
        return QueryResponse(
            response=answer,
            memories_used=[memory["id"] for memory in memories],
            memories_used_detail=[
                MemoryUsedItem(id=memory["id"], summary=memory["summary"]) for memory in memories
            ],
        )
    except Exception as exc:
        logger.exception("Error answering the query for user %s", user_id)
        raise HTTPException(
            status_code=500, detail=f"Could not process the question: {exc}"
        ) from exc
