"use client";

import { useCart } from "../lib/CartContext";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({ product }: { product: any }) {
    const { addToCart } = useCart();

    return (
        <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
            <ShoppingCart size={20} />
            Add to Cart
        </button>
    );
}
