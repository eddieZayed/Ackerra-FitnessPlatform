const mongoose = require('mongoose');
const Product = require('../models/Product');
const Store = require('../models/Store');

class ProductService {
  // Get all products (optional, if you want a direct get-all)
  async getAllProducts() {
    return await Product.find();
  }

  // Get all products for a specific store
  async getProductsByStoreId(storeId) {
    if (!mongoose.Types.ObjectId.isValid(storeId)) {
      throw new Error('Invalid Store ID');
    }
    return await Product.find({ storeId });
  }

  // Search products by storeId, productName, minPrice, maxPrice, and sortBy
  async searchProducts(queryParams) {
    const { storeId, productName, minPrice, maxPrice, sortBy } = queryParams;

    if (!storeId) {
      throw new Error('Store ID cannot be empty.');
    }
    if (!mongoose.Types.ObjectId.isValid(storeId)) {
      throw new Error('Invalid Store ID.');
    }

    // Build filter
    let filter = { storeId };

    // Filter by product name (case-insensitive)
    if (productName && productName.trim() !== '') {
      filter.productName = { $regex: productName, $options: 'i' };
    }

    // Filter by minPrice
    if (minPrice !== undefined && minPrice !== null) {
      filter.price = { ...(filter.price || {}), $gte: parseFloat(minPrice) };
    }

    // Filter by maxPrice
    if (maxPrice !== undefined && maxPrice !== null) {
      filter.price = { ...(filter.price || {}), $lte: parseFloat(maxPrice) };
    }

    // Handle sorting. Default is ascending by productName
    let sortField = 'productName';
    let sortDirection = 1; // ascending

    if (sortBy && sortBy !== '') {
      // If sortBy starts with '-', we assume descending
      if (sortBy.startsWith('-')) {
        sortField = sortBy.substring(1);
        sortDirection = -1;
      } else {
        sortField = sortBy;
        sortDirection = 1;
      }
    }

    const products = await Product.find(filter).sort({ [sortField]: sortDirection });
    return products;
  }

  // Create a new product
  async createProduct(productData) {
    const { storeId, productName, description, price, image } = productData;

    // Validate store ID
    if (!mongoose.Types.ObjectId.isValid(storeId)) {
      throw new Error('Invalid Store ID');
    }

    // Check if the store actually exists
    const storeExists = await Store.findById(storeId);
    if (!storeExists) {
      throw new Error('Store does not exist');
    }

    // Validate required fields
    if (!productName) {
      throw new Error('Product name is required');
    }

    // Validate base64 (if you want to disallow invalid images)
    if (image && !this.isBase64(image)) {
      throw new Error('Invalid base64 image format');
    }

    const newProduct = new Product({
      storeId,
      productName,
      description: description || '',
      price: price || 0,
      image: image || ''
    });

    return await newProduct.save();
  }

  // Partial update for a product
  async updateProduct(productId, updatedFields) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('Invalid Product ID');
    }

    // If there's an image being updated, validate base64
    if (updatedFields.image && !this.isBase64(updatedFields.image)) {
      throw new Error('Invalid base64 image format');
    }

    // Build dynamic update object
    const updateObj = {};
    if (updatedFields.productName !== undefined && updatedFields.productName.trim() !== '') {
      updateObj.productName = updatedFields.productName;
    }
    if (updatedFields.description !== undefined) {
      updateObj.description = updatedFields.description;
    }
    if (updatedFields.price !== undefined && updatedFields.price !== null) {
      updateObj.price = updatedFields.price;
    }
    if (updatedFields.image !== undefined) {
      updateObj.image = updatedFields.image;
    }

    // Perform update
    const result = await Product.findByIdAndUpdate(
      productId,
      { $set: updateObj },
      { new: true, runValidators: true }
    );

    if (!result) {
      throw new Error('No updates were made. The product may not exist.');
    }

    return result;
  }

  // Delete a product by ID
  async deleteProduct(productId) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('Invalid Product ID');
    }
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      throw new Error('Product not found');
    }
    return deletedProduct;
  }

  // Get a specific product by ID
  async getProductById(productId) {
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error('Invalid Product ID');
    }
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  // Helper method to validate base64 strings
  isBase64(str) {
    if (!str) return false;
    const notBase64 = /[^A-Z0-9+\/=]/i;
    const len = str.length;
    if (!len || len % 4 !== 0 || notBase64.test(str)) return false;
    const firstPaddingChar = str.indexOf('=');
    return (
      firstPaddingChar === -1 ||
      firstPaddingChar === len - 1 ||
      (firstPaddingChar === len - 2 && str[len - 1] === '=')
    );
  }
}

module.exports = new ProductService();
