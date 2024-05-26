/** @type {import('next').NextConfig} */

const nextConfig = {
  // @ts-ignore
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `default-src 'self';
              script-src 'self' ${
                process.env.NODE_ENV == "production" ? "" : "'unsafe-eval'"
              } https://www.google.com/recaptcha/api.js https://www.gstatic.com/;
              style-src 'self' 'unsafe-inline';
              img-src 'self' blob: data:;
              font-src 'self';
              connect-src 'self' ${
                process.env.NEXT_PUBLIC_HTTP_GRAPHQL_ENDPOINT
              } ${process.env.NEXT_PUBLIC_WS_GRAPHQL_ENDPOINT};
              object-src 'none';
              frame-src https://www.google.com/;
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
              upgrade-insecure-requests;
            `
              .replace(/\n/g, "")
              .replace(/\s\s+/g, " "),
          },
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NEXT_PUBLIC_DOMAIN,
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
  poweredByHeader: false,
  reactStrictMode: true,
  env: {
    httpGraphQlEndpoint: process.env.NEXT_PUBLIC_HTTP_GRAPHQL_ENDPOINT,
    wsGraphQlEndpoint: process.env.NEXT_PUBLIC_WS_GRAPHQL_ENDPOINT,
    googleRecaptchaPublicKey: process.env.GOOGLE_RECAPTCHA_PUBLIC_KEY,
  },
  images: {
    disableStaticImages: true,
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        // @ts-ignore
        hostname: process.env.NEXT_PUBLIC_BLOB_HOSTNAME,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
