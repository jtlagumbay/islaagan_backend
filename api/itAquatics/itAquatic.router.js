const {
  createItAquatic,
  getItAquaticById,
  getItAquaticByItId,
  updateItAquatic,
  deleteItAquatic,
} = require("./itAquatic.controller");
const express = require("express");
const { checkToken } = require("../../middlewares/token_validation");

const router = express.Router();

router.post("/create", checkToken, createItAquatic);
router.post("/get", checkToken, getItAquaticById);
router.post("/getByItId", checkToken, getItAquaticByItId);
router.post("/update", checkToken, updateItAquatic);
router.post("/delete", checkToken, deleteItAquatic);

module.exports = router;
