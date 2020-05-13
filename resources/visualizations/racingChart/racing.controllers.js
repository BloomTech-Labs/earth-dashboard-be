const { queryByCountryData } = require("./racing.model");
const DatabaseError = require("../../../server/middleware/DatabaseError");

// Get endpoint Data for the top deaths for Racing Chart Visualization
const getConfirmedCasesData = async (_req, res, next) => {
  try {
    const deathsData = await queryByCountryData();
    res.status(200).json({
      deaths: deathsData,
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

module.exports = {
  getConfirmedCasesData,
};
