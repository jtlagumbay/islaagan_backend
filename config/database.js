const { createPool } = require("mysql2");

const pool = createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.MYSQL_DB,
  connectionLimit: 50,
  // ssl: {},
});

module.exports = pool;
