const router = require("express").Router();
const controllers = require("./confirmedCases.controllers");

router.route("/").get(controllers.getVisualizationData);

module.exports = router;
