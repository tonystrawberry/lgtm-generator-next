/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["d196qgnoqlk55t.cloudfront.net"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd196qgnoqlk55t.cloudfront.net'
      }
    ]
  }
}

module.exports = nextConfig
