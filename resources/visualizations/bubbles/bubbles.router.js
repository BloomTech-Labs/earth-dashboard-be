const router = require("express").Router();
const controllers = require("./bubbles.controllers");

router.route("/").get(controllers.getVisualizationData);

module.exports = router;
