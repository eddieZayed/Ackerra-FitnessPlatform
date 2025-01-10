// controllers/cartController.js

const cartService = require('../services/cartService');

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { username, productId, quantity } = req.body;
    if (!username || !productId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const cart = await cartService.addToCart(username, productId, quantity);
    res.status(201).json({
      message: 'Product added to cart successfully',
      cart,
    });
  } catch (error) {
    if (error.message === 'Product already in cart') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// Get cart (with total cost)
exports.getCartByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    const cart = await cartService.getCartByUsername(username);
    if (!cart) {
      return res.status(200).json({ items: [], totalCost: 0 });
    }

    // Calculate total cost
    let totalCost = 0;
    cart.items.forEach((item) => {
      const productPrice = item.productId.price || 0;
      totalCost += productPrice * item.quantity;
    });

    res.status(200).json({
      cart,
      totalCost,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update quantity
exports.updateCartItemQuantity = async (req, res) => {
  try {
    const { username, productId, quantity } = req.body;
    if (!username || !productId || quantity == null) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const cart = await cartService.updateCartItemQuantity(username, productId, quantity);
    return res.status(200).json({
      message: 'Cart item quantity updated',
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item
exports.removeFromCart = async (req, res) => {
  try {
    const { username, productId } = req.body;
    if (!username || !productId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const cart = await cartService.removeFromCart(username, productId);
    res.status(200).json({
      message: 'Item removed from cart',
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    const cart = await cartService.clearCart(username);
    res.status(200).json({
      message: 'Cart cleared successfully',
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// "Purchase" or finalize order (clears cart)
exports.purchaseCart = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    // Example: you might do payment logic, but we'll just clear
    const cart = await cartService.clearCart(username);

    return res.status(200).json({
      message: 'Purchase successful, cart cleared',
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
