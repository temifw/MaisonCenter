-- =====================================================================
-- 005_rls_policies.sql
-- Row Level Security (RLS). With Supabase, the React app talks to the
-- database directly using the user's JWT. RLS decides which rows each
-- request may see/modify. RULE OF THUMB: enable RLS on every table, then
-- explicitly allow only what you intend.
--
-- Two audiences:
--   * anon / authenticated customers  -> very limited
--   * staff (row in public.staff)      -> full operational access
-- Most WRITES happen through the SECURITY DEFINER RPCs in 004, which run
-- with elevated rights, so customer policies here are intentionally tight.
-- =====================================================================

alter table public.room_types enable row level security;
alter table public.rooms      enable row level security;
alter table public.profiles   enable row level security;
alter table public.guests     enable row level security;
alter table public.bookings   enable row level security;
alter table public.staff      enable row level security;

-- ---------------------------------------------------------------------
-- ROOM TYPES: anyone (even logged-out) can read active types for the
-- public site. Only staff can modify.
-- ---------------------------------------------------------------------
drop policy if exists room_types_read on public.room_types;
create policy room_types_read on public.room_types
  for select using (is_active or public.is_staff(auth.uid()));

drop policy if exists room_types_staff_write on public.room_types;
create policy room_types_staff_write on public.room_types
  for all using (public.is_staff(auth.uid()))
  with check (public.is_staff(auth.uid()));

-- ---------------------------------------------------------------------
-- ROOMS: public can read active rooms (to show availability). Status
-- changes / add / remove go through staff RPCs, but we also allow staff
-- direct writes for convenience in the admin UI.
-- ---------------------------------------------------------------------
drop policy if exists rooms_read on public.rooms;
create policy rooms_read on public.rooms
  for select using (is_active or public.is_staff(auth.uid()));

drop policy if exists rooms_staff_write on public.rooms;
create policy rooms_staff_write on public.rooms
  for all using (public.is_staff(auth.uid()))
  with check (public.is_staff(auth.uid()));

-- ---------------------------------------------------------------------
-- PROFILES: a user can see/update only their own profile. Staff see all.
-- ---------------------------------------------------------------------
drop policy if exists profiles_self on public.profiles;
create policy profiles_self on public.profiles
  for select using (auth.uid() = id or public.is_staff(auth.uid()));

drop policy if exists profiles_self_update on public.profiles;
create policy profiles_self_update on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- ---------------------------------------------------------------------
-- GUESTS (directory): only staff may browse the full directory. Regular
-- customers never query this table directly — their guest row is created
-- for them inside create_booking (which runs as definer, bypassing RLS).
-- ---------------------------------------------------------------------
drop policy if exists guests_staff_all on public.guests;
create policy guests_staff_all on public.guests
  for all using (public.is_staff(auth.uid()))
  with check (public.is_staff(auth.uid()));

-- ---------------------------------------------------------------------
-- BOOKINGS:
--   * staff: full access (calendar, walk-ins, edits)
--   * registered customer: read their OWN bookings (profile_id = uid)
-- Guest-checkout (no account) customers don't read bookings back via the
-- table; they get their confirmation by email instead. Inserts/cancels
-- always go through the RPCs.
-- ---------------------------------------------------------------------
drop policy if exists bookings_staff_all on public.bookings;
create policy bookings_staff_all on public.bookings
  for all using (public.is_staff(auth.uid()))
  with check (public.is_staff(auth.uid()));

drop policy if exists bookings_owner_read on public.bookings;
create policy bookings_owner_read on public.bookings
  for select using (profile_id = auth.uid());

-- ---------------------------------------------------------------------
-- STAFF: a user may check whether THEY are staff; only admins manage the
-- staff list (kept simple here — manage via the Supabase dashboard, or
-- extend with an admin-role check).
-- ---------------------------------------------------------------------
drop policy if exists staff_self_read on public.staff;
create policy staff_self_read on public.staff
  for select using (auth.uid() = id or public.is_staff(auth.uid()));
