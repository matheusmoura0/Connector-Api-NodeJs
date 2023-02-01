const express = require('express');
const ProductController = require('../controllers/OrderProductController');
const { createOrder, getOrders } = require('../controllers/OrderController');

const router = express.Router();

// Products
router.get('/productOrders', ProductController.getAllProducts);
router.get('/productOrders/:id', ProductController.getProductById);
router.post('/productOrders', ProductController.createProduct);

// Orders
router.get('/orders',getOrders);


module.exports = router;