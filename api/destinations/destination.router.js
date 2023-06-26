const express = require("express");
const {
  getAllDestinations,
  getDestinationById,
  getTop5,
} = require("./destination.controller");

const router = express.Router();

router.post("/all", getAllDestinations);
router.post("/get", getDestinationById);
router.post("/popular", getTop5);

module.exports = router;
