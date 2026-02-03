"use client";

import Link from "next/link";
import { useGlobal } from "../context/GlobalContext";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    stock: number;
    published: boolean;
    features: string[];
    categoryName: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
}

interface ProductGridProps {
    filteredProducts: Product[];
    currentPage: number;
    setCurrentPage: (page: number) => void;
    itemsPerPage: number;
    loading: boolean;
}

const ProductGrid = ({
    filteredProducts,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    loading,
}: ProductGridProps) => {
    const { addToCart, isInCart, removeFromCart } = useGlobal();
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
    //create a number to see the total page that should exist if the item is 40 and itemsPerPage is 9
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    //current index is where we are -1 cause the index start at 0
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    //we only get the items to be shown with slice
    const currentItems = filteredProducts.slice(startIndex, endIndex);
    // Show skeleton products when loading - use itemsPerPage as fallback if no products yet
    const skeletonCount =
        filteredProducts.length > 0
            ? Math.min(itemsPerPage, filteredProducts.length)
            : itemsPerPage;
    const productsToDisplay = loading
        ? Array(skeletonCount)
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
        : currentItems;

    return (
        <div className="flex-1">
            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mb-6">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`mx-1 px-3 py-1 rounded ${currentPage === page ? "bg-black text-white" : "bg-gray-200"}`}
                            >
                                {page}
                            </button>
                        ),
                    )}
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {productsToDisplay.map((product) => (
                    <div
                        key={product.id}
                        className="group flex flex-col bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
                    >
                        {/* Image Container */}
                        <div className="relative aspect-4/3 bg-gray-50 overflow-hidden p-6 block">
                            <div className="absolute top-4 right-4 z-10">
                                <span className="text-[10px] font-bold tracking-wider uppercase bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-gray-600 shadow-sm border border-gray-100">
                                    {product.categoryName}
                                </span>
                            </div>

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
                                        src={product.image}
                                        alt={product.title}
                                        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                                        onLoad={() =>
                                            setLoadedImages((prev) =>
                                                new Set(prev).add(product.id),
                                            )
                                        }
                                    />
                                </Link>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-1">
                            <Link href={`/shop/${product.id}`}>
                                <h3 className="text-lg font-bold text-gray-900 mb-1 truncate hover:text-gray-600 transition-colors">
                                    {product.title}
                                </h3>
                            </Link>

                            <div className="flex items-end justify-between mb-6">
                                <span className="text-2xl font-bold text-gray-900">
                                    ${product.price}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mt-auto">
                                <Button
                                    variant="outline"
                                    className="rounded-full border-gray-200 hover:bg-gray-50 hover:text-black font-medium text-xs sm:text-sm h-10 sm:h-11"
                                    onClick={() =>
                                        isInCart(product.id)
                                            ? removeFromCart(product.id)
                                            : addToCart(product)
                                    }
                                >
                                    {isInCart(product.id)
                                        ? "Remove"
                                        : "Add to Cart"}
                                </Button>
                                <Link
                                    className="w-full"
                                    href={`/shop/${product.id}`}
                                >
                                    <Button className="w-full rounded-full bg-black text-white hover:bg-gray-800 font-medium text-xs sm:text-sm h-10 sm:h-11 shadow-lg shadow-gray-200">
                                        Buy Now
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
