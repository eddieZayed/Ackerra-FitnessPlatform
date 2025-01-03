import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  createTheme,
  Box,
  Container,
  Typography,
  TextField,
  IconButton,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination,
  Paper,
  CircularProgress,
  styled,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";

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

/** A styled container for the top "header" */
const HeaderBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: 8,
  marginBottom: theme.spacing(4),
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  textAlign: "center",
}));

/** A styled container for the search bar (non-functional) */
const SearchBarContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#2C2C2C",
  padding: theme.spacing(1),
  borderRadius: 8,
  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.5)",
  marginBottom: theme.spacing(2),
}));

/** A styled MUI TextField for the search input (does nothing) */
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

/** We'll create a styled Card that scales on hover */
const HoverCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: 8,
  backgroundColor: "#1E1E1E",
  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 6px 15px rgba(0,0,0,0.5)",
  },
}));

/** Type for exercises (based on your example) */
interface Exercise {
  exerciseId: string;
  gifUrl: string;
  name: string;
  instructions: string[];
  targetMuscles: string[];
  bodyParts: string[];
  equipments: string[];
  secondaryMuscles: string[];
}

/** The main component */
const ExercisesPage: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // We'll store total pages from the API
  const [totalPages, setTotalPages] = useState<number>(1);
  // We'll store the current page
  const [currentPage, setCurrentPage] = useState<number>(1);

  // For the details dialog
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // Non-functional search bar state
  const [searchTerm, setSearchTerm] = useState<string>("");

  // 20 items per page
  const exercisesPerPage = 20;

  // Placeholder image if the real GIF fails
  const placeholderImage = "https://via.placeholder.com/300x200.png?text=No+Image";

  /** 1. Fetch data from exercisedb with offset, limit=20 */
  const fetchExercises = async () => {
    setLoading(true);
    try {
      const offset = (currentPage - 1) * exercisesPerPage;
      const response = await fetch(
        `https://exercisedb-api.vercel.app/api/v1/exercises?offset=${offset}&limit=${exercisesPerPage}`
      );
      const jsonData = await response.json();

      /*
        Expected shape:
        {
          success: true,
          data: {
            nextPage: "http...",
            totalPages: 133,
            currentPage: 1,
            exercises: [...],
            ...
          }
        }
      */

      if (!jsonData?.data) {
        console.error("Unexpected response:", jsonData);
        setExercises([]);
        setTotalPages(1);
      } else {
        const { exercises: exArr = [], totalPages: tPages = 1 } = jsonData.data;
        setExercises(exArr);
        setTotalPages(tPages);
      }
    } catch (error) {
      console.error("Error fetching exercises:", error);
      setExercises([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  /** On mount and whenever currentPage changes, re-fetch from the API */
  useEffect(() => {
    fetchExercises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  /** Non-functional search bar handlers (just for show) */
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // We do nothing, it's purely decorative
    console.log(`Search submitted: ${searchTerm} (no actual filtering)`);
  };

  /** Pagination handler */
  const handlePageChange = (_: any, page: number) => {
    setCurrentPage(page);
  };

  /** Details dialog */
  const handleOpenDetails = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setDetailsOpen(true);
  };
  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedExercise(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: darkTheme.palette.background.default,
          pb: 4,
        }}
      >
        <Container maxWidth="lg" sx={{ pt: 4 }}>
          {/* Header */}
          <HeaderBox>
            <Typography
              variant="h3"
              sx={{
                color: darkTheme.palette.primary.main,
                fontWeight: "bold",
                mb: 2,
              }}
            >
              Exercise Library
            </Typography>
            <Typography variant="h6" sx={{ color: darkTheme.palette.text.secondary }}>
              A huge variety of exercises. 
              <br />
              The search bar below is purely decorative!
            </Typography>
          </HeaderBox>

          {/* Non-Functional Search Bar */}
          <Box component="form" onSubmit={handleSearchSubmit} sx={{ mb: 3 }}>
            <SearchBarContainer>
              <StyledTextField
                placeholder="(Non-functional) Search exercises..."
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
              <IconButton
                color="primary"
                type="submit"
                sx={{ backgroundColor: "#FF4500", ml: 1 }}
              >
                <SearchIcon sx={{ color: "#FFF" }} />
              </IconButton>
            </SearchBarContainer>
          </Box>

          {/* Main Content */}
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <>
              {exercises.length === 0 ? (
                <Typography
                  variant="h6"
                  sx={{ color: "#FFF", textAlign: "center", mt: 4 }}
                >
                  No exercises found or offset is out of range.
                </Typography>
              ) : (
                <>
                  <Grid container spacing={3}>
                    {exercises.map((exercise) => {
                      const {
                        exerciseId,
                        gifUrl,
                        name,
                        instructions,
                        targetMuscles,
                        bodyParts,
                        equipments,
                        secondaryMuscles,
                      } = exercise;

                      const muscleString = targetMuscles?.join(", ") || "N/A";
                      const bodyPartsString = bodyParts?.join(", ") || "N/A";
                      const equipString = equipments?.join(", ") || "N/A";
                      const secondaryString = secondaryMuscles?.join(", ") || "N/A";

                      return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={exerciseId}>
                          <HoverCard>
                            <CardMedia
                              component="img"
                              sx={{ height: 200, objectFit: "cover" }}
                              image={gifUrl || placeholderImage}
                              alt={name || "Exercise"}
                              onError={(e: any) => {
                                e.target.onerror = null;
                                e.target.src = placeholderImage;
                              }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                sx={{ color: "#FFF" }}
                              >
                                {name || "Unknown Exercise"}
                              </Typography>
                              <Typography variant="body2" sx={{ color: "#ccc" }}>
                                <strong>Target:</strong> {muscleString}
                              </Typography>
                              <Typography variant="body2" sx={{ color: "#ccc" }}>
                                <strong>Body Parts:</strong> {bodyPartsString}
                              </Typography>
                              <Typography variant="body2" sx={{ color: "#ccc" }}>
                                <strong>Equipment:</strong> {equipString}
                              </Typography>
                              <Typography variant="body2" sx={{ color: "#ccc" }}>
                                <strong>Secondary:</strong> {secondaryString}
                              </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: "center", p: 2 }}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleOpenDetails(exercise)}
                                endIcon={<InfoIcon />}
                                sx={{
                                  backgroundColor: "#FF4500",
                                  "&:hover": {
                                    backgroundColor: "#FF5722",
                                  },
                                }}
                              >
                                See Details
                              </Button>
                            </CardActions>
                          </HoverCard>
                        </Grid>
                      );
                    })}
                  </Grid>

                  {/* Pagination */}
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Paper
                      elevation={4}
                      sx={{
                        backgroundColor: "#2C2C2C",
                        paddingX: 2,
                        paddingY: 1,
                        borderRadius: 2,
                      }}
                    >
                      <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(_, page) => setCurrentPage(page)}
                        color="primary"
                        siblingCount={1}
                        boundaryCount={1}
                      />
                    </Paper>
                  </Box>
                </>
              )}
            </>
          )}
        </Container>

        {/* DETAILS DIALOG */}
        <Dialog
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            style: {
              backgroundColor: "#1E1E1E",
              color: "#FFF",
            },
          }}
        >
          <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ flex: 1 }}>
              {selectedExercise?.name || "Exercise Details"}
            </Box>
            <IconButton sx={{ color: "#FFF" }} onClick={() => setDetailsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {selectedExercise && (
              <Box>
                <Box sx={{ textAlign: "center", mb: 3 }}>
                  <img
                    src={selectedExercise.gifUrl || placeholderImage}
                    alt={selectedExercise.name || "Exercise"}
                    style={{
                      maxWidth: "100%",
                      maxHeight: 400,
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = placeholderImage;
                    }}
                  />
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 1, color: "#FF4500", fontSize: "1.1rem" }}
                >
                  <strong>Target Muscles:</strong>{" "}
                  {selectedExercise.targetMuscles?.join(", ") || "N/A"}
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 1, fontSize: "1.1rem" }}>
                  <strong>Body Parts:</strong>{" "}
                  {selectedExercise.bodyParts?.join(", ") || "N/A"}
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 1, fontSize: "1.1rem" }}>
                  <strong>Equipment:</strong>{" "}
                  {selectedExercise.equipments?.join(", ") || "N/A"}
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 1, fontSize: "1.1rem" }}>
                  <strong>Secondary Muscles:</strong>{" "}
                  {selectedExercise.secondaryMuscles?.join(", ") || "N/A"}
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ color: "#FF4500", mb: 1, fontSize: "1.2rem" }}
                  >
                    Instructions:
                  </Typography>
                  {selectedExercise.instructions && selectedExercise.instructions.length > 0 ? (
                    selectedExercise.instructions.map((step, idx) => (
                      <Typography
                        variant="body2"
                        sx={{ mb: 0.5, fontSize: "1rem" }}
                        key={idx}
                      >
                        - {step}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2" sx={{ color: "#ccc", fontSize: "1rem" }}>
                      No instructions available.
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setDetailsOpen(false)}
              startIcon={<CloseIcon />}
              sx={{ borderColor: "#FF4500", color: "#FF4500" }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default ExercisesPage;
