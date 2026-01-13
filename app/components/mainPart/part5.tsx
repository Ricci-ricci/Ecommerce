import Container from "@/app/layout/container";
import Section from "@/app/layout/section";

const brands = [
    {
        name: "Nike",
        path: "M21.2 6.8c-2.8 1.4-9.3 4.2-13.6 4.2-3.4 0-4.9-1.9-4.9-3.8 0-1.2.6-2.3 1.5-3.2C2.8 5.1 1.4 6.8 1.4 8.7c0 4.1 4 6.5 8.2 6.5 6.5 0 13-5.2 13-8.4 0-.1-.1-.1-.2-.1h-1.2z",
        viewBox: "0 0 24 24",
    },
    {
        name: "Adidas",
        path: "M21.6 15.3l-5.6-9.7c-.3-.5-1-.7-1.5-.4l-.8.5c-.5.3-.7 1-.4 1.5l5.6 9.7c.3.5 1 .7 1.5.4l.8-.5c.5-.3.7-1 .4-1.5zm-7.6 1.7l-4.2-7.3c-.3-.5-1-.7-1.5-.4l-.8.5c-.5.3-.7 1-.4 1.5l4.2 7.3c.3.5 1 .7 1.5.4l.8-.5c.5-.3.7-1 .4-1.5zm-7.6 1.8l-2.8-4.9c-.3-.5-1-.7-1.5-.4l-.8.5c-.5.3-.7 1-.4 1.5l2.8 4.9c.3.5 1 .7 1.5.4l.8-.5c.5-.3.7-1 .4-1.5z",
        viewBox: "0 0 24 24",
    },
    {
        name: "Puma",
        path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z", // Generic placeholder for simplicity as complex logos are hard to inline perfectly without SVG files
        viewBox: "0 0 24 24",
        isPlaceholder: true,
    },
    {
        name: "Reebok",
        path: "M2 2h20v20H2z", // Generic placeholder
        viewBox: "0 0 24 24",
        isPlaceholder: true,
    },
    {
        name: "New Balance",
        path: "M2 2h20v20H2z", // Generic placeholder
        viewBox: "0 0 24 24",
        isPlaceholder: true,
    },
    {
        name: "Vans",
        path: "M2 2h20v20H2z", // Generic placeholder
        viewBox: "0 0 24 24",
        isPlaceholder: true,
    },
];

const Part5 = () => {
    return (
        <Container>
            <Section className="py-16 border-t border-gray-100">
                <div className="flex flex-col items-center justify-center space-y-8">
                    <p className="text-5xl font-bold text-gray-800 uppercase tracking-widest">
                        Featured Brands
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 w-full items-center justify-items-center">
                        {brands.map((brand, index) => (
                            <div
                                key={index}
                                className="group flex items-center justify-center w-full p-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                            >
                                {brand.isPlaceholder ? (
                                    <span className="text-xl font-black italic tracking-tighter text-gray-800 group-hover:text-black">
                                        {brand.name.toUpperCase()}
                                    </span>
                                ) : (
                                    <svg
                                        viewBox={brand.viewBox}
                                        className="h-24 w-auto fill-current text-gray-800 group-hover:text-black"
                                        aria-label={brand.name}
                                    >
                                        <path d={brand.path} />
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        </Container>
    );
};

export default Part5;
