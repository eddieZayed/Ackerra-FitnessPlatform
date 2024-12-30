import React from "react";
import {  Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import "@fontsource/poppins";

const NotFoundPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#1a1a1a",
        color: "#fff",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          backgroundColor: "#2a2a2a",
          borderRadius: "50%",
          width: "120px",
          height: "120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
          marginBottom: "20px",
        }}
      >
        <SentimentDissatisfiedIcon sx={{ fontSize: "60px", color: "#FF5722" }} />
      </Box>

      {/* Error Code */}
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "64px", md: "120px" },
          fontWeight: "bold",
          fontFamily: "Poppins, sans-serif",
          color: "#FF5722",
        }}
      >
        404
      </Typography>

      {/* Error Message */}
      <Typography
        variant="h5"
        sx={{
          fontSize: { xs: "18px", md: "24px" },
          fontWeight: "300",
          fontFamily: "Poppins, sans-serif",
          color: "#ccc",
          marginBottom: "20px",
        }}
      >
        Oops! The page you’re looking for doesn’t exist.
      </Typography>

      {/* Subtext */}
      <Typography
        variant="body1"
        sx={{
          fontSize: "16px",
          lineHeight: "1.6",
          fontFamily: "Poppins, sans-serif",
          color: "#aaa",
          maxWidth: "500px",
          marginBottom: "30px",
        }}
      >
        Don’t worry, it happens to the best of us. Let’s get you back on track.
      </Typography>

      {/* Back to Home Button */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#FF5722",
          color: "#fff",
          textTransform: "none",
          borderRadius: "8px",
          padding: "12px 24px",
          fontSize: "16px",
          fontFamily: "Poppins, sans-serif",
          boxShadow: "0 4px 10px rgba(255, 87, 34, 0.3)",
          "&:hover": { backgroundColor: "#E64A19" },
        }}
        component={Link}
        to="/"
      >
        Back to Home
      </Button>

      {/* Decorative Elements */}
      <Box
        sx={{
          marginTop: "40px",
          borderTop: "1px solid #444",
          paddingTop: "20px",
          fontFamily: "Poppins, sans-serif",
          color: "#777",
        }}
      >
        <Typography variant="body2" sx={{ fontSize: "14px" }}>
          Need help? Contact us at <span style={{ color: "#FF5722" }}>support@ackerra.com</span>
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
