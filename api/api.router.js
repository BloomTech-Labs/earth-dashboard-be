const router = require("express").Router();
const controllers = require("./api.controllers");
const casesRouter = require("../resources/visualizations/cases/cases.router");
const bubblesRouter = require("../resources/visualizations/bubbles/bubbles.router");
const airRouter = require("../resources/visualizations/air/air.router");
const racingRouter = require("../resources/visualizations/racingChart/racing.router");

// Data needed for 'USA Covid-19 Confirmed Cases Daily Count' will be handled by the casesRouter and is accessed through /api/cases
router.use("/cases", casesRouter);
router.use("/bubbles", bubblesRouter);
router.use("/air", airRouter);
router.use("/deaths", racingRouter);

// /api routes to the api controller and sends back a basic status message to indicate API is up
router.route("/").get(controllers.apiRoot);

module.exports = router;
