// =====================================================================
// /api/rooms — room types, live rooms, availability, and staff admin.
// Reads are public (RLS only exposes active rows). Writes require staff
// and go through the SECURITY DEFINER RPCs where concurrency/soft-delete
// matter.
// =====================================================================

const express = require("express");
const router = express.Router();
const { requireStaff } = require("../middleware/auth");

// GET /api/rooms/types  -> bookable room categories (public)
router.get("/types", async (req, res, next) => {
  try {
    const { data, error } = await req.db
      .from("room_types")
      .select("*")
      .eq("is_active", true)
      .order("base_price");
    if (error) throw error;
    res.json(data);
  } catch (e) {
    next(e);
  }
});

// GET /api/rooms/availability?roomTypeId=&checkIn=&checkOut=  (public)
// Returns free rooms of a type for [checkIn, checkOut).
router.get("/availability", async (req, res, next) => {
  try {
    const { roomTypeId, checkIn, checkOut } = req.query;
    if (!roomTypeId || !checkIn || !checkOut) {
      return res
        .status(400)
        .json({ error: "roomTypeId, checkIn and checkOut are required" });
    }
    const { data, error } = await req.db.rpc("check_availability", {
      p_room_type_id: roomTypeId,
      p_check_in: checkIn,
      p_check_out: checkOut,
    });
    if (error) throw error;
    res.json(data);
  } catch (e) {
    next(e);
  }
});

// GET /api/rooms  -> all active rooms with type info
// Public sees active rooms; staff (via RLS) also see inactive ones.
router.get("/", async (req, res, next) => {
  try {
    const { data, error } = await req.db
      .from("rooms")
      .select("*, room_types(*)")
      .order("room_number");
    if (error) throw error;
    res.json(data);
  } catch (e) {
    next(e);
  }
});

// POST /api/rooms  (staff)  -> add a room
router.post("/", requireStaff, async (req, res, next) => {
  try {
    const { roomNumber, roomTypeId, floor, notes } = req.body;
    const { data, error } = await req.db
      .from("rooms")
      .insert({
        room_number: roomNumber,
        room_type_id: roomTypeId,
        floor,
        notes,
      })
      .select("*, room_types(*)")
      .single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (e) {
    next(e);
  }
});

// PUT /api/rooms/:id  (staff)  -> update fields and/or status
// Pass { status } to change availability state (uses set_room_status RPC),
// and/or any of roomNumber/roomTypeId/floor/notes for a plain update.
router.put("/:id", requireStaff, async (req, res, next) => {
  try {
    const { status, roomNumber, roomTypeId, floor, notes } = req.body;

    if (status) {
      const { error } = await req.db.rpc("set_room_status", {
        p_room_id: req.params.id,
        p_status: status,
      });
      if (error) throw error;
    }

    const fields = {};
    if (roomNumber !== undefined) fields.room_number = roomNumber;
    if (roomTypeId !== undefined) fields.room_type_id = roomTypeId;
    if (floor !== undefined) fields.floor = floor;
    if (notes !== undefined) fields.notes = notes;

    if (Object.keys(fields).length) {
      const { error } = await req.db
        .from("rooms")
        .update(fields)
        .eq("id", req.params.id);
      if (error) throw error;
    }

    const { data, error } = await req.db
      .from("rooms")
      .select("*, room_types(*)")
      .eq("id", req.params.id)
      .single();
    if (error) throw error;
    res.json(data);
  } catch (e) {
    next(e);
  }
});

// DELETE /api/rooms/:id  (staff)  -> soft delete (keeps history)
router.delete("/:id", requireStaff, async (req, res, next) => {
  try {
    const { error } = await req.db.rpc("remove_room", {
      p_room_id: req.params.id,
    });
    if (error) throw error;
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
