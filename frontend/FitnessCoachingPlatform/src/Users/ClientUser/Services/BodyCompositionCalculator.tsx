import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Chart } from "chart.js/auto";

const BodyCompositionCalculator: React.FC = () => {
  const [gender, setGender] = useState<string>("male");
  const [weight, setWeight] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [waist, setWaist] = useState<number | null>(null);
  const [neck, setNeck] = useState<number | null>(null);
  const [hip, setHip] = useState<number | null>(null);
  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [muscleMass, setMuscleMass] = useState<number | null>(null);

  const chartContainerRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const calculateBodyComposition = () => {
    if (weight && height && waist && neck) {
      let bfPercentage = 0;

      if (gender === "male") {
        bfPercentage =
          495 /
            (1.0324 -
              0.19077 * Math.log10(waist - neck) +
              0.15456 * Math.log10(height)) -
          450;
      } else if (gender === "female" && hip) {
        bfPercentage =
          495 /
            (1.29579 -
              0.35004 * Math.log10(waist + hip - neck) +
              0.22100 * Math.log10(height)) -
          450;
      }

      setBodyFat(parseFloat(bfPercentage.toFixed(2)));

      // Calculate Fat Mass and Lean Body Mass (LBM)
      const fatMass = (bfPercentage / 100) * weight;
      const leanBodyMass = weight - fatMass;

      // Estimate Muscle Mass (Assume 55% of LBM is muscle mass)
      const muscleMassEstimation = leanBodyMass * 0.55;
      setMuscleMass(parseFloat(muscleMassEstimation.toFixed(2)));
    }
  };

  // Update chart whenever bodyFat or muscleMass changes
  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartContainerRef.current) {
      chartInstanceRef.current = new Chart(chartContainerRef.current, {
        type: "bar",
        data: {
          labels: ["Body Fat (%)", "Muscle Mass (kg)"],
          datasets: [
            {
              label: "Composition",
              data: [bodyFat || 0, muscleMass || 0],
              backgroundColor: ["#FF7043", "#66BB6A"],
              hoverBackgroundColor: ["#FF5722", "#43A047"],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              ticks: { color: "#FFF" },
            },
            y: {
              ticks: { color: "#FFF" },
              grid: { color: "rgba(255,255,255,0.2)" },
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
  }, [bodyFat, muscleMass]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundImage: "linear-gradient(to bottom, #1C1C1C, #3C3C3C, #FF4500)",
        padding: "40px",
        color: "#FFF",
      }}
    >
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
        Body Fat and Muscle Mass Calculator
      </Typography>

      <Container>
        <Grid container spacing={4}>
          {/* Input Section */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                padding: "24px",
                backgroundColor: "rgba(28, 28, 28, 0.9)",
                color: "#FFF",
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ marginBottom: "16px" }}>
                  Input Your Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
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
                  <Grid item xs={6}>
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
                  <Grid item xs={6}>
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
                  <Grid item xs={6}>
                    <TextField
                      label="Waist (cm)"
                      type="number"
                      fullWidth
                      value={waist || ""}
                      onChange={(e) => setWaist(Number(e.target.value))}
                      sx={{
                        backgroundColor: "#FFF",
                        "& .MuiInputLabel-root": { color: "orange" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Neck (cm)"
                      type="number"
                      fullWidth
                      value={neck || ""}
                      onChange={(e) => setNeck(Number(e.target.value))}
                      sx={{
                        backgroundColor: "#FFF",
                        "& .MuiInputLabel-root": { color: "orange" },
                      }}
                    />
                  </Grid>
                  {gender === "female" && (
                    <Grid item xs={6}>
                      <TextField
                        label="Hip (cm)"
                        type="number"
                        fullWidth
                        value={hip || ""}
                        onChange={(e) => setHip(Number(e.target.value))}
                        sx={{
                          backgroundColor: "#FFF",
                          "& .MuiInputLabel-root": { color: "orange" },
                        }}
                      />
                    </Grid>
                  )}
                </Grid>

                <Box textAlign="center" mt={4}>
                  <Button
                    variant="contained"
                    onClick={calculateBodyComposition}
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
                    Calculate
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Output Section */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                padding: "24px",
                backgroundColor: "rgba(28, 28, 28, 0.9)",
                color: "#FFF",
                textAlign: "center",
              }}
            >
              <CardContent>
                {bodyFat !== null && (
                  <Typography
                    variant="h5"
                    sx={{ marginBottom: "16px", color: "#FFCA28" }}
                  >
                    Estimated Body Fat: {bodyFat}%
                  </Typography>
                )}
                {muscleMass !== null && (
                  <Typography
                    variant="h5"
                    sx={{ marginBottom: "16px", color: "#66BB6A" }}
                  >
                    Estimated Muscle Mass: {muscleMass} kg
                  </Typography>
                )}
                <canvas ref={chartContainerRef} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BodyCompositionCalculator;
