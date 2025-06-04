/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      }
    ],
  },

  experimental: {
    serverActions: {}, // Use an object here instead of a boolean
  },
  transpilePackages: ['framer-motion'],
  webpack: (config) => {
    // Ensuring Framer Motion is properly transpiled and bundled
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'framer-motion': require.resolve('framer-motion'),
    };

    return config;
  },
};

module.exports = nextConfig;
