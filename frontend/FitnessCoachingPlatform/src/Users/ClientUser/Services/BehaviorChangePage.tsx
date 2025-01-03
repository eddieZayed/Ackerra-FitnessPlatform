import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Container,
  Grid,
  Divider,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { useNavigate } from "react-router-dom"; // For client-side navigation

type Question = {
  id: number;
  question: string;
  options: string[];
};

type StageResult = {
  stage: string;
  advice: string;
  weeklyPlan: { week: string; activity: string }[];
};

const stageDescriptions = {
  "Pre-contemplation":
    "You are not currently considering a change in your fitness habits.",
  Contemplation: "You are starting to think about making a change.",
  Preparation: "You are planning and preparing to take action.",
  Action: "You are actively making changes to your fitness routine.",
  Maintenance:
    "You are maintaining your fitness habits and exploring new routines.",
};

const questions: Question[] = [
  {
    id: 1,
    question: "How active are you currently?",
    options: ["Not active", "Somewhat active", "Very active"],
  },
  {
    id: 2,
    question: "What is your primary fitness goal?",
    options: ["Lose weight", "Gain muscle", "Improve endurance"],
  },
  {
    id: 3,
    question: "How motivated are you to change your habits?",
    options: ["Not motivated", "Somewhat motivated", "Very motivated"],
  },
  {
    id: 4,
    question: "Do you currently follow a structured workout plan?",
    options: ["No", "Sometimes", "Yes"],
  },
  {
    id: 5,
    question: "What challenges prevent you from exercising?",
    options: ["Time", "Motivation", "Knowledge"],
  },
  {
    id: 6,
    question: "Do you feel confident in your ability to exercise regularly?",
    options: ["Never", "Sometimes", "Always"],
  },
  {
    id: 7,
    question: "Have you experienced progress in fitness before?",
    options: ["No", "Minimal", "Significant"],
  },
  {
    id: 8,
    question: "How often do you set fitness goals?",
    options: ["Never", "Rarely", "Regularly"],
  },
  {
    id: 9,
    question: "Do you track your meals or workouts?",
    options: ["No", "Sometimes", "Yes"],
  },
];

const mapToStage = (responses: string[]): StageResult => {
  if (responses[0] === "Not active" && responses[2] === "Not motivated") {
    return {
      stage: "Pre-contemplation",
      advice:
        "Reflect on the importance of fitness and its impact on your health. Start by setting small, achievable goals.",
      weeklyPlan: [
        {
          week: "Week 1",
          activity: "Understand the benefits of physical activity.",
        },
        {
          week: "Week 2",
          activity: "Identify barriers to fitness and brainstorm solutions.",
        },
        {
          week: "Week 3",
          activity: "Set a simple goal like a 5-minute daily walk.",
        },
      ],
    };
  } else if (
    responses[1] === "Lose weight" &&
    (responses[2] === "Somewhat motivated" || responses[5] === "Sometimes")
  ) {
    return {
      stage: "Contemplation",
      advice:
        "Set SMART goals and focus on incorporating small, consistent changes into your routine.",
      weeklyPlan: [
        {
          week: "Week 1",
          activity: "Track your daily activity and food intake.",
        },
        { week: "Week 2", activity: "Add 15 minutes of light exercise daily." },
        { week: "Week 3", activity: "Experiment with healthier meal options." },
        {
          week: "Week 4",
          activity: "Identify a workout buddy for motivation.",
        },
      ],
    };
  } else if (responses[3] === "Yes" || responses[6] === "Significant") {
    return {
      stage: "Action",
      advice:
        "You are actively making changes! Focus on tracking your progress and overcoming small challenges.",
      weeklyPlan: [
        {
          week: "Week 1",
          activity: "Log all workouts and meals consistently.",
        },
        { week: "Week 2", activity: "Increase workout intensity gradually." },
        {
          week: "Week 3",
          activity: "Incorporate one new exercise into your routine.",
        },
        {
          week: "Week 4",
          activity: "Celebrate small achievements with a non-food reward.",
        },
      ],
    };
  } else if (responses[6] === "Minimal" || responses[8] === "Sometimes") {
    return {
      stage: "Preparation",
      advice:
        "You are preparing to take action! Focus on creating a structured plan to meet your goals.",
      weeklyPlan: [
        { week: "Week 1", activity: "Schedule workouts into your calendar." },
        { week: "Week 2", activity: "Purchase necessary fitness gear." },
        {
          week: "Week 3",
          activity: "Plan meals to support your fitness goals.",
        },
        { week: "Week 4", activity: "Seek advice from fitness professionals." },
      ],
    };
  } else {
    return {
      stage: "Maintenance",
      advice:
        "Maintain your habits by exploring new fitness routines and staying consistent.",
      weeklyPlan: [
        {
          week: "Week 1",
          activity: "Experiment with advanced workout routines.",
        },
        { week: "Week 2", activity: "Set a long-term fitness goal." },
        {
          week: "Week 3",
          activity: "Help a friend start their fitness journey.",
        },
        { week: "Week 4", activity: "Take a recovery week to avoid burnout." },
      ],
    };
  }
};

const BehaviorChangePage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [results, setResults] = useState<StageResult | null>(null);

  const navigate = useNavigate(); // For client-side navigation

  const handleResponse = (response: string) => {
    const updatedResponses = [...responses];
    updatedResponses[currentQuestion] = response;
    setResponses(updatedResponses);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = mapToStage(updatedResponses);
      setResults(result);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setResponses([]);
    setResults(null);
  };

  // Updated Action Button Styles to Dark Theme
  const actionButtonStyle = {
    background: "#1a1a1a", // Dark color
    color: "#FFF",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "8px",
    textTransform: "none",
    "&:hover": {
      background: "#333333", // Slightly lighter dark on hover
    },
    minWidth: "180px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  // Enhanced Advice Styling
  const adviceCardStyle = {
    marginTop: "20px",
    backgroundColor: "#1E1E1E",
    boxShadow: "0px 4px 20px rgba(255, 69, 0, 0.5)",
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "linear-gradient(to bottom, #0A0A0A, #1B1B1B, #CC3700)", // Darker orange
        padding: { xs: "20px", sm: "40px" },
        color: "#FFF",
      }}
    >
      <Container maxWidth="md">
        {/* Title */}
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: "bold",
            marginBottom: "24px",
            background: "linear-gradient(to right, #FF4500, #FFA500)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Behavior Change Assessment Tool
        </Typography>

        {/* Assessment Questions or Results */}
        {!results ? (
          <Box>
            {/* Description */}
            <Typography
              variant="body1"
              align="center"
              sx={{
                marginBottom: "20px",
                color: "#FFA500",
                fontSize: { xs: "16px", sm: "18px" },
              }}
            >
              Answer these questions to determine which stage of behavior change you are in.
            </Typography>

            {/* Stepper */}
            <Stepper activeStep={currentQuestion} alternativeLabel>
              {questions.map((_, index) => (
                <Step key={index}>
                  <StepLabel
                    StepIconProps={{
                      style: {
                        color: currentQuestion >= index ? "#FFA500" : "#FFF",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        color: currentQuestion >= index ? "#FFA500" : "#FFF",
                        fontWeight: currentQuestion >= index ? "600" : "400",
                      }}
                    >
                      {`Q${index + 1}`}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Current Question Card */}
            <Card
              sx={adviceCardStyle}
            >
              <CardContent>
                {/* Question */}
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ color: "#FFA500", marginBottom: "20px", fontWeight: "600" }}
                >
                  {questions[currentQuestion].question}
                </Typography>

                {/* Answer Options */}
                <Grid container spacing={2} justifyContent="center">
                  {questions[currentQuestion].options.map((option) => (
                    <Grid item xs={12} sm={4} key={option}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => handleResponse(option)}
                        aria-label={`Select option ${option}`}
                        sx={{
                          background: "linear-gradient(to right, #FF4500, #FF8C00)",
                          color: "#FFF",
                          "&:hover": {
                            background: "linear-gradient(to right, #FF5722, #FF4500)",
                          },
                          borderRadius: "8px",
                          padding: "12px 0",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        {option}
                      </Button>
                    </Grid>
                  ))}
                </Grid>

                {/* Back Button */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    disabled={currentQuestion === 0}
                    variant="outlined"
                    sx={{ color: "#FFA500", borderColor: "#FFA500" }}
                    onClick={handleBack}
                    aria-label="Go back to previous question"
                  >
                    Back
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Stage Descriptions */}
            <Box sx={{ marginTop: "20px" }}>
              {Object.entries(stageDescriptions).map(([stage, description]) => (
                <Typography
                  key={stage}
                  variant="body2"
                  align="center"
                  sx={{
                    marginBottom: "8px",
                    fontSize: { xs: "14px", sm: "16px" },
                    fontWeight: "500",
                  }}
                >
                  <span style={{ color: "#FFA500", fontWeight: "600" }}>
                    {stage}:{" "}
                  </span>
                  <span style={{ color: "#FFF", fontWeight: "500" }}>{description}</span>
                </Typography>
              ))}
            </Box>
          </Box>
        ) : (
          <Box>
            {/* User's Stage */}
            <Typography
              variant="h5"
              align="center"
              sx={{
                color: "#FFA500",
                fontWeight: "700",
                marginBottom: "20px",
                fontSize: { xs: "24px", sm: "28px" },
              }}
            >
              Your Stage: {results.stage}
            </Typography>

            {/* General Advice */}
            <Typography
              variant="body1"
              align="center"
              sx={{
                color: "#FFF",
                fontStyle: "italic",
                fontSize: { xs: "16px", sm: "18px" },
              }}
            >
              {results.advice}
            </Typography>

            {/* Divider */}
            <Divider sx={{ marginY: "20px", borderColor: "#FFA500" }} />

            {/* Weekly Plan Timeline */}
            <Typography
              variant="h6"
              align="center"
              sx={{
                color: "#FFA500",
                fontWeight: "600",
                fontSize: { xs: "20px", sm: "22px" },
              }}
            >
              Weekly Plan
            </Typography>

            <Timeline position="alternate" sx={{ marginTop: "20px" }}>
              {results.weeklyPlan.map((plan, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot sx={{ backgroundColor: "#FFA500" }} />
                    {index < results.weeklyPlan.length - 1 && (
                      <TimelineConnector sx={{ backgroundColor: "#FFA500" }} />
                    )}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Card
                      sx={{
                        backgroundColor: "#1E1E1E",
                        color: "#FFF",
                        padding: "16px",
                        boxShadow: "0px 4px 10px rgba(255, 69, 0, 0.3)",
                        textAlign: "center",
                        borderRadius: "8px",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: "#FFA500",
                          fontWeight: "600",
                          fontSize: { xs: "16px", sm: "18px" },
                        }}
                      >
                        {plan.week}
                      </Typography>
                      <Typography sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
                        {plan.activity}
                      </Typography>
                    </Card>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>

            {/* Recommended Actions */}
            <Typography
              variant="h6"
              align="center"
              sx={{
                marginTop: "20px",
                color: "#FFA500",
                fontWeight: "600",
                fontSize: { xs: "20px", sm: "22px" },
              }}
            >
              Recommended Actions
            </Typography>

            {/* Recommended Actions Buttons */}
            <Box
              sx={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              {/* Answer Again */}
              <Button
                variant="contained"
                sx={actionButtonStyle}
                onClick={resetAssessment}
                aria-label="Answer the assessment again"
              >
                <RefreshIcon />
                Answer Again
              </Button>

              {/* Reserve a Session */}
              <Button
                variant="contained"
                sx={actionButtonStyle}
                onClick={() => navigate("/reserve-coach")}
                aria-label="Reserve a session with a private coach"
              >
                <CalendarTodayIcon />
                Reserve Session
              </Button>

              {/* Get Personalized Meal Plan */}
              <Button
                variant="contained"
                sx={actionButtonStyle}
                onClick={() => navigate("/personalized-meal-plan")}
                aria-label="Get a personalized meal plan"
              >
                <FastfoodIcon />
                Get Meal Plan
              </Button>

              {/* Get Personalized Training Program */}
              <Button
                variant="contained"
                sx={actionButtonStyle}
                onClick={() => navigate("/personalized-training-program")}
                aria-label="Get a personalized training program"
              >
                <FitnessCenterIcon />
                Get Training Program
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default BehaviorChangePage;
