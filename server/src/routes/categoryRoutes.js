const express = require('express');
const router = express.Router();
const {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');
const { authenticate, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getCategories);

// Admin routes
router.post('/', authenticate, authorize(['admin']), createCategory);
router.put('/:id', authenticate, authorize(['admin']), updateCategory);
router.delete('/:id', authenticate, authorize(['admin']), deleteCategory);

module.exports = router;
