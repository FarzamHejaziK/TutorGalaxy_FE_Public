module.exports = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    REACT_APP_GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    REACT_APP_GOOGLE_REDIRECT_URI: process.env.REACT_APP_GOOGLE_REDIRECT_URI,
    REACT_APP_URI: process.env.REACT_APP_URI,
  },
};
