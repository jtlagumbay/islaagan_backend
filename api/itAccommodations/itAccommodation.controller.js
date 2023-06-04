const {
  createItAccommodation,
  getItAccommodationById,
  getItAccommodationByItId,
  updateItAccommodation,
  deleteItAccommodation,
} = require("./itAccommodation.service");

module.exports = {
  createItAccommodation: (req, res) => {
    const body = req.body;
    createItAccommodation(body, (err, results) => {
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
  getItAccommodationById: (req, res) => {
    const id = req.body.it_acco_id;
    getItAccommodationById(id, (err, results) => {
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
          message: "Itinerary accommodation not found.",
        });
      }
      return res.json({
        success: 1,
        data: results[0],
      });
    });
  },
  getItAccommodationByItId: (req, res) => {
    const id = req.body.it_id;
    getItAccommodationByItId(id, (err, results) => {
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
  updateItAccommodation: (req, res) => {
    const data = req.body;
    updateItAccommodation(data, (err, results) => {
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
          message: "Itinerary accommodation not found.",
        });
      }
      return res.json({
        success: 1,
        message: "Itinerary accommodation updated successfully.",
      });
    });
  },
  deleteItAccommodation: (req, res) => {
    const id = req.body.it_acco_id;
    deleteItAccommodation(id, (err, results) => {
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
          message: "Itinerary accommodation not found.",
        });
      }
      return res.json({
        success: 1,
        message: "Itinerary accommodation deleted successfully.",
      });
    });
  },
};
