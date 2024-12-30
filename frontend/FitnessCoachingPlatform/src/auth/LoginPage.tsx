import React from "react";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import FitbitIcon from "@mui/icons-material/Fitbit";
import "@fontsource/poppins";

const LoginPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#1a1a1a",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#2a2a2a",
          borderRadius: "12px",
          padding: "30px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
          <FitbitIcon sx={{ fontSize: 50, color: "#FF5722" }} />
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontFamily: "Poppins, sans-serif",
              color: "#fff",
              marginTop: "10px",
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Poppins, sans-serif",
              color: "#ccc",
              marginTop: "5px",
            }}
          >
            Log in to continue to Ackerra
          </Typography>
        </Box>

        <Box sx={{ marginBottom: "20px" }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email Address"
            type="email"
            sx={{
              input: { color: "#fff" },
              label: { color: "#ccc" },
              marginBottom: "15px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#444" },
                "&:hover fieldset": { borderColor: "#FF5722" },
                "&.Mui-focused fieldset": { borderColor: "#FF5722" },
              },
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            sx={{
              input: { color: "#fff" },
              label: { color: "#ccc" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#444" },
                "&:hover fieldset": { borderColor: "#FF5722" },
                "&.Mui-focused fieldset": { borderColor: "#FF5722" },
              },
            }}
          />
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#FF5722",
            color: "#fff",
            textTransform: "none",
            borderRadius: "8px",
            padding: "10px",
            fontSize: "16px",
            fontFamily: "Poppins, sans-serif",
            boxShadow: "0 4px 10px rgba(255, 87, 34, 0.3)",
            "&:hover": { backgroundColor: "#E64A19" },
          }}
        >
          Log In
        </Button>

        <Box
          sx={{
            textAlign: "center",
            marginTop: "15px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#ccc", marginBottom: "10px" }}
          >
            Forgot your password?{" "}
            <Link href="#" underline="hover" sx={{ color: "#FF5722" }}>
              Reset it here
            </Link>
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "#ccc" }}
          >
            Don't have an account?{" "}
            <Link href="#" underline="hover" sx={{ color: "#FF5722" }}>
              Sign up now
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
