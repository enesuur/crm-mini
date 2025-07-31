import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.pravatar.cc"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://${process.env.REMOTE_HOST || "localhost"}:${
          process.env.REMOTE_PORT || 8000
        }/api/${process.env.API_PREFIX || ""}/:path*`,
      },
    ];
  },
};

export default nextConfig;
