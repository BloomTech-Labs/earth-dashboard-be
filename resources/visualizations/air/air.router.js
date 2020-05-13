const router = require("express").Router();
const controllers = require("./air.controllers");

router.route("/").get(controllers.getVisualizationData);

module.exports = router;
