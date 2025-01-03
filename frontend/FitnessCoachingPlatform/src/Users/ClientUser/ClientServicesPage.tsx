import React from "react";
import { Box, Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "BMI Calculator",
    description:
      "Accurately calculate your Body Mass Index (BMI) and receive tailored advice to maintain or improve your health and fitness.",
    image: "/src/assets/img/bmiCalc.jpg", // Replace with your image path
    link: "/bmi-calculator", // Path to the service page
  },
  {
    id: 2,
    title: "Calorie Calculator",
    description:
      "Determine your daily caloric needs with precision. Get personalized macronutrient recommendations to support your fitness goals.",
    image: "/src/assets/img/caloriCalc.jpg",
    link: "/calories-calculator",
  },
  {
    id: 3,
    title: "Body Composition Calculator",
    description: "Get accurate insights into your fat and muscle composition. Tailor your fitness goals with personalized metrics.",
    image: "/src/assets/img/bodyComposition.png",
    link: "/body-composition-calculator",
  },
  {
    id: 4,
    title: "Calories Burned Calculator",
    description: "Calculate calories burned during your favorite sports. Enter your weight and time to get accurate results",
    image: "/src/assets/img/calorieBurnedCalc.jpeg", 
    link: "/calories-burned-calculator",
  },
  {
    id: 5,
    title: "Supplements Recommendations",
    description: "Discover the best supplements for your fitness needs. Optimize your performance and recovery with expert-selected options.",
    image: "/src/assets/img/supplements.jpeg", 
    link: "/supplements-recommendations",
  },
  {
    id: 6,
    title: "Behavior Change tool",
    description: "Assess your current stage of change to receive personalized advice and strategies for optimizing your fitness journey.",
    image: "/src/assets/img/behavioralChange.webp", 
    link: "/behavior-change-tool",
  },
  {
    id: 7,
    title: "Ackerra",
    description: "Hesitant or stressed about starting your fitness journey? Ackerra is here to guide, motivate, and support you every step of the way.",
    image: "/src/assets/img/chatbot.avif", 
    link: "/chatbot",
  },
  {
    id: 8,
    title: "Excercises Library",
    description: "",
    image: "/src/assets/img/chatbof", 
    link: "/exercises",
  },
];

const ClientServicesPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLearnMore = (link: string) => {
    navigate(link);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(to bottom, #1C1C1C, #3C3C3C, #FF4500)",
        color: "#FFF",
      }}
    >
      <Typography
        variant="h4"
        component={motion.div}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "40px",
          background: "linear-gradient(to right, #FF4500, #FF8C00)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Our Services
      </Typography>

      <Grid container spacing={4}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              sx={{
                borderRadius: "16px",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
                backgroundColor: "rgba(28, 28, 28, 0.9)",
                overflow: "hidden",
                transition: "transform 0.3s",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={service.image}
                alt={service.title}
                sx={{
                  objectFit: "cover",
                  backgroundColor: "#2E2E2E",
                }}
              />
              <CardContent
                sx={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#FFF",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Poppins, sans-serif",
                    marginBottom: "12px",
                    background: "linear-gradient(to right, #FF4500, #FF8C00)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {service.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#FFF",
                    marginBottom: "16px",
                  }}
                >
                  {service.description}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleLearnMore(service.link)}
                  sx={{
                    background: "linear-gradient(to right, #FF4500, #FF8C00)",
                    color: "#FFF",
                    borderRadius: "20px",
                    padding: "10px 24px",
                    "&:hover": {
                      background: "linear-gradient(to right, #FF5733, #1C1C1C)",
                    },
                  }}
                >
                  Try It Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ClientServicesPage;
