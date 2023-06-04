const {
  createItRestaurant,
  getItRestaurantById,
  getItRestaurantByItId,
  updateItRestaurant,
  deleteItRestaurant,
} = require("./itRestaurant.service");

module.exports = {
  createItRestaurant: (req, res) => {
    const body = req.body;
    createItRestaurant(body, (err, results) => {
      if (err) {
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
  getItRestaurantById: (req, res) => {
    const id = req.body.it_rest_id;
    getItRestaurantById(id, (err, results) => {
      if (err) {
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
        return res.json({
          success: 0,
          message: "Itinerary restaurant not found.",
        });
      }
      return res.json({
        success: 1,
        data: results[0],
      });
    });
  },
  getItRestaurantByItId: (req, res) => {
    const id = req.body.it_id;
    getItRestaurantByItId(id, (err, results) => {
      if (err) {
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
        return res.json({
          success: 0,
          message: "Itinerary not found.",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  updateItRestaurant: (req, res) => {
    const data = req.body;
    updateItRestaurant(data, (err, results) => {
      if (err) {
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
      if (results.affectedRows != 1) {
        return res.status(400).json({
          success: 0,
          message: "Itinerary restaurant not found.",
        });
      }
      return res.json({
        success: 1,
        message: "Itinerary restaurant updated successfully.",
      });
    });
  },
  deleteItRestaurant: (req, res) => {
    const id = req.body.it_rest_id;
    deleteItRestaurant(id, (err, results) => {
      if (err) {
        if (err.errno == -4078) {
          return res.status(500).json({
            success: 0,
            error: "Database connection error.",
          });
        } else
          return res.status(400).json({
            success: 0,
            error: err,
          });
      }
      if (results.affectedRows != 1) {
        return res.status(400).json({
          success: 0,
          message: "Itinerary restaurant not found.",
        });
      }
      return res.json({
        success: 1,
        message: "Itinerary restaurant deleted successfully.",
      });
    });
  },
};
