"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "../lib/api";

const Divider = () => {
    return (
        <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-gray-400">Or</span>
            </div>
        </div>
    );
};

const SocialButton = ({
    label,
    icon,
    onClick,
}: {
    label: string;
    icon: React.ReactNode;
    onClick?: () => void;
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
            <span className="inline-flex h-4 w-4 items-center justify-center">
                {icon}
            </span>
            <span className="truncate">{label}</span>
        </button>
    );
};

const RegisterPage = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const isValid = useMemo(() => {
        return (
            name.trim().length > 0 &&
            email.trim().length > 0 &&
            password.length >= 6
        );
    }, [name, email, password]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid || isLoading) return;

        setIsLoading(true);
        setError("");

        try {
            const response = await fetch(API_ENDPOINTS.register, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to register user");
            }

            const data = await response.json();
            console.log("Registration successful:", data);
            router.push("/login");
        } catch (err) {
            console.error("Registration error:", err);
            setError(
                err instanceof Error
                    ? err.message
                    : "An error occurred during registration",
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
                {/* Left: Form */}
                <div className="flex items-center justify-center flex-col px-6 py-10 sm:px-10 lg:px-14">
                    <div className="mx-auto w-full max-w-sm lg:mx-0">
                        <h1 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 lg:text-left">
                            Create your account
                        </h1>
                        <p className="mt-2 text-center text-sm text-gray-500 lg:text-left">
                            Join Spider Sense and start shopping for the best
                            shoes online.
                        </p>

                        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <SocialButton
                                label="Sign up with Google"
                                icon={
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            fill="#EA4335"
                                            d="M12 10.2v3.9h5.5c-.2 1.2-1.4 3.5-5.5 3.5-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.7-2.6C17.8 3.6 15.2 2.4 12 2.4 6.9 2.4 2.7 6.6 2.7 11.7S6.9 21 12 21c6.9 0 8.6-4.8 8.6-7.3 0-.5-.1-.9-.1-1.3H12z"
                                        />
                                    </svg>
                                }
                                onClick={() => {
                                    // Demo only
                                    setName("Guest");
                                    setEmail("guest@example.com");
                                    setPassword("password123");
                                }}
                            />
                            <SocialButton
                                label="Sign up with Apple"
                                icon={
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M16.7 13.1c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3.1-1.6-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.8-2.7-.8-1.4 0-2.7.8-3.4 2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.1 2.8 2.1 1.1 0 1.6-.7 3-0.7 1.4 0 1.8 0.7 3 0.7 1.2 0 2-.9 2.7-2 .8-1.2 1.1-2.3 1.1-2.3-.1 0-2.2-.8-2.2-3.6zM14.9 6.7c.6-.7 1-1.7.9-2.7-.9.1-2 .6-2.6 1.3-.6.6-1.1 1.6-1 2.6 1 .1 2-.5 2.7-1.2z"
                                        />
                                    </svg>
                                }
                                onClick={() => {
                                    // Demo only
                                    setName("Apple User");
                                    setEmail("apple.user@example.com");
                                    setPassword("password123");
                                }}
                            />
                        </div>

                        <Divider />

                        {error && (
                            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="sr-only">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Create a password (min. 6 characters)"
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={!isValid || isLoading}
                                className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-black px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isLoading
                                    ? "Creating account..."
                                    : "Create account"}
                            </button>

                            <p className="pt-2 text-center text-xs text-gray-500">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="font-semibold text-gray-900 underline underline-offset-4 hover:text-black/80"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </form>

                        <div className="mt-10 flex items-center justify-center gap-4 text-[11px] text-gray-400 lg:justify-start">
                            <Link href="/help" className="hover:text-gray-600">
                                Help
                            </Link>
                            <span aria-hidden="true">·</span>
                            <Link href="/terms" className="hover:text-gray-600">
                                Terms
                            </Link>
                            <span aria-hidden="true">·</span>
                            <Link
                                href="/privacy"
                                className="hover:text-gray-600"
                            >
                                Privacy
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right: Image */}
                <div className="relative hidden lg:block">
                    <Image
                        src="/images/productTest.jpg"
                        alt="Register visual"
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        priority
                    />
                    {/* Subtle grayscale + texture-ish overlay to mimic reference */}
                    <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/0 via-black/0 to-black/10" />
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
