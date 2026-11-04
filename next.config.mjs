/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "content.avito.ma" }],
  },
};
export default nextConfig;
