#!/usr/bin/env node
// =====================================================================
// test-email.js — prove your SMTP setup works WITHOUT making a booking.
//
// Usage (from the project root):
//   node server/scripts/test-email.js you@example.com
//   node server/scripts/test-email.js you@example.com --preview
//
//   --preview   also writes email-preview.html so you can open the
//               rendered email in a browser.
//   --verify    only test the credentials, don't send anything.
//
// Exit code is 0 on success, 1 on failure — so CI can use it too.
// =====================================================================

require("dotenv").config({
  path: require("path").join(__dirname, "..", ".env"),
});

const fs = require("fs");
const path = require("path");
const { verifyTransport, buildEmailData, isConfigured, HOTEL, CURRENCY } = require("../lib/email");
const { buildHtml, buildText, buildSubject } = require("../lib/emailTemplate");
const nodemailer = require("nodemailer");

const args = process.argv.slice(2);
const recipient = args.find((a) => !a.startsWith("--"));
const wantPreview = args.includes("--preview");
const verifyOnly = args.includes("--verify");

// A realistic fake booking, shaped exactly like the create_booking RPC output.
const sampleBooking = {
  id: "00000000-0000-0000-0000-000000000000",
  booking_code: "MC-TESTCODE",
  room_id: "sample",
  check_in: "2026-09-14",
  check_out: "2026-09-17",
  status: "confirmed",
  guests_count: 2,
  total_price: 675.0,
  special_requests: "High floor if possible, and a late check-in around 10pm.",
};
const sampleRoom = { room_number: "204", room_types: { name: "Deluxe King Suite" } };

function line() {
  console.log("-".repeat(60));
}

async function main() {
  line();
  console.log("Maison Center — SMTP test");
  line();

  console.log(`Host    : ${process.env.SMTP_HOST || "(not set)"}`);
  console.log(`Port    : ${process.env.SMTP_PORT || "(not set)"}`);
  console.log(`User    : ${process.env.SMTP_USER || "(not set)"}`);
  console.log(`Pass    : ${process.env.SMTP_PASS ? "set (" + process.env.SMTP_PASS.length + " chars)" : "(not set)"}`);
  console.log(`From    : ${process.env.FROM_EMAIL || "(not set)"}`);
  line();

  if (!isConfigured) {
    console.error("FAIL: SMTP_HOST, SMTP_USER and SMTP_PASS must all be set in server/.env");
    console.error("      Copy server/.env.example to server/.env and fill them in.");
    process.exit(1);
  }

  const data = buildEmailData(sampleBooking, sampleRoom, "Alex Morgan", recipient || "guest@example.com");
  data.currency = CURRENCY;
  data.hotel = HOTEL;

  if (wantPreview) {
    const out = path.join(__dirname, "..", "..", "email-preview.html");
    fs.writeFileSync(out, buildHtml(data), "utf8");
    console.log(`Preview written to: ${out}`);
    console.log("Open it in a browser to check the design.\n");
  }

  // Step 1: can we connect and authenticate?
  process.stdout.write("Verifying credentials... ");
  try {
    await verifyTransport();
    console.log("OK\n");
  } catch (err) {
    console.log("FAILED\n");
    console.error(explain(err));
    process.exit(1);
  }

  if (verifyOnly) {
    console.log("Credentials are valid. (--verify: nothing sent.)");
    return;
  }

  if (!recipient) {
    console.log("No recipient given, so nothing was sent.");
    console.log("Run:  node server/scripts/test-email.js you@example.com");
    return;
  }

  // Step 2: actually send.
  process.stdout.write(`Sending test confirmation to ${recipient}... `);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === "true"
      : Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  try {
    const info = await transporter.sendMail({
      from: `"${process.env.FROM_NAME || "Maison Center"}" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
      to: recipient,
      subject: `[TEST] ${buildSubject(data)}`,
      text: buildText(data),
      html: buildHtml(data),
    });
    console.log("SENT");
    console.log(`Message ID: ${info.messageId}`);
    if (info.accepted?.length) console.log(`Accepted  : ${info.accepted.join(", ")}`);
    if (info.rejected?.length) console.log(`Rejected  : ${info.rejected.join(", ")}`);
    line();
    console.log("Check the inbox (and the spam folder — first sends often land there).");
  } catch (err) {
    console.log("FAILED\n");
    console.error(explain(err));
    process.exit(1);
  } finally {
    transporter.close();
  }
}

// Translate the cryptic SMTP errors into something actionable.
function explain(err) {
  const msg = err?.message || String(err);
  const code = err?.code || "";
  const hints = [];

  if (code === "EAUTH" || /535|authentication/i.test(msg)) {
    hints.push("- Wrong SMTP_USER or SMTP_PASS.");
    hints.push("- On Brevo, SMTP_USER is the login shown under SMTP & API > SMTP");
    hints.push("  (like 9a1b2c001@smtp-brevo.com), NOT your account email.");
    hints.push("- SMTP_PASS is the generated SMTP key (xsmtpsib-...), not your password.");
  }
  if (code === "ETIMEDOUT" || code === "ESOCKET" || code === "ECONNECTION") {
    hints.push("- Your network or host may block port 587. Try SMTP_PORT=2525.");
    hints.push("- If using port 465, set SMTP_SECURE=true. If 587, leave it false.");
  }
  if (/self.signed|certificate/i.test(msg)) {
    hints.push("- TLS certificate problem — check SMTP_HOST is spelled correctly.");
  }
  if (/sender|from.*not.*valid|unauthorized sender/i.test(msg)) {
    hints.push("- FROM_EMAIL must be a sender you verified in your provider dashboard.");
  }

  return `Error [${code}]: ${msg}\n${hints.length ? "\nLikely causes:\n" + hints.join("\n") : ""}`;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
