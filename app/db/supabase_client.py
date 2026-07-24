import logging
from functools import lru_cache

from supabase import Client, create_client

from app.config import settings

logger = logging.getLogger(__name__)

MEMORIES_TABLE = "memories"


@lru_cache
def get_supabase_client() -> Client:
    if not settings.supabase_url or not settings.supabase_key:
        raise RuntimeError(
            "SUPABASE_URL y SUPABASE_KEY deben estar configurados en el entorno (.env)"
        )
    logger.info("Inicializando cliente de Supabase")
    return create_client(settings.supabase_url, settings.supabase_key)
