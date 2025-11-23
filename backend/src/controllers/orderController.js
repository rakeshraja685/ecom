const { Order, OrderItem, Product, Invoice, sequelize } = require('../models');
const { generateInvoice } = require('../utils/pdfGenerator');

exports.createOrder = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { items, shippingAddress } = req.body; // items: [{ productId, quantity }]
        const userId = req.user.id;

        let totalAmount = 0;
        const orderItemsData = [];

        // Validate items and calculate total
        for (const item of items) {
            const product = await Product.findByPk(item.productId);
            if (!product) {
                throw new Error(`Product ${item.productId} not found`);
            }
            if (product.stock < item.quantity) {
                throw new Error(`Insufficient stock for ${product.name}`);
            }

            totalAmount += parseFloat(product.price) * item.quantity;
            orderItemsData.push({
                productId: item.productId,
                quantity: item.quantity,
                price: product.price,
                Product: product // For PDF generation
            });

            // Update stock
            await product.update({ stock: product.stock - item.quantity }, { transaction: t });
        }

        // Create Order
        const order = await Order.create({
            userId,
            totalAmount,
            shippingAddress,
            paymentMethod: 'COD',
            paymentStatus: 'pending',
            status: 'pending'
        }, { transaction: t });

        // Create Order Items
        for (const item of orderItemsData) {
            await OrderItem.create({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            }, { transaction: t });
        }

        // Generate Invoice
        const invoiceUrl = await generateInvoice(order, req.user, orderItemsData);

        await Invoice.create({
            orderId: order.id,
            pdfUrl: invoiceUrl
        }, { transaction: t });

        await t.commit();

        res.status(201).json({ order, invoiceUrl });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: error.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: [
                { model: OrderItem, include: [Product] },
                { model: Invoice }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                { model: OrderItem, include: [Product] },
                { model: Invoice }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
