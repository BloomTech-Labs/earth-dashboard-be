const db = require("../../../data/dbConfig");

const querySummary = () =>
  db("summary")
    .select("country", "totalconfirmed as totalConfirmed")
    .where("totalconfirmed", ">", "0");

module.exports = { querySummary };
