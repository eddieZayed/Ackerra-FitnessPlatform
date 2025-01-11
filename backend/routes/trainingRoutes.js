// File: routes/trainingRoutes.js
const express = require("express");
const { generateTrainingProgram } = require("../controllers/trainingController");

const router = express.Router();

// POST => /api/training/generate
router.post("/generate", generateTrainingProgram);

module.exports = router;
