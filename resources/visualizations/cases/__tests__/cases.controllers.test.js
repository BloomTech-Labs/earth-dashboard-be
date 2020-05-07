const date = require("date-fns");
const request = require("supertest");
const db = require("../../../../data/dbConfig");
const testingUtils = require("../utils/testing");
const server = require("../../../../server/server");
const knex = require("../../../../data/dbConfig");

beforeAll(() => knex.migrate.latest().then(() => knex.seed.run()));

afterAll(() => knex.migrate.rollback().then(() => knex.destroy()));

beforeEach(() =>
  db.raw('TRUNCATE TABLE "uscounties" RESTART IDENTITY CASCADE')
);

describe("/cases", () => {
  describe("getVisualizationData", () => {
    it("should respond with 200 and the lat, lon, cases, and date for all records with more than 1 case within the last 120 days and an ordered set of dates", async () => {
      const filteredRecords = testingUtils.buildUsCountiesRecords(
        1,
        [1, 10000],
        [1, 110]
      );

      await testingUtils.insertIntoUsCounties(filteredRecords);

      return request(server)
        .get("/api/cases")
        .expect(200, {
          cases: filteredRecords.map((record) => ({
            cases: record.cases,
            date: date.format(record.date, "MM-dd-yy"),
            lat: record.lat,
            lon: record.lon,
          })),
          dates: [
            ...new Set(
              filteredRecords.map((day) => date.format(day.date, "MM-dd-yy"))
            ),
          ],
        });
    });
  });
});
