const ApplicationError = require("./ApplicationError");

class LimitTasksError extends ApplicationError {
  constructor(message) {
    super(403, message || "Limit of tasks has been reached");
  }
}

module.exports = LimitTasksError;
