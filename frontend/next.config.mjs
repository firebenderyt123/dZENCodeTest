/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    apiRoot: process.env.API_ROOT,
    apiComments: "/comments",
    apiCommentsAttachments: "/comments/attachments",
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    users: "/users",
    wsRoot: process.env.WS_ROOT,
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
