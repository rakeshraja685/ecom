const request = require('supertest');
const express = require('express');
const productRoutes = require('../src/routes/productRoutes'); // Wait, I named it products.js in routes
const { sequelize, User } = require('../src/models');
const jwt = require('jsonwebtoken');
const app = express();

// Mock app setup for testing
const authRoutes = require('../src/routes/auth');
const productRouter = require('../src/routes/products');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRouter);

let adminToken;

beforeAll(async () => {
    await sequelize.sync({ force: true });
    // Create admin user
    const admin = await User.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'password',
        role: 'admin'
    });
    adminToken = jwt.sign({ id: admin.id, role: admin.role }, 'supersecretkey');
});

describe('Product Endpoints', () => {
    it('should create a product (admin only)', async () => {
        const res = await request(app)
            .post('/api/products')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                name: 'Test Product',
                price: 100,
                stock: 10,
                category: 'Test'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual('Test Product');
    });

    it('should get all products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
    });
});
