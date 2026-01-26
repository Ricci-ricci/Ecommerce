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

// Example data structure for recommendations
const recommendedProducts = products;

export default function Recommandation() {
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
                                    <Link href={`/shop/${product.id}`}>
                                        <div className="p-1">
                                            <div className="flex flex-col gap-4 p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                                                <div className="aspect-square relative overflow-hidden rounded-md">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="object-cover w-full h-full transition-transform hover:scale-105"
                                                        height={500}
                                                        width={500}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="font-semibold text-lg">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {product.price}
                                                    </p>
                                                    <Button className="w-full">
                                                        Add to Cart
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
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
