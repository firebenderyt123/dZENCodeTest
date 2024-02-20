/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    apiRoot: "https://localhost:8000/api/v1",
    apiComments: "/comments",
  },
};

export default nextConfig;
