"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Edit } from "lucide-react";

export default function AdminPage() {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '', description: '', price: '', stock: '', category_id: 1, image_url: ''
    });

    useEffect(() => {
        const checkAdmin = async () => {
            const token = localStorage.getItem('token');
            const userStr = localStorage.getItem('user');

            if (!token || !userStr) {
                router.push('/login'); // Or 404
                return;
            }

            const user = JSON.parse(userStr);
            if (user.role !== 'admin') {
                router.push('/'); // Redirect non-admins
                return;
            }

            fetchProducts();
        };

        checkAdmin();
    }, [router]);

    const fetchProducts = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/products');
            const data = await res.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;

        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                fetchProducts();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const res = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setShowForm(false);
                setFormData({ name: '', description: '', price: '', stock: '', category_id: 1, image_url: '' });
                fetchProducts();
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div className="text-white p-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-background text-white p-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold font-display">Admin Dashboard</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-primary hover:bg-blue-600 px-4 py-2 rounded-lg font-bold flex items-center gap-2"
                >
                    <Plus size={20} />
                    Add Product
                </button>
            </div>

            {showForm && (
                <div className="bg-surface p-6 rounded-xl border border-border mb-8 max-w-2xl">
                    <h2 className="text-xl font-bold mb-4">New Product</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            placeholder="Name"
                            className="w-full bg-background border border-border rounded p-2"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Description"
                            className="w-full bg-background border border-border rounded p-2"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="number" placeholder="Price"
                                className="w-full bg-background border border-border rounded p-2"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                                required
                            />
                            <input
                                type="number" placeholder="Stock"
                                className="w-full bg-background border border-border rounded p-2"
                                value={formData.stock}
                                onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                required
                            />
                        </div>
                        <input
                            placeholder="Image URL"
                            className="w-full bg-background border border-border rounded p-2"
                            value={formData.image_url}
                            onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                        />
                        <button type="submit" className="bg-green-600 px-6 py-2 rounded font-bold">Save</button>
                    </form>
                </div>
            )}

            <div className="bg-surface rounded-xl border border-border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-800 text-text-muted">
                        <tr>
                            <th className="p-4">ID</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Stock</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product: any) => (
                            <tr key={product.id} className="border-t border-border">
                                <td className="p-4">{product.id}</td>
                                <td className="p-4">{product.name}</td>
                                <td className="p-4">${product.price}</td>
                                <td className="p-4">{product.stock}</td>
                                <td className="p-4 flex gap-2">
                                    <button className="text-blue-400 hover:text-blue-300"><Edit size={18} /></button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
