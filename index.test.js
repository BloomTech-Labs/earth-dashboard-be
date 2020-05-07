const request = require("supertest");
const server = require("./index");

afterEach(() => server.close());

describe("/", () => {
  describe("check server status", () => {
    it("should respond with a 200 status code", () =>
      request(server).get("/").expect(200));
  });
});
