"use client";
import Container from "@/app/layout/container";
import Section from "@/app/layout/section";
import useRealProducts from "@/app/data/fetchProduct";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import { RealProduct } from "@/app/data/fetchProduct";

const ShowProduct = ({ products }: { products: RealProduct[] }) => {
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
    if (products.length === 0) return <div>No products available</div>;
    //get the first product from the products array
    const firstProduct = products[0];
    //find the second that has a different category than the first
    const secondProduct = products.find(
        (p) => p.categoryName !== firstProduct.categoryName,
    );

    const Data = [firstProduct, secondProduct || products[1]];

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {Data.map((item) => (
                <div
                    key={item.id}
                    className="group relative flex min-h-140 flex-col justify-between overflow-hidden rounded-2xl p-8"
                >
                    <div className="absolute inset-0 z-0">
                        {!loadedImages.has(item.id) && (
                            <Skeleton className="absolute inset-0 w-full h-full" />
                        )}
                        <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onLoad={() =>
                                setLoadedImages((prev) =>
                                    new Set(prev).add(item.id),
                                )
                            }
                        />
                        <div className="absolute inset-0 bg-black/40" />
                    </div>

                    <div className="relative z-10 flex h-full flex-col justify-between">
                        <div>
                            <h2 className="mb-2 text-3xl font-bold text-white">
                                {item.title}
                            </h2>
                            <p className="max-w-xs text-sm text-gray-200">
                                {item.description.substring(0, 60)}...
                            </p>
                        </div>

                        <div className="mt-4">
                            <Link href={`/shop?category=${item.categoryName}`}>
                                <button className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold uppercase text-black transition-transform hover:scale-105">
                                    Shop {item.categoryName}
                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                                        <ArrowUpRight className="h-3 w-3" />
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Part2 = () => {
    const { data: products, loading, error } = useRealProducts();
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
        <Container>
            <Section>
                <ShowProduct products={products} />
            </Section>
        </Container>
    );
};

export default Part2;
