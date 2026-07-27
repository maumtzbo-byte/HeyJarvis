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

-- Onboarding preferences for real (Supabase Auth) accounts: what the user
-- signed up to use HeyYarvis for, and the tone/personality it should use
-- when it speaks answers back. Looked up by the backend using the account's
-- real auth.users id, so it only ever applies to real signed-up users.
create table if not exists public.profiles (
    user_id uuid primary key references auth.users(id) on delete cascade,
    use_case text,
    focus_areas text[] not null default '{}',
    tone text,
    voice_style text,
    onboarding_completed boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users manage their own profile"
    on public.profiles
    for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);
