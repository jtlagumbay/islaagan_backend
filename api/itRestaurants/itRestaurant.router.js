const {
  createItRestaurant,
  getItRestaurantById,
  getItRestaurantByItId,
  updateItRestaurant,
  deleteItRestaurant,
} = require("./itRestaurant.controller");
const express = require("express");
const { checkToken } = require("../../middlewares/token_validation");

const router = express.Router();

router.post("/create", checkToken, createItRestaurant);
router.post("/get", checkToken, getItRestaurantById);
router.post("/getByItId", checkToken, getItRestaurantByItId);
router.post("/share/getByItId", getItRestaurantByItId);
router.post("/update", checkToken, updateItRestaurant);
router.post("/delete", checkToken, deleteItRestaurant);

module.exports = router;
