const {
  getAllDestinations,
  getDestinationById,
} = require("./destination.service");

module.exports = {
  getAllDestinations: (req, res) => {
    getAllDestinations(req, (err, results) => {
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

  getDestinationById: (req, res) => {
    const id = req.body.dest_id;
    getDestinationById(id, (err, results) => {
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
          message: "Destination not found",
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
};
