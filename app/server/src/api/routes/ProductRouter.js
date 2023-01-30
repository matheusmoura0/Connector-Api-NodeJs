const express = require('express');
const ProductController = require('../controllers/ProductController');

const router = express.Router();

router.get('/', ProductController.list);
router.get('/:id', ProductController.getById);

module.exports = router;

