const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/products/getStoreProducts/:storeId
router.get('/getStoreProducts/:storeId', productController.getProductsByStoreId);

// GET /api/products/SearchProducts?storeId=xx&productName=xx&minPrice=xx&maxPrice=xx&sortBy=xx
router.get('/SearchProducts', productController.searchProducts);

// GET /api/products/getProductById/:productId (Optional)
router.get('/getProductById/:productId', productController.getProductById);

// POST /api/products/postProduct
router.post('/postProduct', productController.createProduct);

// PATCH /api/products/updateProduct/:productId
router.patch('/updateProduct/:productId', productController.updateProduct);

// DELETE /api/products/deleteProduct/:productId
router.delete('/deleteProduct/:productId', productController.deleteProduct);

module.exports = router;
