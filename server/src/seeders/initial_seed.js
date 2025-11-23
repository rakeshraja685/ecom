const bcrypt = require('bcrypt');
const { User, Category, Product, sequelize } = require('../models');

const seed = async () => {
    try {
        await sequelize.sync();

        // Create Admin User
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash('admin123', salt);

        const admin = await User.findOne({ where: { email: 'admin@techmart.com' } });
        if (!admin) {
            await User.create({
                name: 'Admin User',
                email: 'admin@techmart.com',
                password_hash,
                role: 'admin'
            });
            console.log('Admin user created');
        }

        // Create Categories
        const categories = [
            { name: 'Laptops' },
            { name: 'Smartphones' },
            { name: 'Accessories' },
            { name: 'Audio' }
        ];

        for (const cat of categories) {
            await Category.findOrCreate({ where: { name: cat.name } });
        }
        console.log('Categories created');

        // Create Products
        const laptopCat = await Category.findOne({ where: { name: 'Laptops' } });
        const phoneCat = await Category.findOne({ where: { name: 'Smartphones' } });

        const products = [
            {
                name: 'MacBook Pro 16"',
                description: 'M3 Max chip, 32GB RAM, 1TB SSD',
                price: 2499.99,
                stock: 10,
                category_id: laptopCat.id,
                image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000'
            },
            {
                name: 'iPhone 15 Pro',
                description: 'Titanium design, A17 Pro chip',
                price: 999.99,
                stock: 20,
                category_id: phoneCat.id,
                image_url: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=1000'
            }
        ];

        for (const prod of products) {
            await Product.findOrCreate({
                where: { name: prod.name },
                defaults: prod
            });
        }
        console.log('Products created');

        console.log('Seeding complete');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seed();
