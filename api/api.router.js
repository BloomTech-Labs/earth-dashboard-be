const router = require("express").Router();
const confirmedCasesRouter = require("../resources/visualizations/confirmedCases/confirmedCases.router");
const controllers = require("./api.controllers");

router.use("/cases", confirmedCasesRouter);

router.route("/").get(controllers.apiRoot);

module.exports = router;
