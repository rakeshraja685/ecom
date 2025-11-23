const express = require('express');
const router = express.Router();
const {
    createOrder,
    getOrders,
    updateOrderStatus
} = require('../controllers/orderController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', authenticate, createOrder);
router.get('/', authenticate, getOrders);
router.put('/:id/status', authenticate, authorize(['admin']), updateOrderStatus);

module.exports = router;
