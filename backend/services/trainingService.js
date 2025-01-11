// File: services/trainingService.js

const Exercise = require("../models/exerciseModel");

/**
 * A. Utility function to randomly fetch exercises for a given muscle,
 * filtering by user equipment if provided. We gather more potential
 * exercises, then sample from them. We'll ensure variety.
 */
async function fetchExercisesForMuscle(muscle, userEquipment, neededCount) {
  // Build query: muscle name in targetMuscles
  const query = {
    targetMuscles: { $regex: muscle, $options: "i" },
  };

  // If user equipment is specified
  if (Array.isArray(userEquipment) && userEquipment.length > 0) {
    const regexEquipments = userEquipment.map((eq) => new RegExp(eq, "i"));
    query.equipments = { $in: regexEquipments };
  }

  // Attempt to get up to 40 exercises to have enough variety
  let potential = await Exercise.find(query).limit(40);

  // If fewer than neededCount found, we just return them all
  if (potential.length <= neededCount) return potential;

  // Otherwise, randomly shuffle and pick the needed count
  const shuffled = potential.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, neededCount);
}

/**
 * B. Calculate approximate daily calorie needs (TDEE) with built-in goal adjustments.
 * We can expand logic for female, advanced multipliers, etc.
 */
function calculateTDEE(height, weight, age, goal) {
  // Simple Mifflin-St Jeor for male, lightly active
  const bmr = 10 * weight + 6.25 * height - 5 * age + 5; 
  let tdee = bmr * 1.375; // lightly active multiplier

  const lowGoal = goal.toLowerCase();
  if (lowGoal.includes("gain")) {
    tdee += 300; // surplus
  } else if (lowGoal.includes("loss") || lowGoal.includes("fat")) {
    tdee -= 300; // deficit
  } else if (lowGoal.includes("endurance")) {
    tdee += 150; // slight surplus
  }
  return Math.round(tdee);
}

/**
 * C. Volume parameters based on fitness level + goal:
 *   - sets, reps, rest, min #exercises per muscle
 */
function getVolumeParameters(fitnessLevel, goal) {
  const level = fitnessLevel.toLowerCase();
  const isGain = goal.toLowerCase().includes("gain");
  const isLoss = goal.toLowerCase().includes("loss");
  const isEndurance = goal.toLowerCase().includes("endurance");

  const volumes = {
    beginner: { exercisesPerMuscle: 2, sets: 3, reps: 12, rest: "90s" },
    intermediate: { exercisesPerMuscle: 3, sets: 4, reps: 10, rest: "60s" },
    advanced: { exercisesPerMuscle: 4, sets: 5, reps: 8, rest: "60s" },
  };
  let chosen = volumes[level] || volumes.beginner;

  // Adjust for goal
  if (isGain) {
    chosen.sets += 1; 
    chosen.reps = Math.max(chosen.reps - 2, 6); 
  } else if (isLoss) {
    chosen.reps += 2; 
    chosen.rest = "45s";
  } else if (isEndurance) {
    chosen.reps = 15;
    chosen.rest = "30s";
  }

  return chosen;
}

/**
 * D. Distribute training days and rest days more intelligently:
 *    We aim to space rest days throughout the 7-day cycle, 
 *    avoiding all rest days at the end.
 */
function buildBalancedSchedule(daysPerWeek) {
  // We consider exactly 7 days per cycle. We want to spread rest days.
  // We'll define sample "blocks" of training + rest for each possible daysPerWeek.
  const schedules = {
    1: [
      { focus: "Full Body", muscles: ["chest", "back", "shoulders", "biceps", "triceps", "quads", "hamstrings", "glutes", "calves"] },
      { focus: "Rest Day", muscles: [] },
      { focus: "Rest Day", muscles: [] },
      { focus: "Rest Day", muscles: [] },
      { focus: "Rest Day", muscles: [] },
      { focus: "Rest Day", muscles: [] },
      { focus: "Rest Day", muscles: [] },
    ],
    2: [
      { focus: "Full Body", muscles: ["chest", "back", "shoulders", "biceps", "triceps"] },
      { focus: "Rest Day", muscles: [] },
      { focus: "Full Body 2", muscles: ["quads", "hamstrings", "glutes", "abs", "calves"] },
      { focus: "Rest Day", muscles: [] },
      { focus: "Rest Day", muscles: [] },
      { focus: "Rest Day", muscles: [] },
      { focus: "Rest Day", muscles: [] },
    ],
    3: [
      { focus: "Push", muscles: ["chest", "shoulders", "triceps"] },
      { focus: "Rest Day", muscles: [] },
      { focus: "Pull", muscles: ["back", "biceps"] },
      { focus: "Rest Day", muscles: [] },
      { focus: "Legs", muscles: ["quads", "hamstrings", "glutes", "calves", "abs"] },
      { focus: "Rest Day", muscles: [] },
      { focus: "Rest Day", muscles: [] },
    ],
    4: [
      { focus: "Upper Body", muscles: ["chest", "back", "shoulders", "biceps", "triceps"] },
      { focus: "Lower Body", muscles: ["quads", "hamstrings", "glutes", "calves", "abs"] },
      { focus: "Rest Day", muscles: [] },
      { focus: "Push", muscles: ["chest", "shoulders", "triceps"] },
      { focus: "Rest Day", muscles: [] },
      { focus: "Pull", muscles: ["back", "biceps"] },
      { focus: "Rest Day", muscles: [] },
    ],
    5: [
      { focus: "Chest & Triceps", muscles: ["chest", "triceps"] },
      { focus: "Back & Biceps", muscles: ["back", "biceps"] },
      { focus: "Rest Day", muscles: [] },
      { focus: "Legs & Abs", muscles: ["quads", "hamstrings", "glutes", "calves", "abs"] },
      { focus: "Shoulders", muscles: ["shoulders"] },
      { focus: "Arms/Accessory", muscles: ["biceps", "triceps", "forearms"] },
      { focus: "Rest Day", muscles: [] },
    ],
    6: [
      { focus: "Push (Chest/Shoulders/Triceps)", muscles: ["chest", "shoulders", "triceps"] },
      { focus: "Pull (Back/Biceps)", muscles: ["back", "biceps"] },
      { focus: "Legs & Abs", muscles: ["quads", "hamstrings", "glutes", "calves", "abs"] },
      { focus: "Rest Day", muscles: [] },
      { focus: "Push 2", muscles: ["chest", "shoulders", "triceps"] },
      { focus: "Pull 2", muscles: ["back", "biceps"] },
      { focus: "Legs 2", muscles: ["quads", "hamstrings", "glutes", "calves"] },
    ],
    7: [
      { focus: "Chest", muscles: ["chest"] },
      { focus: "Back", muscles: ["back"] },
      { focus: "Shoulders", muscles: ["shoulders"] },
      { focus: "Legs & Glutes", muscles: ["quads", "hamstrings", "glutes", "calves"] },
      { focus: "Arms", muscles: ["biceps", "triceps"] },
      { focus: "Abs & Core", muscles: ["abs"] },
      { focus: "Rest Day", muscles: [] },
    ],
  };

  // If not found, default to 3
  return schedules[daysPerWeek] || schedules[3];
}

/**
 * E. Main function to generate the training program with the advanced logic.
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
  // 1) TDEE and volume
  const tdee = calculateTDEE(height, weight, age, goal);
  const volume = getVolumeParameters(fitnessLevel, goal);

  // 2) Build a balanced schedule
  const plan = buildBalancedSchedule(daysPerWeek);

  // 3) Create the final program array of 7 days
  const finalProgram = [];
  for (let i = 0; i < plan.length; i++) {
    const dayNum = i + 1;
    const dayFocus = plan[i].focus;

    // Check if rest
    if (dayFocus.toLowerCase().includes("rest")) {
      finalProgram.push({
        day: dayNum,
        focus: "Rest Day",
        recommendedCalories: tdee,
        restMessage:
          "This is an active recovery day. Consider light stretching, mobility drills, or a gentle walk.",
        exercises: [],
      });
      continue;
    }

    // It's a training day
    const dayMuscles = plan[i].muscles;
    let dayExercises = [];

    // For each muscle in the plan, fetch the required # exercises
    for (const muscle of dayMuscles) {
      const neededCount = volume.exercisesPerMuscle;
      const fetched = await fetchExercisesForMuscle(muscle, equipment, neededCount);

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

    // Guarantee at least 7 total
    let attempts = 0;
    while (dayExercises.length < 7 && attempts < 3) {
      // Randomly pick muscles again until we fill up
      for (const muscle of dayMuscles) {
        if (dayExercises.length >= 7) break;
        const neededCount = 7 - dayExercises.length;
        const extras = await fetchExercisesForMuscle(muscle, equipment, neededCount);
        const mappedExtra = extras.map((ex) => ({
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
        dayExercises.push(...mappedExtra);
      }
      attempts++;
    }

    // If dayExercises too large, randomly trim to max 12
    if (dayExercises.length > 12) {
      dayExercises = dayExercises.sort(() => 0.5 - Math.random()).slice(0, 12);
    }

    finalProgram.push({
      day: dayNum,
      focus: dayFocus,
      recommendedCalories: tdee,
      exercises: dayExercises,
    });
  }

  return finalProgram;
};
