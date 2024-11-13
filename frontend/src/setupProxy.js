const { createProxyMiddleware } = require('http-proxy-middleware');

// Set endpoints based on our .env configuration, the NODE_ENV is set in the package.json scripts
const target = process.env.NODE_ENV === 'development' 
? process.env.API_URL_DEV 
: process.env.API_URL_PROD

module.exports = function(app) {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: `${target}/graphql`,
      changeOrigin: true,
    })
  );
};