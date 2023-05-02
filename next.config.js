/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    SERVER_HOST_LOCAL: process.env.SERVER_HOST_LOCAL,
    SERVER_HOST_PROD: process.env.SERVER_HOST_PROD,
  },
};

module.exports = nextConfig;
