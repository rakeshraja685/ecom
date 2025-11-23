const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const cartRoutes = require('./routes/cart');
const adminRoutes = require('./routes/admin');
const path = require('path');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/invoices', express.static(path.join(__dirname, '../public/invoices')));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('E-commerce Backend is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Sync Database
sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
}).catch((err) => {
    console.error('Unable to sync database:', err);
});
