const pool = require("../../config/database");

module.exports = {
  getAllDestinations: (data, callback) => {
    pool.query(
      `
        SELECT *, ( 
          SELECT image_name FROM images 
          WHERE category = 'dest' AND category_id=d.dest_id
          LIMIT 1 
        ) as "image_name" 
        FROM destinations d
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
      // `
      // SELECT *, (
      //   SELECT image_name FROM images WHERE category = 'dest' AND category_id=? LIMIT 1
      //   ) as "image_name"
      // FROM destinations WHERE dest_id=?
      // `
      `
        SELECT d.*, GROUP_CONCAT(i.image_name) as image_names 
        FROM destinations d JOIN images i ON d.dest_id=i.category_id 
        WHERE i.category="dest" AND d.dest_id=?
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
};
