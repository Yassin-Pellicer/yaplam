/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:lang(es|en)/:rest*",
        destination: "/:rest*",
        permanent: false,
      },
      {
        source: "/:lang(es|en)",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
