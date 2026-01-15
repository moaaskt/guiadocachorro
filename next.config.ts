import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "images.dog.ceo",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com'",
      },
      {
        protocol: "https",
        hostname: "ppvkpgrjsrftzdqkbgmi.supabase.co",
      },
    ],
  },
};

export default nextConfig;
