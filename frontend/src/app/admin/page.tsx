"use client";
import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { BarChart, Package, Users, ShoppingBag, Plus } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        imageUrl: ''
    });

    const fetchStats = async () => {
        try {
            const res = await api.get('/admin/stats');
            setStats(res.data);
        } catch (error: any) {
            console.error('Error fetching stats:', error);
            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                alert('Access Denied: Admin privileges required.');
                window.location.href = '/login';
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/products', newProduct);
            alert('Product added successfully');
            setShowAddProduct(false);
            setNewProduct({ name: '', description: '', price: '', stock: '', category: '', imageUrl: '' });
            fetchStats(); // Refresh stats
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product');
        }
    };

    if (loading) return <div className="text-center py-20">Loading dashboard...</div>;
    if (!stats) return <div className="text-center py-20">Access Denied</div>;

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-4xl font-bold text-gradient">Admin Dashboard</h1>
                <button onClick={() => setShowAddProduct(!showAddProduct)} className="btn-primary flex items-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Add Product</span>
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <div className="glass p-6 rounded-xl flex items-center space-x-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg text-blue-300">
                        <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-gray-400">Total Orders</p>
                        <p className="text-2xl font-bold">{stats.totalOrders}</p>
                    </div>
                </div>
                <div className="glass p-6 rounded-xl flex items-center space-x-4">
                    <div className="p-3 bg-green-500/20 rounded-lg text-green-300">
                        <BarChart className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-gray-400">Total Sales</p>
                        <p className="text-2xl font-bold">${stats.totalSales}</p>
                    </div>
                </div>
                <div className="glass p-6 rounded-xl flex items-center space-x-4">
                    <div className="p-3 bg-purple-500/20 rounded-lg text-purple-300">
                        <Package className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-gray-400">Products</p>
                        <p className="text-2xl font-bold">{stats.totalProducts}</p>
                    </div>
                </div>
                <div className="glass p-6 rounded-xl flex items-center space-x-4">
                    <div className="p-3 bg-pink-500/20 rounded-lg text-pink-300">
                        <Users className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-gray-400">Users</p>
                        <p className="text-2xl font-bold">{stats.totalUsers}</p>
                    </div>
                </div>
            </div>

            {/* Add Product Form */}
            {showAddProduct && (
                <div className="glass p-8 rounded-xl mb-12">
                    <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
                    <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text" placeholder="Product Name" required
                            className="bg-black/20 border border-white/10 rounded-lg p-3 text-white"
                            value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <input
                            type="text" placeholder="Category" required
                            className="bg-black/20 border border-white/10 rounded-lg p-3 text-white"
                            value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                        />
                        <input
                            type="number" placeholder="Price" required
                            className="bg-black/20 border border-white/10 rounded-lg p-3 text-white"
                            value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <input
                            type="number" placeholder="Stock" required
                            className="bg-black/20 border border-white/10 rounded-lg p-3 text-white"
                            value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
                        />
                        <input
                            type="text" placeholder="Image URL"
                            className="bg-black/20 border border-white/10 rounded-lg p-3 text-white md:col-span-2"
                            value={newProduct.imageUrl} onChange={e => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                        />
                        <textarea
                            placeholder="Description"
                            className="bg-black/20 border border-white/10 rounded-lg p-3 text-white md:col-span-2"
                            value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                        />
                        <button type="submit" className="btn-primary md:col-span-2">Create Product</button>
                    </form>
                </div>
            )}

            {/* Recent Orders */}
            <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
            <div className="space-y-4">
                {stats.recentOrders.map((order: any) => (
                    <div key={order.id} className="glass p-6 rounded-xl flex justify-between items-center">
                        <div>
                            <p className="font-bold">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                            <p className="text-sm text-gray-400">{order.User.name} ({order.User.email})</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-xl">${order.totalAmount}</p>
                            <span className={`text-sm ${order.status === 'delivered' ? 'text-green-400' : 'text-yellow-400'
                                }`}>
                                {order.status.toUpperCase()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
