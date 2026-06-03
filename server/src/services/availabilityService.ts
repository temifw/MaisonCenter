import { supabaseAdmin } from "../lib/supabaseAdmin";

/**
 * Returns rooms that are NOT booked for [checkIn, checkOut)
 * and whose room type supports the requested guests count.
 */
export async function findAvailableRooms(params: {
  checkIn: string;
  checkOut: string;
  guests: number;
}) {
  const { checkIn, checkOut, guests } = params;

  // Strategy:
  // 1) Fetch active rooms joined with their room_type
  // 2) Fetch booked room_ids overlapping the dates
  // 3) Filter out booked rooms

  // (A) rooms + room type
  const roomsResp = await supabaseAdmin
    .from("rooms")
    .select(
      `
      id,
      room_number,
      is_active,
      room_type:room_types (
        id,
        name,
        description,
        base_price_cents,
        max_guests
      )
    `
    )
    .eq("is_active", true);

  if (roomsResp.error) throw new Error(roomsResp.error.message);

  const allRooms = (roomsResp.data ?? []).filter((r: any) => r.room_type?.max_guests >= guests);

  // (B) overlapping bookings
  // overlap if: booking.check_in < checkOut AND booking.check_out > checkIn
  const bookedResp = await supabaseAdmin
    .from("bookings")
    .select("room_id, check_in, check_out, status")
    .neq("status", "cancelled")
    .lt("check_in", checkOut)
    .gt("check_out", checkIn);

  if (bookedResp.error) throw new Error(bookedResp.error.message);

  const bookedRoomIds = new Set((bookedResp.data ?? []).map((b) => b.room_id));

  return allRooms.filter((r: any) => !bookedRoomIds.has(r.id));
}