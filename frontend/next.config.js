/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  env: {
    APP_ID: process.env.APP_ID,
    ACTION_AIRDROP: process.env.ACTION_AIRDROP,
    ACTION_HIGH_VALUE: process.env.ACTION_HIGH_VALUE,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "@react-native-async-storage/async-storage": false,
      "pino-pretty": false,
    };
    return config;
  },
};

module.exports = nextConfig;
