const pool = require("../../config/database");
const moment = require("moment-timezone");

module.exports = {
  createItAquatic: (data, callback) => {
    const itAquatic = {
      it_id: data.it_id,
      aqua_id: data.aqua_id,
      notes: data.notes,
      start_datetime: data.start_datetime,
      end_datetime: data.end_datetime,
      added_on: new Date(),
    };
    pool.query(
      `INSERT INTO itAquatics SET ?`,
      itAquatic,
      (error, results, fields) => {
        if (error) {
          return callback(error, results);
        }
        return callback(null, results);
      }
    );
  },
  getItAquaticById: (id, callback) => {
    pool.query(
      `
      SELECT * FROM itAquatics WHERE it_aqua_id=? AND is_deleted=0;
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
  getItAquaticByItId: (id, callback) => {
    pool.query(
      `
      SELECT r.name, i.*
      FROM itAquatics i INNER JOIN aquatics r ON i.aqua_id=r.aqua_id
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
  updateItAquatic: (data, callback) => {
    const itAquatic = {
      notes: data.notes,
      start_datetime: data.start_datetime,
      end_datetime: data.end_datetime,
      updated_on: new Date(),
    };
    pool.query(
      `
      UPDATE itAquatics
      SET ?
      WHERE it_aqua_id=? AND is_deleted=0;
    `,
      [itAquatic, data.it_aqua_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  deleteItAquatic: (id, callback) => {
    const dateNow = new Date();
    pool.query(
      `
      UPDATE itAquatics
      SET is_deleted=1, deleted_on=?
      WHERE it_aqua_id=? AND is_deleted=0;
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
