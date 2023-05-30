const pool = require("../../config/database");

module.exports = {
  getAllRestaurants: (data, callback) => {
    pool.query(
      `
      SELECT * FROM restaurants;
      `,
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getRestaurantById: (id, callback) => {
    pool.query(
      `
      SELECT * FROM restaurants WHERE rest_id=?;
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
  getRestaurantByDestId: (destId, callback) => {
    pool.query(
      `
      SELECT * FROM restaurants WHERE dest_id=?;
      `,
      [destId],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
