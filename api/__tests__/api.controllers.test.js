const request = require("supertest");
const server = require("../../server/server");

describe("/api", () => {
  describe("check API status", () => {
    it("should respond with a 200 status code and Running status", () =>
      request(server).get("/api").expect(200, { apiStatus: "Running" }));
  });
});
