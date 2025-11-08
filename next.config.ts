import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "audiophilewebsite-psi.vercel.app",
      pathname: "/images/**",
    },
  ],
},


};

export default nextConfig;
