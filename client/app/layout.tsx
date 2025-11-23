import type { Metadata } from "next";
import { Noto_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-space-grotesk" });
const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["400", "500", "700", "900"], variable: "--font-noto-sans" });

export const metadata: Metadata = {
  title: "TechMart - Premium Electronics",
  description: "Your one-stop shop for the latest tech gadgets.",
};

import { CartProvider } from "../lib/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${notoSans.variable} font-sans bg-background text-text antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
