/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'xps01.xiaopeng.com'
      },
      {
        hostname: 's.xiaopeng.com'
      },
      {
        hostname: 'xpeng-1253523970.cos.ap-guangzhou.myqcloud.com'
      }
    ]
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api']
  }
}

export default nextConfig
