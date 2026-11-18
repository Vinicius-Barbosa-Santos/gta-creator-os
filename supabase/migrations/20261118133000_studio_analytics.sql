begin;

create table public.studio_snapshots (
  user_id uuid not null default auth.uid(),
  entry_id uuid not null,
  window_hours integer not null check (window_hours in (48, 168)),
  video_url text not null check (char_length(video_url) between 1 and 200),
  series text not null default '' check (char_length(series) <= 80),
  views integer not null check (views between 0 and 1000000000),
  impressions integer check (impressions between 0 and 1000000000),
  ctr numeric check (ctr between 0 and 100),
  retention numeric check (retention between 0 and 100),
  captured_at timestamptz not null default now(),
  primary key (user_id, entry_id, window_hours),
  foreign key (user_id, entry_id) references public.studio_entries(user_id, id) on delete cascade
);

create table public.studio_reviews (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  week_start date not null check (extract(isodow from week_start) = 1),
  observation text not null check (char_length(btrim(observation)) between 1 and 800),
  experiment text not null check (char_length(btrim(experiment)) between 1 and 800),
  primary key (user_id, week_start)
);

revoke all on public.studio_snapshots, public.studio_reviews from public, anon, authenticated;
grant select, insert, update, delete on public.studio_snapshots, public.studio_reviews to authenticated;
alter table public.studio_snapshots enable row level security;
alter table public.studio_reviews enable row level security;

create policy studio_snapshots_own_rows on public.studio_snapshots for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy studio_reviews_own_rows on public.studio_reviews for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

commit;
