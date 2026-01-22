import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar/navbar";
import { GlobalProvider } from "./context/GlobalContext";
import FooterPart1 from "./components/mainPart/footer";
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SpiderSense",
    description: "Your favorite shop",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <GlobalProvider>
                    <Navbar></Navbar>
                    {children}
                    <FooterPart1></FooterPart1>
                </GlobalProvider>
            </body>
        </html>
    );
}
