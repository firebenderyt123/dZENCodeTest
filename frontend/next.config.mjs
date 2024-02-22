/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    apiRoot: "http://localhost:8000/api/v1",
    apiComments: "/comments",
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
    profile: "/profile",
    wsRoot: "ws://localhost:8000",
  },
};

export default nextConfig;
