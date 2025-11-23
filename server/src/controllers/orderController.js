const { Order, OrderItem, Product, sequelize } = require('../models');

const createOrder = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { items, shipping_address } = req.body;
        const userId = req.user.id;
        let totalAmount = 0;

        // Validate stock and calculate total
        for (const item of items) {
            const product = await Product.findByPk(item.product_id);
            if (!product) {
                await t.rollback();
                return res.status(404).json({ error: `Product ${item.product_id} not found` });
            }
            if (product.stock < item.quantity) {
                await t.rollback();
                return res.status(400).json({ error: `Insufficient stock for ${product.name}` });
            }
            totalAmount += Number(product.price) * item.quantity;
        }

        // Create Order
        const order = await Order.create({
            user_id: userId,
            status: 'pending',
            total_amount: totalAmount,
            payment_method: 'COD',
            payment_status: 'pending',
            shipping_address
        }, { transaction: t });

        // Create Order Items and Update Stock
        for (const item of items) {
            const product = await Product.findByPk(item.product_id);
            await OrderItem.create({
                order_id: order.id,
                product_id: item.product_id,
                quantity: item.quantity,
                price: product.price
            }, { transaction: t });

            await product.decrement('stock', { by: item.quantity, transaction: t });
        }

        await t.commit();
        res.status(201).json(order);
    } catch (error) {
        await t.rollback();
        console.error('Order creation error:', error);
        res.status(500).json({ error: 'Error creating order' });
    }
};

const getOrders = async (req, res) => {
    try {
        const where = {};
        if (req.user.role !== 'admin') {
            where.user_id = req.user.id;
        }

        const orders = await Order.findAll({
            where,
            include: [{ model: OrderItem }],
            order: [['createdAt', 'DESC']]
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching orders' });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status, payment_status } = req.body;
        const order = await Order.findByPk(req.params.id);

        if (!order) return res.status(404).json({ error: 'Order not found' });

        await order.update({ status, payment_status });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Error updating order' });
    }
};

module.exports = {
    createOrder,
    getOrders,
    updateOrderStatus
};
