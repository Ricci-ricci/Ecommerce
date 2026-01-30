"use client";
import { useEffect, useState } from "react";
// types.ts
export interface RealProduct {
    id: string;
    title: string;
    description: string;
    price: number;
    images: string[];
    stock: number;
    published: boolean;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
    category: {
        id: string;
        name: string;
    };
}
const useRealProducts = () => {
    const [products, setProducts] = useState<RealProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const fetchProduct = async () => {
        try {
            console.log("Starting fetch to http://localhost:3000/api/products");
            const response = await fetch("http://localhost:3000/api/products");
            console.log("Response status:", response.status);
            if (!response.ok) {
                throw new Error(
                    `Network response was not ok: ${response.status} ${response.statusText}`,
                );
            }
            const data = await response.json();
            console.log("Fetched data:", data);
            setProducts(data.data);
        } catch (error: unknown) {
            console.error("Fetch error:", error);
            setError(
                error instanceof Error ? error.message : "An error occurred",
            );
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProduct();
    }, []);
    return { products, loading, error };
};
export default useRealProducts;
