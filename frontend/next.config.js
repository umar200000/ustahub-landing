/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost', 'ustahub.net'],
  },
};

module.exports = nextConfig;
