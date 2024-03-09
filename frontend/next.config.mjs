/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    httpGraphQlEndpoint: process.env.HTTP_GRAPHQL_ENDPOINT,
    wsGraphQlEndpoint: process.env.WS_GRAPHQL_ENDPOINT,
    googleRecaptchaPublicKey: process.env.GOOGLE_RECAPTCHA_PUBLIC_KEY,
  },
  images: {
    disableStaticImages: true,
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.BLOB_HOSTNAME,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
