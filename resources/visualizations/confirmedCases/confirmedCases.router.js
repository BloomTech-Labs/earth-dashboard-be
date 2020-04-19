const router = require("express").Router();
const controllers = require("./confirmedCases.controllers");

router.route("/").get(controllers.getVisualizationDataObject);

module.exports = router;
