import { GetData } from "@/app/data/getData";
import { notFound } from "next/navigation";
import Product from "@/app/components/productPart/product";
import Container from "@/app/layout/container";
import Section from "@/app/layout/section";
import SameProduct from "@/app/components/productPart/sameProduct";

export default async function Page({
    params,
}: {
    params: Promise<{ product: string }>;
}) {
    const { product: productId } = await params;
    const product = GetData(productId);

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
