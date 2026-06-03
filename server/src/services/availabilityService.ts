import { supabaseAdmin } from "../lib/supabaseAdmin";

export async function findAvailableRooms(params: {
  checkIn: string;   // YYYY-MM-DD
  checkOut: string;  // YYYY-MM-DD
  guests: number;
}) {
  const { checkIn, checkOut, guests } = params;

  const { data, error } = await supabaseAdmin.rpc("available_rooms", {
    p_check_in: checkIn,
    p_check_out: checkOut,
    p_guests: guests
  });

  if (error) throw new Error(error.message);
  return data ?? [];
}