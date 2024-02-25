/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    apiRoot: "http://localhost:8000/api/v1",
    apiComments: "/comments",
    apiCommentsAttachments: "/comments/attachments",
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    users: "/users",
    wsRoot: "ws://localhost:8000",
    googleRecaptchaPublicKey: "6LcycH4pAAAAAJ0r0zKDCBBwvNTGhixAZjx1SyMB",
  },
  images: {
    disableStaticImages: true,
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebenderyt.blob.core.windows.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
