/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  env: {
    APP_ID: process.env.APP_ID,
    ACTION_AIRDROP: process.env.ACTION_AIRDROP,
    ACTION_HIGH_VALUE: process.env.ACTION_HIGH_VALUE,
  },
}

module.exports = nextConfig
