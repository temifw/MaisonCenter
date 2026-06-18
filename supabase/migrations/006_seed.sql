-- =====================================================================
-- 006_seed.sql  (optional demo data)
-- Run this to get something to look at. Safe to skip in production.
-- =====================================================================

insert into public.room_types (name, description, base_price, capacity, amenities)
values
  ('Standard Queen', 'Cozy room with a queen bed.',            120.00, 2, '{wifi,tv,ac}'),
  ('Deluxe King',    'Spacious king room with city view.',     180.00, 2, '{wifi,tv,ac,minibar,balcony}'),
  ('Family Suite',   'Two-room suite, sleeps four.',           260.00, 4, '{wifi,tv,ac,minibar,kitchenette}')
on conflict do nothing;

-- A few physical rooms per type.
insert into public.rooms (room_number, room_type_id, floor)
select x.num, rt.id, x.flr
from (values
  ('101', 'Standard Queen', 1),
  ('102', 'Standard Queen', 1),
  ('201', 'Deluxe King',    2),
  ('202', 'Deluxe King',    2),
  ('301', 'Family Suite',   3)
) as x(num, type_name, flr)
join public.room_types rt on rt.name = x.type_name
on conflict (room_number) do nothing;

-- To make yourself staff after signing up once, find your user id in
-- Authentication > Users in the Supabase dashboard and run:
--   insert into public.staff (id, role) values ('<your-user-uuid>', 'admin');
