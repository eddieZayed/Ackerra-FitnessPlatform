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

const services = [
  {
    id: 1,
    title: "BMI Calculator",
    description:
      "Accurately calculate your Body Mass Index (BMI) and receive tailored advice to maintain or improve your health and fitness.",
    image: "/src/assets/img/bmiCalc.jpg",
    link: "/bmi-calculator",
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
    description:
      "Get accurate insights into your fat and muscle composition. Tailor your fitness goals with personalized metrics.",
    image: "/src/assets/img/bodyComposition.png",
    link: "/body-composition-calculator",
  },
  {
    id: 4,
    title: "Calories Burned Calculator",
    description:
      "Calculate calories burned during your favorite sports. Enter your weight and time to get accurate results.",
    image: "/src/assets/img/calorieBurnedCalc.jpeg", 
    link: "/calories-burned-calculator",
  },
  {
    id: 5,
    title: "Supplements Recommendations",
    description:
      "Discover the best supplements for your fitness needs. Optimize your performance and recovery with expert-selected options.",
    image: "/src/assets/img/supplements.jpeg", 
    link: "/supplements-recommendations",
  },
  {
    id: 6,
    title: "Behavior Change tool",
    description:
      "Assess your current stage of change to receive personalized advice and strategies for optimizing your fitness journey.",
    image: "/src/assets/img/behavioralChange.webp", 
    link: "/behavior-change-tool",
  },
  {
    id: 7,
    title: "Ackerra",
    description:
      "Hesitant or stressed about starting your fitness journey? Ackerra is here to guide, motivate, and support you every step of the way.",
    image: "/src/assets/img/chatbot.avif", 
    link: "/chatbot",
  },
  {
    id: 8,
    title: "Exercises Library",
    description:
      "Explore a vast library of exercises with detailed instructions and images to meet all your fitness needs.",
    image: "/src/assets/img/exerciseLibrary.jpg", 
    link: "/exercises",
  },
  {
    id: 9,
    title: "Personalized Training Program",
    description:
      "Get a customized workout plan designed to match your goals, fitness level, and schedule.",
    image: "/src/assets/img/personalTrainer.png", 
    link: "/perosnal-training-program",
  },
  {
    id: 10,
    title: "NutriSearch",
    description:
      "Analyze recipes and ingredients to uncover detailed nutritional insights with NutriSearch.",
    image: "/src/assets/img/nutriSearch.jpg", 
    link: "/nutri-search",
  },
];

const OurServices: React.FC = () => {
  return (
    <Box
      id="services"
      sx={{
        backgroundColor: "#242424",
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
        {services.map((service) => (
          <Grid item xs={12} md={6} key={service.id}>
            <Accordion
              sx={{
                backgroundColor: "#2e2e2e",
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
                  <img
                    src={service.image}
                    alt={service.title}
                    style={{
                      height: "40px",
                      width: "40px",
                      borderRadius: "4px",
                      objectFit: "cover",
                    }}
                  />
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
