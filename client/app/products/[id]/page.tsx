import Header from "../../../components/Header";
import AddToCartButton from "../../../components/AddToCartButton";

async function getProduct(id: string) {
    try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`, { cache: 'no-store' });
        if (!res.ok) return null;
        return res.json();
    } catch (e) {
        return null;
    }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        return <div className="text-white text-center py-20">Product not found</div>;
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-white">
            <Header />

            <main className="px-10 py-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="bg-surface rounded-2xl overflow-hidden border border-border aspect-square">
                        <img
                            src={product.image_url || "https://via.placeholder.com/600"}
                            alt={product.name}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-2">
                            <span className="text-primary font-bold text-sm tracking-wide uppercase">
                                {product.Category?.name || 'Electronics'}
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold font-display mb-4">{product.name}</h1>
                        <p className="text-text-muted text-lg mb-8 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="flex items-center gap-6 mb-8">
                            <span className="text-4xl font-bold">${product.price}</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${product.stock > 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>

                        <div className="flex gap-4">
                            <AddToCartButton product={product} />
                            <button className="px-6 border border-border hover:bg-surface rounded-xl font-bold transition-colors">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
