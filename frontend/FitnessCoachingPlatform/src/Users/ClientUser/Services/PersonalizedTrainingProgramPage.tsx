// File: PersonalizedTrainingProgramPage.tsx

import React, { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  Box,
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Tabs,
  Tab,
  IconButton,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

/** 1) THEME SETUP */
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#FF4500" }, // Vibrant brand orange
    secondary: { main: "#FFA500" },
    background: {
      default: "#0E0E0E", // A deeper dark
      paper: "#1B1B1B",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#AAAAAA",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

/** 2) STYLED COMPONENTS */

// A background with a large image, gradient overlay, etc.
const BackgroundWrapper = styled(Box)(() => ({
  minHeight: "100vh",
  width: "100%",
  backgroundImage: "url('/src/assets/img/trainingProgramWallpaper2.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px 0",
}));


const ProgramContainer = styled(Container)(() => ({
  position: "relative",
  zIndex: 2,
}));

// This is the main card or "paper" that holds the content, with a border and subtle shadows.
const MainCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#030104",
  border: "1px solid rgba(255,69,0,0.3)",
  borderRadius: "12px",
  padding: theme.spacing(4),
  boxShadow: "0 8px 24px rgba(0,0,0,0.8)",
  animation: "fadeInDown 0.6s both",
  maxWidth: "800px",
  margin: "0 auto",
}));

// Step titles
const steps = ["Your Info", "Confirm & Generate"];

/** 3) REACT COMPONENT */
interface Exercise {
  name: string;
  gifUrl: string;
  targetMuscles: string[];
  bodyParts: string[];
  equipments: string[];
  secondaryMuscles: string[];
  instructions: string[];
  sets: number;
  reps: number;
  rest: string;
}

interface DayProgram {
  day: number;
  focus: string;
  recommendedCalories: number;
  restMessage?: string;
  exercises: Exercise[];
}

const PersonalizedTrainingProgramPage: React.FC = () => {
  // STEPPER state
  const [activeStep, setActiveStep] = useState<number>(0);

  // FORM FIELDS
  const [goal, setGoal] = useState<string>("muscle gain");
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3);
  const [equipment, setEquipment] = useState<string[]>(["body weight"]);
  const [height, setHeight] = useState<number>(175);
  const [weight, setWeight] = useState<number>(70);
  const [age, setAge] = useState<number>(25);
  const [fitnessLevel, setFitnessLevel] = useState<string>("beginner");

  // PROGRAM
  const [trainingProgram, setTrainingProgram] = useState<DayProgram[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // EXERCISE DETAILS
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // TABS
  const [tabIndex, setTabIndex] = useState<number>(0);

  const allEquipments = [
    "body weight",
    "dumbbell",
    "barbell",
    "resistance band",
    "kettlebell",
    "machine",
  ];

  // ---------- Handler for Stepper
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // ---------- Generate Program
  const handleGenerateProgram = async () => {
    setLoading(true);
    setError("");
    setTrainingProgram(null);

    try {
      const bodyData = {
        goal,
        daysPerWeek,
        equipment,
        height,
        weight,
        age,
        fitnessLevel,
      };

      const response = await fetch("http://localhost:5000/api/training/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });
      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData.message || "Failed to generate program.");
      }
      if (jsonData.success && jsonData.data) {
        setTrainingProgram(jsonData.data);
        setTabIndex(0);
      } else {
        throw new Error("Unexpected server response.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------- Exercise Details Dialog
  const handleOpenDetails = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setDetailsOpen(true);
  };
  const handleCloseDetails = () => {
    setSelectedExercise(null);
    setDetailsOpen(false);
  };

  // ---------- Step Renders
  const renderUserInfoStep = () => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ color: "#FF4500", fontWeight: "bold", mb: 3 }}>
        Enter Your Information
      </Typography>

      {/* Goal */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel sx={{ color: "#FF4500" }}>Goal</InputLabel>
        <Select
          value={goal}
          label="Goal"
          onChange={(e) => setGoal(e.target.value as string)}
          sx={{ backgroundColor: "#2C2C2C", color: "#FFF" }}
        >
          <MenuItem value="muscle gain">Muscle Gain</MenuItem>
          <MenuItem value="fat loss">Fat Loss</MenuItem>
          <MenuItem value="endurance">Endurance</MenuItem>
          <MenuItem value="maintenance">Maintenance</MenuItem>
        </Select>
      </FormControl>

      {/* Days Per Week */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel sx={{ color: "#FF4500" }}>Days per Week</InputLabel>
        <Select
          value={daysPerWeek}
          label="Days per Week"
          onChange={(e) => setDaysPerWeek(e.target.value as number)}
          sx={{ backgroundColor: "#2C2C2C", color: "#FFF" }}
        >
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <MenuItem key={num} value={num}>
              {num} Day{num > 1 ? "s" : ""}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Equipment (Multi-select) */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel sx={{ color: "#FF4500" }}>Equipment</InputLabel>
        <Select
          multiple
          value={equipment}
          onChange={(e) => {
            const val = e.target.value;
            setEquipment(typeof val === "string" ? val.split(",") : val);
          }}
          renderValue={(selected) => selected.join(", ")}
          sx={{ backgroundColor: "#2C2C2C", color: "#FFF" }}
        >
          {allEquipments.map((eq) => (
            <MenuItem key={eq} value={eq}>
              <Checkbox checked={equipment.indexOf(eq) > -1} />
              <ListItemText primary={eq} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Height / Weight / Age */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Height (cm)"
          type="number"
          fullWidth
          value={height}
          onChange={(e) => setHeight(parseInt(e.target.value))}
          sx={{
            backgroundColor: "#2C2C2C",
            color: "#FFF",
            "& .MuiOutlinedInput-root": { color: "#FFF" },
          }}
        />
        <TextField
          label="Weight (kg)"
          type="number"
          fullWidth
          value={weight}
          onChange={(e) => setWeight(parseInt(e.target.value))}
          sx={{
            backgroundColor: "#2C2C2C",
            "& .MuiOutlinedInput-root": { color: "#FFF" },
          }}
        />
        <TextField
          label="Age"
          type="number"
          fullWidth
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value))}
          sx={{
            backgroundColor: "#2C2C2C",
            "& .MuiOutlinedInput-root": { color: "#FFF" },
          }}
        />
      </Box>

      {/* Fitness Level */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel sx={{ color: "#FF4500" }}>Fitness Level</InputLabel>
        <Select
          value={fitnessLevel}
          label="Fitness Level"
          onChange={(e) => setFitnessLevel(e.target.value as string)}
          sx={{ backgroundColor: "#2C2C2C", color: "#FFF" }}
        >
          <MenuItem value="beginner">Beginner</MenuItem>
          <MenuItem value="intermediate">Intermediate</MenuItem>
          <MenuItem value="advanced">Advanced</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  const renderConfirmStep = () => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ color: "#FF4500", fontWeight: "bold", mb: 3 }}>
        Confirm Your Data
      </Typography>
      <Typography sx={{ color: "#FFF", mb: 1 }}>
        <strong>Goal:</strong> {goal}
      </Typography>
      <Typography sx={{ color: "#FFF", mb: 1 }}>
        <strong>Days/Week:</strong> {daysPerWeek}
      </Typography>
      <Typography sx={{ color: "#FFF", mb: 1 }}>
        <strong>Equipment:</strong> {equipment.join(", ")}
      </Typography>
      <Typography sx={{ color: "#FFF", mb: 1 }}>
        <strong>Height:</strong> {height} cm
      </Typography>
      <Typography sx={{ color: "#FFF", mb: 1 }}>
        <strong>Weight:</strong> {weight} kg
      </Typography>
      <Typography sx={{ color: "#FFF", mb: 1 }}>
        <strong>Age:</strong> {age}
      </Typography>
      <Typography sx={{ color: "#FFF", mb: 1 }}>
        <strong>Fitness Level:</strong> {fitnessLevel}
      </Typography>

      <Typography variant="body2" sx={{ mt: 2, color: "#999", fontStyle: "italic" }}>
        Click "Generate Program" to build your personalized workout plan.
      </Typography>
    </Box>
  );

  // ---------- Render training program in Tabs
  const renderTrainingProgramTabs = () => {
    if (!trainingProgram) return null;

    return (
      <Box sx={{ mt: 3 }}>
        <Tabs
          value={tabIndex}
          onChange={(_, newVal) => setTabIndex(newVal)}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
          sx={{
            borderBottom: "1px solid #FF4500",
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: "bold",
              color: "#FFF",
              "&.Mui-selected": {
                color: "#FFF",
                backgroundColor: "#FF4500",
              },
            },
          }}
        >
          {trainingProgram.map((day) => (
            <Tab key={day.day} label={`Day ${day.day}`} />
          ))}
        </Tabs>

        {trainingProgram.map((day, idx) => (
          tabIndex === idx && (
            <Box
              key={day.day}
              sx={{
                mt: 3,
                p: 2,
                backgroundColor: "#2C2C2C",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
              }}
            >
              <Typography variant="h5" sx={{ color: "#FF4500", mb: 2 }}>
                {day.focus}
              </Typography>

              {!day.restMessage && (
                <Typography variant="body1" sx={{ color: "#FFF", mb: 2 }}>
                  <strong>Recommended Calories:</strong> {day.recommendedCalories}
                </Typography>
              )}

              {day.restMessage ? (
                <Typography variant="body2" sx={{ color: "#CCC" }}>
                  {day.restMessage}
                </Typography>
              ) : (
                <TableContainer sx={{ border: "1px solid #FF4500", borderRadius: "8px" }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: "#FF4500" }}>
                      <TableRow>
                        <TableCell sx={{ color: "#FFF", fontWeight: "bold" }}>
                          Exercise
                        </TableCell>
                        <TableCell sx={{ color: "#FFF", fontWeight: "bold" }} align="center">
                          Sets
                        </TableCell>
                        <TableCell sx={{ color: "#FFF", fontWeight: "bold" }} align="center">
                          Reps
                        </TableCell>
                        <TableCell sx={{ color: "#FFF", fontWeight: "bold" }} align="center">
                          Rest
                        </TableCell>
                        <TableCell sx={{ color: "#FFF", fontWeight: "bold" }} align="center">
                          Details
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {day.exercises.map((exercise, exIndex) => (
                        <TableRow
                          key={exIndex}
                          sx={{
                            "&:nth-of-type(odd)": { backgroundColor: "#1C1C1C" },
                            "&:nth-of-type(even)": { backgroundColor: "#222" },
                          }}
                        >
                          <TableCell sx={{ color: "#FFF" }}>{exercise.name}</TableCell>
                          <TableCell sx={{ color: "#FFF" }} align="center">
                            {exercise.sets}
                          </TableCell>
                          <TableCell sx={{ color: "#FFF" }} align="center">
                            {exercise.reps}
                          </TableCell>
                          <TableCell sx={{ color: "#FFF" }} align="center">
                            {exercise.rest}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              variant="contained"
                              onClick={() => handleOpenDetails(exercise)}
                              sx={{
                                backgroundColor: "#FF4500",
                                "&:hover": { backgroundColor: "#FF5722" },
                              }}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          )
        ))}
      </Box>
    );
  };

  // ---------- MAIN RENDER
  return (
    <ThemeProvider theme={darkTheme}>
      <BackgroundWrapper>
        <ProgramContainer maxWidth="lg">
          <MainCard>
            {/* Stepper or Program Display */}
            {!trainingProgram ? (
              <>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel sx={{ color: "#FFF" }}>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                <Box sx={{ mt: 4 }}>
                  {activeStep === 0 && renderUserInfoStep()}
                  {activeStep === 1 && renderConfirmStep()}
                </Box>

                {/* Navigation Buttons */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="outlined"
                    sx={{ borderColor: "#FF4500", color: "#FF4500" }}
                  >
                    Back
                  </Button>

                  {activeStep < steps.length - 1 ? (
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#FF4500", "&:hover": { backgroundColor: "#FF5722" } }}
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#FF4500", "&:hover": { backgroundColor: "#FF5722" } }}
                      onClick={handleGenerateProgram}
                    >
                      Generate Program
                    </Button>
                  )}
                </Box>

                {loading && (
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <CircularProgress color="primary" />
                  </Box>
                )}
                {error && (
                  <Typography variant="body1" sx={{ mt: 2, color: "red" }}>
                    {error}
                  </Typography>
                )}
              </>
            ) : (
              // If we have the training program, show it
              <>{renderTrainingProgramTabs()}</>
            )}
          </MainCard>
        </ProgramContainer>

        {/* Exercise Details Dialog */}
        <Dialog
          open={detailsOpen}
          onClose={handleCloseDetails}
          maxWidth="md"
          fullWidth
          PaperProps={{
            style: {
              backgroundColor: "#030104",
              color: "#FFF",
            },
          }}
        >
          <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ flex: 1 }}>
              {selectedExercise ? selectedExercise.name : "Exercise Details"}
            </Box>
            <IconButton sx={{ color: "#FFF" }} onClick={handleCloseDetails}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {selectedExercise && (
              <Box>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <img
                    src={selectedExercise.gifUrl || "https://via.placeholder.com/300x200?text=No+Image"}
                    alt={selectedExercise.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: 400,
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Typography variant="subtitle1" sx={{ color: "#FF4500", mb: 1 }}>
                  Target Muscles:{" "}
                  <span style={{ color: "#FFF" }}>
                    {selectedExercise.targetMuscles.join(", ")}
                  </span>
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#FF4500", mb: 1 }}>
                  Body Parts:{" "}
                  <span style={{ color: "#FFF" }}>
                    {selectedExercise.bodyParts.join(", ")}
                  </span>
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#FF4500", mb: 1 }}>
                  Equipment:{" "}
                  <span style={{ color: "#FFF" }}>
                    {selectedExercise.equipments.join(", ")}
                  </span>
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#FF4500", mb: 1 }}>
                  Secondary Muscles:{" "}
                  <span style={{ color: "#FFF" }}>
                    {selectedExercise.secondaryMuscles.join(", ")}
                  </span>
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#FF4500", mb: 1 }}>
                  Sets/Reps/Rest:{" "}
                  <span style={{ color: "#FFF" }}>
                    {selectedExercise.sets} sets x {selectedExercise.reps} reps, rest {selectedExercise.rest}
                  </span>
                </Typography>
                <Typography variant="h6" sx={{ color: "#FF4500", mb: 1 }}>
                  Instructions:
                </Typography>
                {selectedExercise.instructions.map((inst, i) => (
                  <Typography key={i} variant="body2" sx={{ color: "#FFF", mb: 0.5 }}>
                    - {inst}
                  </Typography>
                ))}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={handleCloseDetails}
              sx={{ borderColor: "#FF4500", color: "#FF4500" }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </BackgroundWrapper>

      {/* Extra CSS animations */}
      <style>{`
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </ThemeProvider>
  );
};

export default PersonalizedTrainingProgramPage;
