import logging
import uuid
from datetime import datetime, timezone
from typing import List, Tuple

from app.db.chroma_client import get_chroma_collection
from app.db.supabase_client import MEMORIES_TABLE, get_supabase_client
from app.models.schemas import MemoryItem
from app.services.claude_service import summarize_memory

logger = logging.getLogger(__name__)


def create_memory(user_id: str, text: str) -> Tuple[str, str]:
    summary = summarize_memory(text)
    memory_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()

    logger.info("Guardando recuerdo %s del usuario %s en Supabase", memory_id, user_id)
    try:
        get_supabase_client().table(MEMORIES_TABLE).insert(
            {
                "id": memory_id,
                "user_id": user_id,
                "text": text,
                "summary": summary,
                "created_at": created_at,
            }
        ).execute()
    except Exception:
        logger.exception("Fallo al guardar el recuerdo en Supabase")
        raise

    logger.info("Guardando embedding del recuerdo %s en ChromaDB", memory_id)
    try:
        get_chroma_collection().add(
            ids=[memory_id],
            documents=[summary],
            metadatas=[{"user_id": user_id, "created_at": created_at}],
        )
    except Exception:
        logger.exception("Fallo al guardar el embedding en ChromaDB")
        raise

    return memory_id, summary


def search_memories(user_id: str, question: str, n_results: int = 5) -> List[dict]:
    logger.info("Buscando recuerdos relevantes en ChromaDB para el usuario %s", user_id)
    try:
        results = get_chroma_collection().query(
            query_texts=[question],
            n_results=n_results,
            where={"user_id": user_id},
        )
    except Exception:
        logger.exception("Fallo al consultar ChromaDB")
        raise

    ids = results.get("ids", [[]])[0]
    documents = results.get("documents", [[]])[0]
    memories = [{"id": mem_id, "summary": doc} for mem_id, doc in zip(ids, documents)]
    logger.info("Se encontraron %d recuerdos relevantes", len(memories))
    return memories


def list_memories(user_id: str) -> List[MemoryItem]:
    logger.info("Listando recuerdos del usuario %s desde Supabase", user_id)
    try:
        result = (
            get_supabase_client()
            .table(MEMORIES_TABLE)
            .select("id, text, summary, created_at")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .execute()
        )
    except Exception:
        logger.exception("Fallo al listar los recuerdos desde Supabase")
        raise

    return [MemoryItem(**row) for row in result.data]
