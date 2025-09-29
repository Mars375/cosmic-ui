/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@cosmic-ui/ui'],
  experimental: {
    esmExternals: false,
  },
};
export default nextConfig;
