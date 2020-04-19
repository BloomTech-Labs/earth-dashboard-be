const db = require("../../../data/dbConfig");

const queryMapData = () =>
  db
    .raw(
      'SELECT ARRAY_AGG("Lat") as lat, ARRAY_AGG("Lon") as lon, ARRAY_AGG("Cases") as z ' +
        'FROM "USA Covid Daily Counts"'
    )
    .then((queryResult) => queryResult.rows);

const queryDataByDate = () =>
  db
    .raw(
      'SELECT "Date" as date, ARRAY_AGG("Lat") as lat, ARRAY_AGG("Lon") as lon, ARRAY_AGG("Cases") as z ' +
        'FROM "USA Covid Daily Counts" ' +
        'GROUP BY "Date"'
    )
    .then((queryResult) => queryResult.rows);

module.exports = { queryMapData, queryDataByDate };
