const { sequelize, User, Product } = require('../models');
const bcrypt = require('bcrypt');

const seed = async () => {
    try {
        await sequelize.sync({ force: true }); // WARNING: Clears DB

        // Create Admin
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@luxecart.com',
            password: 'adminpassword', // Will be hashed by hook
            role: 'admin'
        });
        console.log('Admin created: admin@luxecart.com / adminpassword');

        // Create User
        const user = await User.create({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            role: 'user'
        });
        console.log('User created: john@example.com / password123');

        // Create Products
        const products = [
            {
                name: 'Premium Wireless Headphones',
                description: 'High-fidelity audio with noise cancellation.',
                price: 299.99,
                stock: 50,
                category: 'Electronics',
                imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
            },
            {
                name: 'Luxury Chronograph Watch',
                description: 'Swiss movement, sapphire crystal.',
                price: 1299.00,
                stock: 10,
                category: 'Accessories',
                imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80'
            },
            {
                name: 'Designer Leather Bag',
                description: 'Handcrafted Italian leather.',
                price: 450.00,
                stock: 20,
                category: 'Fashion',
                imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80'
            },
            {
                name: 'Smart Home Hub',
                description: 'Control your entire home with voice.',
                price: 149.99,
                stock: 100,
                category: 'Electronics',
                imageUrl: 'https://images.unsplash.com/photo-1558002038-1091a166111c?w=500&q=80'
            }
        ];

        await Product.bulkCreate(products);
        console.log('Sample products created');

        console.log('Seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seed();
