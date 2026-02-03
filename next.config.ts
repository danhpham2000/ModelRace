import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yqqgyrjbpayyfbtubehr.supabase.co",
      },
    ],
  },
};

export default nextConfig;
