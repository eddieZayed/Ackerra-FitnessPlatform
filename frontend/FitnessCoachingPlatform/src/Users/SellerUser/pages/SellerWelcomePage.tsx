import React, { useContext } from "react"; 
import { Box, Typography, Container } from "@mui/material";
import { UserContext } from "../../../context/UserContext";

const SellerWelcomePage: React.FC = () => {
  const { userData } = useContext(UserContext);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/src/assets/img/clientWelcomePage.jpg')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
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
          maxWidth: "700px",
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
          Welcome, {userData?.profile.firstName || "Seller"}!
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
          Welcome to the Ackerman Family, esteemed seller! Manage your stores 
          and products, optimize your inventory, and connect with customers. 
          Your entrepreneurial spirit drives our community’s success. Let’s build 
          amazing experiences together!
        </Typography>
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

export default SellerWelcomePage;
