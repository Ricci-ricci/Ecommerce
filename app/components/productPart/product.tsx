import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ProductType {
    image: string;
    name: string;
    category: string;
    price: number | string;
    rating: number;
    reviews: number;
    description: string;
}

const Product = ({ product }: { product: ProductType }) => {
    return (
        <>
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Section */}
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover object-center"
                            priority
                        />
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-2">
                                {product.name}
                            </h1>
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                                {product.category}
                            </span>
                        </div>

                        <div className="flex items-center mb-6 space-x-4">
                            <p className="text-3xl font-bold text-gray-900">
                                ${product.price}
                            </p>
                            <div className="h-6 w-px bg-gray-200" />
                            <div className="flex items-center">
                                <span className="text-yellow-500 text-xl mr-1">
                                    ★
                                </span>
                                <span className="font-medium text-gray-900">
                                    {product.rating}
                                </span>
                                <span className="ml-1 text-gray-500">
                                    ({product.reviews} reviews)
                                </span>
                            </div>
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
