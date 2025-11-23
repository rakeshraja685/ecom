"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '../../../lib/api';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../../CartContext';

export default function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProduct();
    }, [id]);

    const addToCart = async () => {
        try {
            await api.post('/cart/add', { productId: product.id, quantity });
            addItem(product.id, quantity);
            alert('Added to cart!');
        } catch (error: any) {
            console.error('Error adding to cart:', error);
            if (error.response && error.response.status === 401) {
                alert('Please login to add items to cart');
                window.location.href = '/login';
            } else {
                alert('Failed to add to cart');
            }
        }
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!product) return <div className="text-center py-20">Product not found</div>;

    return (
        <div className="container mx-auto px-6 py-12">
            <Link href="/products" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" /> Back to Shop
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="glass rounded-2xl overflow-hidden h-[500px]">
                    <img
                        src={product.imageUrl || 'https://via.placeholder.com/600'}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div>
                    <div className="text-primary uppercase tracking-wider mb-4">{product.category}</div>
                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                    <p className="text-3xl font-bold text-gradient mb-8">${product.price}</p>

                    <p className="text-gray-300 mb-8 leading-relaxed">
                        {product.description || 'No description available.'}
                    </p>

                    <div className="flex items-center space-x-6 mb-8">
                        <div className="flex items-center glass rounded-full px-4 py-2">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-xl px-2">-</button>
                            <span className="mx-4 font-bold">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="text-xl px-2">+</button>
                        </div>
                        <button onClick={addToCart} className="btn-primary flex items-center space-x-2">
                            <ShoppingCart className="w-5 h-5" />
                            <span>Add to Cart</span>
                        </button>
                    </div>

                    <div className="glass p-6 rounded-xl">
                        <h3 className="font-bold mb-2">Product Details</h3>
                        <ul className="text-sm text-gray-400 space-y-2">
                            <li>Stock: {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</li>
                            <li>SKU: {product.id.slice(0, 8).toUpperCase()}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
