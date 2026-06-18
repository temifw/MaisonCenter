// =====================================================================
// email.js — best-effort booking confirmation via the Supabase Edge
// Function `send-booking-email` (which talks to Resend).
// We never block or fail a booking because email had a hiccup.
// =====================================================================

const { supabaseAdmin, supabaseAnon } = require("./supabase");

async function sendBookingEmail(db, booking, guestName, guestEmail) {
  if (!guestEmail) return;

  // Look up friendly room info for the email body.
  const { data: room } = await db
    .from("rooms")
    .select("room_number, room_types(name)")
    .eq("id", booking.room_id)
    .single();

  const client = supabaseAdmin || supabaseAnon;
  await client.functions.invoke("send-booking-email", {
    body: {
      to: guestEmail,
      guestName,
      roomNumber: room?.room_number ?? "—",
      roomType: room?.room_types?.name ?? "Room",
      checkIn: booking.check_in,
      checkOut: booking.check_out,
      totalPrice: Number(booking.total_price),
      bookingId: booking.id,
    },
  });
}

module.exports = { sendBookingEmail };
