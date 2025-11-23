import Header from "../../components/Header";
import Link from "next/link";

async function getProducts() {
    try {
        const res = await fetch('http://localhost:5000/api/products', { cache: 'no-store' });
        if (!res.ok) return [];
        return res.json();
    } catch (e) {
        return [];
    }
}

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="flex flex-col min-h-screen bg-background text-white">
            <Header />

            <main className="px-10 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold font-display">All Products</h1>
                    <div className="flex gap-4">
                        <select className="bg-surface border border-border rounded-lg px-4 py-2 text-sm">
                            <option>Sort by: Featured</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product: any) => (
                        <Link href={`/products/${product.id}`} key={product.id}>
                            <div className="bg-surface rounded-xl overflow-hidden border border-border group hover:border-primary transition-colors h-full flex flex-col">
                                <div className="aspect-square bg-gray-800 relative">
                                    <img
                                        src={product.image_url || "https://via.placeholder.com/400"}
                                        alt={product.name}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                                    <p className="text-text-muted text-sm mb-3 line-clamp-2 flex-1">{product.description}</p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-xl font-bold">${product.price}</span>
                                        <button className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-bold">
                                            View
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
