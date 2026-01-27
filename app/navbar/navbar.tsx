"use client";

import Link from "next/link";
import { useGlobal } from "../context/GlobalContext";
import { ShoppingCart, User as UserIcon, LogOut, Menu } from "lucide-react";
import { useState } from "react";

const MENU = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "Contact", link: "/contact" },
];

const Navbar = () => {
    const { cartCount, user, logout } = useGlobal();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="flex items-center justify-between p-4 px-6 md:px-12 max-w-7xl mx-auto">
                {/* Logo */}
                <Link href="/">
                    <span className="text-2xl text-black font-extrabold bg-clip-text uppercase">
                        SpiderSense
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {MENU.map((item) => (
                        <Link key={item.name} href={item.link}>
                            <span className="text-black font-bold hover:text-red-600 transition-colors">
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Icons (Cart & User) */}
                <div className="flex items-center gap-4">
                    <Link href="/cart" className="relative group">
                        <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-red-600 transition-colors" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold hidden md:block">
                                {user.name}
                            </span>
                            <button
                                onClick={logout}
                                className="text-gray-700 hover:text-red-600"
                                title="Logout"
                            >
                                <LogOut className="w-6 h-6" />
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors"
                        >
                            <UserIcon className="w-6 h-6" />
                            <span className="hidden md:block font-medium">
                                Login
                            </span>
                        </Link>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 p-4 flex flex-col gap-4">
                    {MENU.map((item) => (
                        <Link
                            key={item.name}
                            href={item.link}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <span className="block text-gray-700 font-medium hover:text-red-600">
                                {item.name}
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Navbar;
