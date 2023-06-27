const express = require("express");
const { checkToken } = require("../../middlewares/token_validation");
const {
  createItinerary,
  getItineraryById,
  getItinerariesByUserId,
  updateItinerary,
  deleteItinerary,
  getItineraryByIdShare,
} = require("./itinerary.controller");

const router = express.Router();

router.post("/create", checkToken, createItinerary);
router.post("/get", checkToken, getItineraryById);
router.post("/share/get", getItineraryByIdShare);
router.post("/getByUserId", checkToken, getItinerariesByUserId);
router.post("/update", checkToken, updateItinerary);
router.post("/delete", checkToken, deleteItinerary);

module.exports = router;
