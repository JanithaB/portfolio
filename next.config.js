/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

// module.exports = nextConfig
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  // Specify the output directory for the build files
  distDir: 'out', // This line sets the output directory to "out"
}
