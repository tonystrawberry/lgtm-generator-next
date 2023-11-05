/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd196qgnoqlk55t.cloudfront.net'
      }
    ]
  }
}

module.exports = nextConfig
