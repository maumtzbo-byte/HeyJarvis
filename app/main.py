import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import health, memory, profile, query

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)

app = FastAPI(
    title="HeyYarvis API",
    description="Personal second brain: persistent memory, accessible by voice (Siri).",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_methods=["GET", "POST", "PUT"],
    allow_headers=["Content-Type", "X-API-Key", "Authorization"],
)

app.include_router(health.router)
app.include_router(memory.router)
app.include_router(query.router)
app.include_router(profile.router)
