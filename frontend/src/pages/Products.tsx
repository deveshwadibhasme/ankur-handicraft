import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

interface Product {
  image: string;
  name: string;
  description: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const baseURI = "http://localhost:5000"
  // const baseURI = "http://localhost:5000"

  useEffect(() => {
    fetch(`${baseURI}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="pt-20">
      <section className="py-20">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground text-center mb-4">Our Collection</h1>
          <p className="text-muted-foreground text-center text-lg mb-12 max-w-2xl mx-auto">
            Browse our handcrafted furniture and artistic wooden décor. Each piece is unique and made to order.
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
