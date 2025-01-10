/**
 * File: services/userDataProvider.js
 */

const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Create a new user
exports.createUser = async (userData) => {
  const { username, email, password, firstName, lastName, dateOfBirth, roles } = userData;

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new Error("Username or email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  // NEW: If roles array is provided, use it. Otherwise default to ["client"].
  const userRoles = Array.isArray(roles) && roles.length > 0 ? roles : ["client"];

  const newUser = new User({
    username,
    email,
    passwordHash,
    roles: userRoles, // NEW: store roles array
    profile: {
      firstName,
      lastName,
      dateOfBirth,
    },
  });

  return await newUser.save();
};

// Get a user by username
exports.getUserByUsername = async (username) => {
  return await User.findOne({ username }).select("-passwordHash");
};

// Authenticate a user
exports.authenticateUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  return user;
};

// Update user profile
exports.updateUserProfile = async (username, updates) => {
  // Example partial update
  const user = await User.findOneAndUpdate(
    { username },
    {
      $set: {
        email: updates.email,
        phone: updates.phone,
        "profile.firstName": updates.firstName,
        "profile.lastName": updates.lastName,
        "profile.bio": updates.bio,
        "profile.dateOfBirth": updates.dateOfBirth,
        "profile.location": updates.location,
        // If you want to allow updating roles, you can do:
        // roles: updates.roles,
      },
    },
    { new: true, runValidators: true }
  );
  return user;
};

// Update only the user's profile image
exports.updateUserProfileImage = async (username, base64Image) => {
  const user = await User.findOne({ username });
  if (!user) return null;

  user.profile.image = base64Image; 
  await user.save();
  return user;
};

// Delete a user by username
exports.deleteUser = async (username) => {
  return await User.findOneAndDelete({ username });
};

// NEW: getAllUsers
exports.getAllUsers = async () => {
  // Return all user docs, selecting everything except passwordHash
  return await User.find().select("-passwordHash");
};
