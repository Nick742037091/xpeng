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
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api']
  }
}

export default nextConfig
