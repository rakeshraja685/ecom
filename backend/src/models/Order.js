const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'returned', 'refunded'),
        defaultValue: 'pending',
    },
    paymentMethod: {
        type: DataTypes.ENUM('COD'),
        defaultValue: 'COD',
    },
    paymentStatus: {
        type: DataTypes.ENUM('pending', 'paid', 'failed'),
        defaultValue: 'pending',
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    shippingAddress: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = Order;
