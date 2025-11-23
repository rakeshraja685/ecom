const { Category } = require('../models');

const createCategory = async (req, res) => {
    try {
        const { name, parent_id } = req.body;
        const category = await Category.create({ name, parent_id });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error creating category' });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: [{ model: Category, as: 'parent', attributes: ['name'] }]
        });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching categories' });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { name, parent_id } = req.body;
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });

        await category.update({ name, parent_id });
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error updating category' });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ error: 'Category not found' });

        await category.destroy();
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting category' });
    }
};

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
};
