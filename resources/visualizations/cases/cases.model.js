const db = require("../../../data/dbConfig");

const queryMapData = () =>
  db
    .raw(
      "SELECT lat, lon, cases::int, to_char(date, 'MM-dd-yy') as date " +
        'FROM "uscounties" ' +
        "WHERE EXISTS (SELECT lat, lon, cases, date WHERE cases > 0) " +
        "AND date > CURRENT_DATE - INTERVAL '120 days'" +
        "ORDER BY date ASC"
    )
    .then((queryResult) => queryResult.rows);

const queryByCountryData = () =>
  db("covidall")
    .where("confirmed", ">=", 90000)
    .andWhere("date", ">=", "2020-04-28 00:00:00");

module.exports = { queryMapData, queryByCountryData };
