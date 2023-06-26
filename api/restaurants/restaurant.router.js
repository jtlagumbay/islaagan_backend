const express = require("express");
const {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantByDestId,
  getRecoRestaurant,
} = require("./restaurant.controller");

const router = express.Router();

router.post("/all", getAllRestaurants);
router.post("/get", getRestaurantById);
router.post("/getByDest", getRestaurantByDestId);
router.post("/recommended", getRecoRestaurant);
module.exports = router;
