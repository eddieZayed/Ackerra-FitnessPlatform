// File: controllers/trainingController.js

const trainingService = require("../services/trainingService");

exports.generateTrainingProgram = async (req, res) => {
  try {
    const { goal, daysPerWeek, equipment, height, weight, age, fitnessLevel } = req.body;

    // Validate required fields
    if (
      !goal ||
      !daysPerWeek ||
      !equipment ||
      !height ||
      !weight ||
      !age ||
      !fitnessLevel
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide goal, daysPerWeek, equipment, height, weight, age, and fitnessLevel.",
      });
    }

    // Convert daysPerWeek to integer
    const days = parseInt(daysPerWeek, 10);
    if (isNaN(days) || days < 1 || days > 7) {
      return res.status(400).json({
        success: false,
        message: "daysPerWeek must be an integer between 1 and 7.",
      });
    }

    // If 'equipment' is a string, convert to array
    let userEquipment = [];
    if (Array.isArray(equipment)) {
      userEquipment = equipment;
    } else if (typeof equipment === "string") {
      userEquipment = [equipment];
    }

    // Generate program
    const program = await trainingService.generateTrainingProgram(
      goal,
      days,
      userEquipment,
      parseFloat(height),
      parseFloat(weight),
      parseInt(age, 10),
      fitnessLevel
    );

    return res.status(200).json({
      success: true,
      message: "Personalized training program generated successfully.",
      data: program,
    });
  } catch (error) {
    console.error("Error generating training program:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
