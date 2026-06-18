-- =====================================================================
-- 004_functions.sql
-- Business logic that must be atomic lives in the database as RPCs
-- (Remote Procedure Calls). The React app calls these with
-- supabase.rpc('name', {...}). Each function body runs inside ONE
-- transaction, so either everything succeeds or nothing does.
-- =====================================================================

-- ----- helper: is this user staff? -----------------------------------
create or replace function public.is_staff(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.staff where id = uid);
$$;

-- =====================================================================
-- check_availability(room_type, check_in, check_out)
-- Returns the rooms of a given type that are free for the whole range.
-- Read-only; safe to call from the customer site to render results.
-- =====================================================================
create or replace function public.check_availability(
  p_room_type_id uuid,
  p_check_in     date,
  p_check_out    date
)
returns setof public.rooms
language sql
stable
security definer
set search_path = public
as $$
  select r.*
  from public.rooms r
  where r.room_type_id = p_room_type_id
    and r.is_active = true
    and r.status <> 'maintenance'          -- never sell rooms out of service
    and not exists (
      select 1
      from public.bookings b
      where b.room_id = r.id
        and b.status in ('pending','confirmed','checked_in')
        -- overlap test using the same half-open range as the constraint
        and b.stay && daterange(p_check_in, p_check_out, '[)')
    );
$$;

-- =====================================================================
-- create_booking(...)
-- Atomically: find/create the guest, pick (or validate) a room, and
-- insert the booking. The exclusion constraint is the final guarantee,
-- but we also lock the room row with FOR UPDATE to serialize competing
-- transactions cleanly and return a friendly message instead of a raw
-- constraint error in the common case.
--
-- Pass p_room_id to book a SPECIFIC room (admin / walk-in), or leave it
-- null to auto-assign any free room of p_room_type_id (customer site).
-- Returns the new booking row as JSON.
-- =====================================================================
create or replace function public.create_booking(
  p_room_type_id   uuid,
  p_check_in       date,
  p_check_out      date,
  p_guest_name     text,
  p_guest_email    text  default null,
  p_guest_phone    text  default null,
  p_guests_count   int   default 1,
  p_special_requests text default null,
  p_source         booking_source default 'online',
  p_room_id        uuid  default null,
  p_profile_id     uuid  default null
)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_room_id    uuid;
  v_price      numeric(10,2);
  v_nights     int;
  v_guest_id   uuid;
  v_booking    public.bookings%rowtype;
begin
  -- 1. Validate input early with clear errors.
  if p_check_out <= p_check_in then
    raise exception 'Check-out must be after check-in' using errcode = '22023';
  end if;
  v_nights := p_check_out - p_check_in;

  -- 2. Choose a room and LOCK it so two concurrent bookings can't both
  --    grab the same one. FOR UPDATE blocks the second transaction until
  --    the first commits; it then re-reads and sees the new booking.
  if p_room_id is not null then
    -- Specific room requested (admin assigns room 204, etc.)
    select r.id into v_room_id
    from public.rooms r
    where r.id = p_room_id and r.is_active = true and r.status <> 'maintenance'
    for update;

    if v_room_id is null then
      raise exception 'Room is not available for booking' using errcode = 'P0002';
    end if;

    -- Confirm it's actually free for these dates.
    if exists (
      select 1 from public.bookings b
      where b.room_id = v_room_id
        and b.status in ('pending','confirmed','checked_in')
        and b.stay && daterange(p_check_in, p_check_out, '[)')
    ) then
      raise exception 'Room % is already booked for those dates', p_room_id
        using errcode = '23P01';
    end if;
  else
    -- Auto-assign: pick the first free room of the type, locking it.
    -- SKIP LOCKED lets concurrent requests grab DIFFERENT free rooms
    -- instead of queueing on the same one.
    select r.id into v_room_id
    from public.rooms r
    where r.room_type_id = p_room_type_id
      and r.is_active = true
      and r.status <> 'maintenance'
      and not exists (
        select 1 from public.bookings b
        where b.room_id = r.id
          and b.status in ('pending','confirmed','checked_in')
          and b.stay && daterange(p_check_in, p_check_out, '[)')
      )
    order by r.room_number
    limit 1
    for update of r skip locked;

    if v_room_id is null then
      raise exception 'No rooms of that type are available for those dates'
        using errcode = 'P0001';
    end if;
  end if;

  -- 3. Compute price from the room type's base price.
  select rt.base_price into v_price
  from public.rooms r
  join public.room_types rt on rt.id = r.room_type_id
  where r.id = v_room_id;
  v_price := v_price * v_nights;

  -- 4. Find or create the guest (the directory entry).
  if p_profile_id is not null then
    select id into v_guest_id from public.guests where profile_id = p_profile_id limit 1;
  end if;
  if v_guest_id is null and p_guest_email is not null then
    select id into v_guest_id from public.guests
    where lower(email) = lower(p_guest_email) limit 1;
  end if;
  if v_guest_id is null then
    insert into public.guests (full_name, email, phone, profile_id)
    values (p_guest_name, p_guest_email, p_guest_phone, p_profile_id)
    returning id into v_guest_id;
  end if;

  -- 5. Insert the booking. If another transaction sneaked a conflicting
  --    booking in between our check and now, the exclusion constraint
  --    fires here and we convert it to a clean message.
  begin
    insert into public.bookings (
      room_id, guest_id, profile_id, check_in, check_out,
      status, source, guests_count, total_price, special_requests, created_by
    ) values (
      v_room_id, v_guest_id, p_profile_id, p_check_in, p_check_out,
      'confirmed', p_source, p_guests_count, v_price, p_special_requests, auth.uid()
    )
    returning * into v_booking;
  exception when exclusion_violation then
    raise exception 'That room was just booked by someone else. Please try again.'
      using errcode = '23P01';
  end;

  return row_to_json(v_booking);
end;
$$;

-- =====================================================================
-- cancel_booking(booking_id)
-- Sets status to 'cancelled', which removes it from the exclusion set
-- and frees the dates. Customers may cancel their own; staff may cancel
-- any.
-- =====================================================================
create or replace function public.cancel_booking(p_booking_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare v_owner uuid;
begin
  select profile_id into v_owner from public.bookings where id = p_booking_id;
  if not found then
    raise exception 'Booking not found' using errcode = 'P0002';
  end if;
  if not public.is_staff(auth.uid()) and v_owner is distinct from auth.uid() then
    raise exception 'Not allowed to cancel this booking' using errcode = '42501';
  end if;

  update public.bookings
  set status = 'cancelled', updated_at = now()
  where id = p_booking_id;
end;
$$;

-- =====================================================================
-- set_room_status(room_id, status)  -- staff only
-- Front desk / housekeeping flips a room between available, occupied,
-- cleaning, maintenance.
-- =====================================================================
create or replace function public.set_room_status(
  p_room_id uuid,
  p_status  room_status
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_staff(auth.uid()) then
    raise exception 'Staff only' using errcode = '42501';
  end if;
  update public.rooms set status = p_status where id = p_room_id;
  if not found then
    raise exception 'Room not found' using errcode = 'P0002';
  end if;
end;
$$;

-- =====================================================================
-- remove_room(room_id)  -- staff only, SOFT delete
-- We never hard-delete a room that has history; we deactivate it so past
-- bookings and the guest directory stay intact.
-- =====================================================================
create or replace function public.remove_room(p_room_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_staff(auth.uid()) then
    raise exception 'Staff only' using errcode = '42501';
  end if;
  update public.rooms
  set is_active = false, status = 'maintenance'
  where id = p_room_id;
end;
$$;

-- ----- keep updated_at fresh on bookings -----------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end;
$$;

drop trigger if exists bookings_touch on public.bookings;
create trigger bookings_touch
  before update on public.bookings
  for each row execute function public.touch_updated_at();

-- ----- auto-create a profile when a user signs up --------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'phone'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
