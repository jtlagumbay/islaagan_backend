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
        SELECT d.name, a.*, GROUP_CONCAT(i.image_name) as image_names 
        FROM aquatics a JOIN images i ON a.aqua_id=i.category_id JOIN destinations d ON a.dest_id=d.dest_id
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
  getRecoAquatic: (type, price_min, callback) => {
    pool.query(
      `
      SELECT t1.*, MAX(t3.image_name) as image_name 
      FROM (
        SELECT aqua_id, name, description, type, entrance_fee FROM aquatics WHERE type LIKE CONCAT('%', ?, '%')
        UNION 
        SELECT aqua_id, name, description, type, entrance_fee FROM aquatics WHERE entrance_fee>=?
      ) AS t1
      LEFT JOIN ( 
      SELECT category_id, image_name FROM images i where category="aqua" 
      ) AS t3 ON t1.aqua_id = t3.category_id
      GROUP BY t1.aqua_id, t1.name, t1.description, t1.entrance_fee, t1.type

      ORDER by rand()  
      LIMIT 9
      ;
`,
      [type, price_min],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
