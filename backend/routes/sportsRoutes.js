const express = require("express");
const { getAllSports } = require("../controllers/sportsController");
const router = express.Router();

// Route to get all sports
router.get("/", getAllSports);

module.exports = router;
