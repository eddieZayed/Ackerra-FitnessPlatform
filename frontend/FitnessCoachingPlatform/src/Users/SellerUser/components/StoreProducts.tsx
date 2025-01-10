// src/components/SellerProfile/StoreProducts.tsx

import React from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar as MUIAvatar,
  Stack,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Store, Product } from "../../SellerUser/pages/SellerProfilePage";

interface StoreProductsProps {
  store: Store;
  products: Product[];
  loading: boolean;
  onOpenProductDialog: (product?: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

const StoreProducts: React.FC<StoreProductsProps> = ({
  store,
  products,
  loading,
  onOpenProductDialog,
  onDeleteProduct,
}) => {
  return (
    <Box mt={4}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
        Products for Store: {store.name}
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          <Box textAlign="right" mb={2}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => onOpenProductDialog()}
              sx={{
                background: "linear-gradient(to right, #FF8C00, #FF6F00)",
                "&:hover": {
                  background: "linear-gradient(to right, #FF6F00, #FF8C00)",
                },
              }}
            >
              Add New Product
            </Button>
          </Box>

          {products.length === 0 ? (
            <Typography>No products found for this store.</Typography>
          ) : (
            <List>
              {products.map((prod) => (
                <ListItem
                  key={prod._id}
                  secondaryAction={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconButton color="inherit" onClick={() => onOpenProductDialog(prod)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => {
                          if (prod._id) onDeleteProduct(prod._id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  }
                >
                  <ListItemAvatar>
                    <MUIAvatar
                      alt={prod.productName}
                      src={
                        prod.image && prod.image.startsWith("data:image/")
                          ? prod.image
                          : undefined
                      }
                      sx={{ bgcolor: "#FF8C00", width: 48, height: 48 }}
                    >
                      <ShoppingCartIcon />
                    </MUIAvatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={prod.productName}
                    secondary={`$${prod.price.toFixed(2)}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </>
      )}
    </Box>
  );
};

export default StoreProducts;
