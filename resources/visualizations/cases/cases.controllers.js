const { queryMapData } = require("./cases.model");
const DatabaseError = require("../../../server/middleware/DatabaseError");

const getVisualizationData = async (_req, res, next) => {
  try {
    const mapData = await queryMapData();
    // Front end needs all of the map data in geojson format and a set of dates for the filter
    res.status(200).json({
      cases: mapData,
      dates: [...new Set(mapData.map((day) => day.date))],
    });
  } catch (error) {
    next(
      new DatabaseError({
        message: "Cannot retrieve cases",
        dbMessage: error,
      })
    );
  }
};

module.exports = { getVisualizationData };
