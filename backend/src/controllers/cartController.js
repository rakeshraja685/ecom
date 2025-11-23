const { Cart, CartItem, Product } = require('../models');

exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({
            where: { userId: req.user.id },
            include: [{ model: CartItem, include: [Product] }]
        });

        if (!cart) {
            cart = await Cart.create({ userId: req.user.id });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ where: { userId: req.user.id } });

        if (!cart) {
            cart = await Cart.create({ userId: req.user.id });
        }

        let cartItem = await CartItem.findOne({
            where: { cartId: cart.id, productId }
        });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            await CartItem.create({ cartId: cart.id, productId, quantity });
        }

        res.json({ message: 'Item added to cart' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await Cart.findOne({ where: { userId: req.user.id } });

        if (cart) {
            await CartItem.destroy({ where: { cartId: cart.id, productId } });
        }

        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.mergeCart = async (req, res) => {
    try {
        const { items } = req.body; // items from local storage: [{ productId, quantity }]
        let cart = await Cart.findOne({ where: { userId: req.user.id } });

        if (!cart) {
            cart = await Cart.create({ userId: req.user.id });
        }

        for (const item of items) {
            let cartItem = await CartItem.findOne({
                where: { cartId: cart.id, productId: item.productId }
            });

            if (cartItem) {
                cartItem.quantity += item.quantity;
                await cartItem.save();
            } else {
                await CartItem.create({
                    cartId: cart.id,
                    productId: item.productId,
                    quantity: item.quantity
                });
            }
        }

        res.json({ message: 'Cart merged successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
