import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper, Grid } from "@mui/material";
import FitbitIcon from "@mui/icons-material/Fitbit";
import LoadingIndicator from "../UI/components/LoadingIndicator"; // Import the LoadingIndicator
import "@fontsource/poppins";

// Validation schema for form inputs
const validationSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .min(3, "First name must be at least 3 characters")
    .matches(/^[A-Za-z]+$/, "First name must contain only letters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(3, "Last name must be at least 3 characters")
    .matches(/^[A-Za-z]+$/, "Last name must contain only letters"),
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .matches(/^[A-Za-z]+$/, "Username can only contain letters"),
  email: yup.string().required("Email is required").email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  dateOfBirth: yup
    .date()
    .required("Date of birth is required")
    .typeError("Invalid date format"),
});

const Register: React.FC = () => {
  const [loading, setLoading] = useState(false); // Loading state
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if the username is already taken
  const checkUsernameAvailability = async (username: string) => {
    if (!username.trim()) {
      setUsernameError(null); // Reset error if the field is cleared
      return;
    }

    try {
      await axios.get(`http://localhost:5000/api/users/getUser/${username}`);
      setUsernameError("Username is already taken"); // Username is taken
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          setUsernameError(null); // Username is available
        } else {
          console.error("Error checking username availability:", error);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  // Hash the password before submitting
  const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      dateOfBirth: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true); // Start loading indicator
      try {
        const hashedPassword = await hashPassword(values.password);

        const payload = {
          username: values.username,
          email: values.email,
          password: hashedPassword,
          firstName: values.firstName,
          lastName: values.lastName,
          dateOfBirth: values.dateOfBirth,
        };

        console.log("Submitting Payload:", payload);

        const response = await axios.post(
          "http://localhost:5000/api/users/register",
          payload,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("Registration Response:", response.data);

        navigate("/login");

        toast.success(`🎉 Registration successful! Welcome to Ackerman family!`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (error) {
        console.error("Registration Error:", error);
        if (axios.isAxiosError(error) && error.response) {
          console.error("Backend Response:", error.response.data);
        }
        toast.error("❌ Registration failed! Please try again.", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } finally {
        setLoading(false); // Stop loading indicator
      }
    },
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      checkUsernameAvailability(formik.values.username);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [formik.values.username]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/src/assets/img/loginAndSignUpBackground.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {loading && <LoadingIndicator message="Registering your account..." />} {/* Display loading indicator */}
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 2,
          backgroundColor: "rgba(26, 26, 26, 0.9)",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <Box sx={{ textAlign: "center", marginBottom: 3 }}>
          <FitbitIcon sx={{ fontSize: 50, color: "#FF5722" }} />
          <Typography
            component="h1"
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontFamily: "Poppins, sans-serif",
              color: "#fff",
              marginTop: 2,
            }}
          >
            Create Your Account
          </Typography>
        </Box>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                sx={inputStyles}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                sx={inputStyles}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username &&
                  (Boolean(formik.errors.username) || Boolean(usernameError))
                }
                helperText={
                  formik.touched.username && (formik.errors.username || usernameError)
                }
                sx={inputStyles}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={inputStyles}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                sx={inputStyles}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="dateOfBirth"
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)
                }
                helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                sx={inputStyles}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              marginTop: 3,
              backgroundColor: "#FF5722",
              color: "#fff",
              textTransform: "none",
              "&:hover": { backgroundColor: "#E64A19" },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

const inputStyles = {
  input: { color: "#fff" },
  label: { color: "#FFF" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#FF5722" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#444" },
    "&:hover fieldset": { borderColor: "#FF5722" },
    "&.Mui-focused fieldset": { borderColor: "#FF5722" },
    "&.Mui-error fieldset": { borderColor: "#FF5722" },
    "&.Mui-error:hover fieldset": { borderColor: "#FF8A50" },
  },
  "& .MuiFormHelperText-root": {
    color: "#FF5722",
  },
};

export default Register;
