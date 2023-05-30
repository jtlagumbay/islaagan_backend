const { getAllDestinations } = require("./destination.service");
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
};
