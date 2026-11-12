-- Apply after db/schema.sql. No permissions are granted by this migration.
create table if not exists public.letter_access_grants (
 id uuid primary key default gen_random_uuid(),
 stocking_id uuid not null references public.stockings(id) on delete cascade,
 letter_id uuid references public.letters(id) on delete cascade,
 kind text not null check (kind in ('SINGLE_EARLY', 'ALL_EARLY', 'ALL_CHRISTMAS')),
 created_at timestamptz not null default now(),
 check ((kind = 'SINGLE_EARLY' and letter_id is not null) or (kind in ('ALL_EARLY','ALL_CHRISTMAS') and letter_id is null))
);
create unique index if not exists letter_access_single_unique on public.letter_access_grants(stocking_id,letter_id) where kind='SINGLE_EARLY';
create unique index if not exists letter_access_all_unique on public.letter_access_grants(stocking_id) where kind in ('ALL_EARLY','ALL_CHRISTMAS');
create table if not exists public.letter_reports (id uuid primary key default gen_random_uuid(), letter_id uuid not null references public.letters(id) on delete cascade, reporter_id uuid not null references public.members(id) on delete cascade, reason text not null, created_at timestamptz not null default now(), unique(letter_id));
alter table public.letter_access_grants enable row level security;
alter table public.letter_reports enable row level security;
