import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "3000",
                pathname: "/uploads/images/**", // allow all images inside this folder
            },
        ],
    },
};

export default nextConfig;
