"use client";

import Header from "../../components/Header";
import { useCart } from "../../lib/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();
    const router = useRouter();
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // In a real app, we would get the token from auth context
            // For this demo, we'll assume the user is logged in or handle it on backend
            // But wait, our backend requires auth. 
            // We need a login page first. 
            // For now, let's mock the token or assume a hardcoded one for testing if not implemented yet.
            // Actually, let's just try to submit. If 401, redirect to login.

            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const res = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    items: items.map(item => ({ product_id: item.id, quantity: item.quantity })),
                    shipping_address: address
                })
            });

            if (res.ok) {
                clearCart();
                router.push('/orders');
            } else {
                alert('Order failed');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background text-white">
            <Header />

            <main className="px-10 py-12">
                <h1 className="text-3xl font-bold font-display mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-surface p-6 rounded-xl border border-border">
                        <h2 className="text-xl font-bold mb-6">Shipping Details</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-text-muted mb-2">Shipping Address</label>
                                <textarea
                                    required
                                    className="w-full bg-background border border-border rounded-lg p-3 text-white h-32 focus:ring-primary focus:border-primary"
                                    placeholder="Enter your full address..."
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-text-muted mb-2">Payment Method</label>
                                <div className="bg-background border border-border rounded-lg p-4 flex items-center gap-3">
                                    <input type="radio" checked readOnly className="text-primary focus:ring-primary" />
                                    <span className="font-bold">Cash on Delivery (COD)</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || items.length === 0}
                                className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : `Place Order ($${total.toFixed(2)})`}
                            </button>
                        </form>
                    </div>

                    <div className="bg-surface p-6 rounded-xl border border-border h-fit">
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-800 rounded overflow-hidden">
                                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">{item.name}</p>
                                            <p className="text-text-muted text-xs">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="border-t border-border pt-4 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
