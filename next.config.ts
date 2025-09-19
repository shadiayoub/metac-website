import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // {
      //   source: "/buy-acces",
      //   destination: "https://metacces.com/buy-acces//",
      //   permanent: true,
      // },
    ];
  },
  images: {
    domains: ["picsum.photos"],
  },
  /* config options here */
};

export default nextConfig;
