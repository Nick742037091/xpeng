import { Hono } from 'hono'
import { z } from 'zod'
import { deleteSiteSession } from '@/lib/session'
import { Validator } from '@/server/api/validator'
import { responseSuccess } from '@/server/common/response'

const loginSchema = z.object({
  phone: z.string(),
  verifyCode: z.string()
})

const app = new Hono()
  .basePath('/auth')
  // 登录
  .post('/login', Validator('json', loginSchema), async (c) => {
    // const { phone, verifyCode } = c.req.valid('json')
    // TODO: 判断验证码是否有效
    // 判断是否注册，未注册需要进行注册
    // 返回用户信息
    return c.json(responseSuccess())
  })
  // 退出登录
  .post('/logout', async (c) => {
    await deleteSiteSession()
    return c.json(responseSuccess())
  })

export default app
