const db = require("../../../data/dbConfig");

const queryMapData = () =>
  db
    .raw(
      'SELECT "Lat" as lat, "Lon" as lon, "Cases"::int as cases, "Date" as date ' +
        'FROM "USA Covid Daily Counts" ' +
        'WHERE EXISTS (SELECT "Lat", "Lon", "Cases", "Date" WHERE "Cases" > 0) ' +
        "ORDER BY date ASC"
    )
    .then((queryResult) => queryResult.rows);

module.exports = { queryMapData };
