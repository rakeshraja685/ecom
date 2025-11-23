const { Product, Category, Sequelize } = require('../models');
const { Op } = Sequelize;

const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category_id, image_url } = req.body;
        const product = await Product.create({
            name, description, price, stock, category_id, image_url
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error creating product' });
    }
};

const getProducts = async (req, res) => {
    try {
        const { category_id, search, sort } = req.query;
        const where = {};

        if (category_id) where.category_id = category_id;
        if (search) {
            where.name = { [Op.iLike]: `%${search}%` };
        }

        let order = [['createdAt', 'DESC']];
        if (sort === 'price_asc') order = [['price', 'ASC']];
        if (sort === 'price_desc') order = [['price', 'DESC']];

        const products = await Product.findAll({
            where,
            include: [{ model: Category, attributes: ['name'] }],
            order
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [{ model: Category, attributes: ['name'] }]
        });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category_id, image_url } = req.body;
        const product = await Product.findByPk(req.params.id);

        if (!product) return res.status(404).json({ error: 'Product not found' });

        await product.update({
            name, description, price, stock, category_id, image_url
        });

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        await product.destroy();
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
