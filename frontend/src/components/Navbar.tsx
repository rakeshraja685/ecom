"use client";
import { useCart } from "../app/CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, User, Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { count } = useCart();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "glass-dark py-4" : "bg-transparent py-6"}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-gradient">LuxeCart</Link>
                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <Link href="/products" className="hover:text-primary transition-colors">Shop</Link>
                    <Link href="/cart" className="relative hover:text-primary transition-colors">
                        <ShoppingCart className="w-6 h-6" />
                        <span className="absolute -top-2 -right-2 bg-secondary text-xs rounded-full w-5 h-5 flex items-center justify-center">{count}</span>
                    </Link>
                    <Link href="/login" className="hover:text-primary transition-colors"><User className="w-6 h-6" /></Link>
                </div>
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
            </div>
            {isOpen && (
                <div className="md:hidden glass-dark absolute top-full w-full p-6 flex flex-col space-y-4">
                    <Link href="/" className="hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link href="/products" className="hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Shop</Link>
                    <Link href="/cart" className="hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Cart</Link>
                    <Link href="/login" className="hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>Login</Link>
                </div>
            )}
        </nav>
    );
}
