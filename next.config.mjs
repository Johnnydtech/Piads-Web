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
      // /app → Android APK download (was app/app/route.ts, which broke
      // Turbopack's workspace-root inference — a directory named app/app)
      {
        source: '/app',
        destination: 'https://piads-android.s3.us-east-1.amazonaws.com/apps/PiAds-Kiosk-v1.5.2.apk',
        permanent: false,
      },
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
