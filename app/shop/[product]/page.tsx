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
                <SameProduct product={product} />
            </Section>
        </Container>
    );
}
