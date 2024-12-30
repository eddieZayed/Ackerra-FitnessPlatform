import React from "react"; 
import { Box, Typography, Button, Grid } from "@mui/material";

const AboutUs: React.FC = () => {
  return (
    <Box
      id="about"
      sx={{
        backgroundColor: "#1a1a1a", // Dark theme background
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
          fontSize: { xs: "28px", md: "36px" }, // Responsive font size
          marginBottom: "20px",
          textTransform: "uppercase",
        }}
      >
        About Ackerra
      </Typography>

      {/* Mission Statement */}
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "16px", md: "18px" },
          lineHeight: "1.8",
          maxWidth: "800px",
          margin: "0 auto",
          fontFamily: "Poppins, sans-serif",
          fontWeight: "300", // Light weight for elegance
        }}
      >
        At <strong>Ackerra</strong>, we help you unlock your true potential. Our goal is to build a fitness community where you can grow stronger, overcome challenges, and reach your goals. With expert trainers, personalized plans, and a supportive environment, Ackerra is more than just a platform—it’s your path to success. Join the Ackermans family and discover the strength within you.
      </Typography>

      {/* Visuals + Additional Text */}
      <Grid container spacing={4} sx={{ marginTop: "40px", alignItems: "center" }}>
        {/* Image Section */}
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src="/src/assets/img/Ackkeras family.png" 
            alt="Ackerra Community"
            style={{
              width: "85%",
              height: "auto",
              maxHeight: "300px", // Adjust height to align with text
              borderRadius: "15px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
            }}
          />
        </Grid>

        {/* Text Section */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="body1"
            sx={{
              fontSize: "18px",
              lineHeight: "1.8",
              fontFamily: "Poppins, sans-serif",
              marginBottom: "20px",
              textAlign: "left",
            }}
          >
            Ackerra is more than a fitness platform; it’s your partner in achieving greatness. Whether you’re just starting your journey or pushing new limits, we’re here to help you succeed. With a community that celebrates every milestone and encourages every effort, you’ll never walk alone. Join us today and transform your life with the strength of the Ackermans family.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF5722",
              color: "#fff",
              textTransform: "none",
              borderRadius: "20px",
              padding: "12px 24px",
              fontSize: "16px",
              fontFamily: "Poppins, sans-serif",
              "&:hover": { backgroundColor: "#E64A19" },
            }}
          >
            Join the Community
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;
