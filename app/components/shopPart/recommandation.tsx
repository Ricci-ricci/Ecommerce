import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { products } from "@/app/data/products";
import Section from "@/app/layout/section";
import Container from "@/app/layout/container";
import Link from "next/link";
import { useGlobal } from "@/app/context/GlobalContext";

// Example data structure for recommendations
const recommendedProducts = products;

export default function Recommandation() {
    const { addToCart, isInCart, removeFromCart } = useGlobal();
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
                    >
                        <CarouselContent>
                            {recommendedProducts.map((product) => (
                                <CarouselItem
                                    key={product.id}
                                    className="md:basis-1/2 lg:basis-1/3"
                                >
                                    <div className="p-1">
                                        <div className="flex flex-col gap-4 p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                                            <Link href={`/shop/${product.id}`}>
                                                <div className="aspect-square relative overflow-hidden rounded-md">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="object-cover w-full h-full transition-transform hover:scale-105"
                                                        height={500}
                                                        width={500}
                                                    />
                                                </div>
                                            </Link>

                                            <div className="flex items-center gap-2">
                                                <div className="flex text-yellow-400 text-sm">
                                                    ★{" "}
                                                    <span className="text-gray-900 font-semibold ml-1">
                                                        {product.rating}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-gray-400">
                                                    ({product.reviews} Reviews)
                                                </span>
                                            </div>

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
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </Container>
        </Section>
    );
}
