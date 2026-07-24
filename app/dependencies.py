import logging
from typing import Optional

from fastapi import Header, HTTPException, status

from app.config import settings

logger = logging.getLogger(__name__)


async def verify_api_key(x_api_key: Optional[str] = Header(default=None)) -> None:
    """Auth simple por header para el MVP. Si APP_API_KEY no está configurado
    en el entorno, no se exige autenticación (útil para desarrollo local)."""
    if not settings.app_api_key:
        return
    if x_api_key != settings.app_api_key:
        logger.warning("Solicitud rechazada: X-API-Key inválida o ausente")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="API key inválida o faltante. Envía el header X-API-Key.",
        )
