const { generateInvoice } = require('../utils/pdfGenerator');
const fs = require('fs');
const path = require('path');

const mockOrder = {
    id: 'test-order-123',
    totalAmount: 100,
    shippingAddress: '123 Test St'
};

const mockUser = {
    name: 'Test User'
};

const mockItems = [
    {
        Product: { name: 'Test Product', price: 50 },
        quantity: 2,
        price: 50
    }
];

generateInvoice(mockOrder, mockUser, mockItems)
    .then(url => {
        console.log('Invoice generated at:', url);
        const fullPath = path.join(__dirname, '../../public', url);
        if (fs.existsSync(fullPath)) {
            console.log('File exists:', fullPath);
            console.log('Size:', fs.statSync(fullPath).size);
        } else {
            console.error('File not found at:', fullPath);
        }
    })
    .catch(err => console.error('Error:', err));
