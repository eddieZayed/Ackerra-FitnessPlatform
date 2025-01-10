const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      default: 0.0
    },
    image: {
      type: String,
      default: '' // Base64 encoded image
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
