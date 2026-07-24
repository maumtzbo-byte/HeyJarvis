import logging

from fastapi import FastAPI

from app.routers import health, memory, query

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)

app = FastAPI(
    title="HeyJarvis API",
    description="Segundo cerebro personal: memoria persistente accesible por voz (Siri).",
    version="0.1.0",
)

app.include_router(health.router)
app.include_router(memory.router)
app.include_router(query.router)
