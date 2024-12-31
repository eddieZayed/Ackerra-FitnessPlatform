const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bio: { type: String, default: null },
  dateOfBirth: { type: Date, required: true },
  location: { type: String, default: null },
  image: { type: String, default: null },
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  phone: { type: String, default: null },
  profile: { type: ProfileSchema, required: true },
  roles: { type: [String], default: ['user'] },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
