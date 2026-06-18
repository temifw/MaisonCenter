// =====================================================================
// Supabase Edge Function: send-booking-email
// Sends a booking confirmation via Resend. Runs on Deno (Supabase's
// edge runtime), NOT in the browser, so your Resend API key stays secret.
//
// Deploy:   supabase functions deploy send-booking-email
// Secrets:  supabase secrets set RESEND_API_KEY=re_xxx FROM_EMAIL="Maison Center <bookings@yourdomain.com>"
//
// The React app calls it with supabase.functions.invoke('send-booking-email', { body }).
// =====================================================================

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") ?? "Maison Center <onboarding@resend.dev>";

// CORS so the browser can call this function.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingPayload {
  to: string;
  guestName: string;
  roomNumber: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  bookingId: string;
}

function buildHtml(b: BookingPayload): string {
  return `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto">
    <h2 style="color:#1a1a1a">Your booking is confirmed</h2>
    <p>Hi ${b.guestName}, thank you for booking with Maison Center.</p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0">
      <tr><td style="padding:8px;border-bottom:1px solid #eee">Confirmation #</td><td style="padding:8px;border-bottom:1px solid #eee"><b>${b.bookingId}</b></td></tr>
      <tr><td style="padding:8px;border-bottom:1px solid #eee">Room</td><td style="padding:8px;border-bottom:1px solid #eee">${b.roomType} (Room ${b.roomNumber})</td></tr>
      <tr><td style="padding:8px;border-bottom:1px solid #eee">Check-in</td><td style="padding:8px;border-bottom:1px solid #eee">${b.checkIn}</td></tr>
      <tr><td style="padding:8px;border-bottom:1px solid #eee">Check-out</td><td style="padding:8px;border-bottom:1px solid #eee">${b.checkOut}</td></tr>
      <tr><td style="padding:8px">Total</td><td style="padding:8px"><b>$${b.totalPrice.toFixed(2)}</b></td></tr>
    </table>
    <p style="color:#666;font-size:13px">We look forward to welcoming you.</p>
  </div>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as BookingPayload;

    if (!body.to || !body.bookingId) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [body.to],
        subject: `Booking confirmed — ${body.checkIn} to ${body.checkOut}`,
        html: buildHtml(body),
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return new Response(JSON.stringify({ error: data }), {
        status: res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true, id: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
