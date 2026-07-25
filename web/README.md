# HeyJarvis Web

Landing page y dashboard web de [HeyJarvis](../README.md), construido con
Next.js (App Router) + Tailwind CSS v4.

## Setup local

```bash
cp .env.local.example .env.local
# completar NEXT_PUBLIC_API_URL con la URL del backend (local o desplegado)
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Contenido

- `app/page.tsx` — landing page: qué es HeyJarvis y cómo funciona.
- `app/dashboard/page.tsx` — vista para consultar `GET /memories/{user_id}`
  del backend (pide `user_id` y opcionalmente `X-API-Key`).

## Deploy

Pensado para desplegarse en Vercel apuntando a este directorio (`web/`) como
root del proyecto, con `NEXT_PUBLIC_API_URL` configurada como variable de
entorno apuntando al backend en producción.
