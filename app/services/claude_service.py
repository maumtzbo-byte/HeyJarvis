import logging
from typing import List, Optional

from anthropic import Anthropic

from app.config import settings

logger = logging.getLogger(__name__)

_client: Optional[Anthropic] = None

SUMMARY_SYSTEM_PROMPT = (
    "Resume el recuerdo del usuario en una sola frase corta y clara, "
    "conservando fechas, nombres y datos concretos. No inventes información "
    "que no esté en el texto original. Responde solo con el resumen, sin "
    "comillas ni texto adicional."
)

ANSWER_INSTRUCTIONS = (
    "Responde en español, de forma corta, natural y hablable, como si un "
    "asistente de voz (Siri) fuera a leerla en voz alta. No uses markdown, "
    "listas, ni formato: solo texto plano en una o dos frases. Si los "
    "recuerdos no contienen información suficiente para responder, dilo de "
    "forma breve y directa."
)


def _get_client() -> Anthropic:
    global _client
    if _client is None:
        if not settings.anthropic_api_key:
            raise RuntimeError(
                "ANTHROPIC_API_KEY debe estar configurado en el entorno (.env)"
            )
        _client = Anthropic(api_key=settings.anthropic_api_key)
    return _client


def summarize_memory(text: str) -> str:
    logger.info("Llamando a Claude para resumir un recuerdo (%d caracteres)", len(text))
    try:
        message = _get_client().messages.create(
            model=settings.claude_model,
            max_tokens=100,
            system=SUMMARY_SYSTEM_PROMPT,
            messages=[{"role": "user", "content": text}],
        )
        summary = message.content[0].text.strip()
        logger.info("Resumen generado correctamente por Claude")
        return summary
    except Exception:
        logger.exception("Fallo al llamar a Claude para resumir el recuerdo")
        raise


def generate_answer(question: str, context_memories: List[str]) -> str:
    logger.info(
        "Llamando a Claude para responder la pregunta usando %d recuerdos de contexto",
        len(context_memories),
    )
    context_block = (
        "\n".join(f"- {memory}" for memory in context_memories)
        if context_memories
        else "(no se encontraron recuerdos relevantes)"
    )
    prompt = (
        f"Recuerdos guardados del usuario:\n{context_block}\n\n"
        f"Pregunta del usuario: {question}\n\n"
        f"{ANSWER_INSTRUCTIONS}"
    )
    try:
        message = _get_client().messages.create(
            model=settings.claude_model,
            max_tokens=200,
            messages=[{"role": "user", "content": prompt}],
        )
        answer = message.content[0].text.strip()
        logger.info("Respuesta generada correctamente por Claude")
        return answer
    except Exception:
        logger.exception("Fallo al llamar a Claude para generar la respuesta")
        raise
