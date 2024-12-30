import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import CalculateIcon from "@mui/icons-material/Calculate";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ChatIcon from "@mui/icons-material/Chat";
import GroupIcon from "@mui/icons-material/Group";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";

const services = [
  {
    title: "NutriSearch",
    description:
      "Input the name of a food, and get nutritional information including macronutrient breakdown and other details.",
    icon: <RestaurantMenuIcon sx={{ fontSize: 40, color: "#FF5722" }} />,
  },
  {
    title: "Supplement Recommendations",
    description:
      "Get safe and effective supplement recommendations tailored to your fitness goals.",
    icon: <FitnessCenterIcon sx={{ fontSize: 40, color: "#FF5722" }} />,
  },
  {
    title: "Calorie and Macro Calculator",
    description:
      "Calculate your daily calorie and macronutrient needs based on your goals and activity levels.",
    icon: <CalculateIcon sx={{ fontSize: 40, color: "#FF5722" }} />,
  },
  {
    title: "Personalized Meal Planner",
    description:
      "Craft a custom nutrition plan based on your desired macronutrient intake and favorite foods.",
    icon: <MenuBookIcon sx={{ fontSize: 40, color: "#FF5722" }} />,
  },
  {
    title: "Emotional Support Chatbot",
    description:
      "An AI-powered chatbot offering motivation, guidance, and emotional support on your journey.",
    icon: <ChatIcon sx={{ fontSize: 40, color: "#FF5722" }} />,
  },
  {
    title: "Supportive Community",
    description:
      "Join a family of fitness enthusiasts who inspire and motivate each other.",
    icon: <GroupIcon sx={{ fontSize: 40, color: "#FF5722" }} />,
  },
  {
    title: "Progress Photo Gallery",
    description:
      "Upload progress photos and share your transformation stories to inspire others.",
    icon: <CameraAltIcon sx={{ fontSize: 40, color: "#FF5722" }} />,
  },
  {
    title: "Expert Q&A Section",
    description:
      "Get personalized answers and advice from fitness experts tailored to your needs.",
    icon: <SupportAgentIcon sx={{ fontSize: 40, color: "#FF5722" }} />,
  },
  {
    title: "Calories Burned Calculator",
    description:
      "Calculate how many calories you burn for specific activities based on your weight and duration.",
    icon: <SportsSoccerIcon sx={{ fontSize: 40, color: "#FF5722" }} />,
  },
  {
    title: "Flexibility Guide",
    description:
      "Access a library of stretching exercises to improve flexibility and mobility.",
    icon: <AccessibilityNewIcon sx={{ fontSize: 40, color: "#FF5722" }} />,
  },
];

const OurServices: React.FC = () => {
  return (
    <Box
      id="services"
      sx={{
        backgroundColor: "#242424", // Slightly lighter black for distinction
        color: "#fff",
        padding: "80px 20px",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          fontFamily: "Poppins, sans-serif",
          fontSize: { xs: "28px", md: "36px" },
          marginBottom: "40px",
          textTransform: "uppercase",
        }}
      >
        Our Services
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {services.map((service, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Accordion
              sx={{
                backgroundColor: "#2e2e2e", // Slightly darker for cards
                color: "#fff",
                borderRadius: "8px",
                marginBottom: "10px",
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.5)",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#FF5722" }} />}
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "18px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  {service.icon}
                  <Typography>{service.title}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                  lineHeight: "1.8",
                  color: "#ccc",
                }}
              >
                {service.description}
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OurServices;
