/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sheets",
        permanent: false,
      },
      {
        source: "/sheets/:id",
        destination: "/sheets/:id/class",
        permanent: false,
      },
    ];
  },
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "www.dndbeyond.com",
      "rpgrunkleplaysgames.files.wordpress.com",
      "source.boringavatars.com",
      "static.wixstatic.com",
    ],
  },
};

module.exports = nextConfig;
