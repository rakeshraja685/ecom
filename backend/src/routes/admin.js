const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { adminAuth } = require('../middleware/auth');

router.get('/stats', adminAuth, adminController.getDashboardStats);

module.exports = router;
