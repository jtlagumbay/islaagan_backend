const {
  createItDestination,
  getItDestinationById,
  getItDestinationByItId,
  updateItDestination,
  deleteItDestination,
} = require("./itDestination.controller");
const express = require("express");
const { checkToken } = require("../../middlewares/token_validation");

const router = express.Router();

router.post("/create", checkToken, createItDestination);
router.post("/get", checkToken, getItDestinationById);
router.post("/getByItId", checkToken, getItDestinationByItId);
router.post("/update", checkToken, updateItDestination);
router.post("/delete", checkToken, deleteItDestination);

module.exports = router;
