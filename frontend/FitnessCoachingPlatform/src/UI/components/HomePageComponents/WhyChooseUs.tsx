import React from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import GroupIcon from "@mui/icons-material/Group";

const reasons = [
  {
    title: "Expert Guidance",
    description:
      "Our certified trainers and nutrition experts are here to guide you every step of the way.",
    icon: <EmojiEventsIcon sx={{ fontSize: 50, color: "#FF5722" }} />,
  },
  {
    title: "24/7 Support",
    description:
      "We provide round-the-clock assistance with our dedicated support team and AI chatbot.",
    icon: <SupportAgentIcon sx={{ fontSize: 50, color: "#FF5722" }} />,
  },
  {
    title: "Tailored Programs",
    description:
      "Personalized meal and workout plans designed to meet your unique goals.",
    icon: <FitnessCenterIcon sx={{ fontSize: 50, color: "#FF5722" }} />,
  },
  {
    title: "Supportive Community",
    description:
      "Join a family of fitness enthusiasts who inspire and motivate each other.",
    icon: <GroupIcon sx={{ fontSize: 50, color: "#FF5722" }} />,
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1a1a1a", // Original background color
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
                backgroundColor: "#2a2a2a", // Slightly darker for cards
                borderRadius: "15px",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardMedia sx={{ padding: "20px" }}>{reason.icon}</CardMedia>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Poppins, sans-serif",
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
