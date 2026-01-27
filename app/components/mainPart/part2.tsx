import Container from "@/app/layout/container";
import Section from "@/app/layout/section";
import { products } from "@/app/data/products";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ShowProduct = () => {
    //get the first product from the products array
    const firstProduct = products[0];
    //find the second that has a different category than the first
    const secondProduct = products.find(
        (p) => p.category !== firstProduct.category,
    );

    const Data = [firstProduct, secondProduct || products[1]];

    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {Data.map((item, index) => (
                <div
                    key={item.id}
                    className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-slate-50 p-8 min-h-[400px]"
                >
                    <div className="relative z-10">
                        <h2 className="mb-2 text-3xl font-bold text-gray-900">
                            {index === 0
                                ? "Step Into His World"
                                : "Walk Her Way"}
                        </h2>
                        <p className="max-w-xs text-sm text-gray-500">
                            {item.description.substring(0, 60)}...
                        </p>
                    </div>

                    <div className="flex flex-1 items-center justify-center py-8">
                        <Image
                            src={item.image}
                            alt={item.name}
                            className="h-auto w-full max-w-70 object-contain mix-blend-multiply"
                            width={280}
                            height={280}
                        />
                    </div>

                    <div className="relative z-10 mt-4">
                        <Link href={`/shop?category=${item.category}`}>
                            <button className="flex uppercase font-bold items-center gap-2 rounded-full bg-black px-6 py-3 text-sm text-white transition-transform hover:scale-105">
                                Shop {item.category}
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black">
                                    <ArrowUpRight className="h-3 w-3" />
                                </div>
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Part2 = () => {
    return (
        <Container>
            <Section>
                <ShowProduct />
            </Section>
        </Container>
    );
};

export default Part2;
