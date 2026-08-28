-- EngiLearn durable auth backup table for Supabase REST.
-- Run this once in Supabase SQL Editor for the project used by SUPABASE_URL.
create table if not exists public.engilearn_kv (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create index if not exists engilearn_kv_updated_at_idx on public.engilearn_kv (updated_at desc);

alter table public.engilearn_kv enable row level security;