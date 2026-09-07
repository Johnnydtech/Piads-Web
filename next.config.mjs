/** @type {import('next').NextConfig} */
const isStaticPreview = process.env.PIADS_STATIC_PREVIEW === "1";

const nextConfig = {
  ...(isStaticPreview
    ? { output: "export", pageExtensions: ["preview.tsx", "preview.ts"] }
    : {}),
  reactStrictMode: true,
  // Keep the development preview alive during a production build.
  distDir: process.env.PIADS_BUILD_DIR || ".next",
  images: {
    ...(isStaticPreview ? { unoptimized: true } : {}),
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    if (isStaticPreview) return [];
    return [
      // /app → Android APK download (was app/app/route.ts, which broke
      // Turbopack's workspace-root inference — a directory named app/app)
      {
        source: "/app",
        destination:
          "https://piads-android.s3.us-east-1.amazonaws.com/apps/PiAds-Kiosk-v1.5.2.apk",
        permanent: false,
      },
      // Dead blog URLs — redirect to relevant existing posts
      {
        source: "/blog/dayparts-explained",
        destination: "/blog/digital-menu-boards-increase-restaurant-sales",
        permanent: true,
      },
      {
        source: "/blog/advertiser-getting-started",
        destination: "/blog/how-to-advertise-on-local-venue-screens",
        permanent: true,
      },
      {
        source: "/blog/playlist-best-practices",
        destination: "/blog/digital-signage-content-ideas",
        permanent: true,
      },
    ];
  },
};

// Static review pages use outbound links, so they need no Next.js redirects.
if (isStaticPreview) delete nextConfig.redirects;

export default nextConfig;
