/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    graphQlEndpoint: process.env.BACKEND_SERVER + "/graphql",
    attachmentUploadsEndpoint: process.env.BACKEND_SERVER + "/attachments",
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
