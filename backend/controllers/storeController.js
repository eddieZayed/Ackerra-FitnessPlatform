// controllers/storeController.js

const storeService = require('../services/storeService');

// Get all stores
exports.getAllStores = async (req, res) => {
  try {
    const stores = await storeService.getAllStores();
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get store by ID
exports.getStoreById = async (req, res) => {
  try {
    const store = await storeService.getStoreById(req.params.id);
    res.status(200).json(store);
  } catch (error) {
    if (error.message === 'Store not found' || error.message === 'Invalid Store ID') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Create a new store
exports.createStore = async (req, res) => {
  try {
    const store = await storeService.createStore(req.body);
    res.status(201).json(store);
  } catch (error) {
    if (error.message.includes('Missing required fields') ||
        error.message.includes('Store owner') ||
        error.message.includes('Invalid')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Update an existing store
exports.updateStore = async (req, res) => {
  try {
    const store = await storeService.updateStore(req.params.id, req.body);
    res.status(200).json(store);
  } catch (error) {
    if (error.message === 'Store not found' ||
        error.message === 'Invalid Store ID' ||
        error.message.includes('Invalid') ||
        error.message.includes('already in use')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Delete a store
exports.deleteStore = async (req, res) => {
  try {
    await storeService.deleteStore(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'Store not found' || error.message === 'Invalid Store ID') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Search stores by name
exports.searchStores = async (req, res) => {
  try {
    const { name } = req.query;
    const stores = await storeService.searchStoresByName(name);
    res.status(200).json(stores);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get stores by owner ID
exports.getStoresByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const stores = await storeService.getStoresByOwnerId(ownerId);
    res.status(200).json(stores);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update store rating
exports.updateStoreRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    const store = await storeService.updateStoreRating(id, rating);
    res.status(200).json(store);
  } catch (error) {
    if (error.message.includes('Invalid') || error.message.includes('not found')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Get closest stores
exports.getClosestStores = async (req, res) => {
  try {
    const { latitude, longitude, top } = req.query;
    if (!latitude || !longitude || !top) {
      return res.status(400).json({ message: 'Missing required query parameters' });
    }

    const coordinates = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };
    const topNumber = parseInt(top, 10);

    const stores = await storeService.getClosestStores(coordinates, topNumber);
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get stores by city
exports.getStoresByCity = async (req, res) => {
  try {
    const { cityname } = req.query;
    if (!cityname) {
      return res.status(400).json({ message: 'City name is required' });
    }
    const stores = await storeService.getStoresByCity(cityname);
    if (stores.length === 0) {
      return res.status(204).json({ message: `No stores found in ${cityname}` });
    }
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get recommended stores
exports.getRecommendedStores = async (req, res) => {
  try {
    const { cityname, top } = req.query;
    if (!cityname || !top) {
      return res.status(400).json({ message: 'City name and top number are required' });
    }
    const topNumber = parseInt(top, 10);
    const stores = await storeService.getRecommendedStores(cityname, topNumber);
    if (stores.length === 0) {
      return res.status(204).json({ message: `No recommended stores found in ${cityname}` });
    }
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
