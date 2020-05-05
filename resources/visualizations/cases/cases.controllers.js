const { queryMapData, queryByCountryData } = require("./cases.model");
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

// Get Data for confirmed cases by country for Racing Chart Visualization
const getConfirmedCasesData = async (_req, res, next) => {
  try {
    const confirmedData = await queryByCountryData();
    res.status(200).json({
      confirmed: confirmedData,
    });
  } catch (err) {
    next(
      new DatabaseError({
        message: "Cannot retrieve cases",
        dbMessage: err,
      })
    );
  }
};

module.exports = { getVisualizationData, getConfirmedCasesData };
