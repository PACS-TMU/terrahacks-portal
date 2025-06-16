/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb', // or whatever limit you need, e.g. '20mb'
    },
  },
};

module.exports = nextConfig;
