// src/pages/SellerProfilePage.tsx

import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Divider,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Stack,
  CircularProgress,
  Slide,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar as MUIAvatar,
  Tooltip,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// Context
import { UserContext } from "../../../context/UserContext";

// Child components
import StoreList from "../../SellerUser/components/StoreList";
import StoreProducts from "../../SellerUser/components/StoreProducts";
import StoreModal from "../../SellerUser/components/StoreModal";
import ProductModal from "../../SellerUser/components/ProductModal";

/** ------------------ THEME SETUP (same as ClientProfile) ------------------ */
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#FF4500" },
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

/** Transition for dialogs */
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/** Radial gradient background (matching client profile) */
const BackgroundWrapper = styled(Box)(() => ({
  minHeight: "100vh",
  width: "100%",
  background: `radial-gradient(circle, #FF4500 10%, #1A1A1A 100%)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: "40px",
  paddingBottom: "40px",
}));

/** Container for the profile content. */
const ProfileContainer = styled(Container)(() => ({
  maxWidth: "800px",
  position: "relative",
  zIndex: 2,
}));

/** Minimal store interface */
export interface Store {
  _id?: string;
  id?: string; // some places might refer to this
  name: string;
  email: string;
  ownerId: string;
  image: string;
  category: "supplements" | "clothes" | "equipments";
  location: {
    address: string;
    city: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
}

/** Minimal product interface */
export interface Product {
  _id?: string;
  storeId: string;
  productName: string;
  price: number;
  image: string;
  description?: string;
}

/** Cart item interface */
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

const SellerProfilePage: React.FC = () => {
  const { userData, setUserData } = useContext(UserContext);

  // Edit user profile
  const [editingField, setEditingField] = useState<string | null>(null);
  const [fieldValue, setFieldValue] = useState<string>("");

  // Upload file
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Delete account
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Cart states
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [cartLoading, setCartLoading] = useState<boolean>(false);

  // Seller’s stores states
  const [myStores, setMyStores] = useState<Store[]>([]);
  const [storesLoading, setStoresLoading] = useState<boolean>(false);

  // Add/edit store modal
  const [storeDialogOpen, setStoreDialogOpen] = useState(false);
  const [isUpdatingStore, setIsUpdatingStore] = useState(false);
  const [storeToUpdate, setStoreToUpdate] = useState<Store | null>(null);

  // Show store’s products
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [storeProducts, setStoreProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);

  // Add/edit product modal
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState<Product | null>(null);

  // ---------------------------------------------------------------------------
  // 1) Fetch seller's stores on mount
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!userData) return;
    // We assume userData may have `_id` in localStorage if your backend sends it
    const ownerId = (userData as any)._id || userData.username; // fallback
    fetchStores(ownerId);
  }, [userData]);

  const fetchStores = async (ownerId: string) => {
    try {
      setStoresLoading(true);
      const res = await axios.get<Store[]>(
        `http://localhost:5000/api/stores/getStoreByOwnerId/${ownerId}`
      );
      const transformed = res.data.map((store) => ({
        ...store,
        id: store._id || store.id,
      }));
      setMyStores(transformed);
    } catch (error: any) {
      toast.error("Failed to load your stores.", { theme: "colored" });
    } finally {
      setStoresLoading(false);
    }
  };

  // ---------------------------------------------------------------------------
  // 2) Cart Logic (same as your client profile)
  // ---------------------------------------------------------------------------
  const handleOpenCart = async () => {
    if (!userData) {
      toast.error("You must be logged in to view your cart", {
        theme: "colored",
      });
      return;
    }
    setCartLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/cart/${userData.username}`
      );
      setCartItems(res.data.cart?.items || []);
      setTotalCost(res.data.totalCost || 0);
      setCartOpen(true);
    } catch {
      toast.error("Failed to load cart. Please try again.", {
        theme: "colored",
      });
    } finally {
      setCartLoading(false);
    }
  };

  const handleCloseCart = () => setCartOpen(false);

  const handleIncreaseQuantity = async (
    productId: string,
    quantity: number
  ) => {
    if (!userData) return;
    try {
      await axios.patch("http://localhost:5000/api/cart/update-quantity", {
        username: userData.username,
        productId,
        quantity: quantity + 1,
      });
      const res = await axios.get(
        `http://localhost:5000/api/cart/${userData.username}`
      );
      setCartItems(res.data.cart?.items || []);
      setTotalCost(res.data.totalCost || 0);
    } catch {
      toast.error("Failed to update quantity.", { theme: "colored" });
    }
  };

  const handleDecreaseQuantity = async (
    productId: string,
    quantity: number
  ) => {
    if (!userData) return;
    if (quantity <= 1) {
      toast.error("Quantity cannot be less than 1.", { theme: "colored" });
      return;
    }
    try {
      await axios.patch("http://localhost:5000/api/cart/update-quantity", {
        username: userData.username,
        productId,
        quantity: quantity - 1,
      });
      const res = await axios.get(
        `http://localhost:5000/api/cart/${userData.username}`
      );
      setCartItems(res.data.cart?.items || []);
      setTotalCost(res.data.totalCost || 0);
    } catch {
      toast.error("Failed to update quantity.", { theme: "colored" });
    }
  };

  const handleRemoveItem = async (productId: string) => {
    if (!userData) return;
    try {
      await axios.delete("http://localhost:5000/api/cart/remove", {
        data: { username: userData.username, productId },
      });
      const res = await axios.get(
        `http://localhost:5000/api/cart/${userData.username}`
      );
      setCartItems(res.data.cart?.items || []);
      setTotalCost(res.data.totalCost || 0);
    } catch {
      toast.error("Failed to remove item.", { theme: "colored" });
    }
  };

  const handleClearCart = async () => {
    if (!userData) return;
    try {
      await axios.delete("http://localhost:5000/api/cart/clear", {
        data: { username: userData.username },
      });
      setCartItems([]);
      setTotalCost(0);
    } catch {
      toast.error("Failed to clear cart.", { theme: "colored" });
    }
  };

  const handlePurchase = async () => {
    if (!userData) return;
    try {
      await axios.post("http://localhost:5000/api/cart/purchase", {
        username: userData.username,
      });
      toast.success(
        `Purchase successful! Thank you, ${userData.profile.firstName}!`,
        {
          theme: "colored",
        }
      );
      setCartItems([]);
      setTotalCost(0);
      setCartOpen(false);
    } catch {
      toast.error("Something went wrong. Please try again later.", {
        theme: "colored",
      });
    }
  };

  // ---------------------------------------------------------------------------
  // 3) Profile Editing
  // ---------------------------------------------------------------------------
  const handleStartEditing = (fieldName: string, initialValue: string) => {
    setEditingField(fieldName);
    setFieldValue(initialValue || "");
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setFieldValue("");
  };

  const handleSaveEdit = async () => {
    if (!userData) return;
    try {
      const updates: Record<string, unknown> = {};
      if (editingField) updates[editingField] = fieldValue;

      await axios.patch(
        `http://localhost:5000/api/users/updateProfile/${userData.username}`,
        updates
      );
      toast.success("Profile updated successfully!", { theme: "colored" });

      setUserData((prev) => {
        if (!prev) return prev;
        if (
          editingField === "firstName" ||
          editingField === "lastName" ||
          editingField === "bio" ||
          editingField === "dateOfBirth" ||
          editingField === "location"
        ) {
          return {
            ...prev,
            profile: {
              ...prev.profile,
              [editingField]: fieldValue,
            },
          };
        } else {
          return {
            ...prev,
            [editingField]: fieldValue,
          };
        }
      });
    } catch {
      toast.error("Failed to update profile.", { theme: "colored" });
    } finally {
      setEditingField(null);
      setFieldValue("");
    }
  };

  // ---------------------------------------------------------------------------
  // 4) Upload a new profile pic
  // ---------------------------------------------------------------------------
  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userData) return;
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        if (reader.result && typeof reader.result === "string") {
          await axios.patch(
            `http://localhost:5000/api/users/updateProfileImage/${userData.username}`,
            { base64Image: reader.result }
          );
          toast.success("Profile image updated!", { theme: "colored" });
          setUserData((prev) =>
            prev
              ? {
                  ...prev,
                  profile: {
                    ...prev.profile,
                    image: reader.result as string,
                  },
                }
              : prev
          );
        }
      };
      reader.readAsDataURL(file);
    } catch {
      toast.error("Failed to upload image.", { theme: "colored" });
    }
  };

  // ---------------------------------------------------------------------------
  // 5) Delete account
  // ---------------------------------------------------------------------------
  const handleDeleteAccount = async () => {
    if (!userData) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/users/deleteAccount/${userData.username}`
      );
      toast.success("Account deleted successfully!", { theme: "colored" });
      setUserData(null);
    } catch {
      toast.error("Failed to delete account.", { theme: "colored" });
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  // If no user is logged in
  if (!userData) {
    return (
      <ThemeProvider theme={darkTheme}>
        <BackgroundWrapper>
          <Typography variant="h4" align="center" sx={{ color: "#fff", mt: 4 }}>
            Please log in to view your profile.
          </Typography>
        </BackgroundWrapper>
      </ThemeProvider>
    );
  }

  // ---------------------------------------------------------------------------
  // 6) Store CRUD
  // ---------------------------------------------------------------------------
  const handleOpenStoreDialog = (store?: Store) => {
    if (store) {
      setIsUpdatingStore(true);
      setStoreToUpdate(store);
    } else {
      setIsUpdatingStore(false);
      setStoreToUpdate(null);
    }
    setStoreDialogOpen(true);
  };

  const handleCloseStoreDialog = () => {
    setStoreDialogOpen(false);
    setIsUpdatingStore(false);
    setStoreToUpdate(null);
  };

  const refetchStores = async () => {
    if (!userData) return;
    const ownerId = (userData as any)._id || userData.username;
    await fetchStores(ownerId);
  };

  const handleDeleteStore = async (storeId: string) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/stores/deleteStore/${storeId}`
      );
      toast.success("Store deleted successfully!", { theme: "colored" });
      setMyStores((prev) =>
        prev.filter((s) => s._id !== storeId && s.id !== storeId)
      );
    } catch {
      toast.error("Failed to delete store.", { theme: "colored" });
    }
  };

  // ---------------------------------------------------------------------------
  // 7) Product Logic
  // ---------------------------------------------------------------------------
  const handleOpenStoreProducts = async (store: Store) => {
    setSelectedStore(store);
    setStoreProducts([]);
    setProductsLoading(true);
    try {
      // store._id is the DB ID
      const res = await axios.get<Product[]>(
        `http://localhost:5000/api/products/getStoreProducts/${store._id}`
      );
      setStoreProducts(res.data);
    } catch {
      toast.error("Failed to load store products.", { theme: "colored" });
    } finally {
      setProductsLoading(false);
    }
  };

  const handleOpenProductDialog = (product?: Product) => {
    if (product) {
      setIsUpdatingProduct(true);
      setProductToUpdate(product);
    } else {
      setIsUpdatingProduct(false);
      setProductToUpdate(null);
    }
    setProductDialogOpen(true);
  };

  const handleCloseProductDialog = () => {
    setProductDialogOpen(false);
    setIsUpdatingProduct(false);
    setProductToUpdate(null);
  };

  const refetchProducts = async () => {
    if (!selectedStore) return;
    setProductsLoading(true);
    try {
      const res = await axios.get<Product[]>(
        `http://localhost:5000/api/products/getStoreProducts/${selectedStore._id}`
      );
      setStoreProducts(res.data);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!selectedStore) return;
    try {
      await axios.delete(
        `http://localhost:5000/api/products/deleteProduct/${productId}`
      );
      // Or actually: /api/products/deleteProduct/:productId
      // Make sure you have the correct route
      toast.success("Product deleted successfully!", { theme: "colored" });
      setStoreProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch {
      toast.error("Failed to delete product.", { theme: "colored" });
    }
  };

  const profileImageSrc =
    userData.profile.image || "https://via.placeholder.com/150";

  return (
    <ThemeProvider theme={darkTheme}>
      <BackgroundWrapper>
        <ProfileContainer>
          <Paper
            elevation={8}
            sx={{
              p: 4,
              borderRadius: 4,
              backgroundImage: `linear-gradient(to bottom right, rgba(30,30,30,0.95), rgba(0,0,0,0.85))`,
              color: "#FFFFFF",
              boxShadow: "0 20px 40px rgba(0,0,0,0.7)",
            }}
            component={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* ---------- Header (Avatar + Cart) ---------- */}
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              alignItems="center"
              justifyContent="space-between"
              gap={2}
            >
              {/* Avatar + Upload Button */}
              <Box position="relative" textAlign="center">
                <Avatar
                  src={profileImageSrc}
                  alt="Profile"
                  sx={{
                    width: 130,
                    height: 130,
                    boxShadow: 3,
                    "&:hover": { opacity: 0.9 },
                  }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    bgcolor: darkTheme.palette.primary.main,
                    "&:hover": { bgcolor: darkTheme.palette.primary.dark },
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <PhotoCamera htmlColor="#fff" />
                </IconButton>
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleUploadPhoto}
                />
              </Box>

              {/* User Info */}
              <Box flex={1} textAlign={{ xs: "center", sm: "left" }}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, mb: 1 }}
                  component={motion.h4}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {userData.profile.firstName} {userData.profile.lastName}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: darkTheme.palette.text.secondary }}
                >
                  {userData.roles?.join(" | ")}
                </Typography>
              </Box>

              {/* View Cart Button */}
              <Button
                variant="contained"
                color="secondary"
                startIcon={<ShoppingCartIcon />}
                onClick={handleOpenCart}
                sx={{
                  background: "linear-gradient(to bottom, #FFA500, #FFD500)",
                  "&:hover": {
                    background: "linear-gradient(to bottom, #FFD500, #FFA500)",
                  },
                }}
              >
                View Cart
              </Button>
            </Box>
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete Account
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* ---------- Profile Fields ---------- */}
            <Box display="flex" flexDirection="column" gap={2}>
              {/* Username (read-only) */}
              <Box display="flex" justifyContent="space-between">
                <Typography sx={{ color: "#AAA" }}>Username:</Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  {userData.username}
                </Typography>
              </Box>

              {/* Email */}
              <Box display="flex" justifyContent="space-between">
                <Typography sx={{ color: "#AAA" }}>Email:</Typography>
                {editingField === "email" ? (
                  <Stack direction="row" gap={1}>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={fieldValue}
                      onChange={(e) => setFieldValue(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleSaveEdit}>
                      Save
                    </Button>
                    <Button variant="text" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </Stack>
                ) : (
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography sx={{ fontWeight: 600 }}>
                      {userData.email}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleStartEditing("email", userData.email || "")
                      }
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                )}
              </Box>

              {/* Phone */}
              <Box display="flex" justifyContent="space-between">
                <Typography sx={{ color: "#AAA" }}>Phone:</Typography>
                {editingField === "phone" ? (
                  <Stack direction="row" gap={1}>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={fieldValue}
                      onChange={(e) => setFieldValue(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleSaveEdit}>
                      Save
                    </Button>
                    <Button variant="text" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </Stack>
                ) : (
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography sx={{ fontWeight: 600 }}>
                      {userData.phone || "No phone"}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleStartEditing("phone", userData.phone || "")
                      }
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                )}
              </Box>

              {/* Location */}
              <Box display="flex" justifyContent="space-between">
                <Typography sx={{ color: "#AAA" }}>Location:</Typography>
                {editingField === "location" ? (
                  <Stack direction="row" gap={1}>
                    <TextField
                      variant="outlined"
                      size="small"
                      value={fieldValue}
                      onChange={(e) => setFieldValue(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleSaveEdit}>
                      Save
                    </Button>
                    <Button variant="text" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </Stack>
                ) : (
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography sx={{ fontWeight: 600 }}>
                      {userData.profile.location || "Not specified"}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleStartEditing(
                          "location",
                          userData.profile.location || ""
                        )
                      }
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                )}
              </Box>

              {/* Date of Birth */}
              <Box display="flex" justifyContent="space-between">
                <Typography sx={{ color: "#AAA" }}>Date of Birth:</Typography>
                {editingField === "dateOfBirth" ? (
                  <Stack direction="row" gap={1}>
                    <TextField
                      variant="outlined"
                      type="date"
                      size="small"
                      value={fieldValue}
                      onChange={(e) => setFieldValue(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleSaveEdit}>
                      Save
                    </Button>
                    <Button variant="text" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </Stack>
                ) : (
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography sx={{ fontWeight: 600 }}>
                      {userData.profile.dateOfBirth
                        ? new Date(
                            userData.profile.dateOfBirth
                          ).toLocaleDateString()
                        : "Not specified"}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleStartEditing(
                          "dateOfBirth",
                          userData.profile.dateOfBirth
                            ? userData.profile.dateOfBirth.slice(0, 10)
                            : ""
                        )
                      }
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                )}
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* About Me (Bio) */}
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
              About Me
            </Typography>
            {editingField === "bio" ? (
              <Stack direction="row" gap={1} alignItems="center">
                <TextField
                  variant="outlined"
                  multiline
                  rows={3}
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                  fullWidth
                />
                <Button variant="contained" onClick={handleSaveEdit}>
                  Save
                </Button>
                <Button variant="text" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </Stack>
            ) : (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  sx={{
                    fontStyle: "italic",
                    color: darkTheme.palette.text.secondary,
                    whiteSpace: "pre-line",
                  }}
                >
                  {userData.profile.bio
                    ? userData.profile.bio
                    : "No bio available. Add one to share more about yourself!"}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    handleStartEditing("bio", userData.profile.bio || "")
                  }
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Stack>
            )}

            <Divider sx={{ my: 3 }} />

            {/* Social Media Icons */}
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
              Connect with Me
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Tooltip title="Facebook">
                <IconButton
                  color="inherit"
                  onClick={() => window.open("https://facebook.com", "_blank")}
                >
                  <FacebookIcon sx={{ color: "#3b5998" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Instagram">
                <IconButton
                  color="inherit"
                  onClick={() => window.open("https://instagram.com", "_blank")}
                >
                  <InstagramIcon sx={{ color: "#E1306C" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="LinkedIn">
                <IconButton
                  color="inherit"
                  onClick={() => window.open("https://linkedin.com", "_blank")}
                >
                  <LinkedInIcon sx={{ color: "#0072b1" }} />
                </IconButton>
              </Tooltip>
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* Seller's Stores */}
            <StoreList
              stores={myStores}
              loading={storesLoading}
              onOpenStoreDialog={handleOpenStoreDialog}
              onDeleteStore={handleDeleteStore}
              onOpenProducts={handleOpenStoreProducts}
            />

            {selectedStore && (
              <StoreProducts
                store={selectedStore}
                products={storeProducts}
                loading={productsLoading}
                onOpenProductDialog={handleOpenProductDialog}
                onDeleteProduct={handleDeleteProduct}
              />
            )}
          </Paper>
        </ProfileContainer>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          aria-labelledby="delete-account-dialog-title"
          aria-describedby="delete-account-dialog-description"
        >
          <DialogTitle id="delete-account-dialog-title">
            Confirm Account Deletion
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-account-dialog-description">
              Are you sure you want to delete your account? This action is
              irreversible.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleDeleteAccount}
              autoFocus
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Cart Modal */}
        <Dialog
          open={cartOpen}
          onClose={handleCloseCart}
          fullWidth
          maxWidth="md"
          TransitionComponent={Transition}
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
              background: "linear-gradient(to bottom, #FF8C00, #FF6F00)",
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
            {cartLoading ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress color="primary" />
              </Box>
            ) : cartItems.length === 0 ? (
              <Typography>No items in cart.</Typography>
            ) : (
              <List>
                {cartItems.map((item) => (
                  <ListItem key={item._id}>
                    <ListItemAvatar>
                      <MUIAvatar
                        alt={item.productId.productName}
                        src={
                          item.productId.image
                            ? `data:image/jpeg;base64,${item.productId.image}`
                            : undefined
                        }
                        sx={{ bgcolor: "#FF8C00", width: 48, height: 48 }}
                      >
                        <ShoppingCartIcon />
                      </MUIAvatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.productId.productName}
                      secondary={`$${item.productId.price.toFixed(2)} x ${
                        item.quantity
                      } = $${(item.productId.price * item.quantity).toFixed(
                        2
                      )}`}
                    />
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
                          "&:hover": { backgroundColor: "#330000" },
                        }}
                      >
                        Remove
                      </Button>
                    </Stack>
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
                sx={{ mr: 2, "&:hover": { backgroundColor: "#330000" } }}
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

        {/* Store Modal (Add/Edit) */}
        <StoreModal
          open={storeDialogOpen}
          isUpdating={isUpdatingStore}
          store={storeToUpdate}
          onClose={handleCloseStoreDialog}
          onRefetch={refetchStores}
        />

        {/* Product Modal (Add/Edit) */}
        <ProductModal
          open={productDialogOpen}
          isUpdating={isUpdatingProduct}
          product={productToUpdate}
          storeId={selectedStore?._id ?? ""}
          onClose={handleCloseProductDialog}
          onRefetch={refetchProducts}
        />
      </BackgroundWrapper>
    </ThemeProvider>
  );
};

export default SellerProfilePage;
