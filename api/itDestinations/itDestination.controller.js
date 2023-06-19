const {
  createItDestination,
  getItDestinationById,
  getItDestinationByItId,
  updateItDestination,
  deleteItDestination,
} = require("./itDestination.service");

module.exports = {
  createItDestination: (req, res) => {
    const body = req.body;
    createItDestination(body, (err, results) => {
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
  getItDestinationById: (req, res) => {
    const id = req.body.it_dest_id;
    getItDestinationById(id, (err, results) => {
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
        return res.status(400).json({
          success: 0,
          message: "Itinerary destination not found.",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results[0],
      });
    });
  },
  getItDestinationByItId: (req, res) => {
    const id = req.body.it_id;
    getItDestinationByItId(id, (err, results) => {
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
        return res.status(400).json({
          success: 0,
          message: "Itinerary not found.",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  updateItDestination: (req, res) => {
    const data = req.body;
    updateItDestination(data, (err, results) => {
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
          message: "Itinerary destination not found.",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Itinerary destination updated successfully.",
      });
    });
  },
  deleteItDestination: (req, res) => {
    const id = req.body.it_dest_id;
    deleteItDestination(id, (err, results) => {
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
          message: "Itinerary destination not found.",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Itinerary destination deleted successfully.",
      });
    });
  },
};
