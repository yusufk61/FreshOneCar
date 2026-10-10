/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Optional: eigener Build-Ordner (z. B. für parallele Test-Builds). Standard: .next
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 90],
  },
};

export default nextConfig;
