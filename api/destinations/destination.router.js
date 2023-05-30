const express = require("express");
const {
  getAllDestinations,
  getDestinationById,
} = require("./destination.controller");ain

const router = express.Router();

router.post("/all", getAllDestinations);
router.post("/get", getDestinationById);

module.exports = router;
