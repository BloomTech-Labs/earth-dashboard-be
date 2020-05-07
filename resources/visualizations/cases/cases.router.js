const router = require("express").Router();
const controllers = require("./cases.controllers");

router.route("/").get(controllers.getVisualizationData);

// Get endpoint Data for confirmed cases by country for Racing Chart Visualization
router.route("/confirmed").get(controllers.getConfirmedCasesData);

module.exports = router;
