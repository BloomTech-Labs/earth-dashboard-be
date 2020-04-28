require("dotenv").config();
const app = require("./server/server");

const PORT = process.env.PORT || 3300;
const server = app.listen(PORT, () =>
  console.info(`\n=== Server listening on port ${PORT} ===\n`)
);

module.exports = server;
