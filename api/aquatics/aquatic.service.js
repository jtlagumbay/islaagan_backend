const pool = require("../../config/database");

module.exports = {
  getAllAquatics: (data, callback) => {
    pool.query(
      `
      SELECT * FROM aquatics;
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
      `
      SELECT * FROM aquatics WHERE aqua_id=?;
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
      SELECT * FROM aquatics WHERE aqua_id=?;
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
