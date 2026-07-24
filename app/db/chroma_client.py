import logging
from functools import lru_cache

import chromadb
from chromadb.api.models.Collection import Collection

from app.config import settings

logger = logging.getLogger(__name__)

COLLECTION_NAME = "memories"


@lru_cache
def get_chroma_collection() -> Collection:
    logger.info(
        "Inicializando cliente persistente de ChromaDB en %s",
        settings.chroma_persist_dir,
    )
    client = chromadb.PersistentClient(path=settings.chroma_persist_dir)
    return client.get_or_create_collection(name=COLLECTION_NAME)
