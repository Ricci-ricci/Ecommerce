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

const ShowProduct = ({
    products,
    loading,
}: {
    products: RealProduct[];
    loading: boolean;
}) => {
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

    // Show skeleton products when loading
    const skeletonProducts = Array(2)
        .fill(null)
        .map((_, i) => ({
            id: `skeleton-${i}`,
            title: "Loading",
            description: "Loading product description...",
            price: 0,
            rating: 0,
            image: "",
            stock: 0,
            published: true,
            features: [],
            categoryName: "Loading",
            categoryId: "",
            createdAt: "",
            updatedAt: "",
        }));

    const Data = loading
        ? skeletonProducts
        : (() => {
              if (products.length === 0) return skeletonProducts;
              const firstProduct = products[0];
              const secondProduct = products.find(
                  (p) => p.categoryName !== firstProduct.categoryName,
              );
              return [firstProduct, secondProduct || products[1]];
          })();

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {Data.map((item) => (
                <div
                    key={item.id}
                    className="group relative flex min-h-140 flex-col justify-between overflow-hidden rounded-2xl p-8"
                >
                    <div className="absolute inset-0 z-0">
                        {(loading || !loadedImages.has(item.id)) && (
                            <Skeleton className="absolute inset-0 w-full h-full" />
                        )}
                        {!loading && (
                            <>
                                <img
                                    src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
                                    alt={item.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onLoad={() =>
                                        setLoadedImages((prev) =>
                                            new Set(prev).add(item.id),
                                        )
                                    }
                                />
                                <div className="absolute inset-0 bg-black/40" />
                            </>
                        )}
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
    if (error) return <div>Error: {error}</div>;
    return (
        <Container>
            <Section>
                <ShowProduct products={products} loading={loading} />
            </Section>
        </Container>
    );
};

export default Part2;
