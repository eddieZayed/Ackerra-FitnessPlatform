/**
 * File: controllers/userController.js
 */

const bcrypt = require("bcryptjs");
const userService = require("../services/userDataProvider");

// Register a user 
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, dateOfBirth } = req.body;
    if (!username || !email || !password || !firstName || !lastName || !dateOfBirth) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }
    await userService.createUser({
      username,
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      // If roles is included in the request body, pass it:
      roles: req.body.roles, // e.g. ["owner"], ["client","seller"], etc.
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// Login a user 
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    const user = await userService.authenticateUser(username, password);
    const { passwordHash, ...userWithoutPassword } = user.toObject();
    res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const updates = req.body;

    const updatedUser = await userService.updateUserProfile(username, updates);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { passwordHash, ...userWithoutPassword } = updatedUser.toObject();
    res.status(200).json({
      message: "Profile updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by username 
exports.getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await userService.getUserByUsername(username.trim());
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      username: user.username,
      email: user.email,
      profile: user.profile,
      roles: user.roles,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile IMAGE only 
exports.updateUserProfileImage = async (req, res) => {
  try {
    const { username } = req.params;
    const { base64Image } = req.body; // base64 from front-end

    const updatedUser = await userService.updateUserProfileImage(username, base64Image);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { passwordHash, ...rest } = updatedUser.toObject();
    res.status(200).json({
      message: "Profile image updated successfully",
      user: rest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete user account 
exports.deleteAccount = async (req, res) => {
  try {
    const { username } = req.params;
    const deletedUser = await userService.deleteUser(username);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found or already deleted" });
    }
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**getAllUsers **/
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    // Sanitizing passwordHash if not done in service:
    const sanitized = users.map(u => {
      const { passwordHash, ...rest } = u.toObject();
      return rest;
    });
    res.status(200).json(sanitized);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
