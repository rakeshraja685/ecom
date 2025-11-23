import Link from 'next/link';

export default function Hero() {
    return (
        <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 z-0" />
            <div className="container mx-auto px-6 relative z-10 text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    <span className="text-gradient">Elevate Your Lifestyle</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
                    Discover a curated collection of premium products designed for the modern connoisseur.
                </p>
                <Link href="/products" className="btn-primary inline-block">
                    Shop Now
                </Link>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
        </div>
    );
}
