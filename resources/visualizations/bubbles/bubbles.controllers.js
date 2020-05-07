const { querySummary } = require("./bubbles.model");
const DatabaseError = require("../../../server/middleware/DatabaseError");

const getVisualizationData = async (_req, res, next) => {
  try {
    res.status(200).json(await querySummary());
  } catch (error) {
    next(
      new DatabaseError({
        message: "Cannot retrieve summary",
        dbMessage: error,
      })
    );
  }
};

module.exports = { getVisualizationData };
