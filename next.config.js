/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',        // 👈 Static HTML/JS
  trailingSlash: true      // 👈 Clean URLs
};

module.exports = nextConfig;
