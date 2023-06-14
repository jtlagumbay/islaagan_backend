const pool = require("../../config/database");

module.exports = {
  getAllAccommodations: (data, callback) => {
    pool.query(
      `
        SELECT *, ( 
          SELECT image_name FROM images 
          WHERE category = 'acco' AND category_id=a.acco_id
          LIMIT 1 
        ) as "image_name" 
        FROM accommodations a
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
    // SELECT * FROM accommodations WHERE acco_id=?;

    pool.query(
      `
      SELECT *, ( 
        SELECT image_name FROM images WHERE category = 'acco' AND category_id=? LIMIT 1 
        ) as "image_name" 
      FROM accommodations WHERE acco_id=?
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
  getAccommodationByDestId: (accoId, callback) => {
    pool.query(
      `
       SELECT *, ( 
          SELECT image_name FROM images 
          WHERE category = 'acco' AND category_id=a.acco_id
          LIMIT 1 
        ) as "image_name" 
        FROM accommodations a WHERE dest_id=?;
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
