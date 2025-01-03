import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Grid,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";

const BmiCalculatorPage: React.FC = () => {
  const [weight, setWeight] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [bmi, setBmi] = useState<number | null>(null);
  const [gender, setGender] = useState<string>("male");
  const [activityLevel, setActivityLevel] = useState<number>(1.0);

  const calculateBmi = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(parseFloat(bmiValue.toFixed(2)));
    }
  };

  const handleGenderChange = (newGender: string | null) => {
    if (newGender) setGender(newGender);
  };

  const getBmiCategory = () => {
    if (bmi === null) {
      return null;
    }

    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi < 24.9) {
      return "Healthy Weight";
    } else if (bmi < 30) {
      return "Overweight";
    } else {
      if (activityLevel >= 1.6 && bmi > 30) {
        return "Muscular Build (Consider other metrics)";
      }
      return "Obese";
    }
  };

  const getAdvice = () => {
    if (bmi === null) {
      return "Enter your details and calculate your BMI to receive advice.";
    }
  
    if (bmi < 18.5) {
      return "Your BMI indicates you are underweight. Consider a balanced diet rich in nutrients and calories to achieve a healthier weight.";
    } else if (bmi < 24.9) {
      return "Great! Your BMI is in the healthy range. Maintain a balanced diet and regular exercise to stay fit.";
    } else if (bmi < 30) {
      return (
        "Your BMI indicates you are overweight. This may be fine if you are muscular or athletic, " +
        "but consider monitoring your body composition and maintaining a healthy lifestyle."
      );
    } else {
      return (
        "Your BMI indicates obesity. If you are highly muscular, this might not be a concern, " +
        "but for most individuals, it is recommended to consult a healthcare provider for personalized advice."
      );
    }
  };
  

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #1C1C1C, #3C3C3C, #FF4500)",
        padding: "40px",
        color: "#FFF",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1000px",
        }}
      >
        <Card
          sx={{
            padding: "24px",
            backgroundColor: "rgba(28, 28, 28, 0.9)",
            color: "#FFF",
            borderRadius: "16px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
            width: "50%",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              textAlign="center"
              sx={{
                fontWeight: "bold",
                mb: 3,
                background: "linear-gradient(to right, #FF4500, #FF8C00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              BMI Calculator
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              <ToggleButtonGroup
                value={gender}
                exclusive
                onChange={(_, newGender) => handleGenderChange(newGender)}
                aria-label="gender"
              >
                <ToggleButton
                  value="male"
                  sx={{
                    color: "#FFF",
                    borderColor: "#FF7043",
                    "&.Mui-selected": {
                      backgroundColor: "#FF7043",
                      color: "#000",
                    },
                  }}
                >
                  <MaleIcon sx={{ mr: 1 }} />
                  Male
                </ToggleButton>
                <ToggleButton
                  value="female"
                  sx={{
                    color: "#FFF",
                    borderColor: "#FF7043",
                    "&.Mui-selected": {
                      backgroundColor: "#FF7043",
                      color: "#000",
                    },
                  }}
                >
                  <FemaleIcon sx={{ mr: 1 }} />
                  Female
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" textAlign="center">
                  Height: {height ? `${height} cm` : "Select height"}
                </Typography>
                <Slider
                  value={height || 0}
                  onChange={(_, value) => setHeight(value as number)}
                  step={1}
                  marks
                  min={100}
                  max={220}
                  valueLabelDisplay="auto"
                  sx={{
                    color: "#FF7043",
                    "& .MuiSlider-thumb": { backgroundColor: "#FF7043" },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" textAlign="center">
                  Weight: {weight ? `${weight} kg` : "Select weight"}
                </Typography>
                <Slider
                  value={weight || 0}
                  onChange={(_, value) => setWeight(value as number)}
                  step={1}
                  marks
                  min={30}
                  max={150}
                  valueLabelDisplay="auto"
                  sx={{
                    color: "#FF7043",
                    "& .MuiSlider-thumb": { backgroundColor: "#FF7043" },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" textAlign="center">
                  Activity Level
                </Typography>
                <Slider
                  value={activityLevel}
                  onChange={(_, value) => setActivityLevel(value as number)}
                  step={0.1}
                  marks={[
                    { value: 1.0, label: "Sedentary" },
                    { value: 1.5, label: "Moderate" },
                    { value: 2.0, label: "Active" },
                  ]}
                  min={1.0}
                  max={2.0}
                  valueLabelDisplay="auto"
                  sx={{
                    color: "#FF7043",
                    "& .MuiSlider-thumb": { backgroundColor: "#FF7043" },
                    "& .MuiSlider-markLabel": { color: "#FFF" },
                  }}
                />
              </Grid>
            </Grid>

            <Box textAlign="center" mt={4}>
              <Button
                variant="contained"
                onClick={calculateBmi}
                sx={{
                  background: "linear-gradient(to right, #FF4500, #FF8C00)",
                  color: "#FFF",
                  padding: "10px 36px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  "&:hover": {
                    background: "linear-gradient(to right, #FF5733, #1C1C1C)",
                  },
                }}
              >
                Calculate BMI
              </Button>
            </Box>

            {bmi && (
              <Box mt={4} textAlign="center">
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                  Your BMI is: {bmi}
                </Typography>
                <Typography variant="body1">{getBmiCategory()}</Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "40%",
          }}
        >
          <Box
            component="img"
            src="/src/assets/img/bmi-calculator.png"
            alt="BMI Illustration"
            sx={{
              width: "90%",
              maxWidth: "300px",
              height: "auto",
              mb: 2,
            }}
          />
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "#BDBDBD",
              fontSize: "18px",
            }}
          >
            {getAdvice()}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default BmiCalculatorPage;
