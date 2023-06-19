const pool = require("../../config/database");

module.exports = {
  getAllAquatics: (data, callback) => {
    pool.query(
      `
        SELECT *, ( 
          SELECT image_name FROM images 
          WHERE category = 'aqua' AND category_id=a.aqua_id
          LIMIT 1 
        ) as "image_name" 
        FROM aquatics a
      `,
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getAquaticById: (id, callback) => {
    pool.query(
      // `
      // SELECT *, (
      //   SELECT image_name FROM images WHERE category = 'aqua' AND category_id=? LIMIT 1
      //   ) as "image_name"
      // FROM aquatics WHERE aqua_id=?
      // `
      `
        SELECT a.*, GROUP_CONCAT(i.image_name) as image_names 
        FROM aquatics a JOIN images i ON a.aqua_id=i.category_id 
        WHERE i.category="aqua" AND a.aqua_id=?
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
  getAquaticByDestId: (destId, callback) => {
    pool.query(
      `
        SELECT *, ( 
          SELECT image_name FROM images 
          WHERE category = 'aqua' AND category_id=a.aqua_id
          LIMIT 1 
        ) as "image_name" 
        FROM aquatics a WHERE aqua_id=?;
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
