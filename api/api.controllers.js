// Send basic status message when hitting '/api'
const apiRoot = (_req, res) => res.status(200).json({ apiStatus: "Running" });

module.exports = { apiRoot };
