import Image from "next/image";
import { ReactNode } from "react";

interface BackgroundImageProps {
    children?: ReactNode;
}

const Background = ({ children }: BackgroundImageProps) => {
    return (
        <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[100vmax] h-[60vmax]">
                    <Image
                        src="/images/_.jpeg"
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
            </div>
            <div className="relative z-10 container mx-auto px-4 text-center text-white">
                {children}
            </div>
        </section>
    );
};

const Shop1 = () => {
    return (
        <Background>
            <div>
                <span className="text-8xl font-bold">Shop</span>
            </div>
        </Background>
    );
};

export default Shop1;
