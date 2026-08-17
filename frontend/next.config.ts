import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
