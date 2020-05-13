const moment = require("moment");
const db = require("../../../data/dbConfig");

const today = moment().subtract(3, "days").format();
const pastday = moment().subtract(90, "days").format();

const queryByCountryData = () =>
  db("covidall")
    .distinctOn("country")
    .where("deaths", ">=", 5000)
    .whereBetween("date", [pastday, today]);

module.exports = { queryByCountryData };
