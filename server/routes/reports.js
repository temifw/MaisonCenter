// =====================================================================
// /api/reports — small dashboard aggregates for the admin home (staff).
// Kept intentionally simple with a few targeted queries.
// =====================================================================

const express = require("express");
const router = express.Router();
const { requireStaff } = require("../middleware/auth");

// GET /api/reports/dashboard
// Returns room counts by status plus today's arrivals/departures.
router.get("/dashboard", requireStaff, async (req, res, next) => {
  try {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const [rooms, arrivals, departures, inHouse] = await Promise.all([
      req.db.from("rooms").select("status").eq("is_active", true),
      req.db
        .from("bookings")
        .select("id", { count: "exact", head: true })
        .eq("check_in", today)
        .in("status", ["confirmed", "pending"]),
      req.db
        .from("bookings")
        .select("id", { count: "exact", head: true })
        .eq("check_out", today)
        .in("status", ["checked_in", "confirmed"]),
      req.db
        .from("bookings")
        .select("id", { count: "exact", head: true })
        .eq("status", "checked_in"),
    ]);

    if (rooms.error) throw rooms.error;

    // Tally room statuses in JS.
    const byStatus = { available: 0, occupied: 0, cleaning: 0, maintenance: 0 };
    for (const r of rooms.data) {
      if (byStatus[r.status] !== undefined) byStatus[r.status] += 1;
    }

    res.json({
      date: today,
      rooms: { total: rooms.data.length, byStatus },
      arrivalsToday: arrivals.count ?? 0,
      departuresToday: departures.count ?? 0,
      inHouse: inHouse.count ?? 0,
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
