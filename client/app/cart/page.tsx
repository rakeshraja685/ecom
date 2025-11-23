"use client";

import Header from "../../components/Header";
import { useCart } from "../../lib/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, total } = useCart();

    return (
        <div className="flex flex-col min-h-screen bg-background text-white">
            <Header />

            <main className="px-10 py-12">
                <h1 className="text-3xl font-bold font-display mb-8">Shopping Cart</h1>

                {items.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-text-muted text-lg mb-4">Your cart is empty</p>
                        <Link href="/products">
                            <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="bg-surface p-4 rounded-xl border border-border flex gap-4">
                                    <div className="w-24 h-24 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-lg">{item.name}</h3>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-text-muted hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3 bg-background rounded-lg p-1 border border-border">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:text-primary"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="font-bold w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:text-primary"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <span className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-surface p-6 rounded-xl border border-border h-fit">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-text-muted">
                                    <span>Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-text-muted">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="border-t border-border pt-4 flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                            <Link href="/checkout">
                                <button className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors">
                                    Proceed to Checkout
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
