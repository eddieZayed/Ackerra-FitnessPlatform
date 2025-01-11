// models/exerciseModel.js
const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  exerciseId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  gifUrl: {
    type: String,
    set: (val) => val?.trim() // Trim trailing spaces if any
  },
  instructions: { type: [String] },
  targetMuscles: { type: [String] },
  bodyParts: { type: [String] },
  equipments: { type: [String] },
  secondaryMuscles: { type: [String] },
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
