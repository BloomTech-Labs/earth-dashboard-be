const db = require("../../../data/dbConfig");

/*
 * The DB has over 50 MB of data that needs to be retrieved on each request. The DB is much better at aggregating
 * data than Node so raw SQL queries are being used to aggregate the longitude, latitude, and cases arrays together
 * and also group them by date. This shoudld be faster than trying to map over them in Node. Knex does not have
 * an implementation of ARRAY_AGG so we have to drop down to a raw SQL query to do this.
 */

/*
 * Knex.raw() returns more than just data so we need to pull the rows array out of the response before sending back
 * to the controller.
 */

const queryMapData = () =>
  db
    .raw(
      'SELECT ARRAY_AGG("Lat") as lat, ARRAY_AGG("Lon") as lon, ARRAY_AGG("Cases")::int[] as z ' +
        'FROM "USA Covid Daily Counts"'
    )
    .then((queryResult) => queryResult.rows);

const queryDataByDate = () =>
  db
    .raw(
      'SELECT "Date" as date, ARRAY_AGG("Lat") as lat, ARRAY_AGG("Lon") as lon, ARRAY_AGG("Cases")::int[] as z ' +
        'FROM "USA Covid Daily Counts" ' +
        'GROUP BY "Date"'
    )
    .then((queryResult) => queryResult.rows);

module.exports = { queryMapData, queryDataByDate };
