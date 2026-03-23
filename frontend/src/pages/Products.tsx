import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { useLocation } from "react-router-dom";

interface Product {
  image: string;
  name: string;
  description: string;
  material?: string;
  category: string;
  price?: number;
  dimensions?: string;
  isFeatured?: boolean;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation()

  const baseURI =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "server.ankurhandicraft.com";

  useEffect(() => {
    const path = pathname.split("/")[2];
    setLoading(true);
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${baseURI}/api/products/${path || "all-products"}`);
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    }
    fetchProduct()
  }, [pathname]);

  return (
    <main className="pt-20">
      <section className="py-20">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground text-center mb-4">Our Collection</h1>
          <p className="text-muted-foreground text-center text-lg mb-12 max-w-2xl mx-auto">
            Browse our handcrafted metal craft and artistic metal  décor. Each piece is unique and made to order.
          </p>
          {loading ? (
            <div className="text-center py-10">Loading collection...</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((p) => (
                <ProductCard key={p.name} {...p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Products;
