import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import FitbitIcon from "@mui/icons-material/Fitbit";
import "@fontsource/poppins";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: isScrolled ? "#1a1a1a" : "rgba(0, 0, 0, 0.5)",
          boxShadow: isScrolled ? "0 4px 10px rgba(0, 0, 0, 0.3)" : "none",
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          padding: "8px 24px",
          zIndex: 1100, // Ensures it appears above other elements
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo Section */}
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => scrollToSection("hero")}
          >
            <FitbitIcon
              sx={{
                fontSize: 40,
                color: isScrolled ? "#FF5722" : "#fff",
                marginRight: "16px",
              }}
            />
            <Box>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: "bold",
                  color: isScrolled ? "#FF5722" : "#fff",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "28px",
                }}
              >
                Ackerra
              </Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{
                  color: "#FF5722",
                  fontSize: "14px",
                  fontFamily: "Poppins, sans-serif",
                  marginTop: "-4px",
                  marginLeft: "5px",
                  fontStyle: "italic",
                }}
              >
                Unleash your power
              </Typography>
            </Box>
          </Box>

          {/* Navigation Links for Large Screens */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              gap: "32px",
              flexGrow: 1,
            }}
          >
            {[{ label: "About", id: "about" }, { label: "Services", id: "services" }, { label: "Contact Us", id: "contact" }].map((link) => (
              <Button
                key={link.label}
                color="inherit"
                sx={{
                  textTransform: "none",
                  color: isScrolled ? "#fff" : "#FF5722",
                  fontSize: "16px",
                  "&:hover": { color: "#FF5722", textDecoration: "underline" },
                  fontFamily: "Poppins, sans-serif",
                }}
                onClick={() => scrollToSection(link.id)}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Sign In and Sign Up Buttons */}
          <Box sx={{ display: "flex", gap: "16px" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#FF5722",
                color: "#fff",
                textTransform: "none",
                borderRadius: "30px",
                padding: "10px 30px",
                fontSize: "16px",
                fontFamily: "Poppins, sans-serif",
                boxShadow: "0 4px 10px rgba(255, 87, 34, 0.3)",
                "&:hover": { backgroundColor: "#E64A19" },
              }}
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#FF5722",
                color: "#FF5722",
                textTransform: "none",
                borderRadius: "30px",
                padding: "10px 30px",
                fontSize: "16px",
                fontFamily: "Poppins, sans-serif",
                "&:hover": { backgroundColor: "#FF5722", color: "#fff" },
              }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </Box>

          {/* Hamburger Menu for Small Screens */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Small Screens */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#1a1a1a",
            color: "#fff",
            width: "250px",
          },
        }}
      >
        <List>
          {[{ label: "About", id: "about" }, { label: "Services", id: "services" }, { label: "Contact Us", id: "contact" }].map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                onClick={() => {
                  setIsDrawerOpen(false);
                  scrollToSection(link.id);
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "16px",
                    color: "#fff",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
