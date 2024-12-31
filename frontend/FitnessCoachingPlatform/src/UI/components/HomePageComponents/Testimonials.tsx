import React from "react";
import { Box, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";

const testimonials = [
  {
    name: "John Doe",
    role: "Fitness Enthusiast",
    text: "Ackerra has transformed my fitness journey. The personalized plans and supportive community are unparalleled.",
    avatar: "/src/assets/img/person1.jpeg"
  },
  {
    name: "Jane Smith",
    role: "Athlete",
    text: "Joining Ackerra was the best decision I made. The trainers are fantastic, and the community keeps me motivated every day.",
    avatar: "/src/assets/img/person3.avif", // Replace with the actual image path
  },
  {
    name: "Mike Johnson",
    role: "Personal Trainer",
    text: "Ackerra isn't just a fitness platform; it's a family. I love being part of this supportive and inspiring community.",
    avatar: "/src/assets/img/person2.webp",
    
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
        spacing={4}
        sx={{
          display: "flex",
          justifyContent: "center", // Center the cards horizontally
        }}
      >
        {testimonials.map((testimonial, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center", // Center each card in its column
            }}
          >
            <Card
              sx={{
                backgroundColor: "#2a2a2a",
                color: "#fff",
                borderRadius: "15px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                maxWidth: "300px", // Set a consistent max width for each card
                textAlign: "center",
              }}
            >
              <CardContent>
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
