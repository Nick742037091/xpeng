import { Hono } from 'hono'
import { z } from 'zod'
import { createSession, deleteSession } from '@/lib/session'
import { Validator } from '@/server/api/validator'
const loginSchema = z.object({
  username: z.string(),
  password: z.string()
})

const app = new Hono()
  .basePath('/admin')
  // 登录
  .post('/login', Validator('json', loginSchema), async (c) => {
    const { username, password } = c.req.valid('json')
    if (
      username === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      await createSession(username, username)
      return c.json({
        message: '请求成功',
        data: null,
        code: 0
      })
    } else {
      return c.json({
        message: '用户名或密码错误',
        data: null,
        code: -1
      })
    }
  })
  // 退出登录
  .post('/logout', async (c) => {
    await deleteSession()
    return c.json({
      message: '请求成功',
      data: null,
      code: 0
    })
  })

export default app
