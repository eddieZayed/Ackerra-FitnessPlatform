import React from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
} from "@mui/icons-material";
import "@fontsource/poppins";

const openGoogleMaps = () => {
  window.open(
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3385.062650170574!2d35.17943217511253!3d31.95919702533134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d2bf5d33c13f3%3A0x4293b4ea8be2cf6e!2sBirzeit%20University!5e0!3m2!1sen!2s!4v1735565328770!5m2!1sen!2s",
    "_blank"
  );
};

const ContactUsPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#1a1a1a",
        padding: "40px 20px",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Header Section */}
      <Box textAlign="center" marginBottom="40px">
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#FF5722" }}>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ color: "#ccc", marginTop: "10px" }}>
          Have questions? Reach out to us using the information below or connect
          with us on social media.
        </Typography>
      </Box>

      {/* Contact Information and Follow Us */}
      <Grid container spacing={4} justifyContent="center">
        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "#2a2a2a",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
              height: "100%",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#FF5722",
                marginBottom: "20px",
              }}
            >
              Contact Information
            </Typography>
            <Box display="flex" alignItems="center" marginBottom="20px">
              <Phone sx={{ color: "#FF5722", marginRight: "10px" }} />
              <Typography variant="body1" sx={{ color: "#ccc" }}>
                +972 569109469
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" marginBottom="20px">
              <Email sx={{ color: "#FF5722", marginRight: "10px" }} />
              <Typography variant="body1" sx={{ color: "#ccc" }}>
                contact@ackerra.com
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              marginBottom="20px"
              onClick={openGoogleMaps}
              sx={{ cursor: "pointer" }}
            >
              <LocationOn sx={{ color: "#FF5722", marginRight: "10px" }} />
              <Typography variant="body1" sx={{ color: "#ccc" }}>
                Birzeit University, Birzeit, Palestine
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Follow Us */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "#2a2a2a",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
              height: "100%",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#FF5722",
                marginBottom: "20px",
              }}
            >
              Follow Us
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#ccc", marginBottom: "20px" }}
            >
              Stay updated with the latest news, tips, and offers by following
              us on our social media channels.
            </Typography>
            <Box display="flex" gap="16px">
              <IconButton
                sx={{ color: "#FF5722" }}
                onClick={() =>
                  window.open("https://www.facebook.com", "_blank")
                }
              >
                <Facebook fontSize="large" />
              </IconButton>
              <IconButton
                sx={{ color: "#FF5722" }}
                onClick={() => window.open("https://www.twitter.com", "_blank")}
              >
                <Twitter fontSize="large" />
              </IconButton>
              <IconButton
                sx={{ color: "#FF5722" }}
                onClick={() =>
                  window.open("https://www.instagram.com", "_blank")
                }
              >
                <Instagram fontSize="large" />
              </IconButton>
              <IconButton
                sx={{ color: "#FF5722" }}
                onClick={() =>
                  window.open("https://www.linkedin.com", "_blank")
                }
              >
                <LinkedIn fontSize="large" />
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Map Section */}
      {/* Map Section */}
      <Box
        sx={{
          marginTop: "40px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#FF5722",
            textAlign: "center",
            marginBottom: "20px",
            marginTop:"100px"
          }}
        >
          Locate Us on the Map
        </Typography>
        <Box
          sx={{
            backgroundColor: "#2a2a2a",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={openGoogleMaps}
        >
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3385.062650170574!2d35.17943217511253!3d31.95919702533134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d2bf5d33c13f3%3A0x4293b4ea8be2cf6e!2sBirzeit%20University!5e0!3m2!1sen!2s!4v1735565328770!5m2!1sen!2s"
            width="100%"
            height="350px"
            style={{ border: "0" }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUsPage;
