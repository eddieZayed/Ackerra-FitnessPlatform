// routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// POST /api/cart/add
router.post('/add', cartController.addToCart);

// GET /api/cart/:username
router.get('/:username', cartController.getCartByUsername);

// PATCH /api/cart/update-quantity
router.patch('/update-quantity', cartController.updateCartItemQuantity);

// DELETE /api/cart/remove
router.delete('/remove', cartController.removeFromCart);

// DELETE /api/cart/clear
router.delete('/clear', cartController.clearCart);

// POST /api/cart/purchase
router.post('/purchase', cartController.purchaseCart);

module.exports = router;
