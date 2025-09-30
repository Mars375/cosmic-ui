/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@cosmic-ui/ui'],
  experimental: {
    esmExternals: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  distDir: 'out',
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
};
export default nextConfig;

