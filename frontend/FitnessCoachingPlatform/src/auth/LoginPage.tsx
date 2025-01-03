import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import FitbitIcon from "@mui/icons-material/Fitbit";
import LoadingIndicator from "../UI/components/LoadingIndicator";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
};

const LoginPage: React.FC = () => {
  const { setUserData, setIsLogin, isLogin, userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const hashedPassword = await hashPassword(values.password);

        const payload = {
          username: values.username,
          password: hashedPassword,
        };

        const response = await axios.post(
          "http://localhost:5000/api/users/login",
          payload,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        const userData = response.data.user;
        setUserData(userData);
        setIsLogin(true);
        localStorage.setItem("clientUser", JSON.stringify(userData));

        console.log("Login Response - userData:", userData);

        toast.success(`🎉 Welcome back, ${userData.profile.firstName}!`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });

        // Redirect based on user role
        const role = userData.roles?.[0]?.trim();
        switch (role) {
          case "client":
            navigate("/clienthome");
            break;
          case "trainer":
            navigate("/trainerhome");
            break;
          case "seller":
            navigate("/sellerhome");
            break;
          case "owner":
            navigate("/ownerprofile");
            break;
          default:
            toast.error("❌ Unknown role. Please contact support.", {
              position: "bottom-right",
              autoClose: 2000,
              theme: "colored",
            });
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 401) {
            toast.error("❌ Invalid username or password.", {
              position: "bottom-right",
              autoClose: 2000,
              theme: "colored",
            });
          } else {
            toast.error("❌ Something went wrong. Please try again later.", {
              position: "bottom-right",
              autoClose: 2000,
              theme: "colored",
            });
          }
        } else {
          console.error("Unexpected error:", error);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    console.log("UserContext Updated - isLogin:", isLogin);
    console.log("UserContext Updated - userData:", userData);
  }, [isLogin, userData]);

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

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundImage: "url('/src/assets/img/loginAndSignUpBackground.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      {loading && <LoadingIndicator message="Logging you in..." />}
      <Paper
        sx={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "rgba(26, 26, 26, 0.9)",
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
              color: "#fff",
              marginTop: "10px",
            }}
          >
            Join the Ackerman Family
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Poppins, sans-serif",
              color: "#ccc",
              marginTop: "5px",
            }}
          >
            Log in to explore and achieve your potential
          </Typography>
        </Box>

        <Box component="form" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            sx={inputStyles}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ ...inputStyles, marginTop: "15px" }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#FF5722",
              color: "#fff",
              marginTop: "20px",
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
              <Link
                to="/reset-password"
                style={{ color: "#FF5722", textDecoration: "none" }}
              >
                Reset it here
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ color: "#ccc" }}>
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{ color: "#FF5722", textDecoration: "none" }}
              >
                Sign up now
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
