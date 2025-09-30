/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@cosmic-ui/ui'],
  experimental: {
    esmExternals: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
export default nextConfig;

