const date = require("date-fns");
const db = require("../../../../data/dbConfig");
const testingUtils = require("../utils/testing");
const model = require("../cases.model");
const knex = require("../../../../data/dbConfig");

beforeAll(() => knex.migrate.latest().then(() => knex.seed.run()));

afterAll(() => knex.migrate.rollback().then(() => knex.destroy()));

beforeEach(() =>
  db.raw('TRUNCATE TABLE "uscounties" RESTART IDENTITY CASCADE')
);

describe("cases model", () => {
  describe("queryMapData", () => {
    it("should return the lat, lon, cases, and date for all records with more than 1 case within the last 120 days", async () => {
      const filteredRecords = testingUtils.buildUsCountiesRecords(
        50,
        [1, 10000],
        [1, 110]
      );
      const oldRecords = testingUtils.buildUsCountiesRecords(
        50,
        [0, 10000],
        [150, 480]
      );
      const noCaseRecords = testingUtils.buildUsCountiesRecords(
        50,
        [0, 0],
        [1, 210]
      );

      await testingUtils.insertIntoUsCounties(filteredRecords);
      await testingUtils.insertIntoUsCounties(oldRecords);
      await testingUtils.insertIntoUsCounties(noCaseRecords);

      const dbResponse = await model.queryMapData();
      expect(dbResponse).toHaveLength(50);
      expect(dbResponse).toEqual(
        expect.arrayContaining(
          filteredRecords.map((record) => ({
            cases: record.cases,
            date: date.format(record.date, "MM-dd-yy"),
            lat: record.lat,
            lon: record.lon,
          }))
        )
      );
    });
  });
});
