import Image from "next/image";
import { GetCategory } from "@/app/data/getData";
import Container from "@/app/layout/container";
import Section from "@/app/layout/section";
import Link from "next/link";

interface ProductType {
    id?: number;
    image: string;
    name: string;
    category: string;
    price: number | string;
    rating: number;
    reviews: number;
    description: string;
}

const SameProduct = ({ product }: { product: ProductType }) => {
    // Get all products in the category
    const productByCategory = GetCategory(product.category);

    // Filter out the current product (by name or id if available) and take up to 4 items
    const relatedProducts = productByCategory
        .filter((item) => item.name !== product.name)
        .slice(0, 4);

    if (relatedProducts.length === 0) {
        return null;
    }

    return (
        <Container>
            <Section>
                <div className="w-full py-8 border-t border-gray-100 mt-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">
                        You Might Also Like
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((item) => (
                            <Link
                                key={item.id}
                                href={`/shop/${item.id}`}
                                className="block group"
                            >
                                <div className="group relative flex flex-col">
                                    <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4 border border-gray-200">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                        />

                                        {/* Overlay / Action Button placeholder similar to other parts */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <h3 className="font-medium text-gray-900 truncate">
                                            {item.name}
                                        </h3>

                                        <div className="flex items-center justify-between">
                                            <p className="font-bold text-gray-900">
                                                ${item.price}
                                            </p>
                                            <div className="flex items-center text-sm">
                                                <span className="text-yellow-500 mr-1">
                                                    ★
                                                </span>
                                                <span className="text-gray-600">
                                                    {item.rating}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </Section>
        </Container>
    );
};

export default SameProduct;
