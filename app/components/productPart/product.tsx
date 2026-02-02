"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGlobal } from "@/app/context/GlobalContext";
import { Skeleton } from "@/components/ui/skeleton";

import { RealProduct } from "@/app/data/fetchProduct";

const Product = ({ product }: { product: RealProduct }) => {
    const { addToCart } = useGlobal();
    const [imageLoaded, setImageLoaded] = useState(false);
    return (
        <>
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Section */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
                        {!imageLoaded && (
                            <Skeleton className="absolute inset-0 w-full h-full" />
                        )}
                        <img
                            src={product.image}
                            alt={product.title}
                            className="object-cover object-center w-full h-full"
                            onLoad={() => setImageLoaded(true)}
                        />
                    </div>
                    <div className="flex flex-col items-start justify-start">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-2">
                                {product.title}
                            </h1>
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                                {product.categoryName}
                            </span>
                        </div>

                        <div className="flex items-center mb-6 space-x-4">
                            <p className="text-3xl font-bold text-gray-900">
                                ${product.price}
                            </p>
                        </div>

                        <div className="prose prose-gray max-w-none mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Description
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <Button
                                size="lg"
                                className="w-full md:w-auto min-w-50"
                                onClick={() => addToCart(product)}
                            >
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Product;
