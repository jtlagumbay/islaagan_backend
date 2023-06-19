const pool = require("../../config/database");
const moment = require("moment-timezone");

module.exports = {
  createItDestination: (data, callback) => {
    const itDestination = {
      it_id: data.it_id,
      dest_id: data.dest_id,
      notes: data.notes,
      start_datetime: data.start_datetime,
      end_datetime: data.end_datetime,
      added_on: new Date(),
    };
    pool.query(
      `INSERT INTO itDestinations SET ?`,
      itDestination,
      (error, results, fields) => {
        if (error) {
          return callback(error, results);
        }
        return callback(null, results);
      }
    );
  },
  getItDestinationById: (id, callback) => {
    pool.query(
      `
      SELECT * FROM itDestinations WHERE it_dest_id=? AND is_deleted=0;
      `,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        results = results.map((row) => {
          row.start_datetime = row.start_datetime
            ? moment
                .utc(row.start_datetime)
                .local()
                .format("YYYY-MM-DD HH:mm:ss")
            : null;
          row.end_datetime = row.end_datetime
            ? moment.utc(row.end_datetime).local().format("YYYY-MM-DD HH:mm:ss")
            : null;
          row.added_on = row.added_on
            ? moment.utc(row.added_on).local().format("YYYY-MM-DD HH:mm:ss")
            : null;
          row.updated_on = row.updated_on
            ? moment.utc(row.updated_on).local().format("YYYY-MM-DD HH:mm:ss")
            : null;
          row.deleted_on = row.deleted_on
            ? moment.utc(row.deleted_on).local().format("YYYY-MM-DD HH:mm:ss")
            : null;
          return row;
        });
        return callback(null, results);
      }
    );
  },
  getItDestinationByItId: (id, callback) => {
    pool.query(
      `
      SELECT d.name, i.*
      FROM itDestinations i INNER JOIN destinations d ON i.dest_id=d.dest_id
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
            ? moment
                .utc(row.start_datetime)
                .local()
                .format("YYYY-MM-DD HH:mm:ss")
            : null;
          row.end_datetime = row.end_datetime
            ? moment.utc(row.end_datetime).local().format("YYYY-MM-DD HH:mm:ss")
            : null;
          row.added_on = row.added_on
            ? moment.utc(row.added_on).local().format("YYYY-MM-DD HH:mm:ss")
            : null;
          row.updated_on = row.updated_on
            ? moment.utc(row.updated_on).local().format("YYYY-MM-DD HH:mm:ss")
            : null;
          row.deleted_on = row.deleted_on
            ? moment.utc(row.deleted_on).local().format("YYYY-MM-DD HH:mm:ss")
            : null;
          return row;
        });
        return callback(null, results);
      }
    );
  },
  updateItDestination: (data, callback) => {
    const itDestination = {
      notes: data.notes,
      start_datetime: data.start_datetime,
      end_datetime: data.end_datetime,
      updated_on: new Date(),
    };
    pool.query(
      `
      UPDATE itDestinations
      SET ?
      WHERE it_dest_id=? AND is_deleted=0;
    `,
      [itDestination, data.it_dest_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  deleteItDestination: (id, callback) => {
    const dateNow = new Date();
    pool.query(
      `
      UPDATE itDestinations
      SET is_deleted=1, deleted_on=?
      WHERE it_dest_id=? AND is_deleted=0;
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
