-- Run after 20261113_letter_access.sql. Existing single-letter grants are never deleted automatically.
begin;
lock table public.letter_access_grants in access exclusive mode;
do $$
begin
  if exists (select 1 from public.letter_access_grants where kind = 'SINGLE_EARLY') then
    raise exception 'Existing single-letter grants require manual review before migration';
  end if;
end $$;
alter table public.letter_access_grants drop column letter_id;
alter table public.letter_access_grants drop constraint if exists letter_access_grants_kind_check;
alter table public.letter_access_grants add constraint letter_access_grants_kind_check check (kind in ('ALL_EARLY', 'ALL_CHRISTMAS'));
drop index if exists public.letter_access_all_unique;
create unique index letter_access_stocking_unique on public.letter_access_grants (stocking_id);
commit;
