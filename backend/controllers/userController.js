const bcrypt = require("bcryptjs");
const userService = require("../services/userDataProvider"); // Updated service name

// Register a user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, dateOfBirth } = req.body;

    // Validate required fields
    if (!username || !email || !password || !firstName || !lastName || !dateOfBirth) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Use the service to create the user
    await userService.createUser({
      username,
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
    });

    // Return success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if both username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Authenticate user via service
    const user = await userService.authenticateUser(username, password);

    // Exclude the passwordHash from the response
    const { passwordHash, ...userWithoutPassword } = user.toObject();

    // Return success response
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
    const { username } = req.params; // Use username for updating user
    const updates = req.body;

    // Update user profile via service
    const updatedUser = await userService.updateUserProfile(username, updates);

    // Return success response
    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        username: updatedUser.username,
        email: updatedUser.email,
        profile: updatedUser.profile,
        roles: updatedUser.roles,
        isActive: updatedUser.isActive,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by username
exports.getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params; // Fetch the username from request params

    // Fetch user via service
    const user = await userService.getUserByUsername(username.trim());
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude sensitive data and return the user
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
