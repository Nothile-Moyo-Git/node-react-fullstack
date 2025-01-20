import { createProxyMiddleware } from "http-proxy-middleware";

// Set endpoints based on our .env configuration, the NODE_ENV is set in the package.json scripts
const target =
  process.env.NODE_ENV === "development"
    ? process.env.API_URL_DEV
    : process.env.API_URL_PROD;

export default function (app) {
  // Handle GraphQL endpoints
  app.use(
    "/graphql",
    createProxyMiddleware({
      target: `${target}/graphql`,
      changeOrigin: true,
    }),
  );

  // Handle rest endpoints which aren't handled by GraphQL
  app.use(
    "/rest",
    createProxyMiddleware({
      target: `${target}/rest`,
      changeOrigin: true,
    }),
  );
};
