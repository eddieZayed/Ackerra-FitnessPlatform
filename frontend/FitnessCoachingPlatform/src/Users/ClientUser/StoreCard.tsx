// src/components/Stores/StoreCard.tsx

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Box,
  Chip,
  Rating,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

/** Placeholder image in case of error */
const placeholderImage =
  "https://via.placeholder.com/400x200.png?text=No+Image";

/** Props interface for StoreCard */
type StoreProps = {
  id: string;
  name: string;
  address: string;
  city: string;
  image: string; // Base64 string without data URI prefix
  category: "supplements" | "clothes" | "equipments"; // Category prop
  imageType?: string; // Optional prop to specify image type
  rating?: number; // Optional prop for store rating
};

/** StoreCard Component */
const StoreCard: React.FC<StoreProps> = ({
  id,
  name,
  address,
  city,
  image,
  category,
  imageType = "jpeg", // Default to 'jpeg' if not provided
  rating = 1.5, // Default rating
}) => {
  const navigate = useNavigate();

  /** Construct the data URI for the image */
  const imageSrc = image
    ? `data:image/${imageType};base64,${image}`
    : placeholderImage;

  /** Function to get display label for category */
  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "clothes":
        return "Apparel";
      case "supplements":
        return "Nutrition";
      case "equipments":
        return "Equipment";
      default:
        return "General";
    }
  };

  /** Function to get color for category chip */
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "clothes":
        return "primary";
      case "supplements":
        return "success";
      case "equipments":
        return "warning";
      default:
        return "default";
    }
  };

  /** Function to get category icon */
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "clothes":
        return <LocalOfferIcon />;
      case "supplements":
        return <LocalDiningIcon />;
      case "equipments":
        return <FitnessCenterIcon />;
      default:
        return <LocalOfferIcon />;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0px 10px 25px rgba(0,0,0,0.3)" }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: "350px", // Increased maximum width for a larger card
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
          backgroundColor: "#1E1E1E", // Dark background for the card
          color: "#FFFFFF",
          overflow: "hidden",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: "0px 10px 25px rgba(0,0,0,0.3)",
          },
          margin: "auto", // Center the card horizontally
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="220" // Increased height for a more prominent image
            src={imageSrc}
            alt={`${name} Store`}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.src = placeholderImage;
            }}
            sx={{
              objectFit: "contain",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
          {/* Category Badge */}
          <Chip
            label={getCategoryLabel(category)}
            color={getCategoryColor(category)}
            icon={getCategoryIcon(category)}
            size="small"
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(5px)",
              fontWeight: 600,
              textTransform: "capitalize",
              color: "#000000",
            }}
          />
        </Box>
        <CardContent sx={{ padding: 3, flexGrow: 1 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              textAlign: "left",
              fontWeight: 700,
              fontSize: 22,
              color: "#FF8C00", // Vibrant orange
              marginBottom: 1,
              transition: "color 0.3s",
              "&:hover": {
                color: "#FFA500", // Lighter orange on hover
              },
            }}
          >
            {name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <LocationOnIcon fontSize="small" sx={{ mr: 0.5, color: "#FFA500" }} />
            <Typography
              variant="body2"
              sx={{ textAlign: "left", fontSize: 14, color: "#CCCCCC" }}
            >
              {address}, {city}
            </Typography>
          </Box>
          {/* Rating */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Rating
              name="store-rating"
              value={rating}
              precision={0.5}
              readOnly
              sx={{ color: "#FFA500" }}
            />
            <Typography
              variant="body2"
              sx={{ marginLeft: 1, color: "#CCCCCC", fontSize: 14 }}
            >
              {rating} / 5
            </Typography>
          </Box>
          {/* Additional Info */}
          <Typography
            variant="body2"
            sx={{ textAlign: "left", fontSize: 14, color: "#CCCCCC" }}
          >
            Category: {getCategoryLabel(category)}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", paddingBottom: 3 }}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            sx={{
              width: "80%",
              maxWidth: "250px",
              color: "#FFFFFF",
              background: "linear-gradient(to right, #FF8C00, #FF6F00)",
              fontSize: "16px",
              fontWeight: 600,
              borderRadius: "30px",
              textTransform: "none",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
              transition: "background 0.3s, box-shadow 0.3s",
              "&:hover": {
                background: "linear-gradient(to right, #FF6F00, #FF8C00)",
                boxShadow: "0px 6px 15px rgba(0,0,0,0.3)",
              },
            }}
            onClick={() => navigate(`/products/${id}`)}
            aria-label={`View products for ${name}`}
          >
            View Products
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default StoreCard;
