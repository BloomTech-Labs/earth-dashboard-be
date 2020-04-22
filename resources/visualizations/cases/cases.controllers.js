/*
 * The cases controller is responsible for taking the raw DB from the database and wrangling it into
 * a shape that the front-end component can use to render the visualization. This helps keep processing
 * on the server rather than the client. Implementing caching will allow us lower processing cost on the
 * server in the future. This would not be an option if data manipulation were offloaded on the client.
 */

const { queryMapData } = require("./cases.model");

const getVisualizationData = async (_req, res, next) => {
  try {
    const mapData = await queryMapData();
    res.status(200).json({
      cases: mapData,
      dates: [...new Set(mapData.map((day) => day.date))],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getVisualizationData };
