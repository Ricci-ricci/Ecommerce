"use client";
import { useEffect, useState } from "react";
export interface RealProduct {
    id: string;
    title: string;
    description: string;
    price: number;
    stock: number;
    published: boolean;
    image: string;
    features: string[];
    categoryName: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
}
const useRealProducts = () => {
    const [response, setResponse] = useState<{
        success: boolean;
        data: RealProduct[];
    }>({ success: false, data: [] });
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
            setResponse({ success: true, data: data.data });
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
    return { success: response.success, data: response.data, loading, error };
};
export default useRealProducts;
