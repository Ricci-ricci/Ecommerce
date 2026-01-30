"use client";

import Link from "next/link";
import { useGlobal } from "../context/GlobalContext";
import { Button } from "@/components/ui/button";

interface Product {
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

interface ProductGridProps {
    filteredProducts: Product[];
}

const ProductGrid = ({ filteredProducts }: ProductGridProps) => {
    const { addToCart, isInCart, removeFromCart } = useGlobal();

    return (
        <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="group flex flex-col bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
                    >
                        {/* Image Container */}
                        <Link
                            href={`/shop/${product.id}`}
                            className="relative aspect-4/3 bg-gray-50 overflow-hidden p-6 block"
                        >
                            <div className="absolute top-4 right-4 z-10">
                                <span className="text-[10px] font-bold tracking-wider uppercase bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-gray-600 shadow-sm border border-gray-100">
                                    {product.category.name}
                                </span>
                            </div>

                            <img
                                src={product.images[0]}
                                alt={product.title}
                                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                            />
                        </Link>

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
