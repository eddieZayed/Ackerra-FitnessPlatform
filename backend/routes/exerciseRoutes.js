// routes/exerciseRoutes.js
const express = require('express');
const {
  getAllExercises,
  searchExercises,
} = require('../controllers/exerciseController');

const router = express.Router();

router.get('/', getAllExercises);
router.post('/search', searchExercises);

module.exports = router;
