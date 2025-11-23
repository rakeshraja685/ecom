"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';


interface CartItem {
    productId: string;
    quantity: number;
}

interface CartContextProps {
    items: CartItem[];
    addItem: (productId: string, quantity: number) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;
    count: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (productId: string, quantity: number) => {
        setItems(prev => {
            const existing = prev.find(item => item.productId === productId);
            if (existing) {
                return prev.map(item =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { productId, quantity }];
        });
    };

    const removeItem = (productId: string) => {
        setItems(prev => prev.filter(item => item.productId !== productId));
    };

    const clearCart = () => setItems([]);

    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearCart, count }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
