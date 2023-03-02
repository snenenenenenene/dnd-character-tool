/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["www.dndbeyond.com", "rpgrunkleplaysgames.files.wordpress.com"],
  },
};

module.exports = nextConfig;
