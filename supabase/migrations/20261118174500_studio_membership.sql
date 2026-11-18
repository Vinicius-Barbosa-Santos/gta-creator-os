begin;

create table public.studio_owners (
  user_id uuid primary key references auth.users (id) on delete cascade
);
alter table public.studio_owners enable row level security;
revoke all on public.studio_owners from public, anon, authenticated;

alter table public.studio_billing_settings drop constraint studio_billing_settings_mode_check;
alter table public.studio_billing_settings add constraint studio_billing_settings_mode_check
  check (mode in ('disabled', 'closed', 'test', 'live'));

create or replace function public.studio_billing_status()
returns table(mode text, entitled boolean)
language sql stable security definer set search_path = ''
as $$
  select s.mode, (select auth.uid()) is not null and (
    s.mode = 'disabled'
    or exists (select 1 from public.studio_owners o where o.user_id = (select auth.uid()))
    or (s.mode in ('test', 'live') and exists (
      select 1 from public.studio_payments p
      where p.user_id = (select auth.uid()) and p.live = (s.mode = 'live') and not p.revoked
    ))
  )
  from public.studio_billing_settings s;
$$;

alter table public.studio_checkout_attempts add column stripe_session_id text;

drop function public.reserve_studio_checkout();
create function public.reserve_studio_checkout()
returns table(attempt_id uuid, expires_at bigint, stripe_session_id text)
language sql security definer set search_path = ''
as $$
  insert into public.studio_checkout_attempts as attempts (user_id, mode, attempt_id, expires_at)
  select auth.uid(), s.mode, gen_random_uuid(), floor(extract(epoch from now()))::bigint + 2400
    from public.studio_billing_status() s
    where s.mode in ('test', 'live') and not s.entitled and auth.uid() is not null
  on conflict (user_id, mode) do update set attempt_id = attempts.attempt_id
  returning attempts.attempt_id, attempts.expires_at, attempts.stripe_session_id;
$$;
revoke all on function public.reserve_studio_checkout() from public, anon, authenticated;
grant execute on function public.reserve_studio_checkout() to authenticated;

create function public.store_studio_checkout(account uuid, environment text, attempt uuid, session_id text)
returns boolean
language sql security definer set search_path = ''
as $$
  with saved as (
    update public.studio_checkout_attempts a set stripe_session_id = session_id
    where a.user_id = account and a.mode = environment and a.attempt_id = attempt
      and (a.stripe_session_id is null or a.stripe_session_id = session_id)
    returning 1
  )
  select exists (select 1 from saved);
$$;

create function public.rotate_studio_checkout(account uuid, environment text, attempt uuid, expired_session text)
returns boolean
language sql security definer set search_path = ''
as $$
  with rotated as (
    update public.studio_checkout_attempts a
    set attempt_id = gen_random_uuid(), expires_at = floor(extract(epoch from now()))::bigint + 2400,
        stripe_session_id = null
    where a.user_id = account and a.mode = environment and a.attempt_id = attempt
      and a.stripe_session_id = expired_session
    returning 1
  )
  select exists (select 1 from rotated);
$$;
revoke all on function public.store_studio_checkout(uuid, text, uuid, text),
  public.rotate_studio_checkout(uuid, text, uuid, text) from public, anon, authenticated;
grant execute on function public.store_studio_checkout(uuid, text, uuid, text),
  public.rotate_studio_checkout(uuid, text, uuid, text) to service_role;

commit;
