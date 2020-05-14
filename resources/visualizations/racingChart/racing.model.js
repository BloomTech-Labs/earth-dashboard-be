const db = require("../../../data/dbConfig");

const queryByCountryData = () =>
  db
    .raw(
      "SELECT ranked_countries.country, ranked_countries.date, sum(ranked_countries.deaths) AS deaths " +
        "FROM (SELECT covidall.country, covidall.date, covidall.deaths, " +
        "rank() OVER (PARTITION BY covidall.date ORDER BY covidall.deaths DESC) FROM covidall " +
        "WHERE province = '' OR country = 'China') " +
        "ranked_countries WHERE rank <=20 AND deaths > 0 " +
        "GROUP BY ranked_countries.date, ranked_countries.country " +
        "ORDER BY ranked_countries.date"
    )
    .then((queryResult) => queryResult.rows);

module.exports = { queryByCountryData };
