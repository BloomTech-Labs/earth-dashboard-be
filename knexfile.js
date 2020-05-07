require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: process.env.PROD_DB_URL,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  testing: {
    client: "pg",
    connection: {
      host: process.env.TEST_DB_HOST,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASS,
      database: process.env.TEST_DB_NAME,
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  staging: {
    client: "pg",
    connection: process.env.STAGING_DB_URL,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  production: {
    client: "pg",
    connection: process.env.PROD_DB_URL,
  },
};
