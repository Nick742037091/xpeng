import logger from '@/server/common/logger'
import { LOGGER_TYPE_PAGE_ERROR } from '@/server/common/logger/constant'
import {
  getCosCredentialCache,
  setCosCredentialCache
} from '@/server/common/redis'
import { responseError, responseSuccess } from '@/server/common/response'
import { Hono } from 'hono'
import sts from 'qcloud-cos-sts'
import { z } from 'zod'
import { Validator } from '@/server/api/validator'

const pageErrorSchema = z.object({
  msg: z.string(),
  path: z.string()
})

const app = new Hono()
  .basePath('/common')
  .get('/qcloudCredential', async (c) => {
    const scope = [
      {
        action: 'name/cos:PutObject',
        bucket: process.env.NEXT_PUBLIC_UPLOAD_BUCKET!,
        region: process.env.NEXT_PUBLIC_UPLOAD_REGION!,
        prefix: '*'
      }
    ]
    try {
      const credential = await getCosCredentialCache()
      if (credential) {
        return c.json(responseSuccess(JSON.parse(credential)))
      }
      const policy = sts.getPolicy(scope)
      const res = await sts.getCredential({
        secretId: process.env.COS_SECRET_ID!,
        secretKey: process.env.COS_SECRET_KEY!,
        policy: policy,
        durationSeconds: parseInt(process.env.COS_CREDENTIAL_DURATION!)
      })
      await setCosCredentialCache(JSON.stringify(res))
      return c.json(responseSuccess(res))
    } catch {
      return c.json(responseError('获取凭证失败'))
    }
  })
  .post('/pageError', Validator('json', pageErrorSchema), async (c) => {
    const { msg, path } = c.req.valid('json')
    logger.error({
      type: LOGGER_TYPE_PAGE_ERROR,
      msg,
      path
    })
    return c.json(responseSuccess())
  })

export default app
