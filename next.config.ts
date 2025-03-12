import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    //  ppr:"incremental"//
  },
  // devIndicators:{
  //   appIsrStatus:true,
  //   buildActivity:true,
  //   buildActivityPosition:"bottom-right"
  // }
};

export default nextConfig;
