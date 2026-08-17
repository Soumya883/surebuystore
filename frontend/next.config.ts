import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.VERCEL ? "https://backend-pi-liart-42.vercel.app" : "http://localhost:3001",
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn2.clevup.in" },
      { protocol: "https", hostname: "img.clevup.in" },
      { protocol: "https", hostname: "cdn.aitopia.ai" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
