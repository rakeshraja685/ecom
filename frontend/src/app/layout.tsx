import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "./CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "LuxeCart - Premium E-commerce",
    description: "Experience luxury shopping",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className} suppressHydrationWarning>
                <CartProvider>
                    <Navbar />
                    <main className="min-h-screen pt-24">{children}</main>
                    <Footer />
                </CartProvider>
            </body>
        </html>
    );
}

