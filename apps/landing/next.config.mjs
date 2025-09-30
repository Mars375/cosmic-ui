/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@cosmic-ui/ui'],
  experimental: {
    esmExternals: false,
    missingSuspenseWithCSRBailout: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // output: 'export', // Désactivé pour éviter les erreurs useContext
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  distDir: 'out',
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  // Configuration pour éviter les problèmes avec les pages d'erreur
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
};
export default nextConfig;

