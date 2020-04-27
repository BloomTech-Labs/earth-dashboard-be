const { errorHandler } = require("../errorHandler");
const DatabaseError = require("../DatabaseError");

describe("errorHandler", () => {
  const req = { body: {} };
  const next = jest.fn().mockName("next");

  it("should call next with the error if headers have already been sent", () => {
    const error = new Error("blah");
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
      headersSent: true,
    };

    errorHandler(error, req, res, next);
    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should send a 500 response if there's database error", () => {
    const res = { status: jest.fn(() => res), json: jest.fn(() => res) };
    const message = "Fake Error Message";

    const error = new DatabaseError({
      message,
      dbMessage: {
        errno: 2,
        code: "345",
        detail: "errorrr",
      },
    });

    errorHandler(error, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      name: error.name,
      message,
      dbMessage: error.dbMessage.detail,
    });
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  it("should send a 500 response for any other error", () => {
    const originalError = console.error;
    console.error = jest.fn();

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    };
    const message = "Fake Error Message";

    const error = new Error(message);

    errorHandler(error, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      name: error.name,
      message,
      stack: error.stack,
    });
    expect(res.json).toHaveBeenCalledTimes(1);
    console.error = originalError;
  });
});
