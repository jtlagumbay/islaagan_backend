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
          return callback(error, results);
        }
        return callback(null, results);
      }
    );
  },
  getUserById: (id, callback) => {
    pool.query(
      `
      SELECT * FROM users WHERE user_id=?;
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        console.log(results);
        results = results.map((row) => {
          row.bdate = row.bdate.toISOString().split("T")[0];
          return row;
        });
        return callback(null, results);
      }
    );
  },
  updateUserById: (data, callback) => {
    pool.query(
      `
      UPDATE users
      SET email_address=?, password=?, fname=?, lname=?, bdate=?
      WHERE user_id=?;
      `,
      [
        data.email_address,
        data.password,
        data.fname,
        data.lname,
        data.bdate,
        data.user_id,
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  deleteUserById: (id, callback) => {
    pool.query(
      `
      DELETE FROM users where user_id=?;
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
