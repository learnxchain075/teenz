/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,


  images: {
  domains: ['chatgpt.com', 'images.pexels.com', 'images.unsplash.com'],
},

  experimental: {
    appDir: true, // Ensure the app directory is enabled if using app directory
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
