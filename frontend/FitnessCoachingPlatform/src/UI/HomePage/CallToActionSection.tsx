import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CallToAction: React.FC = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1a1a1a, #242424)", // Sleek gradient
        color: "#fff",
        padding: "100px 20px",
        textAlign: "center",
      }}
    >
      {/* Heading */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          fontFamily: "Poppins, sans-serif",
          fontSize: { xs: "28px", md: "42px" }, // Larger font size for impact
          marginBottom: "10px",
          textTransform: "uppercase",
        }}
      >
        Take the First Step
      </Typography>

      {/* Subtle Divider */}
      <Box
        sx={{
          width: "60px",
          height: "4px",
          backgroundColor: "#FF5722",
          margin: "10px auto 20px",
          borderRadius: "2px",
        }}
      />

      {/* Description */}
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "16px", md: "20px" },
          lineHeight: "1.8",
          color: "#ccc",
          marginBottom: "40px",
          fontFamily: "Poppins, sans-serif",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        Your journey to strength, confidence, and a healthier you starts here.
        Join the Ackermans family today and take the first step towards your
        transformation. Together, we’ll achieve your goals.
      </Typography>

      {/* Get Started Button */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#FF5722",
          color: "#fff",
          textTransform: "none",
          borderRadius: "25px",
          padding: "14px 40px",
          fontSize: "18px",
          fontFamily: "Poppins, sans-serif",
          "&:hover": { backgroundColor: "#E64A19" },
          boxShadow: "0 6px 20px rgba(255, 87, 34, 0.5)", // Adds a modern glow effect
        }}
        endIcon={<ArrowForwardIcon />}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default CallToAction;
