const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.generateInvoice = (order, user, items) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const invoiceName = `invoice-${order.id}.pdf`;
        const invoicePath = path.join(__dirname, '../../public/invoices', invoiceName);

        // Ensure directory exists
        const dir = path.dirname(invoicePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const stream = fs.createWriteStream(invoicePath);
        doc.pipe(stream);

        // Header
        doc.fontSize(20).text('INVOICE', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Order ID: ${order.id}`);
        doc.text(`Date: ${new Date().toLocaleDateString()}`);
        doc.text(`Customer: ${user.name}`);
        doc.text(`Address: ${order.shippingAddress}`);
        doc.moveDown();

        // Table Header
        doc.text('Item', 50, 200);
        doc.text('Quantity', 300, 200);
        doc.text('Price', 400, 200);
        doc.text('Total', 500, 200);
        doc.moveTo(50, 220).lineTo(550, 220).stroke();

        // Items
        let y = 240;
        items.forEach(item => {
            doc.text(item.Product.name, 50, y);
            doc.text(item.quantity, 300, y);
            doc.text(`$${item.price}`, 400, y);
            doc.text(`$${item.price * item.quantity}`, 500, y);
            y += 20;
        });

        doc.moveTo(50, y + 10).lineTo(550, y + 10).stroke();
        doc.moveDown();
        doc.fontSize(14).text(`Total Amount: $${order.totalAmount}`, 400, y + 30);

        doc.end();

        stream.on('finish', () => {
            resolve(`/invoices/${invoiceName}`);
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
};
