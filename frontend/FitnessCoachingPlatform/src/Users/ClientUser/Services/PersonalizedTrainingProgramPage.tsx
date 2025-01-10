// File: PersonalizedTrainingProgramPage.tsx

import React, { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  Box,
  Container,
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


// ---------- THEME SETUP ----------
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF4500", // brand orange
    },
    secondary: {
      main: "#FFA500", // secondary orange
    },
    background: {
      default: "#1C1C1C", // single dark background
      paper: "#2C2C2C",
    },
    text: {
      primary: "#FFF",
      secondary: "#ccc",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

// Main container with a single background color
const MainContainer = styled(Box)(({ theme }) => ({
 
  backgroundAttachment: "fixed", // Makes the gradient static while scrolling
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  paddingBottom: theme.spacing(6),
}));

/** A styled container for the top "header" */
const HeaderBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: 8,
  marginBottom: theme.spacing(4),
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  textAlign: "center",
}));

// Step titles
const steps = ["User Info", "Confirm & Generate"];

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
  const [height, setHeight] = useState<number>(180);
  const [weight, setWeight] = useState<number>(75);
  const [age, setAge] = useState<number>(25);
  const [fitnessLevel, setFitnessLevel] = useState<string>("beginner");

  // PROGRAM DATA
  const [trainingProgram, setTrainingProgram] = useState<DayProgram[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // For "See Details" dialog
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // Tabs for the final program
  const [tabIndex, setTabIndex] = useState<number>(0);

  // Placeholder image
  const placeholderImage = "https://via.placeholder.com/300x200.png?text=No+Image";

  // We can define a list of possible equipment for multi-select
  const allEquipments = [
    "body weight",
    "dumbbell",
    "barbell",
    "resistance band",
    "kettlebell",
    "machine",
  ];

  // STEPPER HANDLERS
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // Generate Program: POST request
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
        throw new Error(jsonData.message || "Failed to generate program");
      }
      if (jsonData.success && jsonData.data) {
        setTrainingProgram(jsonData.data);
        setTabIndex(0);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // OPEN/CLOSE DETAILS
  const handleOpenDetails = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setDetailsOpen(true);
  };
  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedExercise(null);
  };

  // RENDER STEPS
  const renderUserInfoStep = () => (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, color: "#FF4500", fontWeight: "bold" }}>
        Please enter your details
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

      {/* Days per Week */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel sx={{ color: "#FF4500" }}>Days per Week</InputLabel>
        <Select
          value={daysPerWeek}
          label="Days per Week"
          onChange={(e) => setDaysPerWeek(e.target.value as number)}
          sx={{ backgroundColor: "#2C2C2C", color: "#FFF" }}
        >
          {[1, 2, 3, 4, 5, 6, 7].map((d) => (
            <MenuItem key={d} value={d}>
              {d} Day{d > 1 ? "s" : ""}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Equipment (multi-select) */}
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
    <Box>
      <Typography variant="h5" sx={{ mb: 3, color: "#FF4500", fontWeight: "bold" }}>
        Confirm Your Data
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, fontSize: "18px", color: "#FFF" }}>
        Goal: <span style={{ color: "#FF4500" }}>{goal}</span>
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, fontSize: "18px", color: "#FFF" }}>
        Days/Week: <span style={{ color: "#FF4500" }}>{daysPerWeek}</span>
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, fontSize: "18px", color: "#FFF" }}>
        Equipment: <span style={{ color: "#FF4500" }}>{equipment.join(", ")}</span>
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, fontSize: "18px", color: "#FFF" }}>
        Height: <span style={{ color: "#FF4500" }}>{height} cm</span>
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, fontSize: "18px", color: "#FFF" }}>
        Weight: <span style={{ color: "#FF4500" }}>{weight} kg</span>
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, fontSize: "18px", color: "#FFF" }}>
        Age: <span style={{ color: "#FF4500" }}>{age}</span>
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, fontSize: "18px", color: "#FFF" }}>
        Fitness Level: <span style={{ color: "#FF4500" }}>{fitnessLevel}</span>
      </Typography>

      <Typography variant="body2" sx={{ mt: 2, color: "#ccc" }}>
        Click “Generate Program” to fetch your personalized training plan.
      </Typography>
    </Box>
  );

  // Once the program is fetched, we display it via Tabs
  const renderTrainingProgramTabs = () => {
    if (!trainingProgram) return null;
  
    return (
      <Box sx={{ mt: 4, padding: "16px", border: "1px solid #FF4500", borderRadius: "8px", backgroundColor: "#2C2C2C", boxShadow: "0 4px 12px rgba(0,0,0,0.5)" }}>
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            color: "#FF4500",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "2rem", // Larger font size for the title
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.7)", // Subtle shadow for title
          }}
        >
          Your Training Program
        </Typography>
  
        <Tabs
          value={tabIndex}
          onChange={(_, newValue) => setTabIndex(newValue)} 
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
          sx={{
            mb: 3,
            borderBottom: "1px solid #FF4500",
            "& .MuiTab-root": {
              fontSize: "1rem",
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "8px",
              margin: "0 8px",
              "&.Mui-selected": {
                color: "#FFF",
                backgroundColor: "#FF4500",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
              },
            },
          }}
        >
          {trainingProgram.map((day) => (
            <Tab
              key={day.day}
              label={`Day ${day.day}`}
              sx={{
                color: "#FFF",
                "&:hover": {
                  backgroundColor: "#FF5722",
                  color: "#FFF",
                },
              }}
            />
          ))}
        </Tabs>
  
        {trainingProgram.map((day, index) => (
          tabIndex === index && (
            <Box key={day.day} sx={{ padding: "16px", borderRadius: "8px", backgroundColor: "#1C1C1C", boxShadow: "0 4px 12px rgba(0,0,0,0.3)"  }}>
              <Typography
                variant="h5"
                sx={{
                  color: "#FF4500",
                  mb: 2,
                  fontSize: "1.5rem", // Larger font size for the day focus
                  fontWeight: "bold",
                }}
              >
                {day.focus}
              </Typography>
  
              {!day.restMessage && (
                <Typography
                  variant="body1"
                  sx={{
                    color: "#FFF",
                    mb: 2,
                    fontSize: "1.25rem", // Larger font size for the text
                  }}
                >
                  Recommended Calories:{" "}
                  <span style={{ color: "#FF4500" }}>{day.recommendedCalories}</span>
                </Typography>
              )}
  
              {day.restMessage ? (
                <Typography
                  variant="body2"
                  sx={{
                    color: "#ccc",
                    fontSize: "1.25rem", // Larger font size for rest message
                  }}
                >
                  {day.restMessage}
                </Typography>
              ) : (
                <TableContainer sx={{ border: "1px solid #FF4500", borderRadius: "8px", overflow: "hidden" }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: "#FF4500" }}>
                      <TableRow>
                        <TableCell sx={{ color: "#FFF", fontSize: "1rem", fontWeight: "bold" }}>Exercise</TableCell>
                        <TableCell sx={{ color: "#FFF", fontSize: "1rem", fontWeight: "bold" }} align="center">
                          Sets
                        </TableCell>
                        <TableCell sx={{ color: "#FFF", fontSize: "1rem", fontWeight: "bold" }} align="center">
                          Reps
                        </TableCell>
                        <TableCell sx={{ color: "#FFF", fontSize: "1rem", fontWeight: "bold" }} align="center">
                          Rest
                        </TableCell>
                        <TableCell sx={{ color: "#FFF", fontSize: "1rem", fontWeight: "bold" }} align="center">
                          Details
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {day.exercises.map((exercise, idx) => (
                        <TableRow
                          key={idx}
                          sx={{
                            "&:nth-of-type(odd)": { backgroundColor: "#2C2C2C" },
                            "&:nth-of-type(even)": { backgroundColor: "#1C1C1C" },
                            "&:hover": { backgroundColor: "#333333" },
                          }}
                        >
                          <TableCell sx={{ color: "#FFF", fontSize: "1rem" }}>{exercise.name}</TableCell>
                          <TableCell sx={{ color: "#FFF", fontSize: "1rem" }} align="center">
                            {exercise.sets}
                          </TableCell>
                          <TableCell sx={{ color: "#FFF", fontSize: "1rem" }} align="center">
                            {exercise.reps}
                          </TableCell>
                          <TableCell sx={{ color: "#FFF", fontSize: "1rem" }} align="center">
                            {exercise.rest}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              variant="contained"
                              onClick={() => handleOpenDetails(exercise)}
                              sx={{
                                backgroundColor: "#FF4500",
                                "&:hover": { backgroundColor: "#FF5722" },
                                fontSize: "0.9rem",
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
  
  

  return (
    <ThemeProvider theme={darkTheme}>
      <MainContainer>
        <Container maxWidth="md" sx={{ pt: 4 }}>
          {/* Header */}
          <HeaderBox>
            <Typography
              variant="h3"
              sx={{
                color: darkTheme.palette.primary.main,
                fontWeight: "bold",
                mb: 2,
              }}
            >
              Personalized Training Program
            </Typography>
            <Typography variant="h6" sx={{ color: darkTheme.palette.text.secondary }}>
              Provide your information to generate a custom workout plan
            </Typography>
          </HeaderBox>

          {!trainingProgram ? (
            <>
              {/* Stepper */}
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>
                      <span style={{ color: "#FFF" }}>{label}</span>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Box sx={{ mt: 4 }}>
                {activeStep === 0 && renderUserInfoStep()}
                {activeStep === 1 && renderConfirmStep()}
              </Box>

              {/* Step nav buttons */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                  sx={{ color: "#FF4500", borderColor: "#FF4500" }}
                >
                  Back
                </Button>

                {activeStep < steps.length - 1 ? (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#FF4500",
                      "&:hover": { backgroundColor: "#FF5722" },
                    }}
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#FF4500",
                      "&:hover": { backgroundColor: "#FF5722" },
                    }}
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
            <>
              {renderTrainingProgramTabs()}
            </>
          )}
        </Container>

        {/* Exercise Details Dialog */}
        <Dialog
          open={detailsOpen}
          onClose={handleCloseDetails}
          maxWidth="md"
          fullWidth
          PaperProps={{
            style: {
              backgroundColor: "#2C2C2C",
              color: "#FFF",
            },
          }}
        >
          <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ flex: 1 }}>{selectedExercise?.name || "Exercise Details"}</Box>
            <IconButton sx={{ color: "#FFF" }} onClick={handleCloseDetails}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {selectedExercise && (
              <Box>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <img
                    src={selectedExercise.gifUrl || placeholderImage}
                    alt={selectedExercise.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: 400,
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = placeholderImage;
                    }}
                  />
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#FF4500", mb: 1, fontSize: "1.1rem" }}
                >
                  Target Muscles:{" "}
                  <span style={{ color: "#FFF" }}>
                    {selectedExercise.targetMuscles.join(", ") || "N/A"}
                  </span>
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#FF4500", mb: 1, fontSize: "1.1rem" }}
                >
                  Body Parts:{" "}
                  <span style={{ color: "#FFF" }}>
                    {selectedExercise.bodyParts.join(", ") || "N/A"}
                  </span>
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#FF4500", mb: 1, fontSize: "1.1rem" }}
                >
                  Equipment:{" "}
                  <span style={{ color: "#FFF" }}>
                    {selectedExercise.equipments.join(", ") || "N/A"}
                  </span>
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#FF4500", mb: 1, fontSize: "1.1rem" }}
                >
                  Secondary Muscles:{" "}
                  <span style={{ color: "#FFF" }}>
                    {selectedExercise.secondaryMuscles.join(", ") || "N/A"}
                  </span>
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#FF4500", mb: 1, fontSize: "1.1rem" }}
                >
                  Sets/Reps/Rest:{" "}
                  <span style={{ color: "#FFF" }}>
                    {selectedExercise.sets} sets x {selectedExercise.reps} reps, rest {selectedExercise.rest}
                  </span>
                </Typography>
                <Typography variant="h6" sx={{ color: "#FF4500", mb: 1, fontSize: "1.2rem" }}>
                  Instructions:
                </Typography>
                {selectedExercise.instructions.map((step, idx) => (
                  <Typography
                    key={idx}
                    variant="body2"
                    sx={{ mb: 0.5, fontSize: "1rem", color: "#FFF" }}
                  >
                    - {step}
                  </Typography>
                ))}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={handleCloseDetails}
              startIcon={<CloseIcon />}
              sx={{ borderColor: "#FF4500", color: "#FF4500" }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </MainContainer>
    </ThemeProvider>
  );
};

export default PersonalizedTrainingProgramPage;
