"use client";

import Image from "next/image";
import Link from "next/link";
import { useGlobal } from "../context/GlobalContext";
import { ShoppingCart } from "lucide-react";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    reviews: number;
}

interface ProductGridProps {
    filteredProducts: Product[];
}

const ProductGrid = ({ filteredProducts }: ProductGridProps) => {
    const { addToCart } = useGlobal();

    return (
        <div className="flex-1 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <Link
                        key={product.id}
                        href={`/shop/${product.id}`}
                        className="block group"
                    >
                        <div className="border border-gray-200 rounded-xl p-4 shadow-sm group-hover:shadow-md transition-all duration-300 bg-white h-full flex flex-col">
                            <div className="relative overflow-hidden rounded-md mb-4 aspect-[4/3]">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                                    {product.description}
                                </p>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                <div>
                                    <span className="text-xl font-bold text-gray-900">
                                        ${product.price}
                                    </span>
                                    <div className="flex items-center mt-1">
                                        <span className="text-yellow-400 text-sm mr-1">
                                            ★
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {product.rating} ({product.reviews})
                                        </span>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        addToCart(product);
                                    }}
                                    className="p-3 bg-gray-900 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm active:scale-95"
                                    title="Add to Cart"
                                >
                                    <ShoppingCart size={20} />
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
