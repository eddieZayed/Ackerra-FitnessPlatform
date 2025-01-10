// src/components/OwnerProfile/UserList.tsx

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
import { AppUser } from "../pages/OwnerProfilePage";

interface UserListProps {
  users: AppUser[];
  loading: boolean;
  onOpenUserDialog: (user?: AppUser) => void;
  onDeleteUser: (username: string) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  loading,
  onOpenUserDialog,
  onDeleteUser,
}) => {
  return (
    <Box mt={4}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
        Manage All Users
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
              onClick={() => onOpenUserDialog()}
              sx={{
                background: "linear-gradient(to right, #FF8C00, #FF6F00)",
                "&:hover": {
                  background: "linear-gradient(to right, #FF6F00, #FF8C00)",
                },
              }}
            >
              Add New User
            </Button>
          </Box>

          {users.length === 0 ? (
            <Typography>No users found.</Typography>
          ) : (
            <List>
              {users.map((user) => (
                <ListItem
                  key={user.username}
                  secondaryAction={
                    <Stack direction="row" spacing={1}>
                      <IconButton color="inherit" onClick={() => onOpenUserDialog(user)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => onDeleteUser(user.username)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  }
                >
                  <ListItemAvatar>
                    <MUIAvatar
                      alt={user.username}
                      src={
                        user.profile.image && user.profile.image.startsWith("data:image/")
                          ? user.profile.image
                          : undefined
                      }
                      sx={{ bgcolor: "#FF8C00", width: 48, height: 48 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${user.profile.firstName} ${user.profile.lastName}`}
                    secondary={`@${user.username} | ${user.email} | roles: ${user.roles.join(
                      ", "
                    )}`}
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

export default UserList;
