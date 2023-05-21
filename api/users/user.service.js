const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `
      INSERT INTO users (email_address,password, fname, lname, bdate)
      VALUES (?, ?, ?, ?, ?);
      `,
      [data.email_address, data.password, data.fname, data.lname, data.bdate],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
