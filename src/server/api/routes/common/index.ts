import { responseError, responseSuccess } from '@/server/common/response'
import { Hono } from 'hono'
import sts from 'qcloud-cos-sts'
// 配置参数
const qcloudConfig = {
  secretId: process.env.GROUP_SECRET_ID!, // 固定密钥
  secretKey: process.env.GROUP_SECRET_KEY!, // 固定密钥
  durationSeconds: 3600, // 密钥有效期
  bucket: 'xpeng-1253523970', // 换成你的 bucket
  region: 'ap-guangzhou', // 换成 bucket 所在地区
  allowPrefix: '*'
}

const app = new Hono()
  .basePath('/common')
  .get('/qcloudCredential', async (c) => {
    const scope = [
      {
        action: 'name/cos:PutObject',
        bucket: qcloudConfig.bucket,
        region: qcloudConfig.region,
        prefix: '*'
      }
    ]
    try {
      const policy = sts.getPolicy(scope)
      const res = await sts.getCredential({
        secretId: qcloudConfig.secretId,
        secretKey: qcloudConfig.secretKey,
        policy: policy,
        durationSeconds: qcloudConfig.durationSeconds
      })
      return c.json(responseSuccess(res))
    } catch {
      return c.json(responseError('获取凭证失败'))
    }
  })

export default app
