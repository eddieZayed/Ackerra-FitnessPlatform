// routes/storeRoutes.js

const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// GET /api/stores/getStores
router.get('/getStores', storeController.getAllStores);

// GET /api/stores/getStoreById/:id
router.get('/getStoreById/:id', storeController.getStoreById);

// POST /api/stores/postStore
router.post('/postStore', storeController.createStore);

// PATCH /api/stores/updateStore/:id
router.patch('/updateStore/:id', storeController.updateStore);

// DELETE /api/stores/deleteStore/:id
router.delete('/deleteStore/:id', storeController.deleteStore);

// GET /api/stores/SearchStores?name=storeName
router.get('/SearchStores', storeController.searchStores);

// GET /api/stores/getStoreByOwnerId/:ownerId
router.get('/getStoreByOwnerId/:ownerId', storeController.getStoresByOwner);

// PATCH /api/stores/updateRating/:id
router.patch('/updateRating/:id', storeController.updateStoreRating);

// GET /api/stores/closestStores?latitude=xx&longitude=yy&top=number
router.get('/closestStores', storeController.getClosestStores);

// GET /api/stores/citystores?cityname=CityName
router.get('/citystores', storeController.getStoresByCity);

// GET /api/stores/recommendedstores?cityname=CityName&top=number
router.get('/recommendedstores', storeController.getRecommendedStores);

module.exports = router;
