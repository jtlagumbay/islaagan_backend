const { getImagesName } = require("../images/images.service");
const {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantByDestId,
  getRecoRestaurant,
} = require("./restaurant.service");

module.exports = {
  getAllRestaurants: (req, res) => {
    getAllRestaurants(req, (err, results) => {
      if (err) {
        console.error(err);
        if (err.errno == -4078) {
          return res.status(500).json({
            success: 0,
            error: "Database connection error",
          });
        } else
          return res.status(400).json({
            success: 0,
            error: err,
          });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getRestaurantById: (req, res) => {
    const id = req.body.rest_id;
    getRestaurantById(id, (err, results) => {
      if (err) {
        console.error(err);
        if (err.errno == -4078) {
          return res.status(500).json({
            success: 0,
            error: "Database connection error",
          });
        } else
          return res.status(400).json({
            success: 0,
            error: err,
          });
      }
      if (results.length < 1) {
        return res.status(400).json({
          success: 0,
          message: "Restaurant not found",
        });
      }

      results[0].image_names = results[0].image_names
        .split(",")
        .map((image) => image.trim());

      return res.status(200).json({
        success: 1,
        data: results[0],
      });
    });
  },
  getRestaurantByDestId: (req, res) => {
    const id = req.body.dest_id;
    getRestaurantByDestId(id, (err, results) => {
      if (err) {
        console.error(err);
        if (err.errno == -4078) {
          return res.status(500).json({
            success: 0,
            error: "Database connection error",
          });
        } else
          return res.status(400).json({
            success: 0,
            error: err,
          });
      }
      if (results.length < 1) {
        return res.status(400).json({
          success: 0,
          message: "No restaurant found in destination.",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getRecoRestaurant: (req, res) => {
    const type = req.body.type;
    const cuisine = req.body.cuisine;

    getRecoRestaurant(type, cuisine, (err, results) => {
      if (err) {
        console.error(err);
        if (err.errno == -4078) {
          return res.status(500).json({
            success: 0,
            error: "Database connection error",
          });
        } else
          return res.status(400).json({
            success: 0,
            error: err,
          });
      }
      console.log(results);
      if (results.length < 1) {
        return res.status(400).json({
          success: 0,
          message: "No recommended restaurants found.",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};
