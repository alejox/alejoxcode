import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // 404 global con un root layout por idioma.
    globalNotFound: true,
  },
};

export default nextConfig;
