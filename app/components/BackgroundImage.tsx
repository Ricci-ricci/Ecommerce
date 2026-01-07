import Image from "next/image";
import { ReactNode } from "react";

interface BackgroundImageProps {
    children?: ReactNode;
}

const BackgroundImage = ({ children }: BackgroundImageProps) => {
    return (
        <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[150vmax] h-[150vmax] rotate-90">
                    <Image
                        src="/images/background.jpg"
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

export default BackgroundImage;
