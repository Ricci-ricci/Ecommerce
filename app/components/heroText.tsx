import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroText = () => {
    const intro = "Welcome to you";
    const Fall = "Step beyond Boundaries with StrideXplore";

    return (
        <div className="flex flex-col gap-6 items-center justify-center text-center">
            <span className="text-lg">{intro}</span>
            <span className="text-7xl font-bold">{Fall}</span>
            <Button>
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
        </div>
    );
};
export default HeroText;
