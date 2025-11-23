const { User } = require('../models');

const checkAdmin = async () => {
    try {
        const admin = await User.findOne({ where: { email: 'admin@luxecart.com' } });
        if (admin) {
            console.log(`User found: ${admin.email}, Role: ${admin.role}`);
        } else {
            console.log('Admin user not found');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

checkAdmin();
