export default function Footer() {
    return (
        <footer className="bg-slate-900 py-12 mt-20 border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold text-gradient mb-4">LuxeCart</h3>
                        <p className="text-gray-400">Premium shopping experience delivered to your doorstep.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Shop</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>New Arrivals</li>
                            <li>Best Sellers</li>
                            <li>Categories</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>FAQ</li>
                            <li>Shipping</li>
                            <li>Returns</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Connect</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Instagram</li>
                            <li>Twitter</li>
                            <li>Facebook</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-500">
                    <p>&copy; 2025 LuxeCart. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
