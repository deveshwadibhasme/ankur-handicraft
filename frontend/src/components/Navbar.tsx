import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  {
    to: "/products",
    label: "Collection",
    dropdown: [
      { to: "/products", label: "All Products" },
      { to: "/products/memento-corporate", label: "Memento & Corporate" },
      { to: "/products/traditional", label: "Traditional Art" },
      { to: "/products/religious-art", label: "Religious Art" },
    ],
  },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link id="logo" to="/" className="text-xl md:text-2xl font-bold text-foreground tracking-wide">
          <span><img className="h-6 inline-block mb-2 mr-2" src="/logo.svg" alt="" /></span>Ankur Handicraft
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <div key={l.to} className="relative group">
              <Link
                to={l.to}
                className={cn(
                  "font-body text-sm tracking-wide transition-colors hover:text-primary flex items-center gap-1 py-2",
                  location.pathname === l.to ? "text-primary font-semibold" : "text-muted-foreground"
                )}
              >
                {l.label}
                {l.dropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
              </Link>

              {l.dropdown && (
                <div className="absolute top-full left-0 w-56 bg-background border border-border shadow-lg rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {l.dropdown.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border pb-4">
          {links.map((l) => (
            <div key={l.to}>
              <Link
                to={l.to}
                onClick={() => !l.dropdown && setOpen(false)}
                className={cn(
                  "block px-6 py-3 font-body text-sm tracking-wide transition-colors hover:text-primary",
                  location.pathname === l.to ? "text-primary font-semibold" : "text-muted-foreground"
                )}
              >
                {l.label}
              </Link>
              {l.dropdown && (
                <div className="bg-accent/30 py-1">
                  {l.dropdown.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="block px-10 py-2 text-xs text-muted-foreground hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
