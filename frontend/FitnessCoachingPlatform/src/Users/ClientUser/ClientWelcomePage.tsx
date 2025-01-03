import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ClientWelcomePage: React.FC = () => {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/src/assets/img/clientWelcomePage.jpg')", // Replace with your chosen professional image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw", // Ensures the image covers the viewport width
        height: "100vh", // Ensures the image covers the viewport height
        color: "#FFF",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <Container
        sx={{
          padding: "50px",
          borderRadius: "20px",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.9)",
          animation: "fadeIn 1.5s ease-in-out",
          maxWidth: "600px",
          width: "90%",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#FF9E80",
            animation: "subtleGlow 3s infinite alternate",
            textShadow: "0px 5px 10px rgba(255, 158, 128, 0.8)",
          }}
        >
          Welcome, {userData?.profile.firstName || "Client"}!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "20px",
            fontFamily: "Poppins, sans-serif",
            marginBottom: "32px",
            lineHeight: "1.8",
            color: "#EEE",
          }}
        >
          Welcome to the Ackerman Family! Your fitness journey is our priority. Together,
           we'll push boundaries, achieve goals, and unlock your full potential. Let's make every step count!
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/clientservices")}
          sx={{
            backgroundColor: "#FF7043",
            color: "#FFF",
            padding: "14px 36px",
            fontSize: "18px",
            fontWeight: "bold",
            borderRadius: "25px",
            animation: "buttonPulse 2s infinite",
            boxShadow: "0px 5px 15px rgba(255, 112, 67, 0.8)",
            "&:hover": {
              backgroundColor: "#FF5722",
              boxShadow: "0px 8px 20px rgba(255, 112, 67, 1)",
            },
          }}
        >
          Explore Services
        </Button>
      </Container>

      {/* CSS for animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes subtleGlow {
            0% { text-shadow: 0px 5px 10px rgba(255, 112, 67, 0.6); }
            100% { text-shadow: 0px 8px 20px rgba(255, 112, 67, 1); }
          }

          @keyframes buttonPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}
      </style>
    </Box>
  );
};

export default ClientWelcomePage;
