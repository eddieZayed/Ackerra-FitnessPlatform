import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Container,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

interface Supplement {
  id: number;
  name: string;
  category: string;
  description: string;
  brand: string;
  image: string;
}

const SupplementsRecommendationPage: React.FC = () => {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [filteredSupplements, setFilteredSupplements] = useState<Supplement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("");

  const fetchSupplements = async () => {
    try {
      const response = await axios.get<Supplement[]>("http://localhost:5000/api/supplements");
      const supplementsData = response.data;

      setSupplements(supplementsData);
      setFilteredSupplements(supplementsData);

      setCategories([...new Set(supplementsData.map((item) => item.category))].sort());
      setBrands([...new Set(supplementsData.map((item) => item.brand))].sort());
    } catch (error) {
      console.error("Error fetching supplements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupplements();
  }, []);

  const handleCategoryChange = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
    filterSupplements(updatedCategories, selectedBrand);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    filterSupplements(selectedCategories, brand);
  };

  const filterSupplements = (categories: string[], brand: string) => {
    let filtered = supplements;

    if (categories.length > 0) {
      filtered = filtered.filter((item) => categories.includes(item.category));
    }

    if (brand) {
      filtered = filtered.filter((item) => item.brand === brand);
    }

    setFilteredSupplements(filtered);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        color: "#FFF",
        padding: "40px 0",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* Fixed Animated Dark Gradient Background */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(-45deg, #1E1E1E, #292929, #333333, #1E1E1E)",
          backgroundSize: "400% 400%",
          animation: "gradientAnimation 12s ease infinite",
          zIndex: -1,
        }}
      />
      <style>
        {`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <Container>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "40px",
            background: "linear-gradient(to right, #FF4500, #FFA500)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Supplements Recommendations
        </Typography>

        <Box sx={{ marginBottom: "30px", display: "flex", flexDirection: "column", gap: "20px" }}>
          <FormControl
            fullWidth
            sx={{
              width: "50%",
              margin: "0 auto",
              backgroundColor: "#2C2C2C",
              padding: "10px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
            }}
          >
            <InputLabel sx={{ color: "#FF4500" }}>Filter by Brand</InputLabel>
            <Select
              value={selectedBrand}
              onChange={(e) => handleBrandChange(e.target.value)}
              sx={{
                backgroundColor: "#333",
                color: "#FFF",
                "& .MuiMenuItem-root": {
                  color: "#FFF",
                },
              }}
            >
              <MenuItem value="">All Brands</MenuItem>
              {brands.map((brand, index) => (
                <MenuItem key={index} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box>
            <Typography
              variant="h6"
              sx={{
                marginBottom: "10px",
                color: "#FF4500",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Filter by Category
            </Typography>
            <FormGroup row sx={{ justifyContent: "center" }}>
              {categories.map((category, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      sx={{
                        color: "#FF4500",
                        "&.Mui-checked": {
                          color: "#FF8C00",
                        },
                      }}
                    />
                  }
                  label={category}
                  sx={{
                    margin: "0 10px",
                    color: "#FFF",
                  }}
                />
              ))}
            </FormGroup>
          </Box>
        </Box>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {filteredSupplements.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    backgroundColor: "rgba(28, 28, 28, 0.9)",
                    color: "#FFF",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.4)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 8px 20px rgba(255, 165, 0, 0.6)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    sx={{
                      objectFit: "contain",
                      maxHeight: "300px",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        marginBottom: "8px",
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "#FF4500",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255, 255, 255, 0.8)",
                        marginBottom: "16px",
                        textAlign: "center",
                      }}
                    >
                      {item.description}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "rgba(255, 255, 255, 0.6)",
                        textAlign: "center",
                      }}
                    >
                      Brand: {item.brand}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "rgba(255, 255, 255, 0.6)",
                        textAlign: "center",
                      }}
                    >
                      Category: {item.category}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default SupplementsRecommendationPage;
