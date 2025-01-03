import React, { useContext, useState } from "react";
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
import { UserContext } from "../../context/UserContext";

const GlobalNavbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isLogin, userData, setIsLogin, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("clientUser");
    setIsLogin(false);
    setUserData(null);
    navigate("/");
  };

  // Role-based navigation links
  const role = userData?.roles?.[0]?.trim(); // Trim the role to remove any extra characters
  const roleBasedLinks = () => {
    switch (role) {
      case "client":
        return [
          { label: "Home", path: "/clienthome" },
          { label: "Profile", path: "/profile" },
          { label: "Services", path: "/clientservices" },
          { label: "Shop", path: "/shop" },
          { label: "Contact Us", path: "/contact" },
        ];
      case "coach":
        return [
          { label: "Welcome Page", path: "/welcome-coach" },
          { label: "Profile", path: "/profile" },
          { label: "Contact Us", path: "/contact" },
        ];
      case "seller":
        return [
          { label: "Welcome Page", path: "/welcome-seller" },
          { label: "Profile", path: "/profile" },
          { label: "Contact Us", path: "/contact" },
        ];
      case "owner":
        return [{ label: "Profile", path: "/profile" }];
      default:
        return [];
    }
  };

  const links = roleBasedLinks();

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#1a1a1a",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          padding: "8px 24px",
          zIndex: 1100,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo Section */}
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <FitbitIcon
              sx={{
                fontSize: 40,
                color: "#FFF",
                marginRight: "16px",
              }}
            />
            <Box>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: "bold",
                  color: "#FFF",
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

          {/* Centered Links */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: "32px",
            }}
          >
            {isLogin
              ? links.map((link) => (
                  <Button
                    key={link.label}
                    color="inherit"
                    sx={{
                      textTransform: "none",
                      color: "#fff",
                      fontSize: "16px",
                      "&:hover": { color: "#FF5722", textDecoration: "underline" },
                      fontFamily: "Poppins, sans-serif",
                    }}
                    onClick={() => navigate(link.path)}
                  >
                    {link.label}
                  </Button>
                ))
              : [
                  { label: "Home", path: "/" },
                  { label: "Contact Us", path: "/contact" },
                ].map((link) => (
                  <Button
                    key={link.label}
                    color="inherit"
                    sx={{
                      textTransform: "none",
                      color: "#fff",
                      fontSize: "16px",
                      "&:hover": { color: "#FF5722", textDecoration: "underline" },
                      fontFamily: "Poppins, sans-serif",
                    }}
                    onClick={() => navigate(link.path)}
                  >
                    {link.label}
                  </Button>
                ))}
          </Box>

          {/* Right-aligned Buttons */}
          <Box sx={{ display: "flex", gap: "16px" }}>
            {isLogin ? (
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
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
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
              </>
            )}
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
          {isLogin
            ? links.map((link) => (
                <ListItem disablePadding key={link.label}>
                  <ListItemButton onClick={() => navigate(link.path)}>
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
              ))
            : [
                { label: "Home", path: "/" },
                { label: "Contact Us", path: "/contact" },
              ].map((link) => (
                <ListItem disablePadding key={link.label}>
                  <ListItemButton onClick={() => navigate(link.path)}>
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
          {isLogin && (
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "16px",
                    color: "#fff",
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>

      {/* Spacer to Offset Content */}
      <Box sx={{ height: "64px" }} />
    </>
  );
};

export default GlobalNavbar;
