-- EngiLearn durable auth backup for Supabase REST.
-- Run this once in Supabase SQL Editor for project abednzdddyskkwtiveow.
create table if not exists public.engilearn_kv (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.engilearn_kv enable row level security;

-- No anon/authenticated read policy is created intentionally.
-- Backend uses SUPABASE_SECRET_KEY server-side only.
