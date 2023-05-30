const pool = require("../../config/database");

module.exports = {
  getAllDestinations: (data, callback) => {
    pool.query(
      `
      SELECT * FROM destinations;
      `,
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
