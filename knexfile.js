require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DEV_DB_URL,
  },
};
