const express = require("express");
const {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantByDestId,
} = require("./restaurant.controller");

const router = express.Router();

router.post("/all", getAllRestaurants);
router.post("/get", getRestaurantById);
router.post("/getByDest", getRestaurantByDestId);
module.exports = router;
