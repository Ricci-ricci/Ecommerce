import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
const HeroText = () => {
    const intro = "Welcome to you";
    const Fall = "Step beyond Boundaries with SpiderSense";

    return (
        <div className="flex flex-col gap-6 items-center justify-center text-center">
            <span className="text-lg font-light md:text-xl">{intro}</span>
            <span className="text-4xl font-bold md:text-8xl">{Fall}</span>
            <Link href="/shop">
                <Button className="font-bold text-lg cursor-pointer px-6 py-4 mt-4">
                    Shop with Us <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </Link>
        </div>
    );
};
export default HeroText;
