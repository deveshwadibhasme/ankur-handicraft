import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

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

interface ProductContextType {
    products: Product[];
    loading: boolean;
    baseURI: string;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const baseURI =
        window.location.hostname === "localhost"
            ? "http://localhost:5000"
            : "https://server.ankurhandicraft.com";

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
    }, [baseURI]);

    return (
        <ProductContext.Provider value={{ products, loading, baseURI }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
};
