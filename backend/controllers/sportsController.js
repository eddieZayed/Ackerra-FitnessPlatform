const sports = require("../models/sportsModel");

// Get all sports
const getAllSports = (req, res) => {
  res.status(200).json(sports);
};

module.exports = { getAllSports };
