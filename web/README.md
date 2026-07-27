# HeyJarvis Web

Landing page y dashboard web de [HeyJarvis](../README.md), construido con
Next.js (App Router) + Tailwind CSS v4.

## Setup local

```bash
cp .env.local.example .env.local
# completar NEXT_PUBLIC_API_URL con la URL del backend (local o desplegado)
# completar NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY para
# habilitar cuentas reales (sign up / log in / onboarding)
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Contenido

- `app/page.tsx` — landing page: qué es HeyJarvis y cómo funciona.
- `app/dashboard/page.tsx` — vista para consultar `GET /memories/{user_id}`
  del backend (pide `user_id` y opcionalmente `X-API-Key`).
- `app/(auth)/signup`, `app/(auth)/login` — cuentas reales vía Supabase Auth.
- `app/(auth)/onboarding` — cuestionario de 4 pasos (para qué se usa, qué
  recordar, tono, personalidad) que se guarda en `PUT /profile` y desde ahí
  cambia de verdad cómo responde `POST /query`.

## Deploy

Pensado para desplegarse en Vercel apuntando a este directorio (`web/`) como
root del proyecto, con `NEXT_PUBLIC_API_URL` configurada como variable de
entorno apuntando al backend en producción.
