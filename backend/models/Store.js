// models/Store.js

const mongoose = require('mongoose');

// Coordinates Schema
const CoordinatesSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
}, { _id: false });

// Location Schema
const LocationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  coordinates: { type: CoordinatesSchema, required: true },
}, { _id: false });

// Store Schema
const StoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, default: 0 },
  ratingCounter: { type: Number, default: 0 },
  location: { type: LocationSchema, required: true },
  email: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String, default: '' }, // Base64 encoded image
  category: { type: String, enum: ['supplements', 'clothes','equipments'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Store', StoreSchema);
