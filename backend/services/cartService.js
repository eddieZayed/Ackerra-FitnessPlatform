// services/cartService.js

const Cart = require('../models/Cart');

class CartService {
  // Get or create a cart for a user by username
  async getOrCreateCart(username) {
    let cart = await Cart.findOne({ username });
    if (!cart) {
      cart = await Cart.create({ username, items: [] });
    }
    return cart;
  }

  // Get cart by username (populate product details)
  async getCartByUsername(username) {
    return await Cart.findOne({ username })
      .populate('items.productId', 'productName price image')
      .exec();
  }

  // Add product to cart
  async addToCart(username, productId, quantity = 1) {
    if (quantity < 1) {
      throw new Error('Quantity must be at least 1');
    }
    const cart = await this.getOrCreateCart(username);

    // Check if product is already in cart
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (existingItem) {
      // If product already in cart, throw an error
      throw new Error('Product already in cart');
    } else {
      // Otherwise, push new item
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    return cart;
  }

  // Update item quantity
  async updateCartItemQuantity(username, productId, newQuantity) {
    if (newQuantity < 1) {
      throw new Error('Quantity cannot be less than 1');
    }

    const cart = await this.getOrCreateCart(username);
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex === -1) {
      throw new Error('Item not found in cart');
    }

    cart.items[itemIndex].quantity = newQuantity;
    await cart.save();
    return cart;
  }

  // Remove item from cart
  async removeFromCart(username, productId) {
    const cart = await this.getOrCreateCart(username);
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();
    return cart;
  }

  // Clear entire cart
  async clearCart(username) {
    const cart = await this.getOrCreateCart(username);
    cart.items = [];
    await cart.save();
    return cart;
  }
}

module.exports = new CartService();
