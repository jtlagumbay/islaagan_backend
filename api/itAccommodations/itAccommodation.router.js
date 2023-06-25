const {
  createItAccommodation,
  getItAccommodationById,
  getItAccommodationByItId,
  updateItAccommodation,
  deleteItAccommodation,
} = require("./itAccommodation.controller");
const express = require("express");
const { checkToken } = require("../../middlewares/token_validation");

const router = express.Router();

router.post("/create", checkToken, createItAccommodation);
router.post("/get", checkToken, getItAccommodationById);
router.post("/getByItId", checkToken, getItAccommodationByItId);
router.post("/share/getByItId", getItAccommodationByItId);
router.post("/update", checkToken, updateItAccommodation);
router.post("/delete", checkToken, deleteItAccommodation);

module.exports = router;
