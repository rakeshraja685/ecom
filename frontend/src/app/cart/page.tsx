"use client";
import { useEffect, useState } from 'react';
import api from '../../lib/api';
import Link from 'next/link';
import { Trash2, ArrowRight } from 'lucide-react';

export default function CartPage() {
    const [cart, setCart] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        try {
            const res = await api.get('/cart');
            setCart(res.data);
        } catch (error: any) {
            console.error('Error fetching cart:', error);
            if (error.response && error.response.status === 401) {
                // User not logged in, show empty state or redirect
                // For now, we'll just set cart to null to show empty state
                setCart(null);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const removeItem = async (productId: string) => {
        try {
            await api.delete(`/cart/remove/${productId}`);
            fetchCart();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    if (loading) return <div className="text-center py-20">Loading cart...</div>;
    if (!cart || !cart.CartItems || cart.CartItems.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Link href="/products" className="btn-primary">Start Shopping</Link>
            </div>
        );
    }

    const total = cart.CartItems.reduce((acc: number, item: any) => acc + (parseFloat(item.Product.price) * item.quantity), 0);

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-12 text-center text-gradient">Your Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    {cart.CartItems.map((item: any) => (
                        <div key={item.id} className="glass p-6 rounded-xl flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                                <img src={item.Product.imageUrl || 'https://via.placeholder.com/100'} alt={item.Product.name} className="w-20 h-20 object-cover rounded-lg" />
                                <div>
                                    <h3 className="font-bold text-lg">{item.Product.name}</h3>
                                    <p className="text-gray-400">${item.Product.price} x {item.quantity}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6">
                                <p className="font-bold text-xl">${(parseFloat(item.Product.price) * item.quantity).toFixed(2)}</p>
                                <button onClick={() => removeItem(item.productId)} className="text-red-500 hover:text-red-400">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="glass p-8 rounded-xl h-fit">
                    <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
                    <div className="flex justify-between mb-4 text-gray-400">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-8 text-gray-400">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="border-t border-white/10 pt-4 mb-8 flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <Link href="/checkout" className="btn-primary w-full flex items-center justify-center space-x-2">
                        <span>Proceed to Checkout</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
