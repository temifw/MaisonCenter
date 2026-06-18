-- =====================================================================
-- 001_extensions_and_enums.sql
-- Extensions and shared enum types for the hotel platform.
-- Run migrations in numerical order (001, 002, ...).
-- =====================================================================

-- btree_gist lets us mix "=" (room_id) and range overlap "&&" (dates)
-- inside ONE exclusion constraint. This is the backbone of our
-- double-booking prevention. Without it the exclusion constraint below
-- cannot be created.
create extension if not exists btree_gist;

-- pgcrypto gives us gen_random_uuid() for primary keys.
create extension if not exists pgcrypto;

-- ----- Room lifecycle status -----------------------------------------
-- Physical state of a room, controlled by housekeeping/front desk.
do $$ begin
  create type room_status as enum (
    'available',    -- ready to be sold / occupied
    'occupied',     -- a guest is currently in it
    'cleaning',     -- being turned over between guests
    'maintenance'   -- out of service, cannot be sold
  );
exception when duplicate_object then null; end $$;

-- ----- Booking lifecycle ---------------------------------------------
do $$ begin
  create type booking_status as enum (
    'pending',      -- created, not yet confirmed (e.g. awaiting payment later)
    'confirmed',    -- guaranteed reservation
    'checked_in',   -- guest has arrived
    'checked_out',  -- stay completed
    'cancelled',    -- voided, frees the room
    'no_show'       -- guest never arrived
  );
exception when duplicate_object then null; end $$;

-- ----- Where a booking originated ------------------------------------
do $$ begin
  create type booking_source as enum (
    'online',       -- customer site (guest checkout or registered)
    'walk_in',      -- created by staff at the desk
    'phone'         -- created by staff over the phone
  );
exception when duplicate_object then null; end $$;
