/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1zyr4xmqw3mni.cloudfront.net",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "production-nb-dfs.s3.amazonaws.com",
        pathname: "/gallery/**",
      },
    ],
  },
}

export default nextConfig
