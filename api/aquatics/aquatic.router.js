const express = require("express");
const {
  getAllAquatics,
  getAquaticById,
  getAquaticByDestId,
  getRecoAquatic,
} = require("./aquatic.controller");

const router = express.Router();

router.post("/all", getAllAquatics);
router.post("/get", getAquaticById);
router.post("/getByDest", getAquaticByDestId);
router.post("/recommended", getRecoAquatic);
module.exports = router;
