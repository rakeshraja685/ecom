"use client";

import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const res = await fetch('http://localhost:5000/api/orders', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchOrders();
    }, [router]);

    return (
        <div className="flex flex-col min-h-screen bg-background text-white">
            <Header />

            <main className="px-10 py-12">
                <h1 className="text-3xl font-bold font-display mb-8">My Orders</h1>

                <div className="space-y-6">
                    {orders.map((order: any) => (
                        <div key={order.id} className="bg-surface p-6 rounded-xl border border-border">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="font-bold text-lg">Order #{order.id}</p>
                                    <p className="text-text-muted text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${order.status === 'delivered' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                                        }`}>
                                        {order.status.toUpperCase()}
                                    </span>
                                    <p className="font-bold text-lg mt-2">${Number(order.total_amount).toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="border-t border-border pt-4">
                                <h4 className="font-bold text-sm mb-2">Items</h4>
                                <div className="space-y-2">
                                    {order.OrderItems?.map((item: any) => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span className="text-text-muted">Product ID: {item.product_id} (x{item.quantity})</span>
                                            <span>${Number(item.price).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
