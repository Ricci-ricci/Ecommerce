import { notFound } from "next/navigation";
import Product from "@/app/components/productPart/product";
import Container from "@/app/layout/container";
import Section from "@/app/layout/section";
import SameProduct from "@/app/components/productPart/sameProduct";

interface RealProduct {
    id: string;
    title: string;
    description: string;
    price: number;
    images: string[];
    stock: number;
    published: boolean;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
    category: {
        id: string;
        name: string;
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ product: string }>;
}) {
    const { product: productId } = await params;
    let product: RealProduct | null = null;

    try {
        const response = await fetch("http://localhost:3000/api/products");
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

    return (
        <Container>
            <Section>
                <Product product={product} />
                <SameProduct product={product} />
            </Section>
        </Container>
    );
}
