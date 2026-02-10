"use client";

import Container from "@/app/layout/container";
import Section from "@/app/layout/section";

import useRealProducts from "@/app/data/fetchProduct";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { RealProduct } from "@/app/data/fetchProduct";

interface TrendingProductProps {
    trend: RealProduct[];
    category: string[];
    onCategorySelect: (category: string) => void;
    loading?: boolean;
}

// Component names must start with a capital letter in React.
// Previously "trendingProduct" (lowercase) would be treated as an HTML tag, not a React component.
const TrendingProduct = ({
    trend,
    category,
    onCategorySelect,
    loading,
}: TrendingProductProps) => {
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
    return (
        <div className="w-full py-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                    Trending Now
                </h2>

                <div className="flex gap-2 mt-4 md:mt-0 flex-wrap md:flex-nowrap">
                    {category.map((cat) => (
                        <Button
                            key={cat}
                            variant="outline"
                            size="sm"
                            className="rounded-full px-2 md:px-6"
                            onClick={() => onCategorySelect(cat)}
                        >
                            <span>{cat}</span>
                        </Button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {trend.map((product) => (
                    <div
                        key={product.id}
                        className="group relative flex flex-col"
                    >
                        <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
                            <div className="absolute top-3 left-3 z-10">
                                <span className="bg-white/90 uppercase backdrop-blur-sm px-3 py-1 text-xs font-semibold rounded-full shadow-sm">
                                    {product.categoryName}
                                </span>
                            </div>
                            <button className="absolute cursor-pointer top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm transition-all opacity-0 group-hover:opacity-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                    />
                                </svg>
                            </button>
                            {loading ? (
                                <Skeleton className="flex items-center justify-center w-full h-full">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                </Skeleton>
                            ) : (
                                <Link href={`/shop/${product.id}`}>
                                    {!loadedImages.has(product.id) && (
                                        <Skeleton className="absolute inset-0 w-full h-full" />
                                    )}
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
                                        alt={product.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                        onLoad={() =>
                                            setLoadedImages((prev) =>
                                                new Set(prev).add(product.id),
                                            )
                                        }
                                    />
                                </Link>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col gap-1">
                            {/* We can hide title or show it small based on the design,
                                but accessible naming is important */}
                            <h3 className="font-medium text-gray-900 truncate sr-only">
                                {product.title}
                            </h3>

                            <div className="flex items-center justify-between">
                                <div className="text-sm uppercase font-bold text-gray-900 hover:underline truncate max-w-[140px]">
                                    {product.title}
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="font-bold text-lg">
                                        ${product.price}
                                    </span>
                                    <span className="text-sm text-gray-400 line-through">
                                        ${(product.price * 1.2).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Part3 = () => {
    const { data: products, loading, error } = useRealProducts();

    // Taking the first 4 products to display in the grid
    useEffect(() => {
        console.log("Fetched Products:", products);
    }, [products]);
    const categories = [
        "All",
        ...Array.from(new Set(products.map((p) => p.categoryName))),
    ];
    const [filteredProduct, setFilteredProduct] = useState("All");
    const [displayedProducts, setDisplayedProducts] = useState<RealProduct[]>(
        [],
    );
    const applyFilter = (category: string) => {
        setFilteredProduct(category);
        if (category === "All") {
            setDisplayedProducts(products);
        } else {
            const filtered = products.filter(
                (p) => p.categoryName === category,
            );
            setDisplayedProducts(filtered);
        }
        return;
    };
    useEffect(() => {
        setDisplayedProducts(products);
    }, [products]);

    if (error) return <div>Error: {error}</div>;

    // Show skeleton products when loading
    const productsToDisplay = loading
        ? Array(4)
              .fill(null)
              .map((_, i) => ({
                  id: `skeleton-${i}`,
                  title: "",
                  description: "",
                  price: 0,
                  image: "",
                  stock: 0,
                  published: true,
                  features: [],
                  categoryName: "Loading",
                  categoryId: "",
                  createdAt: "",
                  updatedAt: "",
              }))
        : displayedProducts.slice(0, 4);

    return (
        <Container>
            <Section>
                <TrendingProduct
                    trend={productsToDisplay}
                    category={categories}
                    onCategorySelect={applyFilter}
                    loading={loading}
                />
            </Section>
        </Container>
    );
};
export default Part3;
