const pool = require("../../config/database");

module.exports = {
  getAllRestaurants: (data, callback) => {
    pool.query(
      `
        SELECT *, ( 
          SELECT image_name FROM images 
          WHERE category = 'rest' AND category_id=r.rest_id 
          LIMIT 1 
        ) as "image_name" 
        FROM restaurants r
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
      SELECT *, ( 
        SELECT image_name FROM images WHERE category = 'rest' AND category_id=? LIMIT 1 
        ) as "image_name" 
      FROM restaurants WHERE rest_id=?
      `,
      [id, id],
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
        SELECT *, ( 
          SELECT image_name FROM images 
          WHERE category = 'rest' AND category_id=r.rest_id 
          LIMIT 1 
        ) as "image_name" 
        FROM restaurants r 
        WHERE r.dest_id=?
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
