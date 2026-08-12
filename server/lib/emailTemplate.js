// =====================================================================
// emailTemplate.js — builds the booking-confirmation email body.
//
// Two versions are produced from the same data:
//   buildHtml(d)  -> rich HTML for modern clients
//   buildText(d)  -> plain-text fallback (spam filters expect this, and
//                    some corporate clients strip HTML entirely)
//
// Email HTML is NOT web HTML. Outlook renders with Word's engine, Gmail
// strips <style> blocks in some contexts, and flexbox/grid are unusable.
// So: tables for layout, inline styles only, no external CSS.
// =====================================================================

const BRAND = "#776E20"; // olive accent used across the site
const INK = "#1c1917"; // stone-900
const MUTED = "#78716c"; // stone-500
const LINE = "#e7e5e4"; // stone-200
const WASH = "#fafaf9"; // stone-50

// ----- small formatting helpers --------------------------------------

// Escape anything that came from a guest so a stray "<" can't break the
// layout or inject markup into the email.
function esc(v) {
  if (v === null || v === undefined) return "";
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// "2026-08-14" -> "Friday, 14 August 2026". Dates from Postgres `date`
// columns have no timezone, so we append T00:00:00 to stop the runtime
// shifting them a day backwards in negative-offset timezones.
function formatDate(value) {
  if (!value) return "—";
  const d = new Date(`${String(value).slice(0, 10)}T00:00:00`);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function nightsBetween(checkIn, checkOut) {
  const a = new Date(`${String(checkIn).slice(0, 10)}T00:00:00`);
  const b = new Date(`${String(checkOut).slice(0, 10)}T00:00:00`);
  const n = Math.round((b - a) / 86400000);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function money(amount, currency) {
  const n = Number(amount);
  return `${currency}${(Number.isFinite(n) ? n : 0).toFixed(2)}`;
}

// One label/value row of the details table.
function row(label, value, opts = {}) {
  const weight = opts.bold ? "600" : "400";
  const border = opts.last ? "none" : `1px solid ${LINE}`;
  return `
        <tr>
          <td style="padding:12px 0;border-bottom:${border};color:${MUTED};font-size:14px;">${esc(label)}</td>
          <td style="padding:12px 0;border-bottom:${border};color:${INK};font-size:14px;font-weight:${weight};text-align:right;">${value}</td>
        </tr>`;
}

// =====================================================================
// The data shape every builder below expects:
//   { guestName, guestEmail, guestPhone, bookingCode, status,
//     roomType, roomNumber, checkIn, checkOut, guestsCount,
//     totalPrice, specialRequests, currency, hotel:{name,address,phone,
//     email,siteUrl} }
// =====================================================================

function buildSubject(d) {
  return `Booking confirmed — ${d.hotel.name} — ${d.bookingCode}`;
}

function buildText(d) {
  const nights = nightsBetween(d.checkIn, d.checkOut);
  const lines = [
    `${d.hotel.name.toUpperCase()}`,
    ``,
    `Hi ${d.guestName},`,
    ``,
    `Your reservation is confirmed. Please keep the booking code below —`,
    `you'll need it (with this email address) to view or manage your stay.`,
    ``,
    `BOOKING CODE: ${d.bookingCode}`,
    ``,
    `----------------------------------------`,
    `Room          : ${d.roomType}${d.roomNumber ? ` (Room ${d.roomNumber})` : ""}`,
    `Check-in      : ${formatDate(d.checkIn)} (from 3:00 PM)`,
    `Check-out     : ${formatDate(d.checkOut)} (by 11:00 AM)`,
    `Length of stay: ${nights} night${nights === 1 ? "" : "s"}`,
    `Guests        : ${d.guestsCount}`,
    `Status        : ${String(d.status || "confirmed").toUpperCase()}`,
    `Total         : ${money(d.totalPrice, d.currency)}`,
    `----------------------------------------`,
  ];

  if (d.specialRequests) {
    lines.push(``, `Your requests: ${d.specialRequests}`);
  }

  lines.push(
    ``,
    `Manage your booking: ${d.hotel.siteUrl}/my-booking`,
    `(enter ${d.bookingCode} and ${d.guestEmail})`,
    ``,
    `Questions? Reply to this email${d.hotel.phone ? ` or call ${d.hotel.phone}` : ""}.`,
    ``,
    d.hotel.name,
    d.hotel.address || "",
    ``,
    `This is an automated confirmation. Prices are shown in ${d.currency === "$" ? "USD" : d.currency}.`
  );

  return lines.filter((l) => l !== null).join("\n");
}

function buildHtml(d) {
  const nights = nightsBetween(d.checkIn, d.checkOut);
  const perNight = nights > 0 ? Number(d.totalPrice) / nights : Number(d.totalPrice);
  const manageUrl = `${d.hotel.siteUrl}/my-booking`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(buildSubject(d))}</title>
</head>
<body style="margin:0;padding:0;background:${WASH};">
  <!-- Preview text: what inboxes show next to the subject line. -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    Your stay is confirmed. Booking code ${esc(d.bookingCode)} — ${esc(formatDate(d.checkIn))} to ${esc(formatDate(d.checkOut))}.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${WASH};padding:32px 12px;">
    <tr><td align="center">

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid ${LINE};">

        <!-- Header -->
        <tr>
          <td style="background:${INK};padding:32px 32px;text-align:center;">
            <div style="color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:26px;letter-spacing:2px;">
              ${esc(d.hotel.name)}
            </div>
            <div style="color:${BRAND};font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin-top:8px;">
              Reservation Confirmed
            </div>
          </td>
        </tr>

        <!-- Greeting -->
        <tr>
          <td style="padding:32px 32px 8px;font-family:Arial,Helvetica,sans-serif;">
            <p style="margin:0 0 12px;color:${INK};font-size:16px;line-height:1.6;">
              Hi ${esc(d.guestName)},
            </p>
            <p style="margin:0;color:${MUTED};font-size:15px;line-height:1.6;">
              Thank you for choosing ${esc(d.hotel.name)}. Your reservation is confirmed
              and the details are below. We look forward to welcoming you.
            </p>
          </td>
        </tr>

        <!-- Booking code: the single most important thing in this email -->
        <tr>
          <td style="padding:24px 32px 8px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                   style="background:${WASH};border:1px solid ${BRAND};">
              <tr>
                <td style="padding:20px;text-align:center;font-family:Arial,Helvetica,sans-serif;">
                  <div style="color:${MUTED};font-size:11px;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">
                    Your Booking Code
                  </div>
                  <div style="color:${INK};font-family:'Courier New',Courier,monospace;font-size:26px;letter-spacing:4px;font-weight:bold;">
                    ${esc(d.bookingCode)}
                  </div>
                  <div style="color:${MUTED};font-size:13px;line-height:1.5;margin-top:10px;">
                    Keep this code. Use it with this email address to view your
                    reservation at any time.
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Details -->
        <tr>
          <td style="padding:24px 32px 8px;font-family:Arial,Helvetica,sans-serif;">
            <div style="color:${INK};font-size:12px;letter-spacing:2px;text-transform:uppercase;border-bottom:2px solid ${INK};padding-bottom:8px;margin-bottom:4px;">
              Stay Details
            </div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row("Room", `${esc(d.roomType)}${d.roomNumber ? ` &middot; Room ${esc(d.roomNumber)}` : ""}`)}
${row("Check-in", `${esc(formatDate(d.checkIn))}<br><span style="color:${MUTED};font-size:12px;font-weight:400;">from 3:00 PM</span>`)}
${row("Check-out", `${esc(formatDate(d.checkOut))}<br><span style="color:${MUTED};font-size:12px;font-weight:400;">by 11:00 AM</span>`)}
${row("Length of stay", `${nights} night${nights === 1 ? "" : "s"}`)}
${row("Guests", esc(d.guestsCount))}
${row("Status", `<span style="color:${BRAND};text-transform:uppercase;font-size:12px;letter-spacing:1px;">${esc(d.status || "confirmed")}</span>`)}
            </table>
          </td>
        </tr>

        <!-- Price -->
        <tr>
          <td style="padding:20px 32px 8px;font-family:Arial,Helvetica,sans-serif;">
            <div style="color:${INK};font-size:12px;letter-spacing:2px;text-transform:uppercase;border-bottom:2px solid ${INK};padding-bottom:8px;margin-bottom:4px;">
              Summary
            </div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row(`${money(perNight, d.currency)} × ${nights} night${nights === 1 ? "" : "s"}`, money(d.totalPrice, d.currency))}
              <tr>
                <td style="padding:14px 0;color:${INK};font-size:16px;font-weight:700;">Total</td>
                <td style="padding:14px 0;color:${INK};font-size:20px;font-weight:700;text-align:right;">${money(d.totalPrice, d.currency)}</td>
              </tr>
            </table>
          </td>
        </tr>
${
  d.specialRequests
    ? `
        <!-- Special requests -->
        <tr>
          <td style="padding:8px 32px;font-family:Arial,Helvetica,sans-serif;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${WASH};border-left:3px solid ${BRAND};">
              <tr><td style="padding:14px 16px;">
                <div style="color:${MUTED};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px;">Your Requests</div>
                <div style="color:${INK};font-size:14px;line-height:1.6;">${esc(d.specialRequests)}</div>
                <div style="color:${MUTED};font-size:12px;margin-top:8px;">We'll do our best to accommodate these, subject to availability on arrival.</div>
              </td></tr>
            </table>
          </td>
        </tr>`
    : ""
}
        <!-- Call to action -->
        <tr>
          <td style="padding:24px 32px 8px;text-align:center;font-family:Arial,Helvetica,sans-serif;">
            <a href="${esc(manageUrl)}"
               style="display:inline-block;background:${INK};color:#ffffff;text-decoration:none;padding:14px 36px;font-size:12px;letter-spacing:2px;text-transform:uppercase;">
              Manage Your Booking
            </a>
            <div style="color:${MUTED};font-size:12px;margin-top:12px;line-height:1.5;">
              Or visit <a href="${esc(manageUrl)}" style="color:${BRAND};">${esc(manageUrl)}</a><br>
              and enter your code with the email address ${esc(d.guestEmail)}.
            </div>
          </td>
        </tr>

        <!-- Good-to-know -->
        <tr>
          <td style="padding:24px 32px;font-family:Arial,Helvetica,sans-serif;">
            <div style="border-top:1px solid ${LINE};padding-top:16px;color:${MUTED};font-size:13px;line-height:1.7;">
              <strong style="color:${INK};">Good to know</strong><br>
              &middot; Check-in is from 3:00 PM; check-out is by 11:00 AM.<br>
              &middot; Please bring photo ID matching the name on this booking.<br>
              &middot; Need to change or cancel? Reply to this email${d.hotel.phone ? ` or call ${esc(d.hotel.phone)}` : ""}.
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:${WASH};border-top:1px solid ${LINE};padding:24px 32px;text-align:center;font-family:Arial,Helvetica,sans-serif;">
            <div style="color:${INK};font-size:14px;margin-bottom:6px;">${esc(d.hotel.name)}</div>
            ${d.hotel.address ? `<div style="color:${MUTED};font-size:12px;">${esc(d.hotel.address)}</div>` : ""}
            <div style="color:${MUTED};font-size:12px;margin-top:4px;">
              ${d.hotel.phone ? `${esc(d.hotel.phone)} &middot; ` : ""}<a href="mailto:${esc(d.hotel.email)}" style="color:${BRAND};">${esc(d.hotel.email)}</a>
            </div>
            <div style="color:#a8a29e;font-size:11px;margin-top:14px;line-height:1.5;">
              This is an automated confirmation for booking ${esc(d.bookingCode)}.<br>
              If you did not make this reservation, please contact us immediately.
            </div>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

module.exports = { buildHtml, buildText, buildSubject, formatDate, nightsBetween, money };
