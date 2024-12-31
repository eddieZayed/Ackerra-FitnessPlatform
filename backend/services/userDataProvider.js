const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Create a new user
exports.createUser = async (userData) => {
  const { username, email, password, firstName, lastName, dateOfBirth } = userData;

  // Check if username or email already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new Error('Username or email already exists');
  }

  // Hash the password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create and save the new user
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

// Get a user by username
exports.getUserByUsername = async (username) => {
  return await User.findOne({ username }).select('-passwordHash'); // Exclude password hash
};

// Authenticate a user
exports.authenticateUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return user;
};
