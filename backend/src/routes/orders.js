const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { auth, adminAuth } = require('../middleware/auth');

router.post('/', auth, orderController.createOrder);
router.get('/my-orders', auth, orderController.getUserOrders);
router.get('/all', adminAuth, orderController.getAllOrders);

module.exports = router;
