const DatabaseError = require("./DatabaseError");

/*
 * Any error thrown throughout our application can caught and handled through this middleware. This means
 * we don't need to worry about sending the response in controllers. When an error is thrown, it will be
 * forwarded to this error handler middleware and handled according to error type.
 *
 * If authentication or validation is needed, this handler can be extended to handle those and with appropriate
 * error codes and messages.
 */

exports.errorHandler = (error, _req, res, next) => {
  if (res.headersSent) {
    next(error);
  } else if (error instanceof DatabaseError) {
    res.status(500).json({
      name: error.name,
      message: error.message,
      dbMessage: error.dbMessage.detail,
    });
  } else {
    console.error({
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      name: error.name,
      message: error.message,
      // When server is not running in production, error stack will be output to the console
      ...(process.env.NODE_ENV !== "production" && { stack: error.stack }),
    });
  }
};
