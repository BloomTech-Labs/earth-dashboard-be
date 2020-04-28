/*
 * The database error class is constructed with an error message to display to the user. Stack trace and error
 * info are included for easier debugging
 */

class DatabaseError extends Error {
  constructor(error) {
    super();
    this.name = "DatabaseError";
    this.message = error.message;
    this.dbMessage = error.dbMessage;
    Error.call(this, error.message);
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = DatabaseError;
