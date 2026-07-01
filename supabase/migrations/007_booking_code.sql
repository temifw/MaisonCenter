-- =====================================================================
-- 007_booking_code.sql
-- Adds a short, human-friendly BOOKING CODE to every booking and a
-- public lookup RPC so a guest can retrieve their reservation with
-- (booking_code + email) — no account/login required.
--
-- Design notes:
--   * The code is the customer-facing reference (e.g. "MC-7K4PQ9RD").
--     The internal UUID `id` is unchanged and still used everywhere else.
--   * Lookup goes through a SECURITY DEFINER RPC that returns ONLY a
--     handful of safe fields, and ONLY when the email ALSO matches. This
--     means we never have to open the `bookings` table to the anon role,
--     so RLS stays closed and the code alone is not enough to read a row.
--   * Run AFTER 001–006. Safe to re-run (idempotent where practical).
-- =====================================================================

-- ----- 1. The column -------------------------------------------------
alter table public.bookings
  add column if not exists booking_code text;

-- One code per booking. (Partial-safe: nulls allowed transiently during
-- backfill, then enforced not-null below.)
create unique index if not exists bookings_booking_code_key
  on public.bookings (booking_code);

-- ----- 2. Code generator ---------------------------------------------
-- Crockford-ish alphabet: no 0/O/1/I/L to avoid read/typo confusion.
-- Format: "MC-" + 8 chars  -> ~23^8 ≈ 8e10 combinations, unguessable
-- enough to be a weak secret; email match is the real second factor.
create or replace function public.gen_booking_code()
returns text
language plpgsql
volatile
as $$
declare
  alphabet constant text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  code text;
  i int;
begin
  loop
    code := 'MC-';
    for i in 1..8 loop
      code := code || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
    end loop;
    -- Retry on the astronomically rare collision.
    exit when not exists (select 1 from public.bookings where booking_code = code);
  end loop;
  return code;
end;
$$;

-- ----- 3. Auto-assign on insert --------------------------------------
create or replace function public.set_booking_code()
returns trigger
language plpgsql
as $$
begin
  if new.booking_code is null then
    new.booking_code := public.gen_booking_code();
  end if;
  return new;
end;
$$;

drop trigger if exists bookings_set_code on public.bookings;
create trigger bookings_set_code
  before insert on public.bookings
  for each row execute function public.set_booking_code();

-- ----- 4. Backfill any pre-existing bookings -------------------------
do $$
declare r record;
begin
  for r in select id from public.bookings where booking_code is null loop
    update public.bookings
      set booking_code = public.gen_booking_code()
      where id = r.id;
  end loop;
end $$;

-- Now that every row has one, make it mandatory.
alter table public.bookings
  alter column booking_code set not null;

-- ----- 5. Public lookup RPC (code + email) ---------------------------
-- Returns a single JSON object of SAFE fields, or NULL if either the
-- code is unknown or the email does not match. Email compare is
-- case-insensitive and trimmed. SECURITY DEFINER so it can read past
-- RLS, but it only ever exposes the fields selected below.
create or replace function public.get_booking_by_code(
  p_code  text,
  p_email text
)
returns json
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v json;
begin
  if p_code is null or p_email is null then
    return null;
  end if;

  select json_build_object(
           'booking_code', b.booking_code,
           'status',       b.status,
           'check_in',     b.check_in,
           'check_out',    b.check_out,
           'guests_count', b.guests_count,
           'total_price',  b.total_price,
           'special_requests', b.special_requests,
           'created_at',   b.created_at,
           'guest_name',   g.full_name,
           'room_number',  r.room_number,
           'room_type',    rt.name
         )
    into v
  from public.bookings b
  join public.guests      g  on g.id  = b.guest_id
  join public.rooms       r  on r.id  = b.room_id
  join public.room_types  rt on rt.id = r.room_type_id
  where upper(b.booking_code) = upper(trim(p_code))
    and lower(g.email)        = lower(trim(p_email))
  limit 1;

  return v;  -- NULL when no match
end;
$$;

-- Anyone (including logged-out visitors) may CALL the lookup, but the
-- function body decides what comes back. Execute is granted to the
-- roles the API uses.
grant execute on function public.get_booking_by_code(text, text) to anon, authenticated;

-- =====================================================================
-- Verification (run in the SQL editor after applying):
--   select booking_code from public.bookings limit 5;
--   select public.get_booking_by_code('MC-XXXXXXXX', 'guest@example.com');
-- =====================================================================
