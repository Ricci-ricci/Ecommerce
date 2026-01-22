import Image from "next/image";
import { ReactNode } from "react";

interface BackgroundImageProps {
    children?: ReactNode;
}

const Background = ({ children }: BackgroundImageProps) => {
    return (
        <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="/images/_.jpeg"
                    alt="Background"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>
            <div className="relative z-10 container mx-auto px-4 text-center text-white pb-10">
                {children}
            </div>
        </section>
    );
};

const Shop1 = () => {
    return (
        <Background>
            <div className="flex flex-col items-center justify-center select-none">
                <h1 className="text-[25vw] md:text-[14rem] font-bold leading-none tracking-tighter opacity-100 mix-blend-overlay">
                    Shop
                </h1>
            </div>
        </Background>
    );
};

export default Shop1;
export { Background };
