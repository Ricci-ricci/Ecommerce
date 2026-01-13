import { ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";

const FooterPart1 = () => {
    return (
        <footer className="w-full bg-[#1e2538] text-white py-16 px-6 md:px-20 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Top Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-20">
                    {/* Left: Headline */}
                    <div className="max-w-lg">
                        <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                            be the best
                            <br />
                            version of you
                        </h2>
                    </div>

                    {/* Right: Newsletter */}
                    <div className="w-full lg:w-auto flex flex-col gap-5">
                        <p className="text-gray-300 text-sm md:text-base pl-1">
                            Let&apos;s Subscribe us to know our newsletter
                        </p>
                        <form
                            className="flex items-center gap-4 w-full max-w-md"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div className="grow">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full bg-[#2a324a] text-white placeholder-gray-400 border border-gray-600 rounded-full py-4 px-6 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                                />
                            </div>
                            <button
                                type="submit"
                                aria-label="Subscribe"
                                className="bg-white text-[#1e2538] rounded-full p-4 hover:bg-gray-200 transition-transform hover:scale-105 shrink-0"
                            >
                                <ArrowRight size={24} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gray-600/50 mb-10"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-300 text-sm font-medium">
                        ©2021 LUVBAG LTD. All rights reserved
                    </p>

                    <div className="flex gap-4">
                        <a
                            href="#"
                            aria-label="Facebook"
                            className="p-2.5 border border-gray-400 rounded-full hover:bg-white hover:text-[#1e2538] hover:border-white transition-colors"
                        >
                            <Facebook size={20} />
                        </a>
                        <a
                            href="#"
                            aria-label="Instagram"
                            className="p-2.5 border border-gray-400 rounded-full hover:bg-white hover:text-[#1e2538] hover:border-white transition-colors"
                        >
                            <Instagram size={20} />
                        </a>
                        <a
                            href="#"
                            aria-label="Twitter"
                            className="p-2.5 border border-gray-400 rounded-full hover:bg-white hover:text-[#1e2538] hover:border-white transition-colors"
                        >
                            <Twitter size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterPart1;
