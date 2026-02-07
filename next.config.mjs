/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      // Dead blog URLs — redirect to relevant existing posts
      {
        source: '/blog/dayparts-explained',
        destination: '/blog/digital-menu-boards-increase-restaurant-sales',
        permanent: true,
      },
      {
        source: '/blog/advertiser-getting-started',
        destination: '/blog/how-to-advertise-on-local-venue-screens',
        permanent: true,
      },
      {
        source: '/blog/playlist-best-practices',
        destination: '/blog/digital-signage-content-ideas',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
