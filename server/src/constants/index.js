const { config } = require("dotenv");
config();

module.exports = {
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_DATABASE: process.env.DB_DATABASE,
  BASE_CLIENT_URL: process.env.BASE_CLIENT_URL,
  BASE_SERVER_URL: process.env.BASE_SERVER_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  SERVER_PORT: process.env.SERVER_PORT,
};
