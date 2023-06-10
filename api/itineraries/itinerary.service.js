const pool = require("../../config/database");
const moment = require("moment-timezone");

module.exports = {
  createItinerary: (data, callback) => {
    const itinerary = {
      user_id: data.user_id,
      title: data.title,
      description: data.description,
      start_date: data.start_date,
      end_date: data.end_date,
      added_on: new Date(),
    };
    pool.query(
      `INSERT INTO itineraries SET ?`,
      itinerary,
      (error, results, fields) => {
        if (error) {
          return callback(error, results);
        }
        return callback(null, results);
      }
    );
  },
  getItineraryById: (id, callback) => {
    pool.query(
      `
      SELECT * FROM itineraries WHERE it_id=? AND is_deleted=0;
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        results = results.map((row) => {
          row.start_date = row.start_date
            ? row.start_date.toISOString().split("T")[0]
            : null;
          row.end_date = row.end_date
            ? row.end_date.toISOString().split("T")[0]
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
  getItinerariesByUserId: (id, callback) => {
    pool.query(
      `
      SELECT * FROM itineraries WHERE user_id=? AND is_deleted=0;
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        results = results.map((row) => {
          row.start_date = row.start_date
            ? row.start_date.toISOString().split("T")[0]
            : null;
          row.end_date = row.end_date
            ? row.end_date.toISOString().split("T")[0]
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
  updateItinerary: (data, callback) => {
    const itinerary = {
      title: data.title,
      description: data.description,
      start_date: data.start_date,
      end_date: data.end_date,
      updated_on: new Date(),
    };
    pool.query(
      `
        UPDATE itineraries
        SET ?
        WHERE it_id=? AND is_deleted=0;
      `,
      [itinerary, data.it_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  deleteItinerary: (id, callback) => {
    const dateNow = new Date();
    pool.query(
      `
      UPDATE itineraries
      SET is_deleted=1, deleted_on=?
      WHERE it_id=? AND is_deleted=0;
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
