const pool = require("../../config/database");

module.exports = {
  getAllAccommodations: (data, callback) => {
    pool.query(
      `
      SELECT * FROM accommodations;
      `,
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getAccommodationById: (id, callback) => {
    pool.query(
      `
      SELECT * FROM accommodations WHERE acco_id=?;
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
  getAccommodationByDestId: (accoId, callback) => {
    pool.query(
      `
      SELECT * FROM accommodations WHERE dest_id=?;
      `,
      [accoId],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
