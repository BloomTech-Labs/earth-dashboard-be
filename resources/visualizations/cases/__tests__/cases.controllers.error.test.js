/*
 * The test for errors is broken out into a separate file because we need to mock the queryMapData function
 * for the error but not when testing a successful call. If we mock the function in the beginning of the
 * module, then it's mocked for all tests.
 */

const db = require("../../../../data/dbConfig");
const controllers = require("../cases.controllers");
const mockModel = require("../cases.model");
const DatabaseError = require("../../../../server/middleware/DatabaseError");
const knex = require("../../../../data/dbConfig");

jest.mock("../cases.model");

beforeAll(() => knex.migrate.latest().then(() => knex.seed.run()));

afterAll(() => knex.migrate.rollback().then(() => knex.destroy()));

beforeEach(() =>
  db.raw('TRUNCATE TABLE "uscounties" RESTART IDENTITY CASCADE')
);

describe("/cases", () => {
  describe("getVisualizationData", () => {
    it("should respond with 500 database error if cases cannot be retrieved", async () => {
      const req = { body: {} };
      const next = jest.fn().mockName("next");
      const res = { status: jest.fn(() => res), json: jest.fn(() => res) };
      const error = new DatabaseError({
        message: "Cannot retrieve cases",
        dbMessage: "Postgres failure",
      });

      mockModel.queryMapData.mockRejectedValue(error);

      await controllers.getVisualizationData(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(error);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
