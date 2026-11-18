begin;

create table public.studio_billing_settings (
  singleton boolean primary key default true check (singleton),
  mode text not null check (mode in ('disabled', 'test', 'live'))
);
insert into public.studio_billing_settings (mode) values ('disabled');

create table public.studio_payments (
  payment_intent text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  live boolean not null,
  revoked boolean not null
);
create index studio_payments_access_idx on public.studio_payments (user_id, live) where not revoked;

create table public.studio_checkout_attempts (
  user_id uuid not null references auth.users (id) on delete cascade,
  mode text not null check (mode in ('test', 'live')),
  attempt_id uuid not null,
  expires_at bigint not null,
  primary key (user_id, mode)
);

alter table public.studio_checkout_attempts enable row level security;
revoke all on public.studio_checkout_attempts from public, anon, authenticated;
alter table public.studio_billing_settings enable row level security;
alter table public.studio_payments enable row level security;
revoke all on public.studio_billing_settings, public.studio_payments from public, anon, authenticated;

create function public.studio_billing_status()
returns table(mode text, entitled boolean)
language sql stable security definer set search_path = ''
as $$
  select s.mode, (select auth.uid()) is not null and (
    s.mode = 'disabled' or exists (
      select 1 from public.studio_payments p
      where p.user_id = (select auth.uid()) and p.live = (s.mode = 'live') and not p.revoked
    )
  )
  from public.studio_billing_settings s;
$$;
revoke all on function public.studio_billing_status() from public, anon, authenticated;
grant execute on function public.studio_billing_status() to authenticated;

create function public.reserve_studio_checkout()
returns table(attempt_id uuid, expires_at bigint)
language sql security definer set search_path = ''
as $$
  insert into public.studio_checkout_attempts as attempts (user_id, mode, attempt_id, expires_at)
  select auth.uid(), s.mode, gen_random_uuid(), floor(extract(epoch from now()))::bigint + 2400
    from public.studio_billing_status() s
    where s.mode in ('test', 'live') and not s.entitled and auth.uid() is not null
  on conflict (user_id, mode) do update set
    attempt_id = case when attempts.expires_at <= floor(extract(epoch from now()))
      then excluded.attempt_id else attempts.attempt_id end,
    expires_at = case when attempts.expires_at <= floor(extract(epoch from now()))
      then excluded.expires_at else attempts.expires_at end
  returning attempts.attempt_id, attempts.expires_at;
$$;
revoke all on function public.reserve_studio_checkout() from public, anon, authenticated;
grant execute on function public.reserve_studio_checkout() to authenticated;

create function public.record_studio_payment(intent text, account uuid, is_live boolean, is_revoked boolean)
returns void
language sql security definer set search_path = ''
as $$
  insert into public.studio_payments as p (payment_intent, user_id, live, revoked)
  select intent, id, is_live, is_revoked from auth.users where id = account
  on conflict (payment_intent) do update set revoked = p.revoked or excluded.revoked
  where p.user_id = excluded.user_id and p.live = excluded.live;
$$;
revoke all on function public.record_studio_payment(text, uuid, boolean, boolean) from public, anon, authenticated;
grant execute on function public.record_studio_payment(text, uuid, boolean, boolean) to service_role;

create policy paid_studio_access on public.studio_profiles as restrictive for all to authenticated
  using ((select entitled from public.studio_billing_status()))
  with check ((select entitled from public.studio_billing_status()));

create policy paid_studio_access on public.studio_entries as restrictive for all to authenticated
  using ((select entitled from public.studio_billing_status()))
  with check ((select entitled from public.studio_billing_status()));

create policy paid_studio_access on public.studio_snapshots as restrictive for all to authenticated
  using ((select entitled from public.studio_billing_status()))
  with check ((select entitled from public.studio_billing_status()));

create policy paid_studio_access on public.studio_reviews as restrictive for all to authenticated
  using ((select entitled from public.studio_billing_status()))
  with check ((select entitled from public.studio_billing_status()));

commit;
