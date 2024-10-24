require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: process.env.API_KEY,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    SECRET_KEY: process.env.SECRET_KEY,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.resolve.alias['react-dom$'] = 'react-dom/profiling';
      config.resolve.alias['scheduler/tracing'] = 'scheduler/tracing-profiling';
    }
    return config;
  },
};

export default nextConfig;
