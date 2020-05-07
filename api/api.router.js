const router = require("express").Router();
const casesRouter = require("../resources/visualizations/cases/cases.router");
const bubblesRouter = require("../resources/visualizations/bubbles/bubbles.router");
const controllers = require("./api.controllers");

// Data needed for 'USA Covid-19 Confirmed Cases Daily Count' will be handled by the casesRouter and is accessed through /api/cases
router.use("/cases", casesRouter);
router.use("/bubbles", bubblesRouter);

// /api routes to the api controller and sends back a basic status message to indicate API is up
router.route("/").get(controllers.apiRoot);

module.exports = router;
