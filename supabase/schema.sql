-- Minimal schema for the HeyYarvis MVP.
-- Run in the Supabase SQL editor (or via `supabase db push`).

create table if not exists public.memories (
    id uuid primary key,
    user_id text not null,
    text text not null,
    summary text not null,
    created_at timestamptz not null default now(),
    reminder_at timestamptz null
);

create index if not exists memories_user_id_idx on public.memories (user_id);

-- RLS enabled as good practice. The backend uses the Service Role Key
-- (which bypasses RLS), so this policy is just a placeholder in case the
-- table is ever queried with the anon key from the client in the future.
alter table public.memories enable row level security;

create policy "Users can only see their own memories"
    on public.memories
    for select
    using (auth.uid()::text = user_id);
