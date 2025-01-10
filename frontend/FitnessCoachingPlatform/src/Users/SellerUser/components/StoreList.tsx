// src/components/SellerProfile/StoreList.tsx

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
  IconButton,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Store } from "../../SellerUser/pages/SellerProfilePage";

interface StoreListProps {
  stores: Store[];
  loading: boolean;
  onOpenStoreDialog: (store?: Store) => void;
  onDeleteStore: (storeId: string) => void;
  onOpenProducts: (store: Store) => void;
}

const StoreList: React.FC<StoreListProps> = ({
  stores,
  loading,
  onOpenStoreDialog,
  onDeleteStore,
  onOpenProducts,
}) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
        My Stores
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
              onClick={() => onOpenStoreDialog()}
              sx={{
                background: "linear-gradient(to right, #FF8C00, #FF6F00)",
                "&:hover": {
                  background: "linear-gradient(to right, #FF6F00, #FF8C00)",
                },
              }}
            >
              Add New Store
            </Button>
          </Box>

          {stores.length === 0 ? (
            <Typography>No stores found for your account.</Typography>
          ) : (
            <List>
              {stores.map((store) => (
                <ListItem
                  key={store.id}
                  secondaryAction={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Button
                        variant="outlined"
                        onClick={() => onOpenProducts(store)}
                        sx={{ borderColor: "#FFA500", color: "#FFA500" }}
                      >
                        Products
                      </Button>
                      <IconButton color="inherit" onClick={() => onOpenStoreDialog(store)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => {
                          if (store._id) onDeleteStore(store._id);
                          else if (store.id) onDeleteStore(store.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  }
                >
                  <ListItemAvatar>
                    <MUIAvatar
                      alt={store.name}
                      src={
                        store.image && store.image.startsWith("data:image/")
                          ? store.image
                          : undefined
                      }
                      sx={{ bgcolor: "#FF8C00", width: 48, height: 48 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={store.name}
                    secondary={`${store.location.address}, ${store.location.city}`}
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

export default StoreList;
