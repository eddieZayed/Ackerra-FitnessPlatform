import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  CircularProgress,
  IconButton,
  styled,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import LoadingIndicator from "../../../UI/components/LoadingIndicator";

/** ------------------ THEME SETUP ------------------ */
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF4500", // brand orange
    },
    secondary: {
      main: "#FFA500", // brand secondary orange
    },
    background: {
      default: "#121212", // dark background
      paper: "#1E1E1E",
    },
    text: {
      primary: "#FFF",
      secondary: "#ccc",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

/** We'll create a styled container for the top "header" (title text). */
const HeaderBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(6),
  },
}));

/** We'll replicate the "SearchBarContainer" design from your library code. */
const SearchBarContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#2C2C2C",
  padding: theme.spacing(1),
  borderRadius: 8,
  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.5)",
  marginBottom: theme.spacing(2),
}));

/** We'll replicate the "StyledTextField" from your library code. */
const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  marginRight: theme.spacing(1),
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#FFF",
    color: "#000",
    borderRadius: 8,
    "& fieldset": {
      borderColor: "#FF8C00",
    },
    "&:hover fieldset": {
      borderColor: "#FF4500",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FF4500",
    },
  },
}));

/** We'll create a styled Card for a subtle hover transform. */
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#222",
  color: "#FFF",
  borderRadius: 2,
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

/** We'll define your data interface. */
interface Sport {
  id: number;
  name: string;
  description: string;
  image: string;
  caloriesPer30Min: number;
}

const CaloriesBurnedCalculator: React.FC = () => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // For the "Calculate Calories" dialog
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);

  // For time/weight input in the dialog
  const [time, setTime] = useState<number>(30);
  const [weight, setWeight] = useState<number>(70);
  const [calories, setCalories] = useState<number | null>(null);

  // For the search bar
  const [searchTerm, setSearchTerm] = useState<string>("");

  // 1. Fetch your sports data from your local backend
  useEffect(() => {
    const fetchSportsData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sports");
        const data: Sport[] = await response.json();
        setSports(data);
      } catch (error) {
        console.error("Failed to fetch sports data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSportsData();
  }, []);

  // 2. Filter by name using searchTerm
  const filteredSports = sports.filter((sport) =>
    sport.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 3. Handlers for the dialog
  const handleOpen = (sport: Sport) => {
    setSelectedSport(sport);
    setCalories(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSport(null);
  };

  // 4. Calculate the calories
  const calculateCalories = () => {
    if (selectedSport && time > 0 && weight > 0) {
      const baseCalories = selectedSport.caloriesPer30Min;
      const caloriesBurned = (baseCalories * weight * time) / (30 * 70);
      setCalories(parseFloat(caloriesBurned.toFixed(2)));
    }
  };

  // 5. Handler for search text field
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #121212, #1C1C1C)",
          color: "#FFF",
          py: 6,
        }}
      >
        {isLoading && <LoadingIndicator message="Fetching sports data..." />}
        {!isLoading && (
          <Container>
            {/* Title Header */}
            <HeaderBox>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  background: "linear-gradient(to right, #FF4500, #FF8C00)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Calories Burned Calculator for Sports
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: "rgba(255, 255, 255, 0.7)" }}
              >
                Calories burned are approximate values based on average weight (70kg).
                For accuracy, enter your own weight and time spent.
              </Typography>
            </HeaderBox>

            {/* Search Bar */}
            <Box component="form" sx={{ mb: 4 }}>
              <SearchBarContainer>
                <StyledTextField
                  variant="outlined"
                  placeholder="Search for a sport..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <IconButton
                  color="primary"
                  type="submit"
                  sx={{ backgroundColor: "#FF4500" }}
                >
                  <SearchIcon sx={{ color: "#FFF" }} />
                </IconButton>
              </SearchBarContainer>
            </Box>

            {/* Grid of Filtered Sports */}
            <Grid container spacing={4}>
              {filteredSports.map((sport) => (
                <Grid item xs={12} sm={6} md={4} key={sport.id}>
                  <StyledCard>
                    <CardMedia
                      component="img"
                      image={sport.image}
                      alt={sport.name}
                      sx={{
                        height: 180,
                        objectFit: "contain",
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                      }}
                    />
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
                      >
                        {sport.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255, 255, 255, 0.8)",
                          textAlign: "center",
                        }}
                      >
                        {sport.description}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          textAlign: "center",
                          mt: 1,
                          fontWeight: "bold",
                          color: "#FF8C00",
                        }}
                      >
                        ~{sport.caloriesPer30Min} calories/30 min
                      </Typography>
                      <Button
                        variant="contained"
                        color="warning"
                        fullWidth
                        sx={{ mt: 2, fontWeight: "bold" }}
                        onClick={() => handleOpen(sport)}
                      >
                        Calculate Calories
                      </Button>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>

            {/* Dialog for Calculating Calories */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
              <DialogTitle
                sx={{
                  background: "linear-gradient(to right, #FF4500, #FF8C00)",
                  color: "#FFF",
                  textAlign: "center",
                  fontWeight: "bold",
                  padding: "16px",
                }}
              >
                Calculate Calories Burned
              </DialogTitle>
              <DialogContent
                sx={{
                  backgroundColor: "#1C1C1C",
                  color: "#FFF",
                  padding: "24px",
                }}
              >
                {selectedSport && (
                  <Box>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#FF8C00",
                      }}
                    >
                      {selectedSport.name}
                    </Typography>
                    <TextField
                      label="Time (minutes)"
                      type="number"
                      value={time}
                      onChange={(e) => setTime(Number(e.target.value))}
                      fullWidth
                      margin="dense"
                      sx={{
                        mb: 2,
                        backgroundColor: "#2E2E2E",
                        borderRadius: 1,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#FF8C00",
                          },
                          "&:hover fieldset": {
                            borderColor: "#FF4500",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#FF4500",
                          },
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography color="#FF8C00">min</Typography>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      label="Weight (kg)"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      fullWidth
                      margin="dense"
                      sx={{
                        backgroundColor: "#2E2E2E",
                        borderRadius: 1,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#FF8C00",
                          },
                          "&:hover fieldset": {
                            borderColor: "#FF4500",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#FF4500",
                          },
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography color="#FF8C00">kg</Typography>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {calories && (
                      <Typography
                        variant="h6"
                        sx={{
                          mt: 2,
                          textAlign: "center",
                          color: "#FF8C00",
                          fontWeight: "bold",
                        }}
                      >
                        You burned approximately {calories} calories!
                      </Typography>
                    )}
                  </Box>
                )}
              </DialogContent>
              <DialogActions
                sx={{
                  backgroundColor: "#1C1C1C",
                  padding: "16px",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={handleClose}
                  sx={{
                    color: "#FFF",
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Close
                </Button>
                <Button
                  onClick={calculateCalories}
                  variant="contained"
                  sx={{
                    background: "linear-gradient(to right, #FF4500, #FF8C00)",
                    color: "#FFF",
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": {
                      background: "linear-gradient(to right, #FF5733, #FF8C00)",
                    },
                  }}
                >
                  Calculate
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default CaloriesBurnedCalculator;
