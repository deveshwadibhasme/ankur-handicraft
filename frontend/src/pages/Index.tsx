import { Link } from "react-router-dom";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import heroImg from "@/assets/hero-furniture.jpg";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";

// const featuredProducts = [
//   { image: product1, name: "Artisan Wooden Bowl", description: "Hand-turned decorative bowl with natural wood grain." },
//   { image: product2, name: "Carved Bookshelf", description: "Ornately carved bookshelf with classic design details." },
//   { image: product3, name: "Heritage Coffee Table", description: "Sculpted coffee table with traditional carved legs." },
//   { image: product4, name: "Woven Seat Chair", description: "Classic wooden chair with handwoven rush seat." },
// ];

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ankur-handicraft.onrender.com/api/products/featured")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching featured products:", err);
        setLoading(false);
      });
  }, []);

  return (<main>
    {/* Hero */}
    <section className="relative min-h-[90vh] flex items-center">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Handcrafted wooden furniture in a warm room" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/40" />
      </div>
      <div className="container relative z-10 py-20">
        <div className="max-w-2xl animate-fade-in-up">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            Handcrafted Furniture That Brings Art Into Your Home
          </h1>
          <p className="text-primary-foreground/85 text-lg md:text-xl font-body mb-8 leading-relaxed">
            Every piece at Ankur Handicraft is a labour of love — carved, shaped, and finished by skilled artisans using time-honoured techniques.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="bg-primary text-primary-foreground font-medium px-7 py-3 rounded-md hover:opacity-90 transition-opacity text-sm"
            >
              View Collection
            </Link>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-whatsapp text-background font-medium px-7 py-3 rounded-md hover:opacity-90 transition-opacity text-sm"
            >
              Contact on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Intro */}
    <section className="py-20">
      <div className="container max-w-3xl text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">Welcome to Ankur Handicraft</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Founded with a passion for preserving heritage, Ankur Handicraft creates furniture and artistic wooden decor. We blend traditional craftsmanship with contemporary aesthetics to deliver pieces that are functional, beautiful, and built to last generations.
        </p>
      </div>
    </section>

    {/* Featured Products */}
    <section className="py-20 bg-card">
      <div className="container">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Featured Pieces</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => (
            <ProductCard key={p.name} {...p} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-block border-2 border-primary text-primary font-medium px-8 py-3 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors text-sm"
          >
            View Full Collection
          </Link>
        </div>
      </div>
    </section>
  </main>)
}

export default Index;
