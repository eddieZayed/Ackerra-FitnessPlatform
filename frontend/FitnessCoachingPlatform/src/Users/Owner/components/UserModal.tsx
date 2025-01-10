// src/pages/OwnerUser/components/UserModal.tsx
import React, { FormEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { AppUser } from "../../Owner/pages/OwnerProfilePage"; // or wherever your AppUser interface is

interface UserModalProps {
  open: boolean;
  isUpdating: boolean;
  user: AppUser | null;
  onClose: () => void;
  onRefetch: () => void; // callback to refresh user list after creation/update
}

const UserModal: React.FC<UserModalProps> = ({
  open,
  isUpdating,
  user,
  onClose,
  onRefetch,
}) => {
  // -------------- HASH Password Utility --------------
  const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  };

  // -------------- SUBMIT Handler --------------
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string; // only used if creating a NEW user
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const dateOfBirth = formData.get("dateOfBirth") as string;
    const phone = formData.get("phone") as string;
    const rolesStr = formData.get("roles") as string; // comma separated
    const roles = rolesStr
      .split(",")
      .map((r) => r.trim())
      .filter((r) => r); // remove empty entries

    try {
      let payload: any = {
        email,
        firstName,
        lastName,
        dateOfBirth,
        phone,
        roles,
      };

      // If NOT updating, we show password input & must hash it
      if (!isUpdating) {
        const hashed = await hashPassword(password);
        payload = {
          ...payload,
          username,
          password: hashed, // hashed password
        };
        // Call /register
        await axios.post("http://localhost:5000/api/users/register", payload);
        toast.success("User created successfully!", { theme: "colored" });
      } else {
        // If updating, we do not handle password here (unless you prefer to add logic for changing password)
        // Just patch their profile
        await axios.patch(
          `http://localhost:5000/api/users/updateProfile/${user?.username}`,
          payload
        );
        toast.success("User updated successfully!", { theme: "colored" });
      }

      onClose();
      onRefetch(); // Re-fetch user list
    } catch (error: any) {
      toast.error(
        `Failed to save user. ${
          error?.response?.data?.message || "Unknown error."
        }`,
        { theme: "colored" }
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{isUpdating ? "Edit User" : "Add New User"}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* Only show "username" and "password" if creating new user */}
            {!isUpdating && (
              <>
                <Grid item xs={12}>
                  <TextField
                    name="username"
                    label="Username"
                    variant="outlined"
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    required
                    fullWidth
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                required
                fullWidth
                defaultValue={user?.email || ""}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                name="firstName"
                label="First Name"
                variant="outlined"
                required
                fullWidth
                defaultValue={user?.profile.firstName || ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="lastName"
                label="Last Name"
                variant="outlined"
                required
                fullWidth
                defaultValue={user?.profile.lastName || ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
                variant="outlined"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                defaultValue={
                  user?.profile.dateOfBirth
                    ? user.profile.dateOfBirth.slice(0, 10)
                    : ""
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="phone"
                label="Phone"
                variant="outlined"
                fullWidth
                defaultValue={user?.phone || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="roles"
                label="Roles (comma-separated)"
                variant="outlined"
                fullWidth
                defaultValue={user?.roles?.join(", ") || ""}
                helperText='E.g. "client" or "seller"'
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {isUpdating ? "Update User" : "Create User"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserModal;
