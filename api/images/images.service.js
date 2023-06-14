const pool = require("../../config/database");

module.exports = {
  getImagesName: (category, id, callback) => {
    pool.query(
      `SELECT image_name FROM images WHERE category=? AND category_id=?`,
      [category, id],
      (error, results, fields) => {
        if (error) {
          return callback(error, results);
        }
        if (results) {
          return callback(null, results);
        }
      }
    );
  },
};
