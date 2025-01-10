const exerciseService = require('../services/exerciseService');

// Get all exercises with optional filters and pagination
exports.getAllExercises = async (req, res) => {
    try {
      const { search, limit = 50, page = 1 } = req.query;
  
      // Fetch exercises and metadata
      const { exercises, totalCount } = await exerciseService.getAllExercises(search, limit, page);
  
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
  
  // Search exercises by name with pagination
exports.searchExercises = async (req, res) => {
    try {
      const { search, limit = 50, page = 1 } = req.body;
  
      // Validate limit and page
      if (isNaN(limit) || limit <= 0 || isNaN(page) || page <= 0) {
        return res.status(400).json({ success: false, message: 'Invalid limit or page number' });
      }
  
      // Fetch exercises
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