const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Create a new user (EXISTING)
exports.createUser = async (userData) => {
  const { username, email, password, firstName, lastName, dateOfBirth } = userData;

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new Error("Username or email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    passwordHash,
    profile: {
      firstName,
      lastName,
      dateOfBirth,
    },
  });

  return await newUser.save();
};

// Get a user by username (EXISTING)
exports.getUserByUsername = async (username) => {
  return await User.findOne({ username }).select("-passwordHash");
};

// Authenticate a user (EXISTING)
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

// NEW: Update user profile (fields like firstName, lastName, phone, location, bio, etc.)
exports.updateUserProfile = async (username, updates) => {
  // Example partial update. If any fields exist in updates, we override them
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
      },
    },
    { new: true, runValidators: true }
  );
  return user;
};

// NEW: Update only the user's profile image
exports.updateUserProfileImage = async (username, base64Image) => {
  const user = await User.findOne({ username });
  if (!user) return null;

  user.profile.image = base64Image; // store the base64
  await user.save();
  return user;
};

// NEW: Delete a user by username
exports.deleteUser = async (username) => {
  // Return the deleted user doc or null
  return await User.findOneAndDelete({ username });
};
