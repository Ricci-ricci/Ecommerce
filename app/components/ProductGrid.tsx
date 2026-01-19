import Image from "next/image";

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
    return (
        <div className="flex-1 p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-lg font-semibold mb-2">
                            {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                            {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-xl font-bold">
                                ${product.price}
                            </span>
                            <div className="flex items-center">
                                <span className="text-yellow-500 mr-1">★</span>
                                <span className="text-sm">
                                    {product.rating} ({product.reviews})
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
