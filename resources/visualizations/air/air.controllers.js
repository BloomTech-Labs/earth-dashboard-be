const airQualityData = require("./la_glendora_ppm.json");
const casesData = require("./latimes-la-totals.json");
const DatabaseError = require("../../../server/middleware/DatabaseError");

const getVisualizationData = async (_req, res, next) => {
  const airQualityDates = airQualityData.map((date) => date.Date);
  const casesDates = casesData.map((date) => date.date);

  const commonDates = airQualityDates.filter((date) =>
    casesDates.includes(date)
  );

  try {
    res.status(200).json({
      dates: commonDates,
      airQuality: airQualityData
        .filter((date) => commonDates.includes(date.Date))
        .map((date) => ({
          x: date.Date,
          y: date["Daily Mean PM2.5 Concentration"],
        })),
      cases: casesData
        .filter((date) => commonDates.includes(date.date))
        .map((date) => ({
          x: date.date,
          y: date.confirmed_cases,
        })),
    });
  } catch (error) {
    next(
      new DatabaseError({
        message: "Cannot retrieve air quality data",
        dbMessage: error,
      })
    );
  }
};

module.exports = { getVisualizationData };
