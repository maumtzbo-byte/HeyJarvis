-- Esquema mínimo para el MVP de HeyJarvis.
-- Ejecutar en el SQL editor de Supabase (o vía `supabase db push`).

create table if not exists public.memories (
    id uuid primary key,
    user_id text not null,
    text text not null,
    summary text not null,
    created_at timestamptz not null default now()
);

create index if not exists memories_user_id_idx on public.memories (user_id);

-- RLS habilitado por buenas prácticas. El backend usa la Service Role Key
-- (que bypassea RLS), así que esta policy es solo un placeholder por si en
-- el futuro se consulta la tabla con la anon key desde el cliente.
alter table public.memories enable row level security;

create policy "Users can only see their own memories"
    on public.memories
    for select
    using (auth.uid()::text = user_id);
