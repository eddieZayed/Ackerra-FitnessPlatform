// controllers/exerciseController.js
const exerciseService = require('../services/exerciseService');

// GET all exercises
exports.getAllExercises = async (req, res) => {
  try {
    const { search, limit = 50, page = 1 } = req.query;

    const { exercises, totalCount } = await exerciseService.getAllExercises(
      search,
      limit,
      page
    );

    res.status(200).json({
      success: true,
      data: exercises,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / limit),
        totalCount: totalCount,
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST search exercises
exports.searchExercises = async (req, res) => {
  try {
    const { search, limit = 50, page = 1 } = req.body;

    if (isNaN(limit) || limit <= 0 || isNaN(page) || page <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid limit or page number',
      });
    }

    const result = await exerciseService.searchExercises(search, limit, page);

    res.status(200).json({
      success: true,
      message: 'Search results fetched successfully',
      data: result.exercises,
      pagination: {
        totalCount: result.totalCount,
        currentPage: result.page,
        totalPages: result.totalPages,
        limit: result.limit,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
