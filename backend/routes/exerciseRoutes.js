const express = require('express');
const { getAllExercises, searchExercises } = require('../controllers/exerciseController');

const router = express.Router();

// GET all exercises with optional search and pagination
router.get('/', getAllExercises);

// POST search exercises with filters and pagination
router.post('/search', searchExercises);

module.exports = router;
