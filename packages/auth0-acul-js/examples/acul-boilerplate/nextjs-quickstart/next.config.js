const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable SWC for faster builds
  swcMinify: true,
  // Disable verbose output
  output: 'standalone',
  // Disable powered by header
  poweredByHeader: false,
  // Environment variables
  env: {
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    AUTH0_SCOPE: process.env.AUTH0_SCOPE,
    AUTH0_ORGANIZATION: process.env.AUTH0_ORGANIZATION,
  },
  // Configure webpack to minimize logs
  webpack: (config, { isServer, dev }) => {
    // Only show errors
    config.infrastructureLogging = {
      level: 'error'
    };
    
    if (!dev) {
      config.stats = 'errors-only';
    }
    
    return config;
  }
};

module.exports = nextConfig;