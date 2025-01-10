// src/pages/OwnerProfilePage.tsx

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
  Slide,
  Tooltip,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// Context
import { UserContext } from "../../../context/UserContext";

// Child components (reuse from Seller code or new):
import StoreList from "../../SellerUser/components/StoreList";
import StoreProducts from "../../SellerUser/components/StoreProducts";
import StoreModal from "../../SellerUser/components/StoreModal";
import UserList from "../components/UserList";
import UserModal from "../components/UserModal";
import ProductModal from "../../SellerUser/components/ProductModal";

// ------------------ THEME SETUP (similar to your Client/Seller) ------------------
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

// Transition for dialogs
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Radial gradient background
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

const ProfileContainer = styled(Container)(() => ({
  maxWidth: "900px", // Slightly wider if you want
  position: "relative",
  zIndex: 2,
}));

// Minimal store interface
export interface Store {
  _id?: string;
  id?: string;
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

// Minimal product interface
export interface Product {
  _id?: string;
  storeId: string;
  productName: string;
  price: number;
  image: string;
  description?: string;
}

// Minimal user interface
export interface AppUser {
  username: string;
  email: string;
  roles: string[];
  phone?: string;
  profile: {
    firstName: string;
    lastName: string;
    bio?: string;
    dateOfBirth?: string;
    location?: string;
    image?: string;
  };
}

// The OwnerProfile component
const OwnerProfilePage: React.FC = () => {
  const { userData, setUserData } = useContext(UserContext);

  // Profile editing states
  const [editingField, setEditingField] = useState<string | null>(null);
  const [fieldValue, setFieldValue] = useState<string>("");

  // Upload file (profile pic)
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Delete account dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // 1) All stores (the owner can see and manage them all)
  const [allStores, setAllStores] = useState<Store[]>([]);
  const [storesLoading, setStoresLoading] = useState(false);

  // 2) Store add/edit modal
  const [storeDialogOpen, setStoreDialogOpen] = useState(false);
  const [isUpdatingStore, setIsUpdatingStore] = useState(false);
  const [storeToUpdate, setStoreToUpdate] = useState<Store | null>(null);

  // 3) Show products for a selected store
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [storeProducts, setStoreProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);

  // 4) Add/edit product modal
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState<Product | null>(null);

  // 5) All users (the owner can see and manage them all)
  const [allUsers, setAllUsers] = useState<AppUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  // 6) User add/edit modal
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState<AppUser | null>(null);

  // ---------------------------------------------------------------------------
  // If no user is logged in
  // ---------------------------------------------------------------------------
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
  // Fetch ALL stores
  // ---------------------------------------------------------------------------
  const fetchAllStores = async () => {
    try {
      setStoresLoading(true);
      const res = await axios.get<Store[]>("http://localhost:5000/api/stores/getStores");
      // transform if needed:
      const transformed = res.data.map((store) => ({
        ...store,
        id: store._id || store.id,
      }));
      setAllStores(transformed);
    } catch (err) {
      toast.error("Failed to load all stores.", { theme: "colored" });
    } finally {
      setStoresLoading(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Fetch store products
  // ---------------------------------------------------------------------------
  const handleOpenStoreProducts = async (store: Store) => {
    setSelectedStore(store);
    setStoreProducts([]);
    setProductsLoading(true);
    try {
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

  // ---------------------------------------------------------------------------
  // Delete store
  // ---------------------------------------------------------------------------
  const handleDeleteStore = async (storeId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/stores/deleteStore/${storeId}`);
      toast.success("Store deleted successfully!", { theme: "colored" });
      setAllStores((prev) =>
        prev.filter((s) => s._id !== storeId && s.id !== storeId)
      );
    } catch {
      toast.error("Failed to delete store.", { theme: "colored" });
    }
  };

  // ---------------------------------------------------------------------------
  // Manage PRODUCTS from a store
  // ---------------------------------------------------------------------------
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

  const handleDeleteProduct = async (productId: string) => {
    if (!selectedStore) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/deleteProduct/${productId}`);
      toast.success("Product deleted successfully!", { theme: "colored" });
      setStoreProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch {
      toast.error("Failed to delete product.", { theme: "colored" });
    }
  };

  // ---------------------------------------------------------------------------
  // Manage STORES: open/close StoreModal
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
    await fetchAllStores();
  };

  // ---------------------------------------------------------------------------
  // Manage USERS
  // ---------------------------------------------------------------------------
  // NEW: This function calls the getAllUsers endpoint we created
  const fetchAllUsers = async () => {
    try {
      setUsersLoading(true);
      // The endpoint that returns all users:
      const res = await axios.get<AppUser[]>("http://localhost:5000/api/users/allUsers");
      setAllUsers(res.data);
    } catch {
      toast.error("Failed to load users list.", { theme: "colored" });
    } finally {
      setUsersLoading(false);
    }
  };

  // Open user modal
  const handleOpenUserDialog = (user?: AppUser) => {
    if (user) {
      setIsUpdatingUser(true);
      setUserToUpdate(user);
    } else {
      setIsUpdatingUser(false);
      setUserToUpdate(null);
    }
    setUserDialogOpen(true);
  };

  const handleCloseUserDialog = () => {
    setUserDialogOpen(false);
    setIsUpdatingUser(false);
    setUserToUpdate(null);
  };

  const refetchUsers = async () => {
    await fetchAllUsers();
  };

  const handleDeleteUser = async (username: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/deleteAccount/${username}`);
      toast.success("User deleted successfully!", { theme: "colored" });
      setAllUsers((prev) => prev.filter((u) => u.username !== username));
    } catch {
      toast.error("Failed to delete user.", { theme: "colored" });
    }
  };

  // ---------------------------------------------------------------------------
  // On mount: fetch all stores + all users
  // ---------------------------------------------------------------------------
  useEffect(() => {
    fetchAllStores();
    fetchAllUsers();
  }, []);

  // ---------------------------------------------------------------------------
  // Profile Editing
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

      // Update local user context
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
  // Upload Profile Photo
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
  // Delete Account
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

  // Prepare the user’s avatar
  const profileImageSrc = userData.profile.image || "https://via.placeholder.com/150";

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
            {/* ---------- Header (Avatar + Delete) ---------- */}
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
                <Typography variant="subtitle1" sx={{ color: darkTheme.palette.text.secondary }}>
                  {userData.roles?.join(" | ")}
                </Typography>
              </Box>

              {/* Delete Account Button */}
              <Box textAlign="right">
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  Delete Account
                </Button>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* ---------- Profile Fields ---------- */}
            <Box display="flex" flexDirection="column" gap={2}>
              {/* Username (read-only) */}
              <Box display="flex" justifyContent="space-between">
                <Typography sx={{ color: "#AAA" }}>Username:</Typography>
                <Typography sx={{ fontWeight: 600 }}>{userData.username}</Typography>
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
                    <Typography sx={{ fontWeight: 600 }}>{userData.email}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleStartEditing("email", userData.email || "")}
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
                      onClick={() => handleStartEditing("phone", userData.phone || "")}
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
                        handleStartEditing("location", userData.profile.location || "")
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
                        ? new Date(userData.profile.dateOfBirth).toLocaleDateString()
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
              <Stack direction="row" alignItems="center" justifyContent="space-between">
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
                  onClick={() => handleStartEditing("bio", userData.profile.bio || "")}
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

            {/* Manage All Stores */}
            <StoreList
              stores={allStores}
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

            <Divider sx={{ my: 3 }} />

            {/* Manage All Users */}
            <UserList
              users={allUsers}
              loading={usersLoading}
              onOpenUserDialog={handleOpenUserDialog}
              onDeleteUser={handleDeleteUser}
            />
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
              Are you sure you want to delete your account? This action is irreversible.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteAccount} autoFocus variant="contained" color="error">
              Delete
            </Button>
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

        {/* User Modal (Add/Edit) */}
        <UserModal
          open={userDialogOpen}
          isUpdating={isUpdatingUser}
          user={userToUpdate}
          onClose={handleCloseUserDialog}
          onRefetch={refetchUsers}
        />
      </BackgroundWrapper>
    </ThemeProvider>
  );
};

export default OwnerProfilePage;
