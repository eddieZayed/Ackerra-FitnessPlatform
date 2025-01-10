// src/components/SellerProfile/ProductModal.tsx

import React, { FormEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { Product } from "../../SellerUser/pages/SellerProfilePage";

interface ProductModalProps {
  open: boolean;
  isUpdating: boolean;
  product: Product | null;
  storeId: string;
  onClose: () => void;
  onRefetch: () => void; // callback to refetch products after success
}

const ProductModal: React.FC<ProductModalProps> = ({
  open,
  isUpdating,
  product,
  storeId,
  onClose,
  onRefetch,
}) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!storeId) {
      toast.error("No store selected. Cannot create product.", { theme: "colored" });
      return;
    }

    const formData = new FormData(e.currentTarget);
    const productName = formData.get("productName") as string;
    const price = parseFloat(formData.get("price") as string) || 0;
    const description = formData.get("description") as string;
    const imageFile = formData.get("productImage") as File | null;

    let base64Img = "";
    if (imageFile && imageFile.size > 0) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        base64Img = typeof reader.result === "string" ? reader.result : "";
        await doCall(base64Img);
      };
      reader.readAsDataURL(imageFile);
    } else {
      await doCall(product?.image || "");
    }

    async function doCall(base64Image: string) {
      try {
        const payload: Partial<Product> = {
          storeId,
          productName,
          price,
          description,
          image: base64Image,
        };

        if (isUpdating && product?._id) {
          // PATCH existing product
          await axios.patch(
            `http://localhost:5000/api/products/updateProduct/${product._id}`,
            payload
          );
          toast.success("Product updated successfully!", { theme: "colored" });
        } else {
          // POST new product
          await axios.post(`http://localhost:5000/api/products/postProduct`, payload);
          toast.success("Product created successfully!", { theme: "colored" });
        }

        onClose();
        onRefetch();
      } catch {
        toast.error("Failed to save product.", { theme: "colored" });
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{isUpdating ? "Edit Product" : "Add New Product"}</DialogTitle>
        <DialogContent dividers>
          <TextField
            name="productName"
            label="Product Name"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            defaultValue={product?.productName || ""}
          />
          <TextField
            name="price"
            label="Price"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            defaultValue={product ? String(product.price) : ""}
          />
          <TextField
            name="description"
            label="Description (optional)"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 2 }}
            defaultValue={product?.description || ""}
          />
          <Typography variant="body2" sx={{ mb: 1 }}>
            Product Image (optional):
          </Typography>
          <input name="productImage" type="file" accept="image/*" />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {isUpdating ? "Update Product" : "Create Product"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductModal;
