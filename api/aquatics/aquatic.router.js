const express = require("express");
const {
  getAllAquatics,
  getAquaticById,
  getAquaticByDestId,
} = require("./aquatic.controller");

const router = express.Router();

router.post("/all", getAllAquatics);
router.post("/get", getAquaticById);
router.post("/getByDest", getAquaticByDestId);
module.exports = router;
