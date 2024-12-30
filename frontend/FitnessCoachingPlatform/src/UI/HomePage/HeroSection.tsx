import React from "react";
import { Box, Typography, Button } from "@mui/material";

const HeroSection: React.FC = () => {
  return (
    <Box
      id="hero"
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        textAlign: "center",
        backgroundImage: "url('/src/assets/img/victor-freitas-KkYWWpurqbE-unsplash.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better text visibility */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity as needed
          zIndex: 1,
        }}
      />
      {/* Content */}
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          Unleash Your Power
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, fontSize: "18px" }}>
          Join Ackerra, the strongest community of fitness enthusiasts.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF5722",
              color: "#fff",
              textTransform: "none",
              fontSize: "18px",
              "&:hover": { backgroundColor: "#E64A19" },
            }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#FF5722",
              color: "#FF5722",
              textTransform: "none",
              fontSize: "18px",
              "&:hover": {
                borderColor: "#E64A19",
                color: "#E64A19",
              },
            }}
          >
            Learn More
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
