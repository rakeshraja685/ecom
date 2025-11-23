import Header from "../components/Header";
import Link from "next/link";

async function getFeaturedProducts() {
  try {
    const res = await fetch('http://localhost:5000/api/products', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <div className="flex flex-col min-h-screen bg-background text-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-10 py-12 flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold font-display mb-4">The Future of Tech is Here</h1>
          <p className="text-xl text-text-muted mb-8 max-w-2xl">
            Discover the latest gadgets, accessories, and premium electronics at unbeatable prices.
          </p>
          <Link href="/products">
            <button className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Shop Now
            </button>
          </Link>
        </section>

        {/* Featured Products Grid */}
        <section className="px-10 py-8">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <div key={product.id} className="bg-surface rounded-xl overflow-hidden border border-border group hover:border-primary transition-colors">
                <div className="aspect-square bg-gray-800 relative">
                  <img
                    src={product.image_url || "https://via.placeholder.com/400"}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-text-muted text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">${product.price}</span>
                    <button className="bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-bold">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
