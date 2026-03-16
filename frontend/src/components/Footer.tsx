import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-card border-t border-border py-12">
    <div className="container">
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-heading text-xl font-bold text-foreground mb-3">Ankur Handicraft</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Handcrafted metal craft that brings art into your home. Each piece tells a story of tradition and craftsmanship.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-lg font-semibold text-foreground mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us" },
              { to: "/products", label: "Collection" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-heading text-lg font-semibold text-foreground mb-3">Contact</h4>
          <p className="text-muted-foreground text-sm">Phone: +91 8048201272</p>
          <p className="text-muted-foreground text-sm mt-1">Email: ankurhandicrafts1@gmail.com</p>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border text-center text-muted-foreground text-xs">
        © {new Date().getFullYear()} Ankur Handicraft. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
