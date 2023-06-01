const {
  createItinerary,
  getItineraryById,
  getItinerariesByUserId,
  updateItinerary,
  deleteItinerary,
} = require("./itinerary.service");

module.exports = {
  createItinerary: (req, res) => {
    const body = req.body;
    createItinerary(body, (err, results) => {
      if (err) {
        // console.error(esrr);
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
  getItineraryById: (req, res) => {
    const id = req.body.it_id;
    console.log(req.body);
    getItineraryById(id, (err, results) => {
      console.log(results);
      if (err) {
        console.log(err);
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
          message: "Itinerary not found",
        });
      }
      return res.json({
        success: 1,
        data: results[0],
      });
    });
  },
  getItinerariesByUserId: (req, res) => {
    const id = req.body.user_id;
    getItinerariesByUserId(id, (err, results) => {
      // console.log(results);
      if (err) {
        // console.log(err);
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
          message: "Itineraries not found",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  updateItinerary: (req, res) => {
    const data = req.body;
    updateItinerary(data, (err, results) => {
      // console.log(results);
      if (err) {
        // console.log(err);
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
        // console.error(err);
        return res.status(400).json({
          success: 0,
          message: "Itinerary not found.",
        });
      }
      return res.json({
        success: 1,
        message: "Itinerary updated successfully.",
      });
    });
  },
  deleteItinerary: (req, res) => {
    const id = req.body.it_id;
    deleteItinerary(id, (err, results) => {
      // console.log(results);
      if (err) {
        // console.log(err);
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
          message: "Itinerary not found.",
        });
      }
      return res.json({
        success: 1,
        message: "Itinerary deleted successfully.",
      });
    });
  },
};
