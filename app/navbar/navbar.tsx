"use client";

import Link from "next/link";
import { useGlobal } from "../context/GlobalContext";
import { ShoppingCart, User as UserIcon, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

const MENU = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "Contact", link: "/contact" },
];

const Navbar = () => {
    const { cartCount, user, logout } = useGlobal();
    const [open, setOpen] = useState(false);

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
                                {user.username}
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
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <button className="md:hidden text-gray-700">
                                <Menu className="w-6 h-6" />
                            </button>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="w-[300px] sm:w-[400px] p-4"
                        >
                            <div className="flex flex-col gap-4 mt-4">
                                {MENU.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.link}
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="block text-gray-700 font-medium hover:text-red-600">
                                            {item.name}
                                        </span>
                                    </Link>
                                ))}
                                {user && (
                                    <div className="border-t pt-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <UserIcon className="w-5 h-5" />
                                            <span className="font-semibold">
                                                {user.username}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setOpen(false);
                                            }}
                                            className="flex items-center gap-2 text-gray-700 hover:text-red-600"
                                        >
                                            <LogOut className="w-5 h-5" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
