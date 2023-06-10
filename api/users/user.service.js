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
      SELECT * FROM users WHERE user_id=? AND is_deleted=0;
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
  getUserNamesById: (id, callback) => {
    pool.query(
      `
      SELECT fname, lname FROM users WHERE user_id=? AND is_deleted=0;
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
  getUserByEmail: (email, callback) => {
    pool.query(
      `
      SELECT * FROM users WHERE email_address=? AND is_deleted=0;
      `,
      [email],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        // console.log(results);
        results = results.map((row) => {
          row.bdate = row.bdate.toISOString().split("T")[0];
          return row;
        });
        return callback(null, results[0]);
      }
    );
  },
  updateUserById: (data, withPassword, callback) => {
    const details = withPassword
      ? [
          data.email_address,
          data.password,
          data.fname,
          data.lname,
          data.bdate,
          data.user_id,
        ]
      : [data.email_address, data.fname, data.lname, data.bdate, data.user_id];
    const query = withPassword
      ? `UPDATE users
      SET email_address=?,password=?
      , fname=?, lname=?, bdate=?
      WHERE user_id=? AND is_deleted=0;`
      : `UPDATE users
      SET email_address=?, fname=?, lname=?, bdate=?
      WHERE user_id=? AND is_deleted=0;`;

    pool.query(query, details, (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },
  deleteUserById: (id, callback) => {
    const dateNow = new Date();
    pool.query(
      `
      UPDATE users
      SET is_deleted=1, deleted_on=?
      WHERE user_id=?      `,
      [dateNow, id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
