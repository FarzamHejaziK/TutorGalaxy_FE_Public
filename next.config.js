/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    REACT_APP_URI: process.env.REACT_APP_URI,
  },
};

// Log environment variables during build/startup
console.log('Next.js Environment Variables:', {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NODE_ENV: process.env.NODE_ENV,
});

module.exports = nextConfig;
