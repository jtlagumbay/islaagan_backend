const express = require("express");
const {
  getAllAccommodations,
  getAccommodationById,
  getAccommodationByDestId,
} = require("./accommodation.controller");

const router = express.Router();

router.post("/all", getAllAccommodations);
router.post("/get", getAccommodationById);
router.post("/getByDest", getAccommodationByDestId);

module.exports = router;
