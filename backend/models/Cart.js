// models/Cart.js

const mongoose = require('mongoose');

// Each cart item
const CartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 },
});

// Cart schema with username
const CartSchema = new mongoose.Schema(
  {
    username: { type: String, required: true }, 
    items: [CartItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', CartSchema);
