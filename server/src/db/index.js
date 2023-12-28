require("dotenv").config();

const config = require("../constants");
const { Pool } = require("pg");

const pool = new Pool({
  user: config.DB_USER, // postgres user
  password: config.DB_PASSWORD, // postgres user password
  host: config.DB_HOST,
  port: config.DB_PORT, // postgres port
  // NOTE: database should not be included if we have not created a database yet
  database: config.DB_DATABASE, // After we have created a database, we can assign the postgres database name
});

module.exports = { query: (text, params) => pool.query(text, params) };
