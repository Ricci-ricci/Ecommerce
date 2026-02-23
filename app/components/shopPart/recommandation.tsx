"use client";
import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import useRealProducts from "@/app/data/fetchProduct";
import Section from "@/app/layout/section";
import Container from "@/app/layout/container";
import Link from "next/link";
import { useGlobal } from "@/app/context/GlobalContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function Recommandation() {
    const { data: products, loading, error } = useRealProducts();
    const { addToCart, isInCart, removeFromCart } = useGlobal();
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
    const [carouselApi, setCarouselApi] = useState<CarouselApi>();

    if (error) return <div>Error: {error}</div>;

    // Show skeleton products when loading
    const skeletonProducts = Array(6)
        .fill(null)
        .map((_, i) => ({
            id: `skeleton-${i}`,
            title: "",
            description: "",
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

    const productsToDisplay = loading ? skeletonProducts : products;

    return (
        <Section>
            <Container className=" px-4 md:px-6">
                <div className="flex flex-col items-start justify-start space-y-4 text-start md:items-center md:text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                            Explore our Recommandation{" "}
                        </h2>
                        <p className="max-w-225 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Check out these handpicked recommendations just for
                            you.
                        </p>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl mt-8">
                    <Carousel
                        opts={{
                            align: "start",
                        }}
                        className="w-full"
                        setApi={setCarouselApi}
                    >
                        <CarouselContent>
                            {productsToDisplay.map((product) => (
                                <CarouselItem
                                    key={product.id}
                                    className="md:basis-1/2 lg:basis-1/3"
                                >
                                    <div className="p-1">
                                        <div className="flex flex-col gap-4 p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                                            <Link href={`/shop/${product.id}`}>
                                                <div className="aspect-square relative overflow-hidden rounded-md">
                                                    {loading ? (
                                                        <Skeleton className="flex items-center justify-center w-full h-full">
                                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                                        </Skeleton>
                                                    ) : (
                                                        <>
                                                            {!loadedImages.has(
                                                                product.id,
                                                            ) && (
                                                                <Skeleton className="absolute inset-0 w-full h-full" />
                                                            )}
                                                            <img
                                                                src={`${process.env.NEXT_PUBLIC_API_URL}${product.image}`}
                                                                alt={
                                                                    product.title
                                                                }
                                                                className="object-cover w-full h-full transition-transform hover:scale-105"
                                                                onLoad={() =>
                                                                    setLoadedImages(
                                                                        (
                                                                            prev,
                                                                        ) =>
                                                                            new Set(
                                                                                prev,
                                                                            ).add(
                                                                                product.id,
                                                                            ),
                                                                    )
                                                                }
                                                            />
                                                        </>
                                                    )}
                                                </div>
                                            </Link>

                                            <div className="flex items-end justify-between mb-2">
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
                                                            ? removeFromCart(
                                                                  product.id,
                                                              )
                                                            : addToCart(product)
                                                    }
                                                >
                                                    {isInCart(product.id)
                                                        ? "Remove"
                                                        : "Add to Cart"}
                                                </Button>
                                                <Link
                                                    href={`/shop/${product.id}`}
                                                    className="w-full"
                                                >
                                                    <Button className="rounded-full bg-black text-white hover:bg-gray-800 font-medium text-xs sm:text-sm h-10 sm:h-11 shadow-lg shadow-gray-200 w-full">
                                                        Buy Now
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden md:flex" />
                        <CarouselNext className="hidden md:flex" />
                    </Carousel>
                    <div className="flex justify-center gap-2 mt-4 md:hidden">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => carouselApi?.scrollPrev()}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => carouselApi?.scrollNext()}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
