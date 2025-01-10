const productService = require('../services/productService');

// Get all products for a store
exports.getProductsByStoreId = async (req, res) => {
  try {
    const { storeId } = req.params;
    const products = await productService.getProductsByStoreId(storeId);
    res.status(200).json(products);
  } catch (error) {
    if (error.message.includes('Invalid Store ID')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Search products within a store with filters
exports.searchProducts = async (req, res) => {
  try {
    const products = await productService.searchProducts(req.query);
    res.status(200).json(products);
  } catch (error) {
    if (error.message.includes('Store ID cannot be empty') ||
        error.message.includes('Invalid Store ID')) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    // Return 201 (Created)
    res.status(201).json(product);
  } catch (error) {
    if (error.message.includes('Invalid') ||
        error.message.includes('required') ||
        error.message.includes('does not exist')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Partial update of product
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedProduct = await productService.updateProduct(productId, req.body);
    res.status(200).json(updatedProduct);
  } catch (error) {
    // Could be "No updates were made" or "Invalid product ID" or "Invalid base64 format"
    if (error.message.includes('No updates were made') ||
        error.message.includes('Invalid') ||
        error.message.includes('Product not found')) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Delete a product by product ID
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    await productService.deleteProduct(productId);
    // Return 204 No Content
    res.status(204).send();
  } catch (error) {
    // "Product not found" or "Invalid Product ID"
    if (error.message.includes('not found') || error.message.includes('Invalid')) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// Optionally, get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productService.getProductById(productId);
    res.status(200).json(product);
  } catch (error) {
    if (error.message.includes('not found') || error.message.includes('Invalid')) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
