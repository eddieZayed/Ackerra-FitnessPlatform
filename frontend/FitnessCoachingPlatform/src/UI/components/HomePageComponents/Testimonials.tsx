import React from "react";
import { Box, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";

const testimonials = [
  {
    name: "John Doe",
    role: "Swimmer",
    // Exactly 2 sentences, 32 words total
    text: "Ackerra has revolutionized my aquatic training. The specialized workouts, advanced analytics, and supportive community help me refine my stroke technique, boost endurance, and stay motivated both in and out of the pool.",
    avatar: "/src/assets/img/person1.jpeg",
  },
  {
    name: "Jane Smith",
    role: "Soccer Player",
    // Exactly 2 sentences, 32 words total
    text: "Since joining Ackerra, my agility and strategic mindset have skyrocketed. The platform’s training drills, performance tracking, and live feedback keep me on top of my game for every match and practice session.",
    avatar: "/src/assets/img/person3.avif",
  },
  {
    name: "Mike Johnson",
    role: "Athlete",
    // Exactly 2 sentences, 32 words total
    text: "Ackerra has become indispensable to my athletic progress. From customized strength plans and goal tracking to shared motivation with peers, the platform drives improvements and urges me to surpass each personal milestone.",
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
          justifyContent: "center",
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
              justifyContent: "center",
            }}
          >
            <Card
              sx={{
                backgroundColor: "#2a2a2a",
                color: "#fff",
                borderRadius: "15px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                maxWidth: "300px",
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
