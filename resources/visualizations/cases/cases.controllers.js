const { queryMapData } = require("./cases.model");

const getVisualizationData = async (_req, res, next) => {
  try {
    const mapData = await queryMapData();
    // Front end needs all of the map data in geojson format and a set of dates for the filter
    res.status(200).json({
      cases: mapData,
      dates: [...new Set(mapData.map((day) => day.date))],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getVisualizationData };
