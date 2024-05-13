/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blob.ivanderlich.com',
      },
    ],
  },
}

module.exports = nextConfig
