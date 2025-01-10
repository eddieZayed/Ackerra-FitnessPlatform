import React, { useState, useEffect, ChangeEvent } from "react";
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
      main: "#FF4500",
    },
    secondary: {
      main: "#FFA500",
    },
    background: {
      default: "#121212",
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

/** Container for the search bar */
const SearchBarContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#2C2C2C",
  padding: theme.spacing(1),
  borderRadius: 8,
  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.5)",
  marginBottom: theme.spacing(2),
}));

/** Styled MUI TextField for the search input */
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

/** Styled Card that scales on hover */
const HoverCard = styled(Card)(() => ({
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

/** TypeScript interface for Exercise */
interface Exercise {
  _id: string;
  gifUrl: string;
  name: string;
  instructions: string[];
  targetMuscles: string[];
  bodyParts: string[];
  equipments: string[];
  secondaryMuscles: string[];
}

const ExercisesPage: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const placeholderImage = "https://via.placeholder.com/300x200.png?text=No+Image";

  /** Fetch exercises */
  const fetchExercises = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/exercises?page=${currentPage}&limit=50`
      );
      if (response.status === 429) {
        throw new Error("Too Many Requests - Please try again later.");
      } else if (response.status === 403) {
        throw new Error("Forbidden - Please check API access permissions.");
      }
      const jsonData = await response.json();
      if (jsonData.success) {
        setExercises(jsonData.data);
        setTotalPages(jsonData.pagination?.totalPages || 1);
      } else {
        setExercises([]);
      }
    } catch (error: any) {
      console.error("Error fetching exercises:", error);
      alert(error.message);
      setExercises([]);
    } finally {
      setLoading(false);
    }
  };

  /** Search exercises */
  const searchExercises = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/exercises/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: searchTerm, page: currentPage, limit: 50 }),
      });
      if (response.status === 429) {
        throw new Error("Too Many Requests - Please try again later.");
      } else if (response.status === 403) {
        throw new Error("Forbidden - Please check API access permissions.");
      }
      const jsonData = await response.json();
      if (jsonData.success) {
        setExercises(jsonData.data);
        setTotalPages(jsonData.pagination?.totalPages || 1);
      } else {
        setExercises([]);
      }
    } catch (error: any) {
      console.error("Error searching exercises:", error);
      alert(error.message);
      setExercises([]);
    } finally {
      setLoading(false);
    }
  };

  /** Effect to load exercises on page or search term change */
  useEffect(() => {
    if (searchTerm.trim()) {
      searchExercises();
    } else {
      fetchExercises();
    }
  }, [currentPage, searchTerm]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (_: any, page: number) => {
    setCurrentPage(page);
  };

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
          <HeaderBox>
            <Typography
              variant="h3"
              sx={{ color: darkTheme.palette.primary.main, fontWeight: "bold", mb: 2 }}
            >
              Exercise Library
            </Typography>
            <Typography variant="h6" sx={{ color: darkTheme.palette.text.secondary }}>
              Search and explore a wide variety of exercises.
            </Typography>
          </HeaderBox>

          <Box component="form" sx={{ mb: 2 }}>
            <SearchBarContainer>
              <StyledTextField
                variant="outlined"
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <IconButton color="primary" sx={{ backgroundColor: "#FF4500", ml: 1 }}>
                <SearchIcon sx={{ color: "#FFF" }} />
              </IconButton>
            </SearchBarContainer>
          </Box>

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
                  No exercises found.
                </Typography>
              ) : (
                <Grid container spacing={3}>
                  {exercises.map((exercise) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={exercise._id}>
                      <HoverCard>
                        <CardMedia
                          component="img"
                          sx={{ height: 200, objectFit: "cover" }}
                          src={exercise.gifUrl || placeholderImage}
                          alt={exercise.name || "Exercise"}
                          onError={(e: any) => {
                            e.target.onerror = null; // Prevent infinite loop
                            e.target.src = placeholderImage; // Set to placeholder
                          }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" gutterBottom sx={{ color: "#FFF" }}>
                            {exercise.name || "Unknown Exercise"}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#ccc" }}>
                            <strong>Target:</strong> {exercise.targetMuscles.join(", ") || "N/A"}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#ccc" }}>
                            <strong>Body Parts:</strong> {exercise.bodyParts.join(", ") || "N/A"}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#ccc" }}>
                            <strong>Equipment:</strong> {exercise.equipments.join(", ") || "N/A"}
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
                              "&:hover": { backgroundColor: "#FF5722" },
                            }}
                          >
                            See Details
                          </Button>
                        </CardActions>
                      </HoverCard>
                    </Grid>
                  ))}
                </Grid>
              )}

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
                    onChange={handlePageChange}
                    color="primary"
                    siblingCount={1}
                    boundaryCount={1}
                  />
                </Paper>
              </Box>
            </>
          )}
        </Container>

        <Dialog
          open={detailsOpen}
          onClose={handleCloseDetails}
          maxWidth="md"
          fullWidth
          PaperProps={{
            style: { backgroundColor: "#1E1E1E", color: "#FFF" },
          }}
        >
          <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ flex: 1 }}>{selectedExercise?.name || "Exercise Details"}</Box>
            <IconButton sx={{ color: "#FFF" }} onClick={handleCloseDetails}>
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
                  Name: <span style={{ color: "#FFF" }}>{selectedExercise.name || "N/A"}</span>
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 1, color: "#FF4500", fontSize: "1.1rem" }}
                >
                  Target Muscles: <span style={{ color: "#FFF" }}>{selectedExercise.targetMuscles.join(", ") || "N/A"}</span>
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 1, color: "#FF4500", fontSize: "1.1rem" }}
                >
                  Body Parts: <span style={{ color: "#FFF" }}>{selectedExercise.bodyParts.join(", ") || "N/A"}</span>
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 1, color: "#FF4500", fontSize: "1.1rem" }}
                >
                  Equipment: <span style={{ color: "#FFF" }}>{selectedExercise.equipments.join(", ") || "N/A"}</span>
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 1, color: "#FF4500", fontSize: "1.1rem" }}
                >
                  Secondary Muscles: <span style={{ color: "#FFF" }}>{selectedExercise.secondaryMuscles.join(", ") || "N/A"}</span>
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 1, color: "#FF4500", fontSize: "1.1rem" }}
                >
                  Instructions:
                </Typography>
                {selectedExercise.instructions.map((step, idx) => (
                  <Typography
                    variant="body2"
                    sx={{ mb: 0.5, fontSize: "1rem", color: "#FFF" }}
                    key={idx}
                  >
                    - {step}
                  </Typography>
                ))}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleCloseDetails}
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
