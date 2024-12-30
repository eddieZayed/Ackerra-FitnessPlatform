import React from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Button,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const Footer: React.FC = () => {
  const openGoogleMaps = () => {
    window.open(
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3385.062650170574!2d35.17943217511253!3d31.95919702533134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d2bf5d33c13f3%3A0x4293b4ea8be2cf6e!2sBirzeit%20University!5e0!3m2!1sen!2s!4v1735565328770!5m2!1sen!2s",
      "_blank"
    );
  };

  return (
    <Box
      id="contact"
      sx={{
        backgroundColor: "#1a1a1a",
        color: "#fff",
        padding: "60px 20px",
        textAlign: "center",
        borderTop: "1px solid #333",
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* Contact Section */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontFamily: "Poppins, sans-serif",
              marginBottom: "15px",
              textTransform: "uppercase",
            }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Poppins, sans-serif",
              color: "#ccc",
              marginBottom: "8px",
            }}
          >
            📞 Phone: +972 569-109-469
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Poppins, sans-serif",
              color: "#ccc",
              marginBottom: "8px",
            }}
          >
            📧 Email: contact@ackerra.com
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Poppins, sans-serif",
              color: "#ccc",
            }}
          >
            📍 Address: Birzeit University, Birzeit, Palestine
          </Typography>
        </Grid>

        {/* Social Media Section */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontFamily: "Poppins, sans-serif",
              marginBottom: "15px",
              textTransform: "uppercase",
            }}
          >
            Follow Us
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
            }}
          >
            <IconButton sx={{ color: "#FF5722" }}>
              <FacebookIcon />
            </IconButton>
            <IconButton sx={{ color: "#FF5722" }}>
              <TwitterIcon />
            </IconButton>
            <IconButton sx={{ color: "#FF5722" }}>
              <InstagramIcon />
            </IconButton>
            <IconButton sx={{ color: "#FF5722" }}>
              <LinkedInIcon />
            </IconButton>
            <IconButton sx={{ color: "#FF5722" }}>
              <EmailIcon />
            </IconButton>
          </Box>
        </Grid>

        {/* Get Location Section */}
        <Grid item xs={12} md={4}>
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
              marginTop: "10px",
              '&:hover': { backgroundColor: "#E64A19" },
            }}
            onClick={openGoogleMaps}
          >
            Get Location
          </Button>
        </Grid>
      </Grid>

      {/* Footer Bottom Section */}
      <Box
        sx={{
          marginTop: "40px",
          borderTop: "1px solid #333",
          paddingTop: "20px",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            color: "#ccc",
          }}
        >
          © {new Date().getFullYear()} Ackerra. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
