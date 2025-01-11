// services/exerciseService.js
const Exercise = require('../models/exerciseModel');

// Get all exercises with optional search and pagination
exports.getAllExercises = async (search, limit, page) => {
  const query = search
    ? { name: { $regex: search, $options: 'i' } }
    : {};

  const exercises = await Exercise.find(query)
    .limit(parseInt(limit))
    .skip((parseInt(page) - 1) * parseInt(limit));

  const totalCount = await Exercise.countDocuments(query);

  return {
    exercises,
    totalCount,
  };
};

// Search exercises with optional search and pagination
exports.searchExercises = async (search = '', limit = 50, page = 1) => {
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const query = search
    ? {
        name: { $regex: search, $options: 'i' }, // case-insensitive
      }
    : {};

  const exercises = await Exercise.find(query)
    .skip(skip)
    .limit(parseInt(limit));

  const totalCount = await Exercise.countDocuments(query);

  return {
    exercises,
    totalCount,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(totalCount / limit),
  };
};
