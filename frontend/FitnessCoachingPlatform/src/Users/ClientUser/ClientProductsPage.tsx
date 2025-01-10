// src/components/Products/Products.tsx

import React, { useState, useEffect, useContext } from "react";
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
  TextField,
  Button,
  Alert,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Stack,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { motion } from "framer-motion";
import backgroundImage from "../../assets/img/ShopwallPaper.webp";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// Local imports
import ProductCard from "./ProductCard";
import { useStoreContext } from "../../context/StoreContext";
import { UserContext } from "../../context/UserContext";


/** THEME SETUP (Dark) */
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
      primary: "#FFFFFF",
      secondary: "#CCCCCC",
    },
    error: {
      main: "#FF4D4D",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    body1: { fontSize: "1rem" },
  },
});

/** Transition for Dialog (slide up) */
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/** Styled TextField for Search */
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.secondary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
    backgroundColor: "#2C2C2C",
    color: "#FFFFFF",
    "& .MuiInputBase-input::placeholder": {
      color: "#AAAAAA",
    },
  },
}));

/** Product interface */
interface Product {
  _id: string;
  storeId: string;
  productName: string;
  description: string;
  price: number;
  image: string;
}

/** Cart item from backend */
interface CartItem {
  _id: string;
  productId: {
    _id: string;
    productName: string;
    price: number;
    image?: string;
  };
  quantity: number;
}

const Products: React.FC = () => {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  const { stores } = useStoreContext();
  const { userData } = useContext(UserContext);

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  // Cart modal state
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  const store = stores?.find((s) => s.id === storeId);
  const storeName = store ? store.name : "Store";

  /** Fetch all products for this store */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!storeId) throw new Error("Store ID is missing from URL.");

      const res = await axios.get<Product[]>(
        `http://localhost:5000/api/products/getStoreProducts/${storeId}`
      );
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Failed to fetch products for this store."
      );
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // On component mount or storeId change
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [storeId]);

  /** Searching products by name */
  const handleSearch = async () => {
    if (!storeId) return;
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
      return;
    }
    setSearchLoading(true);
    try {
      const response = await axios.get<Product[]>(
        `http://localhost:5000/api/products/SearchProducts`,
        {
          params: {
            storeId,
            productName: searchQuery,
          },
        }
      );
      setFilteredProducts(response.data);
      setError(null);
    } catch (err) {
      setFilteredProducts([]);
      setError("No products found for the given search term.");
    } finally {
      setSearchLoading(false);
    }
  };

  /** Clear search input */
  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredProducts(products);
  };

  /** On typing in the search box */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  /** View Cart button -> open cart modal */
  const handleOpenCart = async () => {
    if (!userData) {
      toast.error("You must be logged in to view your cart", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }
    await fetchCart();
    setCartOpen(true);
  };

  /** Fetch cart from backend */
  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/cart/${userData?.username}`
        
      );
      setCartItems(res.data.cart?.items || []);
      setTotalCost(res.data.totalCost || 0);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load cart. Please try again.", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  /** Increase quantity */
  const handleIncreaseQuantity = async (productId: string, quantity: number) => {
    if (!userData) return;
    try {
      await axios.patch("http://localhost:5000/api/cart/update-quantity", {
        username: userData.username,
        productId,
        quantity: quantity + 1,
      });
      await fetchCart();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity.", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  /** Decrease quantity */
  const handleDecreaseQuantity = async (productId: string, quantity: number) => {
    if (!userData) return;
    if (quantity <= 1) {
      // Could remove item if quantity is 1
      toast.error("Quantity cannot be less than 1.", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }
    try {
      await axios.patch("http://localhost:5000/api/cart/update-quantity", {
        username: userData.username,
        productId,
        quantity: quantity - 1,
      });
      await fetchCart();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity.", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  /** Remove item from cart */
  const handleRemoveItem = async (productId: string) => {
    if (!userData) return;
    try {
      await axios.delete("http://localhost:5000/api/cart/remove", {
        data: {
          username: userData.username,
          productId,
        },
      });
      await fetchCart();
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item.", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  /** Clear entire cart */
  const handleClearCart = async () => {
    if (!userData) return;
    try {
      await axios.delete("http://localhost:5000/api/cart/clear", {
        data: {
          username: userData.username,
        },
      });
      await fetchCart();
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear cart.", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  /** Purchase */
  const handlePurchase = async () => {
    if (!userData) return;
    try {
      await axios.post("http://localhost:5000/api/cart/purchase", {
        username: userData.username,
      });
      toast.success(
        `🎉 Purchase successful! Thank you, ${userData.profile.firstName}!`,
        {
          position: "bottom-right",
          autoClose: 2500,
          theme: "colored",
        }
      );
      setCartItems([]);
      setTotalCost(0);
      setCartOpen(false); // close modal
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong. Please try again later.", {
        position: "bottom-right",
        autoClose: 2500,
        theme: "colored",
      });
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
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
        <Box sx={{ position: "relative", zIndex: 2 }}>
          {/* Header */}
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
              {storeName} Products
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
              Browse and add items to your cart. Once ready, open your cart to
              modify quantities or proceed to checkout!
            </Typography>
          </Container>

          {/* Search & Navigation Buttons */}
          <Container maxWidth="md" sx={{ mb: 6 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                alignItems="center"
                gap={2}
              >
                {/* Back Button */}
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ArrowBackIcon />}
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
                  onClick={() => navigate("/store")}
                >
                  Back
                </Button>

                {/* Search Input */}
                <StyledTextField
                  fullWidth
                  placeholder="Search for products..."
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
                >
                  {searchLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Search"
                  )}
                </Button>

                {/* View Cart Button */}
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<ShoppingCartIcon />}
                  sx={{
                    height: "56px",
                    width: { xs: "100%", sm: "150px" },
                    textTransform: "none",
                    fontWeight: 600,
                    background: "linear-gradient(to right, #FFA500, #FFD500)",
                    "&:hover": {
                      background: "linear-gradient(to right, #FFD500, #FFA500)",
                    },
                  }}
                  onClick={handleOpenCart}
                >
                  View Cart
                </Button>
              </Box>
            </motion.div>
          </Container>

          <Divider
            sx={{
              borderColor: "#FF8C00",
              marginX: "auto",
              maxWidth: "80%",
              opacity: 0.3,
            }}
          />

          {/* Products List Section */}
          <Container maxWidth="lg">
            <Box
              sx={{
                position: "relative",
                minHeight: "400px",
              }}
            >
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
                    Loading products, please wait...
                  </Typography>
                </Box>
              )}

              {/* Error or Product Cards */}
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
                    mt: 4,
                  }}
                >
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((prod) => (
                      <Grid item xs={12} sm={6} md={4} key={prod._id}>
                        <ProductCard
                          id={prod._id}
                          productName={prod.productName}
                          description={prod.description}
                          price={prod.price}
                          image={prod.image}
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
                          No products found for the given search term.
                        </Typography>
                      </Grid>
                    )
                  )}
                </Grid>
              )}
            </Box>
          </Container>

          {/* CART MODAL */}
          <Dialog
            open={cartOpen}
            onClose={() => setCartOpen(false)}
            fullWidth
            maxWidth="md"
            TransitionComponent={Transition} // Slide up transition
            PaperProps={{
              sx: {
                backgroundImage: `linear-gradient(to bottom right, rgba(30,30,30,0.95), rgba(0,0,0,0.85))`,
                color: "#FFFFFF",
                borderRadius: 3,
                boxShadow: "0 20px 40px rgba(0,0,0,0.7)",
              },
            }}
          >
            <DialogTitle
              sx={{
                fontWeight: 700,
                fontSize: 24,
                background: "linear-gradient(to right, #FF8C00, #FF6F00)",
                color: "#fff",
                px: 3,
                py: 2,
              }}
            >
              Your Cart
            </DialogTitle>
            <DialogContent
              sx={{
                py: 3,
                minHeight: "300px",
                maxHeight: "500px",
                overflowY: "auto",
              }}
            >
              {cartItems.length === 0 ? (
                <Typography>No items in cart.</Typography>
              ) : (
                <List>
                  {cartItems.map((item) => (
                    <ListItem
                      key={item._id}
                      secondaryAction={
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Button
                            variant="outlined"
                            onClick={() =>
                              handleDecreaseQuantity(
                                item.productId._id,
                                item.quantity
                              )
                            }
                            sx={{
                              color: "#FF8C00",
                              borderColor: "#FF8C00",
                              "&:hover": {
                                borderColor: "#FF6F00",
                                color: "#FF6F00",
                              },
                            }}
                          >
                            –
                          </Button>
                          <Typography>{item.quantity}</Typography>
                          <Button
                            variant="outlined"
                            onClick={() =>
                              handleIncreaseQuantity(
                                item.productId._id,
                                item.quantity
                              )
                            }
                            sx={{
                              color: "#FF8C00",
                              borderColor: "#FF8C00",
                              "&:hover": {
                                borderColor: "#FF6F00",
                                color: "#FF6F00",
                              },
                            }}
                          >
                            +
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleRemoveItem(item.productId._id)}
                            sx={{
                              "&:hover": {
                                backgroundColor: "#330000",
                              },
                            }}
                          >
                            Remove
                          </Button>
                        </Stack>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={item.productId.productName}
                          src={
                            item.productId.image
                              ? `data:image/jpeg;base64,${item.productId.image}`
                              : undefined
                          }
                          sx={{
                            bgcolor: "#FF8C00",
                            width: 48,
                            height: 48,
                          }}
                        >
                          <ShoppingCartIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${item.productId.productName}`}
                        secondary={`$${item.productId.price.toFixed(2)} x ${
                          item.quantity
                        } = $${(item.productId.price * item.quantity).toFixed(2)}`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </DialogContent>
            <DialogActions
              sx={{
                justifyContent: "space-between",
                px: 3,
                py: 2,
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Box>
                <Typography variant="h6">
                  Total Cost: ${totalCost.toFixed(2)}
                </Typography>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClearCart}
                  sx={{
                    mr: 2,
                    "&:hover": {
                      backgroundColor: "#330000",
                    },
                  }}
                >
                  Clear Cart
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePurchase}
                  disabled={cartItems.length === 0}
                  sx={{
                    background: "linear-gradient(to right, #FF8C00, #FF6F00)",
                    "&:hover": {
                      background: "linear-gradient(to right, #FF6F00, #FF8C00)",
                    },
                  }}
                >
                  Buy Now
                </Button>
              </Box>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Products;
