/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Add trailing slashes to all routes
  reactStrictMode: true,
  // Specify base path if your app is not hosted at the root
  // basePath: '/your-base-path',
};

module.exports = nextConfig;
