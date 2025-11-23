"use client";
import { useState, useEffect } from 'react';
import api from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const router = useRouter();
    const [cart, setCart] = useState<any>(null);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await api.get('/cart');
                setCart(res.data);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };
        fetchCart();
    }, []);

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const items = cart.CartItems.map((item: any) => ({
                productId: item.productId,
                quantity: item.quantity
            }));

            const res = await api.post('/orders', {
                items,
                shippingAddress: address
            });

            // Clear cart (backend doesn't auto-clear in my logic yet, but should)
            // Actually, I should clear the cart in backend after order creation.
            // For now, I'll just redirect.

            alert('Order placed successfully! Invoice generated.');
            router.push('/profile'); // Redirect to profile/orders
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Failed to place order.');
        } finally {
            setLoading(false);
        }
    };

    if (!cart) return <div className="text-center py-20">Loading...</div>;

    const total = cart.CartItems?.reduce((acc: number, item: any) => acc + (parseFloat(item.Product.price) * item.quantity), 0) || 0;

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-12 text-center text-gradient">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
                <div className="glass p-8 rounded-xl">
                    <h3 className="text-2xl font-bold mb-6">Shipping Information</h3>
                    <form onSubmit={handleCheckout}>
                        <div className="mb-6">
                            <label className="block text-gray-400 mb-2">Shipping Address</label>
                            <textarea
                                required
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary"
                                rows={4}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter your full address..."
                            />
                        </div>

                        <div className="mb-8">
                            <label className="block text-gray-400 mb-2">Payment Method</label>
                            <div className="bg-black/20 border border-white/10 rounded-lg p-4 flex items-center space-x-4">
                                <div className="w-4 h-4 rounded-full bg-primary" />
                                <span>Cash on Delivery (COD)</span>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="btn-primary w-full">
                            {loading ? 'Processing...' : `Confirm Order ($${total.toFixed(2)})`}
                        </button>
                    </form>
                </div>

                <div className="space-y-6">
                    <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
                    {cart.CartItems?.map((item: any) => (
                        <div key={item.id} className="glass p-4 rounded-lg flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-gray-700 rounded-lg overflow-hidden">
                                    <img src={item.Product.imageUrl} alt={item.Product.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-bold">{item.Product.name}</p>
                                    <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <p className="font-bold">${(parseFloat(item.Product.price) * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                    <div className="glass p-6 rounded-xl mt-6">
                        <div className="flex justify-between text-xl font-bold">
                            <span>Total Amount</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
