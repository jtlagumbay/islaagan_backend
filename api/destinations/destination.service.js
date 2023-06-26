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
  getTop5: (callback) => {
    pool.query(
      `
      SELECT t2.*, min(t3.image_name) as image_name
      FROM (
        SELECT it_id FROM itAccommodations
        UNION SELECT it_id FROM itAquatics
        UNION SELECT it_id FROM itDestinations
        UNION SELECT it_id FROM itRestaurants
      ) AS t1
      JOIN destinations AS t2 ON t1.it_id = t2.dest_id
      left JOIN ( 
        SELECT category_id, image_name FROM images i where category="dest" 
      ) AS t3 ON t1.it_id = t3.category_id
      GROUP BY it_id
      ORDER BY t1.it_id DESC
      LIMIT 5
      ;
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
