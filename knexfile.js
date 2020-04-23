require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DEV_DB_URL,
  },

  production: {
    client: "pg",
    connection: process.env.PROD_DB_URL,
  },
};
