const testingUtils = require("../../resources/visualizations/cases/utils/testing");

// Populate the database with 250 records that may or may not fit the criteria required by our SQL query
exports.seed = (knex) =>
  knex("uscounties").insert(
    testingUtils.buildUsCountiesRecords(250, [0, 10000], [1, 210])
  );
