const express = require("express");
const { getImage, getAllDestinations } = require("./destination.controller");

const router = express.Router();

router.post("/all", getAllDestinations);

module.exports = router;
