"use client";
import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import api from '../../lib/api';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/products');
                setProducts(res.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-12 text-center text-gradient">Our Collection</h1>

            {loading ? (
                <div className="text-center text-gray-400">Loading products...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product: any) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
