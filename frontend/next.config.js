/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    remotePatterns: [
     
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'collection.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
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
