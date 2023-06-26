const express = require("express");
const {
  getAllAccommodations,
  getAccommodationById,
  getAccommodationByDestId,
  getRecoAccommodation,
} = require("./accommodation.controller");

const router = express.Router();

router.post("/all", getAllAccommodations);
router.post("/get", getAccommodationById);
router.post("/getByDest", getAccommodationByDestId);
router.post("/recommended", getRecoAccommodation);

module.exports = router;
