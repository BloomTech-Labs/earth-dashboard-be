const db = require("../../../data/dbConfig");

const getVisualizationData = () => db("USA Covid Daily Counts");

module.exports = { getVisualizationData };
