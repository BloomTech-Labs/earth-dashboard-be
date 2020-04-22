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

module.exports = { queryMapData };
