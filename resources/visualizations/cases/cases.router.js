const router = require("express").Router();
const controllers = require("./cases.controllers");

/*
  /api/cases routes to the visualization controller which will handle
  passing the entire plot structure to the front end
*/
router.route("/").get(controllers.getVisualizationData);

module.exports = router;
