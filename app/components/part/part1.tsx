import Container from "@/app/layout/container";
import Section from "@/app/layout/section";
import { Package, RefreshCw, ShieldCheck, Lock } from "lucide-react";

const Content = () => {
    const Data = [
        {
            title: "Free shipping",
            description: "Free shipping on all orders $100+",
            icon: Package,
        },
        {
            title: "Free exchanges",
            description: "30 Days free exchanges facility",
            icon: RefreshCw,
        },
        {
            title: "2 Years warranty",
            description: "Guaranteed for 2 years from purchases",
            icon: ShieldCheck,
        },
        {
            title: "Secure payment",
            description: "Shop Securely, Pay with confidence",
            icon: Lock,
        },
    ];

    return (
        <div className="mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12">
            {Data.map((item, index) => (
                <div key={index} className="flex items-center gap-6">
                    <div className="flex flex-none items-center justify-center rounded-full bg-gray-50 p-6">
                        <item.icon className="h-10 w-10 text-gray-900" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">
                            {item.title}
                        </h3>
                        <p className="mt-2 text-base text-gray-500">
                            {item.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Part1 = () => {
    const text = "When you shop with spiderSense ";
    return (
        <Container>
            <Section>
                <div className="items-center justify-center flex text-6xl font-bold ">
                    {text}
                </div>
                <Content></Content>
            </Section>
        </Container>
    );
};
export default Part1;
