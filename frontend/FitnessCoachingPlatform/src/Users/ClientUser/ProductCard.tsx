// src/components/Products/ProductCard.tsx

import React, { useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  CardMedia,
  Box,
  Button
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../../context/UserContext";

/** Placeholder image in case of error */
const placeholderImage =
  "https://via.placeholder.com/400x200.png?text=No+Image";

/** ProductProps interface for ProductCard */
type ProductProps = {
  id: string; // product _id
  productName: string;
  description: string;
  price: number;
  image: string; // Base64-encoded
  imageType?: string;
};

const ProductCard: React.FC<ProductProps> = ({
  id,
  productName,
  description,
  price,
  image,
  imageType = "jpeg"
}) => {
  const { userData } = useContext(UserContext);

  /** Construct the data URI for the image */
  const imageSrc = image
    ? `data:image/${imageType};base64,${image}`
    : placeholderImage;

  // Handler for "Add to Cart"
  const handleAddToCart = async () => {
    if (!userData) {
      // Not logged in
      toast.error("You must be logged in to add items to the cart", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/cart/add", {
        username: userData.username,
        productId: id,
        quantity: 1,
      });
      toast.success(`Added "${productName}" to cart!`, {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
      console.log(response.data);
    } catch (error: any) {
      if (error?.response?.status === 400) {
        // "Product already in cart"
        toast.error(error.response.data.message, {
          position: "bottom-right",
          autoClose: 2000,
          theme: "colored",
        });
      } else {
        toast.error("Failed to add to cart. Please try again.", {
          position: "bottom-right",
          autoClose: 2000,
          theme: "colored",
        });
        console.error(error);
      }
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
          maxWidth: "350px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
          backgroundColor: "#1E1E1E",
          color: "#FFFFFF",
          overflow: "hidden",
          margin: "auto",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="220"
            src={imageSrc}
            alt={`${productName} Product`}
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
        </Box>
        <CardContent sx={{ padding: 3, flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{
              textAlign: "left",
              fontWeight: 700,
              fontSize: 20,
              color: "#FF8C00",
              marginBottom: 1,
              transition: "color 0.3s",
              "&:hover": {
                color: "#FFA500",
              },
            }}
          >
            {productName}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: "left",
              fontSize: 14,
              color: "#CCCCCC",
              marginBottom: 2,
            }}
          >
            {description}
          </Typography>
          <Typography
            variant="h6"
            sx={{ textAlign: "left", fontWeight: 700, color: "#FFFFFF" }}
          >
            ${price.toFixed(2)}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", paddingBottom: 3 }}>
          <Button
            variant="contained"
            size="medium"
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
            sx={{
              color: "#FFFFFF",
              backgroundColor: "#FF8C00",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "8px",
              paddingX: 2,
              ":hover": {
                backgroundColor: "#FF6F00",
              },
            }}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
