import { useState, useEffect } from "react";
import React from "react";
import {
  Box,
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
  Container,
} from "@mui/material";
import LoadingIndicator from "../../../UI/components/LoadingIndicator";

interface Sport {
  id: number;
  name: string;
  description: string;
  image: string;
  caloriesPer30Min: number;
}

const CaloriesBurnedCalculator = () => {
  const [sports, setSports] = useState<Sport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
  const [time, setTime] = useState(30);
  const [weight, setWeight] = useState(70);
  const [calories, setCalories] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleOpen = (sport: Sport) => {
    setSelectedSport(sport);
    setCalories(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSport(null);
  };

  const calculateCalories = () => {
    if (selectedSport && time > 0 && weight > 0) {
      const baseCalories = selectedSport.caloriesPer30Min;
      const caloriesBurned = (baseCalories * weight * time) / (30 * 70);
      setCalories(parseFloat(caloriesBurned.toFixed(2)));
    }
  };

  const filteredSports = sports.filter((sport) =>
    sport.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
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
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              mb: 4,
              background: "linear-gradient(to right, #FF4500, #FF8C00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Calories Burned Calculator for Sports
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ textAlign: "center", color: "rgba(255, 255, 255, 0.7)", mb: 4 }}
          >
            Calories burned are approximate values based on average weight
            (70kg/154lbs). For accurate results, enter your weight and time.
          </Typography>

          <TextField
            variant="outlined"
            placeholder="Search for a sport..."
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            sx={{
              mb: 4,
              width: "50%",
              backgroundColor: "#FFF",
              borderRadius: 1,
              mx: "auto",
              display: "block",
              "& .MuiOutlinedInput-root": {
                padding: "0px",
                "& input": {
                  textAlign: "center",
                },
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
          />

          <Grid container spacing={4}>
            {filteredSports.map((sport) => (
              <Grid item xs={12} sm={6} md={4} key={sport.id}>
                <Card
                  sx={{
                    backgroundColor: "#222",
                    color: "#FFF",
                    borderRadius: 2,
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
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
                </Card>
              </Grid>
            ))}
          </Grid>

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
  );
};

export default CaloriesBurnedCalculator;
