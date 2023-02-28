const express = require('express');
const ProductController = require('../controllers/OrderProductController');
const { create, getOrders, update } = require('../controllers/OrderController');

const router = express.Router();

// Product Orders
router.get('/productOrders', ProductController.getAllProducts);
router.get('/productOrders/:id', ProductController.getProductById);
router.post('/productOrders', ProductController.createProduct);

// Orders
router.get('/orders',getOrders);
router.post('/orders', create);
router.put('/orders/:id', update);

module.exports = router;