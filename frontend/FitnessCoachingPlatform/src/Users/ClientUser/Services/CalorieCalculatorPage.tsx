import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Grid,
  Slider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";

import { Chart } from "chart.js/auto";

const CalorieCalculatorPage: React.FC = () => {
  const [gender, setGender] = useState<string>("male");
  const [weight, setWeight] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [age, setAge] = useState<number | null>(null);
  const [activityLevel, setActivityLevel] = useState<number>(1.2);
  const [goal, setGoal] = useState<string>("maintenance");
  const [calories, setCalories] = useState<number | null>(null);
  const [macroBreakdown, setMacroBreakdown] = useState<number[]>([0, 0, 0]);

  const chartContainerRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const initialData = [100, 200, 100]; // Placeholder data for the initial chart

  const calculateCalories = () => {
    if (weight && height && age) {
      // Calculate BMR (Basal Metabolic Rate)
      const bmr =
        gender === "male"
          ? 10 * weight + 6.25 * height - 5 * age + 5
          : 10 * weight + 6.25 * height - 5 * age - 161;

      // Calculate TDEE (Total Daily Energy Expenditure)
      const tdee = bmr * activityLevel;

      // Adjust TDEE based on goal
      let adjustedCalories = tdee;
      if (goal === "weight-loss") adjustedCalories -= 500;
      else if (goal === "muscle-gain") adjustedCalories += 500;

      setCalories(Math.round(adjustedCalories));

      // Macronutrient calculations
      let proteinIntakePerKg = 1.5; // Default for maintenance
      if (goal === "weight-loss") proteinIntakePerKg = 1.2;
      if (goal === "muscle-gain") proteinIntakePerKg = 2.0;

      const protein = Math.round(proteinIntakePerKg * weight); // Protein in grams
      const fatCalories = Math.round(0.25 * adjustedCalories); // 25% of calories from fat
      const fats = Math.round(fatCalories / 9); // Fat in grams
      const carbCalories = adjustedCalories - (protein * 4 + fats * 9); // Remaining calories for carbs
      const carbs = Math.round(carbCalories / 4); // Carbs in grams

      setMacroBreakdown([protein, carbs, fats]);
    }
  };

  // Re-render the chart whenever macroBreakdown changes
  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartContainerRef.current) {
      chartInstanceRef.current = new Chart(chartContainerRef.current, {
        type: "pie",
        data: {
          labels: ["Protein (g)", "Carbs (g)", "Fats (g)"],
          datasets: [
            {
              data: calories ? macroBreakdown : initialData,
              backgroundColor: ["#FF7043", "#FFCA28", "#66BB6A"],
              hoverBackgroundColor: ["#FF5722", "#FFC107", "#43A047"],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
              labels: {
                color: "#FFF",
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [macroBreakdown, calories]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundImage:
          "linear-gradient(to bottom, #1C1C1C, #3C3C3C, #FF4500)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px",
        color: "#FFF",
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: "24px",
          background: "linear-gradient(to right, #FF4500, #FF8C00)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Daily Caloric Needs
      </Typography>

      <Container>
        <Grid container spacing={4}>
          {/* Inputs Section */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                padding: "24px",
                backgroundColor: "rgba(28, 28, 28, 0.9)",
                color: "#FFF",
                height: "100%",
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ marginBottom: "16px" }}>
                  Input Your Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} sx={{ marginBottom: "16px" }}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ color: "orange" }}>Gender</InputLabel>
                      <Select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        sx={{ backgroundColor: "#FFF" }}
                      >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sx={{ marginBottom: "16px" }}>
                    <TextField
                      label="Age (years)"
                      type="number"
                      fullWidth
                      value={age || ""}
                      onChange={(e) => setAge(Number(e.target.value))}
                      sx={{
                        backgroundColor: "#FFF",
                        "& .MuiInputLabel-root": { color: "orange" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sx={{ marginBottom: "16px" }}>
                    <TextField
                      label="Weight (kg)"
                      type="number"
                      fullWidth
                      value={weight || ""}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      sx={{
                        backgroundColor: "#FFF",
                        "& .MuiInputLabel-root": { color: "orange" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sx={{ marginBottom: "16px" }}>
                    <TextField
                      label="Height (cm)"
                      type="number"
                      fullWidth
                      value={height || ""}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      sx={{
                        backgroundColor: "#FFF",
                        "& .MuiInputLabel-root": { color: "orange" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ marginBottom: "16px" }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "#FF8C00",
                        fontWeight: "bold",
                      }}
                    >
                      Activity Level
                    </Typography>
                    <Slider
                      value={activityLevel}
                      onChange={(_, value) => setActivityLevel(value as number)}
                      step={0.1}
                      marks={[
                        { value: 1.2, label: "Sedentary" },
                        { value: 1.375, label: "Light" },
                        { value: 1.55, label: "Moderate" },
                        { value: 1.725, label: "Active" },
                        { value: 1.9, label: "Very Active" },
                      ]}
                      min={1.2}
                      max={1.9}
                      sx={{
                        "& .MuiSlider-markLabel": { color: "#FFF" },
                        color: "#FF8C00",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel sx={{ color: "orange" }}>Goal</InputLabel>
                      <Select
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        sx={{ backgroundColor: "#FFF" }}
                      >
                        <MenuItem value="weight-loss">Weight Loss</MenuItem>
                        <MenuItem value="maintenance">Maintenance</MenuItem>
                        <MenuItem value="muscle-gain">Muscle Gain</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                {/* Calculate Button */}
                <Box textAlign="center" mt={4}>
                  <Button
                    variant="contained"
                    onClick={calculateCalories}
                    sx={{
                      background: "linear-gradient(to right, #FF4500, #FF8C00)",
                      color: "#FFF",
                      padding: "10px 36px",
                      fontSize: "16px",
                      fontWeight: "bold",
                      "&:hover": {
                        background:
                          "linear-gradient(to right, #FF5733, #1C1C1C)",
                      },
                    }}
                  >
                    Calculate
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                padding: "24px",
                backgroundColor: "rgba(28, 28, 28, 0.9)",
                color: "#FFF",
                height: "100%",
              }}
            >
              <CardContent>
                {calories && (
                  <Typography
                    variant="h5"
                    textAlign="center"
                    sx={{ marginBottom: "16px", color: "#FFCA28" }}
                  >
                    Total Calories Needed: {calories} kcal
                  </Typography>
                )}
                <canvas ref={chartContainerRef} />
                <Box mt={2} display="flex" justifyContent="center">
                  <Typography
                    variant="subtitle2"
                    sx={{ marginRight: "16px", color: "#FF7043" }}
                  >
                    Protein: {macroBreakdown[0]} g
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ marginRight: "16px", color: "#FFCA28" }}
                  >
                    Carbs: {macroBreakdown[1]} g
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#66BB6A" }}
                  >
                    Fats: {macroBreakdown[2]} g
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CalorieCalculatorPage;
