/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '3euf7jzpezqca99r.public.blob.vercel-storage.com',
      },
    ],
  },
}

module.exports = nextConfig
