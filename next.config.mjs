/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'xps01.xiaopeng.com'
      },
      {
        hostname: 's.xiaopeng.com'
      }
    ]
  }
}

export default nextConfig
