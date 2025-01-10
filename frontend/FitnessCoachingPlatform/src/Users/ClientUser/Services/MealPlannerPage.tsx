import React, { useState } from "react";
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Define dietary options
const DIETARY_OPTIONS = [
  "balanced",
  "high-protein",
  "low-fat",
  "low-carb",
  "vegetarian",
  "vegan",
  "gluten-free",
  "keto",
  "paleo",
  "dairy-free",
  "nut-free",
  "halal",
  "kosher",
];

const MealPlannerPage: React.FC = () => {
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  // Edamam API Credentials from environment variables or placeholders
  const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID2 || "your_app_id";
  const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY2 || "your_app_key";

  // API URL
  const MEAL_PLANNER_API_URL = `https://api.edamam.com/api/meal-planner/v1/${APP_ID}/select?app_id=${APP_ID}&app_key=${APP_KEY}`;

  // Validation schema for form
  const validationSchema = Yup.object({
    numberOfMeals: Yup.number()
      .required("Please enter the number of meals per day.")
      .min(1, "At least one meal is required.")
      .max(10, "Maximum of 10 meals allowed."),
    dietaryRestrictions: Yup.array().of(Yup.string()),
    calorieRange: Yup.string()
      .matches(
        /^\d+-\d+$/,
        "Calorie range must be in the format 'min-max', e.g., '1500-2000'."
      )
      .required("Please enter your desired calorie range."),
  });

  // Handler to fetch meal plan
  const handleMealPlan = async (values: {
    numberOfMeals: number;
    dietaryRestrictions: string[];
    calorieRange: string;
  }) => {
    setLoading(true);
    setError(null);
    setMealPlan(null);

    try {
      const [minCalories, maxCalories] = values.calorieRange
        .split("-")
        .map(Number);

      // Map dietary restrictions to API expected format
      let acceptAll: any[] = [];
      values.dietaryRestrictions.forEach((restriction) => {
        switch (restriction) {
          case "vegan":
            acceptAll.push({ health: ["VEGAN"] });
            break;
          case "vegetarian":
            acceptAll.push({ health: ["VEGETARIAN"] });
            break;
          // Add more mappings as needed
          default:
            break;
        }
      });

      const requestBody = {
        size: values.numberOfMeals,
        plan: {
          accept: {
            all: acceptAll,
          },
          fit: {
            ENERC_KCAL: { min: minCalories, max: maxCalories },
            PROCNT: { min: 50, max: 300 }, // Example values; adjust as needed.
          },
        },
      };

      const response = await axios.post(
        MEAL_PLANNER_API_URL,
        requestBody,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data) {
        setMealPlan(response.data);
      } else {
        setError("No meal plan data returned.");
      }
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(`Error: ${err.response.data.message}`);
      } else {
        setError("An error occurred while fetching the meal plan. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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
              Meal Planner
            </Typography>
          </Grid>

          {/* Form */}
          <Grid item xs={12}>
            <Formik
              initialValues={{
                numberOfMeals: 3,
                dietaryRestrictions: [] as string[],
                calorieRange: "1500-2000",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                handleMealPlan(values);
              }}
            >
              {({ errors, touched, values, setFieldValue }) => (
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
                          Enter Your Meal Preferences
                        </Typography>
                        <Tooltip
                          title={`Specify the number of meals per day, any dietary restrictions, and your desired calorie range (e.g., '1500-2000').`}
                          arrow
                        >
                          <IconButton>
                            <HelpOutlineIcon sx={{ color: "#FFA500" }} />
                          </IconButton>
                        </Tooltip>
                      </Box>

                      {/* Number of Meals */}
                      <Field
                        as={TextField}
                        type="number"
                        name="numberOfMeals"
                        label="Number of Meals per Day"
                        fullWidth
                        sx={{
                          backgroundColor: "#FFF",
                          borderRadius: "8px",
                          fontSize: "14px",
                          marginBottom: "16px",
                        }}
                        error={touched.numberOfMeals && Boolean(errors.numberOfMeals)}
                        helperText={touched.numberOfMeals && errors.numberOfMeals}
                        inputProps={{ min: 1, max: 10 }}
                      />

                      {/* Dietary Restrictions */}
                      <FormControl
                        fullWidth
                        sx={{ marginBottom: "16px", backgroundColor: "#FFF", borderRadius: "8px" }}
                      >
                        <InputLabel id="dietary-restrictions-label">Dietary Restrictions</InputLabel>
                        <Select
                          labelId="dietary-restrictions-label"
                          id="dietary-restrictions"
                          multiple
                          value={values.dietaryRestrictions}
                          onChange={(event) => {
                            setFieldValue("dietaryRestrictions", event.target.value);
                          }}
                          renderValue={(selected) => (selected as string[]).join(", ")}
                        >
                          {DIETARY_OPTIONS.map((option) => (
                            <MenuItem key={option} value={option}>
                              <Checkbox checked={values.dietaryRestrictions.indexOf(option) > -1} />
                              <ListItemText primary={option.charAt(0).toUpperCase() + option.slice(1)} />
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.dietaryRestrictions && errors.dietaryRestrictions && (
                          <Typography variant="caption" color="error">
                            {errors.dietaryRestrictions}
                          </Typography>
                        )}
                      </FormControl>

                      {/* Calorie Range */}
                      <Field
                        as={TextField}
                        name="calorieRange"
                        label="Calorie Range"
                        fullWidth
                        placeholder="E.g., '1500-2000'"
                        sx={{
                          backgroundColor: "#FFF",
                          borderRadius: "8px",
                          fontSize: "14px",
                          marginBottom: "16px",
                        }}
                        error={touched.calorieRange && Boolean(errors.calorieRange)}
                        helperText={touched.calorieRange && errors.calorieRange}
                      />

                      {/* Submit Button */}
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
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Meal Plan"}
                      </Button>
                    </CardContent>
                  </Card>
                </Form>
              )}
            </Formik>
          </Grid>

          {/* Results */}
          {mealPlan && (
            <Grid item xs={12}>
              <Card
                sx={{
                  padding: "24px",
                  background: "linear-gradient(135deg, #3C3C3C, #555555)",
                  color: "#FFF",
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ marginBottom: "16px", textAlign: "center", color: "#FFA500" }}
                  >
                    Your Meal Plan Selections
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
                    {mealPlan.selection?.map((item: any, index: number) => (
                      <Box
                        key={index}
                        sx={{
                          marginBottom: "16px",
                          padding: "12px",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        <Typography variant="h6" sx={{ color: "#FF8C00", fontWeight: "bold" }}>
                          Recipe ID:
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#FFF" }}>
                          {item.assigned}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#CCC", mt: 1 }}>
                          Details Link:{" "}
                          <a
                            href={item._links.self.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#FFA500" }}
                          >
                            {item._links.self.title}
                          </a>
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Box
                    mt={2}
                    bgcolor="#222"
                    color="#0f0"
                    p={2}
                    borderRadius="8px"
                    sx={{ fontSize: "12px", overflowX: "auto" }}
                  >
                    <Typography variant="caption">Raw Response JSON:</Typography>
                    <pre>{JSON.stringify(mealPlan, null, 2)}</pre>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}

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

export default MealPlannerPage;
