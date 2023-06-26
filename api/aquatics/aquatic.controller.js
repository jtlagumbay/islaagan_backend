const {
  getAllAquatics,
  getAquaticById,
  getAquaticByDestId,
  getRecoAquatic,
} = require("./aquatic.service");

module.exports = {
  getAllAquatics: (req, res) => {
    getAllAquatics(req, (err, results) => {
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
  getAquaticById: (req, res) => {
    const id = req.body.aqua_id;
    getAquaticById(id, (err, results) => {
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
          message: "Aquatic retreat not found",
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
  getAquaticByDestId: (req, res) => {
    const id = req.body.dest_id;
    getAquaticByDestId(id, (err, results) => {
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
          message: "No aquatic retreats found in destination.",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getRecoAquatic: (req, res) => {
    const type = req.body.type;
    const entrance_fee = req.body.entrance_fee;

    getRecoAquatic(type, entrance_fee, (err, results) => {
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
