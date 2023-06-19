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
      // `
      // SELECT *, (
      //   SELECT image_name FROM images WHERE category = 'rest' AND category_id=? LIMIT 1
      //   ) as "image_name"
      // FROM restaurants WHERE rest_id=?
      // `
      `
        SELECT r.*, GROUP_CONCAT(i.image_name) as image_names 
        FROM restaurants r JOIN images i ON r.rest_id=i.category_id 
        WHERE i.category="rest" AND r.rest_id=?
        GROUP BY i.category_id

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
