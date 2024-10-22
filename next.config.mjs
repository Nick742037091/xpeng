/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'xps01.xiaopeng.com'
      }
    ]
  }
}

export default nextConfig
