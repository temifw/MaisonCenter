// =====================================================================
// Mounts all route modules under /api (see server/index.js).
// =====================================================================

const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/rooms", require("./rooms"));
router.use("/bookings", require("./bookings"));
router.use("/guests", require("./guests"));
router.use("/reports", require("./reports"));

module.exports = router;
