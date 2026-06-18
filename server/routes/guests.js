// =====================================================================
// /api/guests — the guest directory (staff only).
// =====================================================================

const express = require("express");
const router = express.Router();
const { requireStaff } = require("../middleware/auth");

// GET /api/guests?search=  -> directory, optionally filtered
router.get("/", requireStaff, async (req, res, next) => {
  try {
    const search = (req.query.search || "").trim();
    let q = req.db.from("guests").select("*").order("full_name");
    if (search) {
      q = q.or(
        `full_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`
      );
    }
    const { data, error } = await q;
    if (error) throw error;
    res.json(data);
  } catch (e) {
    next(e);
  }
});

// GET /api/guests/:id/bookings  -> one guest's stay history
router.get("/:id/bookings", requireStaff, async (req, res, next) => {
  try {
    const { data, error } = await req.db
      .from("bookings")
      .select("*, rooms(room_number, room_types(name))")
      .eq("guest_id", req.params.id)
      .order("check_in", { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
