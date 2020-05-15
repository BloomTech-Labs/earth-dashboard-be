const router = require("express").Router();
const controllers = require("./cases.controllers");

router.route("/").get(controllers.getVisualizationData);

module.exports = router;
