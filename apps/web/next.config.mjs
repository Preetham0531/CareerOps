/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Transpile our local workspace packages
  transpilePackages: ['@careerops/tokens', '@careerops/ui'],
  poweredByHeader: false,
};

export default nextConfig;
