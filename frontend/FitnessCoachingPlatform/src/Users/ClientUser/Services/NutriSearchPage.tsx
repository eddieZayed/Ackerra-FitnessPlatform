import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Grid,
  TextField,
  CircularProgress,
  Alert,
  Tooltip,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Chart, ArcElement, CategoryScale, LinearScale, Tooltip as ChartTooltip, Legend, Title as ChartTitle } from "chart.js";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Register Chart.js components
Chart.register(ArcElement, CategoryScale, LinearScale, ChartTooltip, Legend, ChartTitle);

const NutriSearchPage: React.FC = () => {
  const [micronutrients, setMicronutrients] = useState<any>(null); // Fetched data
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error messages

  const pieChartRef = useRef<HTMLCanvasElement | null>(null); // Pie Chart container
  const pieChartInstanceRef = useRef<Chart | null>(null); // Pie Chart instance

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID;
  const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY;

  // Valid Units
  const VALID_UNITS = [
    "cup",
    "tbsp",
    "tsp",
    "g",
    "kg",
    "oz",
    "slice",
    "ml",
    "l",
    "piece",
    "can",
    "lb",
    "pint",
    "quart",
    "gallon",
  ];

  // Validation Schema
  const validationSchema = Yup.object({
    query: Yup.string()
      .required("Please enter a recipe or ingredients.")
      .matches(
        new RegExp(
          `^\\d+\\s(?:${VALID_UNITS.join("|")})\\s[a-zA-Z\\s]+(?:,\\s*\\d+\\s(?:${VALID_UNITS.join("|")})\\s[a-zA-Z\\s]+)*$`
        ),
        `Input must follow the format: quantity + unit + ingredient (e.g., '1 cup milk, 2 tbsp sugar'). Only these units are allowed: ${VALID_UNITS.join(
          ", "
        )}.`
      ),
  });

  const handleSearch = async (values: { query: string }) => {
    setLoading(true);
    setError(null);
    setMicronutrients(null);

    try {
      const response = await axios.get("https://api.edamam.com/api/nutrition-data", {
        params: {
          app_id: APP_ID,
          app_key: APP_KEY,
          ingr: values.query,
        },
      });

      if (response.data && Object.keys(response.data.totalNutrients).length > 0) {
        setMicronutrients(response.data);
      } else {
        setError("No nutritional data found for the given query.");
      }
    } catch (err: any) {
      console.error(err);
      setError("An error occurred while fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Vitamins Chart
  useEffect(() => {
    // Destroy existing chart to prevent memory leaks
    if (pieChartInstanceRef.current) {
      pieChartInstanceRef.current.destroy();
    }

    if (micronutrients && pieChartRef.current) {
      const data = micronutrients.totalNutrients;

      // Filter vitamins
      const vitaminKeys = [
        "VITA_RAE",
        "VITC",
        "VITD",
        "VITK1",
        "THIA",
        "RIBF",
        "NIA",
        "VITB6A",
        "FOLDFE",
        "VITB12",
      ];

      const vitaminData = vitaminKeys
        .filter((key) => data[key])
        .map((key) => ({
          label: data[key].label,
          quantity: data[key].quantity,
          unit: data[key].unit,
        }));

      const labels = vitaminData.map((item) => item.label);
      const values = vitaminData.map((item) => item.quantity);
      const backgroundColors = [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
        "#E7E9ED",
        "#B0E0E6",
        "#CD5C5C",
        "#FFA500",
      ];

      pieChartInstanceRef.current = new Chart(pieChartRef.current, {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Vitamins",
              data: values,
              backgroundColor: backgroundColors.slice(0, labels.length),
              borderColor: "#FFFFFF",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: isSmallScreen ? "bottom" : "right",
              labels: {
                color: "#FFF",
                font: {
                  size: 14,
                },
              },
            },
            title: {
              display: true,
              text: "Vitamin Distribution",
              color: "#FFF",
              font: {
                size: 18,
              },
            },
          },
        },
      });
    }
  }, [micronutrients, isSmallScreen]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
        backgroundImage: "linear-gradient(to bottom right, #1C1C1C, #2E2E2E, #FF4500)",
        backgroundSize: "cover",
        color: "#FFF",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Title */}
          <Grid item xs={12}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                marginBottom: "24px",
                background: "linear-gradient(to right, #FF4500, #FF8C00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              align="center"
            >
              Nutrient Search
            </Typography>
          </Grid>

          {/* Search Form */}
          <Grid item xs={12}>
            <Formik
              initialValues={{ query: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                handleSearch(values);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <Card
                    sx={{
                      padding: "24px",
                      backgroundColor: "rgba(40, 40, 40, 0.9)",
                      color: "#FFF",
                      marginBottom: "24px",
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <CardContent>
                      <Box display="flex" alignItems="center" gap="8px" marginBottom="16px">
                        <Typography variant="h6" fontSize="18px">
                          Enter a Recipe or Ingredients
                        </Typography>
                        <Tooltip
                          title={`Use the format: 'quantity unit ingredient'. For multiple items, separate them with commas. For example: '1 cup milk, 2 tbsp sugar'. Allowed units: ${VALID_UNITS.join(
                            ", "
                          )}.`}
                          arrow
                        >
                          <IconButton>
                            <HelpOutlineIcon sx={{ color: "#FFA500" }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Field
                        as={TextField}
                        name="query"
                        multiline
                        rows={4}
                        fullWidth
                        placeholder="E.g., '1 cup milk, 2 eggs, 100g sugar'"
                        sx={{
                          backgroundColor: "#FFF",
                          borderRadius: "8px",
                          fontSize: "14px",
                          marginBottom: "16px",
                        }}
                        error={touched.query && Boolean(errors.query)}
                        helperText={touched.query && errors.query}
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                          background: "linear-gradient(to right, #FF4500, #FF8C00)",
                          color: "#FFF",
                          padding: "14px 0",
                          fontSize: "16px",
                          fontWeight: "bold",
                          borderRadius: "8px",
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                          transition: "background 0.3s ease",
                          "&:hover": {
                            background: "linear-gradient(to right, #FF5722, #FF4500)",
                          },
                        }}
                      >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Search"}
                      </Button>
                    </CardContent>
                  </Card>
                </Form>
              )}
            </Formik>
          </Grid>

          {/* Results */}
          {micronutrients && (
            <>
              <Grid item xs={12} md={6}>
                {/* Nutrition Facts Window */}
                <Card
                  sx={{
                    padding: "24px",
                    background: "linear-gradient(135deg, #3C3C3C, #555555)",
                    color: "#FFF",
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ marginBottom: "16px", textAlign: "center", color: "#FFA500" }}>
                      Nutrition Facts
                    </Typography>
                    <Box
                      sx={{
                        padding: "16px",
                        borderRadius: "8px",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        maxHeight: "500px",
                        overflowY: "auto",
                      }}
                    >
                      {Object.entries(micronutrients.totalNutrients).map(
                        ([key, nutrient]: [string, any]) => (
                          <Box
                            key={key}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "12px",
                              padding: "8px 0",
                              borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                            }}
                          >
                            <Typography variant="subtitle1" sx={{ color: "#FFA500", fontWeight: "bold" }}>
                              {nutrient.label}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: "#FFF" }}>
                              {nutrient.quantity.toFixed(2)} {nutrient.unit}
                            </Typography>
                          </Box>
                        )
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                {/* Vitamins Chart */}
                <Card
                  sx={{
                    padding: "24px",
                    background: "rgba(40, 40, 40, 0.9)",
                    color: "#FFF",
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" sx={{ marginBottom: "16px", textAlign: "center", color: "#FFA500" }}>
                      Vitamin Distribution
                    </Typography>
                    <Box
                      sx={{
                        position: "relative",
                        height: isSmallScreen ? "300px" : "400px",
                        width: "100%",
                      }}
                    >
                      <canvas ref={pieChartRef} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}

          {/* Error Message */}
          {error && (
            <Grid item xs={12}>
              <Alert severity="error" sx={{ borderRadius: "8px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}>
                {error}
              </Alert>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default NutriSearchPage;
