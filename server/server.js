const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const shrinkRay = require("shrink-ray-current");

const server = express();

const { errorHandler } = require("./middleware/errorHandler");
const apiRouter = require("../api/api.router");

server.use(helmet());
server.use(morgan("dev"));
server.use(cors());
server.use(shrinkRay());
server.use(express.json());

// All api requests will route through /api. If auth is necessary, it can be separated to a different route
server.use("/api", apiRouter);

server.use(errorHandler);

server.get("/", (req, res) => {
  res.send("welcome to Earth Dashboard");
});

module.exports = server;
