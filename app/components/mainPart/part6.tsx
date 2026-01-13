import Image from "next/image";
import Container from "@/app/layout/container";
import Section from "@/app/layout/section";
import { products } from "@/app/data/products";
import { Button } from "@/components/ui/button";

// Component names must start with a capital letter in React.
// Previously "trendingProduct" (lowercase) would be treated as an HTML tag, not a React component.
const TrendingProduct = () => {
    // Taking the first 4 products to display in the grid
    const trendingItems = products.slice(0, 4);

    return (
        <div className="w-full py-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                    Trending Now
                </h2>

                <div className="flex gap-2 mt-4 md:mt-0">
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full px-6"
                    >
                        Men
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full px-6 text-gray-500"
                    >
                        Women
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full px-6 text-gray-500"
                    >
                        Kids
                    </Button>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingItems.map((product) => (
                    <div
                        key={product.id}
                        className="group relative flex flex-col"
                    >
                        <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
                            <div className="absolute top-3 left-3 z-10">
                                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold rounded-full shadow-sm">
                                    {product.id % 2 === 0
                                        ? "Best Sellers"
                                        : "New Arrival"}
                                </span>
                            </div>
                            <button className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm transition-all opacity-0 group-hover:opacity-100">
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

                            {/* Product Image */}
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col gap-1">
                            {/* We can hide title or show it small based on the design,
                                but accessible naming is important */}
                            <h3 className="font-medium text-gray-900 truncate sr-only">
                                {product.name}
                            </h3>

                            <div className="flex items-center justify-between">
                                <div className="flex items-baseline gap-2">
                                    <span className="font-bold text-lg">
                                        ${product.price}
                                    </span>
                                    <span className="text-sm text-gray-400 line-through">
                                        ${(product.price * 1.2).toFixed(2)}
                                    </span>
                                </div>

                                <button className="flex items-center text-sm font-medium text-gray-700 hover:text-black transition-colors">
                                    Quick Shop
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 ml-1"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
const Part6 = () => {
    return (
        <Container>
            <Section>
                <TrendingProduct></TrendingProduct>
            </Section>
        </Container>
    );
};
export default Part6;
