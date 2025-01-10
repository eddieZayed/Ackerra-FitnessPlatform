// services/storeService.js

const mongoose = require('mongoose');
const Store = require('../models/Store');
const User = require('../models/User');

class StoreService {
  // Retrieve all stores
  async getAllStores() {
    return await Store.find().populate('ownerId', 'username email');
  }

  // Retrieve a store by ID
  async getStoreById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid Store ID');
    }
    const store = await Store.findById(id).populate('ownerId', 'username email');
    if (!store) {
      throw new Error('Store not found');
    }
    return store;
  }

  // Create a new store
  async createStore(storeData) {
    const { name, email, ownerId, image, location, category } = storeData;

    // Validate required fields
    if (!name || !email || !ownerId || !location || !category) {
      throw new Error('Missing required fields');
    }

    // Validate owner
    const owner = await User.findById(ownerId);
    if (!owner) {
      throw new Error('Store owner does not exist');
    }

    if (!owner.roles.includes('seller')) {
      throw new Error('User is not authorized to create a store');
    }

    // Validate image if provided
    if (image && !this.isBase64(image)) {
      throw new Error('Invalid image format');
    }

    const newStore = new Store({
      name,
      email,
      ownerId,
      image: image || '',
      location,
      category,
    });

    return await newStore.save();
  }

  // Update an existing store
  async updateStore(id, updatedFields) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid Store ID');
    }

    // If email is being updated, ensure it's unique
    if (updatedFields.email) {
      const existingStore = await Store.findOne({ email: updatedFields.email, _id: { $ne: id } });
      if (existingStore) {
        throw new Error('Email is already in use by another store');
      }
    }

    // If image is being updated, validate it
    if (updatedFields.image && !this.isBase64(updatedFields.image)) {
      throw new Error('Invalid image format');
    }

    const updatedStore = await Store.findByIdAndUpdate(id, updatedFields, { new: true, runValidators: true })
      .populate('ownerId', 'username email');

    if (!updatedStore) {
      throw new Error('Store not found');
    }

    return updatedStore;
  }

  // Delete a store
  async deleteStore(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid Store ID');
    }
    const deletedStore = await Store.findByIdAndDelete(id);
    if (!deletedStore) {
      throw new Error('Store not found');
    }
    return deletedStore;
  }

  // Search stores by name (case-insensitive)
  async searchStoresByName(name) {
    if (!name) {
      throw new Error('Store name cannot be empty');
    }
    return await Store.find({ name: { $regex: name, $options: 'i' } }).populate('ownerId', 'username email');
  }

  // Get stores by owner ID
  async getStoresByOwnerId(ownerId) {
    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      throw new Error('Invalid Owner ID');
    }
    return await Store.find({ ownerId }).populate('ownerId', 'username email');
  }

  // Update store rating
  async updateStoreRating(id, newRating) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid Store ID');
    }
    if (newRating < 0 || newRating > 5) {
      throw new Error('Rating must be between 0 and 5');
    }

    const store = await Store.findById(id);
    if (!store) {
      throw new Error('Store not found');
    }

    store.rating = ((store.rating * store.ratingCounter) + newRating) / (store.ratingCounter + 1);
    store.ratingCounter += 1;

    await store.save();
    return store;
  }

  // Get closest stores based on coordinates
  async getClosestStores(coordinates, top) {
    const stores = await Store.find();
    const storesWithDistance = stores.map(store => {
      const distance = this.calculateDistance(coordinates, store.location.coordinates);
      return { store, distance };
    });

    storesWithDistance.sort((a, b) => a.distance - b.distance);
    return storesWithDistance.slice(0, top).map(item => item.store);
  }

  // Get stores by city
  async getStoresByCity(cityName) {
    return await Store.find({ 'location.city': cityName }).populate('ownerId', 'username email');
  }

  // Get recommended stores based on rating
  async getRecommendedStores(cityName, top) {
    const stores = await this.getStoresByCity(cityName);
    stores.sort((a, b) => b.rating - a.rating);
    return stores.slice(0, top);
  }

  // Helper method to validate base64 strings
  isBase64(str) {
    if (!str) return false;
    const notBase64 = /[^A-Z0-9+\/=]/i;
    const len = str.length;
    if (!len || len % 4 !== 0 || notBase64.test(str)) return false;
    const firstPaddingChar = str.indexOf('=');
    return firstPaddingChar === -1 ||
      firstPaddingChar === len - 1 ||
      (firstPaddingChar === len - 2 && str[len - 1] === '=');
  }

  // Helper method to calculate distance using Haversine formula
  calculateDistance(origin, destination) {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.degreesToRadians(destination.latitude - origin.latitude);
    const dLon = this.degreesToRadians(destination.longitude - origin.longitude);
    const lat1 = this.degreesToRadians(origin.latitude);
    const lat2 = this.degreesToRadians(destination.latitude);

    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
}

module.exports = new StoreService();
