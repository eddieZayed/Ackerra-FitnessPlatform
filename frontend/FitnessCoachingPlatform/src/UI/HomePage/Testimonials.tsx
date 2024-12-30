import React from "react";
import { Box, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";

const testimonials = [
  {
    name: "John Doe",
    role: "Fitness Enthusiast",
    text: "Ackerra has transformed my fitness journey. The personalized plans and supportive community are unparalleled.",
    avatar: "/src/assets/img/avatar1.jpg", // Replace with the actual image path
  },
  {
    name: "Jane Smith",
    role: "Athlete",
    text: "Joining Ackerra was the best decision I made. The trainers are fantastic, and the community keeps me motivated every day.",
    avatar: "/src/assets/img/avatar2.jpg", // Replace with the actual image path
  },
  {
    name: "Mike Johnson",
    role: "Personal Trainer",
    text: "Ackerra isn't just a fitness platform; it's a family. I love being part of this supportive and inspiring community.",
    avatar: "/src/assets/img/avatar3.jpg", // Replace with the actual image path
  },
];

const TestimonialSection: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1a1a1a",
        color: "#fff",
        padding: { xs: "40px 20px", md: "80px 20px" },
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          fontFamily: "Poppins, sans-serif",
          marginBottom: "40px",
          fontSize: { xs: "28px", md: "36px", xl: "42px" },
          textTransform: "uppercase",
        }}
      >
        What Our Members Say
      </Typography>

      <Grid
        container
        spacing={{ xs: 2, sm: 4, xl: 6 }}
        justifyContent="center"
        sx={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        {testimonials.map((testimonial, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={3} // Adjust to fit extra-large screens
            key={index}
          >
            <Card
              sx={{
                backgroundColor: "#2a2a2a",
                color: "#fff",
                borderRadius: "15px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                height: "100%", // Ensure all cards are the same height
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Avatar
                  alt={testimonial.name}
                  src={testimonial.avatar}
                  sx={{
                    width: 80,
                    height: 80,
                    margin: "0 auto 20px",
                    border: "2px solid #FF5722",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: "italic",
                    fontSize: "16px",
                    marginBottom: "20px",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  "{testimonial.text}"
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {testimonial.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#FF5722",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {testimonial.role}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TestimonialSection;
