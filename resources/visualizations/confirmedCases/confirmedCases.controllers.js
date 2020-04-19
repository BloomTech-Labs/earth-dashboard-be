const { getVisualizationData } = require("./confirmedCases.model");

const getVisualizationDataObject = async (req, res, next) => {
  try {
    res.status(200).json(await getVisualizationData());
  } catch (error) {
    next(error);
  }
};

module.exports = { getVisualizationDataObject };
