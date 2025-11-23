"use client";
import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { Package, Download } from 'lucide-react';

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await api.get('/auth/me');
                setUser(userRes.data);
                const ordersRes = await api.get('/orders/my-orders');
                setOrders(ordersRes.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="text-center py-20">Loading profile...</div>;
    if (!user) return <div className="text-center py-20">Please login to view profile</div>;

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="glass p-8 rounded-xl mb-12">
                <h1 className="text-3xl font-bold mb-4">Hello, <span className="text-gradient">{user.name}</span></h1>
                <p className="text-gray-400">{user.email}</p>
            </div>

            <h2 className="text-2xl font-bold mb-8">Order History</h2>
            <div className="space-y-6">
                {orders.length === 0 ? (
                    <p className="text-gray-400">No orders yet.</p>
                ) : (
                    orders.map((order: any) => (
                        <div key={order.id} className="glass p-6 rounded-xl">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                <div>
                                    <p className="font-bold text-lg">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                                    <p className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                                    <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'delivered' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                                        }`}>
                                        {order.status.toUpperCase()}
                                    </span>
                                    {order.Invoice && (
                                        <a
                                            href={`${(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace('/api', '')}${order.Invoice.pdfUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2 text-primary hover:text-white transition-colors"
                                        >
                                            <Download className="w-4 h-4" />
                                            <span>Invoice</span>
                                        </a>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                {order.OrderItems.map((item: any) => (
                                    <div key={item.id} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-gray-700 rounded-lg overflow-hidden">
                                                {/* Assuming Product is included in OrderItem */}
                                                <img src={item.Product?.imageUrl || 'https://via.placeholder.com/50'} alt={item.Product?.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold">{item.Product?.name}</p>
                                                <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-bold">${item.price}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                                <span className="text-gray-400">Total Amount</span>
                                <span className="text-xl font-bold text-gradient">${order.totalAmount}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
