const pool = require("../../config/database");

module.exports = {
  getAllAccommodations: (data, callback) => {
    pool.query(
      `
        SELECT *, ( 
          SELECT image_name FROM images 
          WHERE category = 'acco' AND category_id=a.acco_id
          LIMIT 1 
        ) as "image_name" 
        FROM accommodations a
      `,
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getAccommodationById: (id, callback) => {
    // SELECT * FROM accommodations WHERE acco_id=?;

    pool.query(
      // `
      // SELECT *, (
      //   SELECT image_name FROM images WHERE category = 'acco' AND category_id=? LIMIT 1
      //   ) as "image_name"
      // FROM accommodations WHERE acco_id=?
      // `
      `
        SELECT d.name, a.*, GROUP_CONCAT(i.image_name) as image_names 
        FROM accommodations a JOIN images i ON a.acco_id=i.category_id JOIN destinations d ON a.dest_id=d.dest_id
        WHERE i.category="acco" AND a.acco_id=?
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
  getAccommodationByDestId: (accoId, callback) => {
    pool.query(
      `
       SELECT *, ( 
          SELECT image_name FROM images 
          WHERE category = 'acco' AND category_id=a.acco_id
          LIMIT 1 
        ) as "image_name" 
        FROM accommodations a WHERE dest_id=?;
      `,
      [accoId],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getRecoAccommodation: (type, price_min, callback) => {
    pool.query(
      `
      SELECT t1.*, MAX(t3.image_name) as image_name 
      FROM (
        SELECT acco_id, name, description, price_min, price_max FROM accommodations WHERE type LIKE CONCAT('%', ?, '%')
        UNION 
        SELECT acco_id, name, description, price_min, price_max FROM accommodations WHERE price_min>=?
      ) AS t1
      LEFT JOIN ( 
      SELECT category_id, image_name FROM images i where category="acco" 
      ) AS t3 ON t1.acco_id = t3.category_id
      GROUP BY t1.acco_id, t1.name, t1.description, t1.price_min, t1.price_max

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
