const router = require("express").Router();
const controllers = require("./racing.controllers");

// Get endpoint Data for the top country for Racing Chart Visualization
router.route("/deaths").get(controllers.getConfirmedCasesData);

module.exports = router;
