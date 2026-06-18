-- =====================================================================
-- 003_concurrency.sql
-- THE most important file for correctness. This is what makes it
-- physically impossible for two people to book the same room for
-- overlapping dates, even if their requests arrive at the exact same
-- millisecond from different servers.
-- =====================================================================

-- HOW IT WORKS
-- An EXCLUSION CONSTRAINT is like a UNIQUE constraint, but instead of
-- "no two rows may be equal" it says "no two rows may CONFLICT" using
-- operators you choose. Here the rule is:
--
--    reject any new/updated row where another row has
--    the SAME room_id ( = )  AND  an OVERLAPPING stay ( && ).
--
-- Postgres enforces this with a GiST index at COMMIT time while holding
-- the right locks, so concurrent transactions are serialized by the
-- database itself. The application cannot "forget" to check, and there
-- is no check-then-insert race window: if two transactions try to insert
-- conflicting rows, exactly one commits and the other fails with
-- SQLSTATE 23P01 (exclusion_violation).
--
-- The WHERE clause means cancelled / checked_out / no_show bookings are
-- IGNORED — they no longer hold the room, so the dates free up again.

alter table public.bookings
  drop constraint if exists no_double_booking;

alter table public.bookings
  add constraint no_double_booking
  exclude using gist (
    room_id with =,
    stay    with &&
  )
  where (status in ('pending', 'confirmed', 'checked_in'));

-- NOTE: We deliberately put 'pending' in the active set. A pending
-- booking still holds the room (e.g. while a future payment step
-- completes). A scheduled job can later expire stale pending rows by
-- flipping them to 'cancelled', which instantly releases the dates.

comment on constraint no_double_booking on public.bookings is
  'Prevents overlapping active bookings for the same room at the DB level.';
