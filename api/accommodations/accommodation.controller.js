const {
  getAllAccommodations,
  getAccommodationById,
  getAccommodationByDestId,
  getRecoAccommodation,
} = require("./accommodation.service");

module.exports = {
  getAllAccommodations: (req, res) => {
    getAllAccommodations(req, (err, results) => {
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
  getAccommodationById: (req, res) => {
    const id = req.body.acco_id;
    getAccommodationById(id, (err, results) => {
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
          message: "Accommodation not found",
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
  getAccommodationByDestId: (req, res) => {
    const id = req.body.dest_id;
    getAccommodationByDestId(id, (err, results) => {
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
          message: "No accommodation found in destination.",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getRecoAccommodation: (req, res) => {
    const type = req.body.type;
    const price_min = req.body.price_min;

    getRecoAccommodation(type, price_min, (err, results) => {
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
          message: "No recommended accommodation found.",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};
