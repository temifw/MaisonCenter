-- =====================================================================
-- 002_tables.sql
-- Core tables. No constraints/indexes for concurrency yet (see 003).
-- =====================================================================

-- ----- ROOM TYPES -----------------------------------------------------
-- A category of room (e.g. "Deluxe King"). Holds the marketing info and
-- the base nightly price shown on the customer site.
create table if not exists public.room_types (
  id            uuid primary key default gen_random_uuid(),
  name          text        not null,
  description   text,
  base_price    numeric(10,2) not null check (base_price >= 0),
  capacity      int         not null default 2 check (capacity > 0),
  amenities     text[]      not null default '{}',  -- e.g. {wifi,minibar,balcony}
  image_url     text,
  is_active     boolean     not null default true,  -- soft hide from the site
  created_at    timestamptz not null default now()
);

-- ----- ROOMS ----------------------------------------------------------
-- A physical, sellable room. Belongs to exactly one room_type.
create table if not exists public.rooms (
  id            uuid primary key default gen_random_uuid(),
  room_number   text        not null unique,           -- e.g. "204"
  room_type_id  uuid        not null references public.room_types(id) on delete restrict,
  floor         int,
  status        room_status not null default 'available',
  notes         text,
  is_active     boolean     not null default true,     -- soft-delete (see remove_room RPC)
  created_at    timestamptz not null default now()
);

-- ----- PROFILES -------------------------------------------------------
-- 1:1 extension of Supabase's auth.users for REGISTERED customers.
-- Created automatically by a trigger when a user signs up (see 005).
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  full_name     text,
  phone         text,
  created_at    timestamptz not null default now()
);

-- ----- STAFF ----------------------------------------------------------
-- Marks which auth users are hotel staff/admins. Front-desk staff log in
-- through the same Supabase auth; a row here grants them admin powers.
-- RLS policies and RPCs check is_staff(auth.uid()).
create table if not exists public.staff (
  id            uuid primary key references auth.users(id) on delete cascade,
  role          text not null default 'staff' check (role in ('staff','manager','admin')),
  created_at    timestamptz not null default now()
);

-- ----- GUESTS ---------------------------------------------------------
-- The "guest directory". One row per real person who has a booking.
-- Covers BOTH guest-checkout customers and walk-ins. If the guest is also
-- a registered user, profile_id links the two; otherwise it stays null.
create table if not exists public.guests (
  id            uuid primary key default gen_random_uuid(),
  full_name     text        not null,
  email         text,
  phone         text,
  profile_id    uuid references public.profiles(id) on delete set null,
  notes         text,
  created_at    timestamptz not null default now()
);
-- Speeds up "find existing guest by email" during booking.
create index if not exists guests_email_idx on public.guests (lower(email));

-- ----- BOOKINGS -------------------------------------------------------
-- One reservation of one room for a date range.
-- check_in is the arrival date, check_out the departure date.
-- We treat the stay as the half-open range [check_in, check_out):
-- a guest checking out on the 5th frees the room for someone arriving
-- the 5th, which is exactly how hotels work.
create table if not exists public.bookings (
  id            uuid primary key default gen_random_uuid(),
  room_id       uuid        not null references public.rooms(id) on delete restrict,
  guest_id      uuid        not null references public.guests(id) on delete restrict,
  profile_id    uuid        references public.profiles(id) on delete set null, -- set if booked while logged in

  check_in      date        not null,
  check_out     date        not null,

  -- Generated half-open range used by the exclusion constraint in 003.
  -- '[)' = inclusive of check_in, exclusive of check_out.
  stay          daterange   generated always as (daterange(check_in, check_out, '[)')) stored,

  status        booking_status not null default 'confirmed',
  source        booking_source not null default 'online',

  guests_count  int         not null default 1 check (guests_count > 0),
  total_price   numeric(10,2) not null default 0 check (total_price >= 0),
  special_requests text,

  created_by    uuid        references auth.users(id) on delete set null, -- staff/user who made it
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  -- Basic sanity: must stay at least one night.
  constraint valid_dates check (check_out > check_in)
);

create index if not exists bookings_room_idx    on public.bookings (room_id);
create index if not exists bookings_guest_idx   on public.bookings (guest_id);
create index if not exists bookings_profile_idx on public.bookings (profile_id);
create index if not exists bookings_status_idx  on public.bookings (status);
-- Powers the admin booking calendar (range queries by date).
create index if not exists bookings_stay_idx    on public.bookings using gist (stay);
