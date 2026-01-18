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
        hostname: "randomuser.me", 
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
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
