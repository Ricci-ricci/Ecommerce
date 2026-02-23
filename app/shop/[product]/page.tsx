import { notFound } from "next/navigation";
import Product from "@/app/components/productPart/product";
import Container from "@/app/layout/container";
import Section from "@/app/layout/section";
import SameProduct from "@/app/components/productPart/sameProduct";
import { RealProduct } from "@/app/data/fetchProduct";
import { API_ENDPOINTS } from "@/app/lib/api";

const RatingStars = ({ rating, max = 5 }: { rating: number; max?: number }) => {
    const safeRating = Number.isFinite(rating) ? Math.max(0, rating) : 0;
    const fullStars = Math.floor(Math.min(max, safeRating));
    const hasHalf = safeRating - fullStars >= 0.5 && fullStars < max;

    return (
        <div
            className="flex items-center gap-1"
            aria-label={`Rating: ${safeRating} out of ${max}`}
        >
            {Array.from({ length: max }, (_, i) => {
                const starIndex = i + 1;
                const isFull = starIndex <= fullStars;
                const isHalf =
                    !isFull && hasHalf && starIndex === fullStars + 1;

                return (
                    <span
                        key={starIndex}
                        className={
                            isFull || isHalf
                                ? "text-yellow-500"
                                : "text-gray-300"
                        }
                        aria-hidden="true"
                    >
                        {isHalf ? "⯪" : "★"}
                    </span>
                );
            })}
        </div>
    );
};

export default async function Page({
    params,
}: {
    params: Promise<{ product: string }>;
}) {
    const { product: productId } = await params;
    let product: RealProduct | null = null;

    try {
        const response = await fetch(API_ENDPOINTS.products);
        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        product = data.data.find((p: RealProduct) => p.id === productId);
    } catch (error) {
        console.error("Error fetching product:", error);
    }

    if (!product) {
        return notFound();
    }

    const rating = Number(
        (product as unknown as { rating?: number }).rating ?? 0,
    );
    const reviewCount = Number(
        (product as unknown as { reviews?: number }).reviews ?? 0,
    );

    return (
        <Container>
            <Section>
                <Product product={product} />

                {/* Reviews */}
                <div className="mt-10 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Reviews
                            </h2>
                            <p className="text-sm text-gray-500">
                                Verified ratings summary for this product.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <RatingStars rating={rating} />
                            <div className="text-sm text-gray-700">
                                <span className="font-semibold">
                                    {rating.toFixed(1)}
                                </span>
                                <span className="text-gray-400">/5</span>
                                {reviewCount > 0 && (
                                    <span className="ml-2 text-gray-500">
                                        ({reviewCount}{" "}
                                        {reviewCount === 1
                                            ? "review"
                                            : "reviews"}
                                        )
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 border-t border-gray-100 pt-6">
                        {reviewCount > 0 ? (
                            <p className="text-sm text-gray-600">
                                This product is rated{" "}
                                <span className="font-semibold">
                                    {rating.toFixed(1)}
                                </span>{" "}
                                out of 5 based on{" "}
                                <span className="font-semibold">
                                    {reviewCount}
                                </span>{" "}
                                customer{" "}
                                {reviewCount === 1 ? "review" : "reviews"}.
                            </p>
                        ) : (
                            <p className="text-sm text-gray-600">
                                No reviews yet. Be the first to review this
                                product after your purchase.
                            </p>
                        )}
                    </div>
                </div>

                <SameProduct product={product} />
            </Section>
        </Container>
    );
}
