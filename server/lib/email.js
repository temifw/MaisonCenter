// =====================================================================
// email.js — booking confirmation email over SMTP (Nodemailer).
//
// Replaces the old Supabase Edge Function + Resend HTTP approach. The
// SMTP password lives in server/.env and never leaves this process.
//
// Design rules:
//   1. NEVER fail a booking because email had a hiccup. Every send is
//      best-effort; the caller fires it without awaiting.
//   2. One shared transporter, created lazily and reused. Nodemailer
//      pools the TCP connections so we don't re-handshake per email.
//   3. If SMTP isn't configured, log loudly once and no-op — so a fresh
//      clone of the repo still runs without credentials.
// =====================================================================

const nodemailer = require("nodemailer");
const { buildHtml, buildText, buildSubject } = require("./emailTemplate");

// ----- configuration -------------------------------------------------

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

// Port 465 is implicit TLS ("smtps"). Ports 587/2525 start plaintext and
// upgrade via STARTTLS, which Nodemailer does automatically when
// secure:false. Getting this backwards is the #1 cause of hangs.
const SMTP_SECURE = process.env.SMTP_SECURE
  ? process.env.SMTP_SECURE === "true"
  : SMTP_PORT === 465;

// The From address must be a sender you verified with your provider,
// otherwise the provider rejects the message outright.
const FROM_EMAIL = process.env.FROM_EMAIL || SMTP_USER;
const FROM_NAME = process.env.FROM_NAME || "Maison Center";
const REPLY_TO = process.env.REPLY_TO || process.env.HOTEL_EMAIL || FROM_EMAIL;

// Optional blind copy so the front desk sees every confirmation.
const BCC_EMAIL = process.env.BCC_EMAIL || "";

const HOTEL = {
  name: process.env.HOTEL_NAME || "Maison Center",
  address: process.env.HOTEL_ADDRESS || "",
  phone: process.env.HOTEL_PHONE || "",
  email: process.env.HOTEL_EMAIL || FROM_EMAIL || "",
  siteUrl: (process.env.SITE_URL || "http://localhost:5173").replace(/\/+$/, ""),
};

const CURRENCY = process.env.CURRENCY_SYMBOL || "$";

const isConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);

// ----- transporter ---------------------------------------------------

let transporter = null;
let warnedMissingConfig = false;

function getTransporter() {
  if (!isConfigured) {
    if (!warnedMissingConfig) {
      warnedMissingConfig = true;
      console.warn(
        "[email] SMTP is not configured (need SMTP_HOST, SMTP_USER, SMTP_PASS in server/.env).\n" +
          "        Confirmation emails are DISABLED. Bookings will still succeed."
      );
    }
    return null;
  }

  if (!transporter) {
    // Pooling keeps SMTP sockets open between sends — a clear win on a
    // long-lived server. On serverless it's actively harmful: the socket
    // can't survive between invocations, and an open handle can keep the
    // function alive until it's force-killed. Vercel sets VERCEL=1.
    const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      ...(isServerless
        ? {}
        : { pool: true, maxConnections: 3, maxMessages: 50 }),
      // Fail fast rather than hanging a request for minutes.
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });
  }

  return transporter;
}

// Opens a connection and authenticates without sending anything.
// Used by scripts/test-email.js and the optional startup check.
async function verifyTransport() {
  const t = getTransporter();
  if (!t) throw new Error("SMTP is not configured — check server/.env");
  await t.verify();
  return true;
}

// ----- data assembly -------------------------------------------------

// Turn the raw booking row (from the create_booking RPC) plus a room
// lookup into the flat shape the template wants.
function buildEmailData(booking, room, guestName, guestEmail) {
  return {
    guestName: guestName || "Guest",
    guestEmail,
    bookingCode: booking.booking_code || booking.id,
    status: booking.status || "confirmed",
    roomType: room?.room_types?.name || "Room",
    roomNumber: room?.room_number || "",
    checkIn: booking.check_in,
    checkOut: booking.check_out,
    guestsCount: booking.guests_count ?? 1,
    totalPrice: Number(booking.total_price || 0),
    specialRequests: booking.special_requests || "",
    currency: CURRENCY,
    hotel: HOTEL,
  };
}

// ----- public API ----------------------------------------------------

/**
 * Send the booking confirmation. Best-effort: resolves quietly when
 * email is disabled, throws only on a genuine send failure so the
 * caller's .catch() can log it.
 *
 * @param db          Supabase client scoped to the request (for the room lookup)
 * @param booking     The row returned by the create_booking RPC
 * @param guestName   Name as typed on the booking form
 * @param guestEmail  Recipient
 */
async function sendBookingEmail(db, booking, guestName, guestEmail) {
  if (!guestEmail) return { skipped: "no-recipient" };

  const t = getTransporter();
  if (!t) return { skipped: "not-configured" };

  // Look up friendly room info for the email body. If this fails the
  // email still goes out, just with a generic room label.
  let room = null;
  try {
    const { data } = await db
      .from("rooms")
      .select("room_number, room_types(name)")
      .eq("id", booking.room_id)
      .single();
    room = data;
  } catch (e) {
    console.warn("[email] Room lookup failed, sending generic details:", e?.message || e);
  }

  const d = buildEmailData(booking, room, guestName, guestEmail);

  const info = await t.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to: guestEmail,
    ...(BCC_EMAIL ? { bcc: BCC_EMAIL } : {}),
    replyTo: REPLY_TO,
    subject: buildSubject(d),
    text: buildText(d), // plain-text part — improves deliverability
    html: buildHtml(d),
    headers: {
      // Helps clients thread/relate messages about the same booking.
      "X-Entity-Ref-ID": d.bookingCode,
    },
  });

  console.log(`[email] Confirmation ${d.bookingCode} -> ${guestEmail} (${info.messageId})`);
  return info;
}

module.exports = {
  sendBookingEmail,
  verifyTransport,
  buildEmailData,
  isConfigured,
  HOTEL,
  CURRENCY,
};
