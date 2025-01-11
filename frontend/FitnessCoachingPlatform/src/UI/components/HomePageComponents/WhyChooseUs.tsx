import React from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

const reasons = [
  {
    title: "Expert Guidance",
    description:
      "Leverage our cutting-edge exercise generation tool that crafts personalized workout routines tailored to your unique needs and goals, ensuring effective and goal-oriented training.",
    icon: <EmojiEventsIcon sx={{ fontSize: 50, color: "#FF5722" }} />,
  },
  {
    title: "24/7 Support",
    description:
      "Our services are available around the clock, allowing you to access our services at any time, product selections, and overcoming challenges on your fitness journey.",
    icon: <SupportAgentIcon sx={{ fontSize: 50, color: "#FF5722" }} />,
  },
  {
    title: "Personalized Training & Products",
    description:
      "Receive customized workout plans and explore premium fitness products from our shop to enhance your training and results.",
    icon: <FitnessCenterIcon sx={{ fontSize: 50, color: "#FF5722" }} />,
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1a1a1a",
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
        Why Choose Us
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {reasons.map((reason, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: "#2a2a2a",
                borderRadius: "15px",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardMedia sx={{ padding: "20px" }}>
                {reason.icon}
              </CardMedia>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Poppins, sans-serif",
                    color: "#fff",
                  }}
                >
                  {reason.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    color: "#ccc",
                    marginTop: "10px",
                  }}
                >
                  {reason.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WhyChooseUs;
