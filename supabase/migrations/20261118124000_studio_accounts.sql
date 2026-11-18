begin;

create table public.studio_profiles (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  channel_name text not null check (char_length(btrim(channel_name)) between 1 and 60),
  weekly_hours integer not null check (weekly_hours between 1 and 40),
  stage text not null check (stage in ('captura', 'edicao', 'publicacao'))
);

create table public.studio_entries (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  id uuid not null default gen_random_uuid(),
  title text not null check (char_length(btrim(title)) between 1 and 120),
  format text not null check (format in ('Vídeo longo', 'Short', 'Live')),
  stage text not null check (stage in ('Ideia', 'Pesquisa', 'Roteiro', 'Gravação', 'Edição', 'Revisão', 'Agendado', 'Publicado', 'Analisado')),
  editorial_date date,
  published_on date,
  notes text not null default '' check (char_length(notes) <= 1500),
  views integer check (views between 0 and 1000000000),
  impressions integer check (impressions between 0 and 1000000000),
  primary key (user_id, id)
);

create index studio_entries_editorial_date_idx on public.studio_entries (user_id, editorial_date, id)
  where editorial_date is not null;
create index studio_entries_published_on_idx on public.studio_entries (user_id, published_on, id)
  where stage in ('Publicado', 'Analisado');

revoke all on public.studio_profiles, public.studio_entries from public, anon, authenticated;
grant select, insert, update, delete on public.studio_profiles, public.studio_entries to authenticated;

alter table public.studio_profiles enable row level security;
alter table public.studio_entries enable row level security;

create policy studio_profiles_own_rows
  on public.studio_profiles
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy studio_entries_own_rows
  on public.studio_entries
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

commit;
