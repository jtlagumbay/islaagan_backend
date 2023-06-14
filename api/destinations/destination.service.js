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
      `
      SELECT *, ( 
        SELECT image_name FROM images WHERE category = 'dest' AND category_id=? LIMIT 1 
        ) as "image_name" 
      FROM destinations WHERE dest_id=?
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
};
