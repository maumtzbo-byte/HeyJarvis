# HeyJarvis (MVP)

Asistente personal tipo "segundo cerebro" para iOS: le hablas a Siri, HeyJarvis
recuerda información y la recupera de forma inteligente cuando se le pregunta.

Este es el MVP: valida el caso de uso núcleo (guardar y recuperar recuerdos
por voz vía RAG). **No incluye** todavía integraciones externas (Gmail,
WhatsApp, Notion), cobros, app móvil propia ni notificaciones proactivas —
por ahora la interfaz de voz se resuelve con Atajos de Siri llamando a estos
endpoints.

## Stack

- **Backend**: Python + FastAPI
- **Base de datos**: Supabase (PostgreSQL) — usuarios y registro estructurado de recuerdos
- **Memoria vectorial**: ChromaDB (local, persistido en disco, sin infraestructura externa)
- **IA**: API de Anthropic (Claude) — resume recuerdos al guardarlos y genera las respuestas del RAG
- **Config**: variables de entorno vía `.env` (nunca se hardcodean keys)

## Estructura

```
app/
  main.py            # arranque de la app FastAPI
  config.py           # settings leídos desde .env
  dependencies.py      # auth simple por header X-API-Key
  routers/             # endpoints separados por dominio
    health.py
    memory.py
    query.py
    profile.py            # preferencias de onboarding (requiere sesión real)
  services/             # lógica de negocio
    claude_service.py    # llamadas a Claude (resumen + generación de respuestas)
    memory_service.py    # orquesta Supabase + ChromaDB
    profile_service.py    # lee/guarda preferencias en la tabla `profiles`
  models/
    schemas.py           # esquemas Pydantic (requests/responses)
  db/
    supabase_client.py    # cliente de Supabase
    chroma_client.py       # cliente persistente de ChromaDB
tests/
  test_health.py
  test_query.py
supabase/
  schema.sql             # DDL de la tabla `memories`
```

## Setup local

1. Crear y activar un entorno virtual:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

2. Instalar dependencias:

   ```bash
   pip install -r requirements.txt
   ```

3. Copiar `.env.example` a `.env` y completar los valores:

   ```bash
   cp .env.example .env
   ```

   - `SUPABASE_URL` / `SUPABASE_KEY`: de tu proyecto en supabase.com (usar la
     **service role key** para el backend, nunca la anon key).
   - `ANTHROPIC_API_KEY`: de console.anthropic.com.
   - `CLAUDE_MODEL`: modelo de Claude a usar (por defecto uno estable; podés
     actualizarlo según los modelos disponibles en tu cuenta).
   - `CHROMA_PERSIST_DIR`: carpeta local donde ChromaDB persiste los embeddings.
   - `APP_API_KEY`: opcional. Si lo definís, hay que mandar el header
     `X-API-Key` con el mismo valor en cada request a `/memory`, `/query` y
     `/memories/{user_id}`.

4. Crear la tabla en Supabase ejecutando `supabase/schema.sql` en el SQL
   editor del proyecto.

5. Levantar el servidor:

   ```bash
   uvicorn app.main:app --reload
   ```

6. Verificar que está vivo:

   ```bash
   curl http://localhost:8000/health
   # {"status":"ok"}
   ```

## Endpoints

### `GET /health`
Chequeo de salud del servidor. No requiere auth.

### `POST /memory`
Guarda un recuerdo del usuario. Genera un resumen corto con Claude y guarda
el embedding en ChromaDB (colección `memories`, filtrable por `user_id`) más
el registro estructurado en Supabase.

```bash
curl -X POST http://localhost:8000/memory \
  -H "Content-Type: application/json" \
  -d '{"user_id": "carlos-123", "text": "Recuerda que mi reunión con Carlos es el jueves"}'
```

### `POST /query`
Busca los recuerdos más relevantes en ChromaDB para ese `user_id` (RAG),
arma un prompt con esos recuerdos como contexto y le pide a Claude una
respuesta corta y hablable (pensada para que la lea un App Intent de Siri:
sin markdown ni formato).

```bash
curl -X POST http://localhost:8000/query \
  -H "Content-Type: application/json" \
  -d '{"user_id": "carlos-123", "question": "¿Cuándo es mi reunión con Carlos?"}'
```

Respuesta:

```json
{
  "response": "Tu reunión con Carlos es el jueves.",
  "memories_used": ["id1", "id2"]
}
```

### `GET /memories/{user_id}`
Lista los recuerdos guardados de un usuario (para un futuro dashboard).

### `GET /profile` y `PUT /profile`
Preferencias de onboarding (para qué usás HeyYarvis, qué querés que recuerde,
tono y personalidad al responder) de una cuenta real. A diferencia de los
endpoints de arriba, estos **no** usan `X-API-Key`: requieren una sesión real
de Supabase Auth vía `Authorization: Bearer <access_token>` (el token que
devuelve `supabase.auth.signInWithPassword` / `signUp` en el frontend).

```bash
curl -X PUT http://localhost:8000/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{"use_case": "work", "focus_areas": ["meetings"], "tone": "warm and friendly", "voice_style": "encouraging coach"}'
```

`POST /query` busca automáticamente el perfil del `user_id` que llama (si
existe) y usa `tone`/`voice_style` para darle forma a la respuesta de Claude.
Si no hay perfil (por ejemplo, un `user_id` que no es una cuenta real, como
los que usan los Atajos de Siri hoy), responde igual que antes, con un tono
neutral.

## Tests

```bash
pytest
```

Cubre `/health` y `/query` (este último con Supabase/ChromaDB/Claude
mockeados, así corre sin credenciales reales).

## Fuera de scope de este MVP

- Integraciones con Gmail, Calendar, WhatsApp o Notion
- Sistema de pagos / Stripe
- App móvil nativa (se usa Atajos de Siri por ahora)
- Notificaciones proactivas
