// src/components/SellerProfile/StoreModal.tsx

import React, { FormEvent, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { Store } from "../../SellerUser/pages/SellerProfilePage";
import { UserContext } from "../../../context/UserContext";

interface StoreModalProps {
  open: boolean;
  isUpdating: boolean;
  store: Store | null; // if editing
  onClose: () => void;
  onRefetch: () => void; // callback to refetch store list
}

const StoreModal: React.FC<StoreModalProps> = ({
  open,
  isUpdating,
  store,
  onClose,
  onRefetch,
}) => {
  // We need userData to get the userData._id as ownerId
  const { userData } = useContext(UserContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userData) {
      toast.error("Cannot create or update store without a logged in user.", {
        theme: "colored",
      });
      return;
    }

    // The user must be a "seller" to create a store, presumably
    const ownerId = (userData as any)._id; // if your userData has an `_id`

    const formData = new FormData(e.currentTarget);
    const name = formData.get("storeName") as string;
    const email = formData.get("storeEmail") as string;
    const category = formData.get("storeCategory") as string;
    const address = formData.get("storeAddress") as string;
    const city = formData.get("storeCity") as string;
    const latitude = parseFloat(formData.get("storeLatitude") as string) || 0;
    const longitude = parseFloat(formData.get("storeLongitude") as string) || 0;
    const imageFile = formData.get("storeImage") as File | null;

    // We'll convert the image file to base64, if any
    let base64Img = "";
    if (imageFile && imageFile.size > 0) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        base64Img = typeof reader.result === "string" ? reader.result : "";
        await doCall(base64Img);
      };
      reader.readAsDataURL(imageFile);
    } else {
      // If not updating or no new image, fallback to store?.image or empty
      await doCall(store?.image || "");
    }

    // Actually call the backend
    async function doCall(base64Image: string) {
      try {
        // We must pass "ownerId"
        const payload = {
          name,
          email,
          ownerId,
          category,
          location: {
            address,
            city,
            coordinates: { latitude, longitude },
          },
          image: base64Image,
        };

        if (isUpdating && store?._id) {
          // PATCH existing store
          await axios.patch(
            `http://localhost:5000/api/stores/updateStore/${store._id}`,
            payload
          );
          toast.success("Store updated successfully!", { theme: "colored" });
        } else {
          // POST new store
          await axios.post(`http://localhost:5000/api/stores/postStore`, payload);
          toast.success("Store created successfully!", { theme: "colored" });
        }

        onClose();
        onRefetch();
      } catch (error: any) {
        toast.error(`Failed to save store. ${error?.response?.data?.message || ""}`, {
          theme: "colored",
        });
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{isUpdating ? "Edit Store" : "Add New Store"}</DialogTitle>
        <DialogContent dividers>
          <TextField
            name="storeName"
            label="Store Name"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            defaultValue={store?.name || ""}
          />
          <TextField
            name="storeEmail"
            label="Store Email"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            defaultValue={store?.email || ""}
          />
          <TextField
            name="storeCategory"
            label="Category (supplements/clothes/equipments)"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            defaultValue={store?.category || ""}
          />
          <TextField
            name="storeAddress"
            label="Address"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            defaultValue={store?.location.address || ""}
          />
          <TextField
            name="storeCity"
            label="City"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            defaultValue={store?.location.city || ""}
          />

          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <TextField
              name="storeLatitude"
              label="Latitude"
              variant="outlined"
              fullWidth
              defaultValue={
                store?.location.coordinates.latitude
                  ? String(store.location.coordinates.latitude)
                  : ""
              }
            />
            <TextField
              name="storeLongitude"
              label="Longitude"
              variant="outlined"
              fullWidth
              defaultValue={
                store?.location.coordinates.longitude
                  ? String(store.location.coordinates.longitude)
                  : ""
              }
            />
          </Stack>

          <Typography variant="body2" sx={{ mb: 1 }}>
            Store Image (optional):
          </Typography>
          <input name="storeImage" type="file" accept="image/*" />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {isUpdating ? "Update Store" : "Create Store"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StoreModal;
