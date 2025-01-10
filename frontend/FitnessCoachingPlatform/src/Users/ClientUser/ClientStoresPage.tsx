// src/components/Stores/Stores.tsx

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
  CircularProgress,
  createTheme,
  ThemeProvider,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Button,
  Alert,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { motion } from "framer-motion";
import backgroundImage from "../../assets/img/ShopwallPaper.webp";

import StoreCard from "./StoreCard";
import { useStoreContext } from "../../context/StoreContext";

/** ------------------ THEME SETUP ------------------ */
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#FF4500" }, // Vibrant orange
    secondary: { main: "#FFA500" }, 
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#CCCCCC",
    },
    error: { main: "#FF4D4D" },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    body1: { fontSize: "1rem" },
  },
});

/** Styled TextField for Search */
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": { borderColor: theme.palette.primary.main },
    "&:hover fieldset": { borderColor: theme.palette.secondary.main },
    "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
    backgroundColor: "#2C2C2C",
    color: "#FFFFFF",
    "& .MuiInputBase-input::placeholder": {
      color: "#AAAAAA",
    },
  },
}));

// Define the Location interface
interface Location {
  address: string;
  city: string;
}

// Define the Store interface
interface Store {
  id: string;
  name: string;
  location: Location;
  email: string;
  ownerId: string;
  image: string;
  category: "supplements" | "clothes" | "equipments";
}

const Stores: React.FC = () => {
  const { stores, loading, error } = useStoreContext();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredStores, setFilteredStores] = useState<Store[]>(stores || []);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    { display: "All Categories", value: "All" },
    { display: "Apparel Stores", value: "clothes" },
    { display: "Nutrition Stores", value: "supplements" },
    { display: "Equipment Stores", value: "equipments" },
  ];

  // Recompute filtered stores whenever stores, searchQuery, or selectedCategory changes
  useEffect(() => {
    const applyFilters = async () => {
      if (!stores) return;
      
      // If search query is empty
      if (searchQuery.trim() === "") {
        if (selectedCategory === "All") {
          setFilteredStores(stores);
        } else {
          setFilteredStores(
            stores.filter((store) => store.category === selectedCategory)
          );
        }
      } else {
        setSearchLoading(true);
        const searchUrl = `http://localhost:5000/api/stores/SearchStores?name=${encodeURIComponent(
          searchQuery
        )}`;

        try {
          const response = await fetch(searchUrl);
          if (!response.ok) {
            throw new Error("No stores found for the given name.");
          }
          let searchResults: Store[] = await response.json();

          // If category is not "All", filter by category
          if (selectedCategory !== "All") {
            searchResults = searchResults.filter(
              (store) => store.category === selectedCategory
            );
          }

          setFilteredStores(searchResults);
        } catch (error) {
          setFilteredStores([]);
        } finally {
          setSearchLoading(false);
        }
      }
    };

    applyFilters();
  }, [stores, searchQuery, selectedCategory]);

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle category toggle
  const handleCategoryChange = (
    _event: React.MouseEvent<HTMLElement>,
    newCategory: string | null
  ) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  };

  // Clear the search text
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // (Optional) Called when user clicks search button
  const handleSearch = () => {
    // The filtering is done automatically in useEffect
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          // Same background style as Products page
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          py: 8,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 1,
          },
        }}
      >
        {/* Ensure content is above overlay */}
        <Box sx={{ position: "relative", zIndex: 2 }}>
          {/* Header Section */}
          <Container maxWidth="md" sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h4"
              component={motion.h1}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              sx={{
                fontWeight: 700,
                mb: 2,
                color: darkTheme.palette.primary.main,
              }}
            >
              Ackerra Fitness Stores
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: darkTheme.palette.text.secondary,
                fontSize: "1.1rem",
                lineHeight: 1.6,
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Discover and explore all the amazing fitness stores in your area. 
              Search by name or category to find the perfect store for your needs.
            </Typography>
          </Container>

          {/* Search & Category Filters */}
          <Container maxWidth="md" sx={{ mb: 6 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                justifyContent="center"
                alignItems="center"
                gap={2}
              >
                {/* Search Input */}
                <StyledTextField
                  fullWidth
                  placeholder="Search for stores..."
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment:
                      searchQuery && (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClearSearch}
                            edge="end"
                            aria-label="clear search"
                          >
                            <ClearIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                  }}
                  aria-label="Search for stores"
                />

                {/* Search Button */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={!searchLoading ? handleSearch : undefined}
                  disabled={searchLoading}
                  sx={{
                    height: "56px",
                    width: { xs: "100%", sm: "150px" },
                    textTransform: "none",
                    fontWeight: 600,
                    background: "linear-gradient(to right, #FF8C00, #FF6F00)",
                    "&:hover": {
                      background: "linear-gradient(to right, #FF6F00, #FF8C00)",
                    },
                  }}
                  aria-label="Search stores"
                >
                  {searchLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Search"
                  )}
                </Button>
              </Box>

              {/* Category Toggle Buttons */}
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ToggleButtonGroup
                  value={selectedCategory}
                  exclusive
                  onChange={handleCategoryChange}
                  aria-label="store category"
                  color="primary"
                  sx={{ flexWrap: "wrap", gap: 1 }}
                >
                  {categories.map((cat) => (
                    <ToggleButton
                      key={cat.value}
                      value={cat.value}
                      aria-label={cat.display.toLowerCase()}
                      sx={{
                        borderRadius: "20px",
                        paddingX: 3,
                        paddingY: 1,
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        "&.Mui-selected": {
                          background: "linear-gradient(to right, #FF8C00, #FF6F00)",
                          color: "#FFFFFF",
                          "&:hover": {
                            background: "linear-gradient(to right, #FF6F00, #FF8C00)",
                          },
                        },
                      }}
                    >
                      {cat.display}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>
            </motion.div>
          </Container>

          <Divider
            sx={{
              borderColor: "#FF8C00",
              marginX: "auto",
              maxWidth: "80%",
              opacity: 0.3,
              mb: 4,
            }}
          />

          {/* Store Cards Section */}
          <Container maxWidth="lg">
            <Box sx={{ position: "relative", minHeight: "400px" }}>
              {/* Loading Overlay */}
              {(loading || searchLoading) && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(28, 28, 28, 0.8)",
                    zIndex: 2,
                    borderRadius: "8px",
                  }}
                >
                  <CircularProgress color="primary" />
                  <Typography
                    variant="body1"
                    sx={{ ml: 2, color: darkTheme.palette.text.primary }}
                  >
                    Loading stores, please wait...
                  </Typography>
                </Box>
              )}

              {/* Error or Store Cards */}
              {error ? (
                <Alert severity="error" sx={{ marginBottom: "20px" }}>
                  {error}
                </Alert>
              ) : (
                <Grid
                  container
                  spacing={4}
                  sx={{
                    opacity: loading || searchLoading ? 0.5 : 1,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {filteredStores && filteredStores.length > 0 ? (
                    filteredStores.map((store) => (
                      <Grid item xs={12} sm={6} md={6} lg={4} key={store.id}>
                        <StoreCard
                          id={store.id}
                          name={store.name}
                          address={store.location.address}
                          city={store.location.city}
                          image={store.image}
                          category={store.category}
                          imageType="jpeg"
                        />
                      </Grid>
                    ))
                  ) : (
                    !loading &&
                    !searchLoading && (
                      <Grid item xs={12}>
                        <Typography
                          variant="h6"
                          align="center"
                          sx={{ color: darkTheme.palette.text.secondary }}
                        >
                          No stores found for the given search term.
                        </Typography>
                      </Grid>
                    )
                  )}
                </Grid>
              )}
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Stores;
