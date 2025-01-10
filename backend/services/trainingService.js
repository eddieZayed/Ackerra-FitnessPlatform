// File: services/trainingService.js

const Exercise = require("../models/exerciseModel");

/** 
 * Utility function to fetch a random set of exercises for a given muscle.
 * Optionally filters by user equipment. 
 * The 'neededCount' is how many exercises we want for that muscle group. 
 * We limit to 20 in the query, then sample from them if there are more results.
 */
async function fetchExercisesForMuscle(muscle, userEquipment, neededCount) {
  // Build a query: matching muscle in targetMuscles
  const query = {
    targetMuscles: { $regex: muscle, $options: "i" },
  };

  // If userEquipment is non-empty, we ensure the exercise's 'equipments' intersects
  // We'll do a simple approach: at least one equipment from userEquipment must match
  if (Array.isArray(userEquipment) && userEquipment.length > 0) {
    const regexEquipments = userEquipment.map((eq) => new RegExp(eq, "i"));
    query.equipments = { $in: regexEquipments };
  }

  // First, gather up to 20 potential exercises
  let potential = await Exercise.find(query).limit(20);

  // If fewer than neededCount found, just return them
  if (potential.length <= neededCount) {
    return potential;
  }

  // Otherwise, randomly sample 'neededCount' from 'potential'
  const shuffled = potential.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, neededCount);
}

/**
 * Approximate daily calorie needs, factoring in goal adjustments.
 * We can expand logic for male/female or different activity multipliers as desired.
 */
function calculateTDEE(height, weight, age, goal) {
  // Mifflin St-Jeor approximation for a male, lightly active (1.375)
  // Expand for female if needed
  const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  let tdee = bmr * 1.375;

  const lowGoal = goal.toLowerCase();
  if (lowGoal.includes("gain")) {
    // Surplus for muscle gain
    tdee += 300;
  } else if (lowGoal.includes("loss") || lowGoal.includes("fat")) {
    // Deficit for fat loss
    tdee -= 300;
  } else if (lowGoal.includes("endurance")) {
    // Possibly raise cals a little to support training volume
    tdee += 150;
  }
  return Math.round(tdee);
}

/**
 * Determine sets, reps, rest, exercisesPerMuscle based on fitness level + goal.
 * Could also incorporate more advanced logic for periodization, etc.
 */
function getVolumeParameters(fitnessLevel, goal) {
  const level = fitnessLevel.toLowerCase();
  const isGain = goal.toLowerCase().includes("gain");
  const isLoss = goal.toLowerCase().includes("loss");
  const isEndurance = goal.toLowerCase().includes("endurance");

  // Base volumes per level
  const volumes = {
    beginner: { exercisesPerMuscle: 2, sets: 3, reps: 12, rest: "90s" },
    intermediate: { exercisesPerMuscle: 3, sets: 4, reps: 10, rest: "60s" },
    advanced: { exercisesPerMuscle: 4, sets: 5, reps: 8, rest: "60s" },
  };
  let chosen = volumes[level] || volumes.beginner;

  // Adjust for specific goal
  if (isGain) {
    chosen.sets += 1; // more volume
    chosen.reps = Math.max(chosen.reps - 2, 6); // heavier
  } else if (isLoss) {
    chosen.reps += 2; // higher rep 
    chosen.rest = "45s";
  } else if (isEndurance) {
    chosen.reps = 15; 
    chosen.rest = "30s";
  }

  return chosen;
}

/**
 * Build a training split: 
 * We'll incorporate rest days in a simpler approach:
 *  - If days < 7, we fill the rest with "Rest Day" 
 */
function buildSplit(daysPerWeek) {
  // For demonstration, define multiple splits:
  const splits = {
    1: [
      { focus: "Full Body", muscles: ["chest", "back", "shoulders", "biceps", "triceps", "quads", "hamstrings", "glutes", "calves"] },
    ],
    2: [
      { focus: "Upper Body", muscles: ["chest", "back", "shoulders", "biceps", "triceps"] },
      { focus: "Lower Body", muscles: ["quads", "hamstrings", "glutes", "calves", "abs"] },
    ],
    3: [
      { focus: "Push", muscles: ["chest", "shoulders", "triceps"] },
      { focus: "Pull", muscles: ["back", "biceps"] },
      { focus: "Legs", muscles: ["quads", "hamstrings", "glutes", "calves", "abs"] },
    ],
    4: [
      { focus: "Upper Body", muscles: ["chest", "back", "shoulders", "biceps", "triceps"] },
      { focus: "Lower Body", muscles: ["quads", "hamstrings", "glutes", "calves", "abs"] },
      { focus: "Push", muscles: ["chest", "shoulders", "triceps"] },
      { focus: "Pull", muscles: ["back", "biceps"] },
    ],
    5: [
      { focus: "Chest & Triceps", muscles: ["chest", "triceps"] },
      { focus: "Back & Biceps", muscles: ["back", "biceps"] },
      { focus: "Legs", muscles: ["quads", "hamstrings", "glutes", "calves"] },
      { focus: "Shoulders & Abs", muscles: ["shoulders", "abs"] },
      { focus: "Arms", muscles: ["biceps", "triceps"] },
    ],
    6: [
      { focus: "Push (Chest/Shoulders/Triceps)", muscles: ["chest", "shoulders", "triceps"] },
      { focus: "Pull (Back/Biceps)", muscles: ["back", "biceps"] },
      { focus: "Legs", muscles: ["quads", "hamstrings", "glutes", "calves"] },
      { focus: "Push", muscles: ["chest", "shoulders", "triceps"] },
      { focus: "Pull", muscles: ["back", "biceps"] },
      { focus: "Legs", muscles: ["quads", "hamstrings", "glutes", "calves"] },
    ],
    7: [
      // 7 can be advanced or can choose to just replicate 
      { focus: "Chest", muscles: ["chest"] },
      { focus: "Back", muscles: ["back"] },
      { focus: "Shoulders", muscles: ["shoulders"] },
      { focus: "Legs", muscles: ["quads", "hamstrings", "glutes", "calves"] },
      { focus: "Arms", muscles: ["biceps", "triceps"] },
      { focus: "Abs & Core", muscles: ["abs"] },
      { focus: "Glutes & Hamstrings", muscles: ["glutes", "hamstrings"] },
    ],
  };

  // We do at most 6 training days in the logic we established in the controller
  // but let's define for 7 for completeness
  const daysPlan = splits[daysPerWeek] || splits[3];
  // If user picks fewer than 7 days, the remainder become rest days
  // We'll store them in 'finalPlan' with a "Rest Day" day.

  const finalPlan = [];
  for (let i = 0; i < 7; i++) {
    if (i < daysPerWeek) {
      finalPlan.push({ ...daysPlan[i % daysPlan.length] });
    } else {
      finalPlan.push({
        focus: "Rest Day",
        muscles: [],
      });
    }
  }
  return finalPlan; // 7 days total
}

/**
 * The main function: generate a training program for an entire 7-day week,
 * with the # of training days specified by 'daysPerWeek', and the other days as rest.
 */
exports.generateTrainingProgram = async (
  goal,
  daysPerWeek,
  equipment,
  height,
  weight,
  age,
  fitnessLevel
) => {
  // 1) TDEE
  const tdee = calculateTDEE(height, weight, age, goal);

  // 2) Volume parameters
  const volume = getVolumeParameters(fitnessLevel, goal);

  // 3) Build the 7-day plan
  const plan7days = buildSplit(daysPerWeek);

  const program = [];
  // We'll loop over these 7 days
  for (let i = 0; i < plan7days.length; i++) {
    const dayNum = i + 1; // day # in [1..7]
    const dayFocus = plan7days[i].focus;
    if (dayFocus.toLowerCase().includes("rest")) {
      // It's a rest day
      program.push({
        day: dayNum,
        focus: "Rest Day",
        recommendedCalories: tdee,
        restMessage: "Take it easy—focus on stretching, mobility, or active recovery.",
        exercises: [],
      });
      continue;
    }

    // Otherwise, it's a training day
    const dayMuscles = plan7days[i].muscles || [];
    let dayExercises = [];
    for (const muscle of dayMuscles) {
      // We'll fetch some random exercises for this muscle
      const neededCount = volume.exercisesPerMuscle;
      const fetched = await fetchExercisesForMuscle(muscle, equipment, neededCount);

      // Convert to final shape
      const mapped = fetched.map((ex) => ({
        name: ex.name,
        gifUrl: ex.gifUrl,
        targetMuscles: ex.targetMuscles,
        bodyParts: ex.bodyParts,
        equipments: ex.equipments,
        secondaryMuscles: ex.secondaryMuscles,
        instructions: ex.instructions,
        sets: volume.sets,
        reps: volume.reps,
        rest: volume.rest,
      }));
      dayExercises.push(...mapped);
    }

    // We can also limit the total # of exercises if dayExercises is too large
    if (dayExercises.length > 10) {
      dayExercises = dayExercises.sort(() => 0.5 - Math.random()).slice(0, 10);
    }

    program.push({
      day: dayNum,
      focus: dayFocus,
      recommendedCalories: tdee,
      exercises: dayExercises,
    });
  }

  return program;
};
