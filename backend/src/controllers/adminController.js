const { Order, Product, User, sequelize } = require('../models');

exports.getDashboardStats = async (req, res) => {
    try {
        const totalOrders = await Order.count();
        const totalProducts = await Product.count();
        const totalUsers = await User.count({ where: { role: 'user' } });

        // Calculate total sales (sum of totalAmount for non-cancelled orders)
        // Assuming 'cancelled' status doesn't exist yet, but let's exclude 'returned' or 'refunded' if we want net sales
        // For now, just sum all confirmed/delivered orders or all orders for simplicity
        const totalSalesData = await Order.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('totalAmount')), 'totalSales']
            ],
            where: {
                paymentStatus: ['paid', 'pending'] // Include pending for COD
            }
        });
        const totalSales = totalSalesData[0].dataValues.totalSales || 0;

        const recentOrders = await Order.findAll({
            limit: 5,
            order: [['createdAt', 'DESC']],
            include: [{ model: User, attributes: ['name', 'email'] }]
        });

        res.json({
            totalOrders,
            totalProducts,
            totalUsers,
            totalSales,
            recentOrders
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
