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
  getDestinationById: (id, callback) => {
    pool.query(
      `
      SELECT * FROM destinations WHERE dest_id=?;
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
