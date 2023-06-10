const {
  createItAquatic,
  getItAquaticById,
  getItAquaticByItId,
  updateItAquatic,
  deleteItAquatic,
} = require("./itAquatic.service");

module.exports = {
  createItAquatic: (req, res) => {
    const body = req.body;
    createItAquatic(body, (err, results) => {
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
  getItAquaticById: (req, res) => {
    const id = req.body.it_aqua_id;
    getItAquaticById(id, (err, results) => {
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
          message: "Itinerary aquatic retreat not found.",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results[0],
      });
    });
  },
  getItAquaticByItId: (req, res) => {
    const id = req.body.it_id;
    getItAquaticByItId(id, (err, results) => {
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
  updateItAquatic: (req, res) => {
    const data = req.body;
    updateItAquatic(data, (err, results) => {
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
          message: "Itinerary aquatic retreat not found.",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Itinerary aquatic retreat updated successfully.",
      });
    });
  },
  deleteItAquatic: (req, res) => {
    const id = req.body.it_aqua_id;
    deleteItAquatic(id, (err, results) => {
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
          message: "Itinerary aquatic retreat not found.",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Itinerary aquatic retreat deleted successfully.",
      });
    });
  },
};
