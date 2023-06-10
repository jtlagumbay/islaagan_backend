const pool = require("../../config/database");
const moment = require("moment-timezone");

module.exports = {
  createItRestaurant: (data, callback) => {
    const itRestaurant = {
      it_id: data.it_id,
      rest_id: data.rest_id,
      notes: data.notes,
      start_datetime: data.start_datetime,
      end_datetime: data.end_datetime,
      added_on: new Date(),
    };
    pool.query(
      `INSERT INTO itRestaurants SET ?`,
      itRestaurant,
      (error, results, fields) => {
        if (error) {
          return callback(error, results);
        }
        return callback(null, results);
      }
    );
  },
  getItRestaurantById: (id, callback) => {
    pool.query(
      `
      SELECT * FROM itRestaurants WHERE it_rest_id=? AND is_deleted=0;
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        results = results.map((row) => {
          row.start_datetime = row.start_datetime
            ? moment(row.start_datetime)
                .tz("Asia/Manila")
                .format("YYYY-MM-DD HH:mm:ss")
            : null;
          row.end_datetime = row.end_datetime
            ? moment(row.end_datetime)
                .tz("Asia/Manila")
                .format("YYYY-MM-DD HH:mm:ss")
            : null;
          row.added_on = row.added_on
            ? moment(row.added_on)
                .tz("Asia/Manila")
                .format("YYYY-MM-DD HH:mm:ss")
            : null;
          row.updated_on = row.updated_on
            ? moment(row.updated_on)
                .tz("Asia/Manila")
                .format("YYYY-MM-DD HH:mm:ss")
            : null;
          row.deleted_on = row.deleted_on
            ? moment(row.deleted_on)
                .tz("Asia/Manila")
                .format("YYYY-MM-DD HH:mm:ss")
            : null;
          return row;
        });
        return callback(null, results);
      }
    );
  },
  getItRestaurantByItId: (id, callback) => {
    pool.query(
      `
      SELECT r.name, i.*
      FROM itRestaurants i INNER JOIN restaurants r ON i.rest_id=r.rest_id
          WHERE it_id=? AND i.is_deleted=0
          ORDER BY start_datetime
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        results = results.map((row) => {
          row.start_datetime = row.start_datetime
            ? moment(row.start_datetime)
                .tz("Asia/Manila")
                .format("YYYY-MM-DD HH:mm:ss")
            : null;
          row.end_datetime = row.end_datetime
            ? moment(row.end_datetime)
                .tz("Asia/Manila")
                .format("YYYY-MM-DD HH:mm:ss")
            : null;
          row.added_on = row.added_on
            ? moment(row.added_on)
                .tz("Asia/Manila")
                .format("YYYY-MM-DD HH:mm:ss")
            : null;
          row.updated_on = row.updated_on
            ? moment(row.updated_on)
                .tz("Asia/Manila")
                .format("YYYY-MM-DD HH:mm:ss")
            : null;
          row.deleted_on = row.deleted_on
            ? moment(row.deleted_on)
                .tz("Asia/Manila")
                .format("YYYY-MM-DD HH:mm:ss")
            : null;
          return row;
        });
        return callback(null, results);
      }
    );
  },
  updateItRestaurant: (data, callback) => {
    const itRestaurant = {
      notes: data.notes,
      start_datetime: data.start_datetime,
      end_datetime: data.end_datetime,
      updated_on: new Date(),
    };
    pool.query(
      `
      UPDATE itRestaurants
      SET ?
      WHERE it_rest_id=? AND is_deleted=0;
    `,
      [itRestaurant, data.it_rest_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  deleteItRestaurant: (id, callback) => {
    const dateNow = new Date();
    pool.query(
      `
      UPDATE itRestaurants
      SET is_deleted=1, deleted_on=?
      WHERE it_rest_id=? AND is_deleted=0;
      `,
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
