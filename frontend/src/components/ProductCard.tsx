import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    category: string;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="glass rounded-xl overflow-hidden group hover:border-primary/50 transition-all duration-300">
            <div className="relative h-64 overflow-hidden">
                <img
                    src={product.imageUrl || 'https://via.placeholder.com/400'}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href={`/products/${product.id}`} className="btn-primary scale-90 group-hover:scale-100 transition-transform">
                        View Details
                    </Link>
                </div>
            </div>
            <div className="p-6">
                <div className="text-sm text-primary mb-2 uppercase tracking-wider">{product.category}</div>
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gradient">${product.price}</span>
                    <button className="p-2 rounded-full bg-white/10 hover:bg-primary hover:text-white transition-colors">
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
