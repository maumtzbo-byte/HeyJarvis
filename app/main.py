import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import health, memory, query

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)

app = FastAPI(
    title="HeyYarvis API",
    description="Segundo cerebro personal: memoria persistente accesible por voz (Siri).",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "X-API-Key"],
)

app.include_router(health.router)
app.include_router(memory.router)
app.include_router(query.router)
